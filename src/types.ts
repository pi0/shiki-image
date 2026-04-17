import type { BundledLanguage, BundledTheme, HighlighterCore } from "shiki";
import type { RenderOptions } from "takumi-js";
import type { Properties } from "csstype";

/**
 * Options for rendering code to image.
 */
export type CodeToImageOptions = RenderOptions & {
  /**
   * Code language. See shiki supported languages.
   */
  lang: BundledLanguage;

  /**
   * Rendering theme. See shiki supported themes.
   */
  theme: BundledTheme;

  /**
   * Font used to render the code. Can be a remote URL (string) or an ArrayBuffer.
   *
   * If a URL is passed, it will be cached in memory for next renders.
   *
   * If no font is specified, it will use the builtin `Geist Mono` font from Takumi.
   */
  font?: string | ArrayBuffer | Uint8Array;

  /**
   * Additional container styles. See takumi stylesheets in https://takumi.kane.tw/docs/reference.
   */
  style?: Properties;

  /**
   * Output format: `png`, `webp`, `avif`, or `jpeg`.
   *
   * @default webp
   */
  format?: RenderOptions["format"];
};

export interface CodeToImageCoreOptions {
  highlighter: HighlighterCore;
}
