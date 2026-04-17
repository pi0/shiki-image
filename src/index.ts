import type { CodeToImageOptions } from "./types";

import { createHighlighter } from "shiki";
import { codeToImageCore } from "./core";

export type { CodeToImageOptions } from "./types";

export async function codeToImage(code: string, options: CodeToImageOptions) {
  const highlighter = await createHighlighter({
    themes: [options.theme],
    langs: [options.lang],
  });

  return codeToImageCore(code, options, { highlighter });
}
