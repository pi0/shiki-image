import { describe, expect, it } from "vitest";
import { codeToImage } from "../src";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const exampleCode = /* js */ `
import { writeFile } from "node:fs/promises";
import { codeToImage } from "shiki-image";

const buffer = await codeToImage('console.log("hello, world!");', {
  lang: "js",
  theme: "github-dark",
  format: 'webp',
  style: { borderRadius: 4 },
});

await writeFile("image.webp", buffer);
`;

describe("shiki-image", () => {
  it("convert code to image", async () => {
    const start = Date.now();
    const img = await codeToImage(exampleCode, {
      lang: "js",
      theme: "github-dark",
      style: { borderRadius: 4 },
    });
    if (!process.env.CI) {
      await writeFile(
        fileURLToPath(new URL(".snapshot/image.webp", import.meta.url)),
        img,
      );
    }
    const end = Date.now();
    console.log(`Image generated in ${end - start}ms`);
  });

  it("faild when url returned 404", async () => {
    await expect(
      codeToImage(exampleCode, {
        lang: "js",
        theme: "github-dark",
        font: "https://www.google.com/404",
      }),
    ).rejects.toThrowError(
      "Font fetch failed (404 Not Found): https://www.google.com/404",
    );
  });
});
