import { bench, do_not_optimize, run } from "mitata";
import { codeToImageCore, loadFont } from "../dist/core.mjs";
import { createHighlighter } from "shiki";
import { Renderer } from "@takumi-rs/core";

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

bench("Takumi with default options", async () => {
  // to make the benchmark more fair,
  // we purge the font rasterization/shaping cache before every run
  renderer.purgeFontCache();

  do_not_optimize(
    await codeToImageCore(
      exampleCode,
      {
        lang: "js",
        theme: "github-dark",
        format: "webp",
        style: { borderRadius: 4 },
      },
      {
        highlighter,
        renderer,
      },
    ),
  );
});

await run();
