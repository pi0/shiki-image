import type { CodeToImageOptions } from "./types";

import { createHighlighter } from "shiki";
import { Renderer } from "@takumi-rs/core";
import { codeToImageCore } from "./core";
import { loadFont } from "./_utils";

export type { CodeToImageOptions } from "./types";

export async function codeToImage(code: string, options: CodeToImageOptions) {
  const highlighter = await createHighlighter({
    themes: [options.theme],
    langs: [options.lang],
  });
  const fontData = await loadFont(options.font);
  const renderer = new Renderer({ fonts: [fontData] });
  return codeToImageCore(code, options, { highlighter, renderer });
}
