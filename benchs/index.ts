import { bench, do_not_optimize, run, summary } from "mitata";
import { codeToImageCore, loadFont } from "../dist/core.mjs";
import { createHighlighter } from "shiki";
import { Renderer, type OutputFormat } from "@takumi-rs/core";

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

const highlighter = await createHighlighter({
  themes: ["github-dark"],
  langs: ["js"],
});

// preload the font
const renderer = new Renderer({
  fonts: [await loadFont(undefined)],
});

async function renderTest(format: OutputFormat) {
  do_not_optimize(
    await codeToImageCore(
      exampleCode,
      {
        lang: "js",
        theme: "github-dark",
        format,
        style: { borderRadius: 4 },
      },
      {
        highlighter,
        renderer,
      },
    ),
  );
}

summary(() => {
  bench("Takumi with default options (png)", () => renderTest("png"));

  bench("Takumi with default options (webp)", () => renderTest("webp"));
});

await run();
