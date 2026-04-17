import { bench, do_not_optimize, run, summary } from "mitata";
import { codeToImageCore } from "../dist/core.mjs";
import { createHighlighter } from "shiki";
import type { OutputFormat } from "takumi-js";

const exampleCode = /* js */ `
import { writeFile } from "node:fs/promises";
import { codeToImage } from "shiki-image";

const buffer = await codeToImage('console.log("hello, world!");', {
  lang: "js",
  theme: "github-dark",
  format: 'webp',
  style: { borderRadius: "4px" },
});

await writeFile("image.webp", buffer);
`;

const highlighter = await createHighlighter({
  themes: ["github-dark"],
  langs: ["js"],
});

async function renderTest(format: OutputFormat) {
  do_not_optimize(
    await codeToImageCore(
      exampleCode,
      {
        lang: "js",
        theme: "github-dark",
        format,
        style: { borderRadius: "4px" },
      },
      {
        highlighter,
      },
    ),
  );
}

summary(() => {
  bench("Takumi with default options (png)", () => renderTest("png"));

  bench("Takumi with default options (webp)", () => renderTest("webp"));
});

await run();
