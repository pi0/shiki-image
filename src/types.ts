import type { BundledLanguage, BundledTheme, HighlighterCore } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";
import type { Renderer as NativeRenderer } from "@takumi-rs/core";
import type { OutputFormat } from "@takumi-rs/core";

/**
 * Options for rendering code to image.
 */
export interface CodeToImageOptions {
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
  font?: string | ArrayBuffer;

  /**
   * Rendering width. If not specified, it will be auto computed based on the code.
   */
  width?: number;

  /**
   * Rendering height. If not specified, it will be auto computed based on the code.
   */
  height?: number;

  /**
   * Additional container styles. See takumi stylesheets in https://takumi.kane.tw/docs/reference.
   */
  style?: PartialStyle;

  /**
   * Output format: `png`, `webp`, `avif`, or `jpeg`.
   *
   * @default webp
   */
  format?: OutputFormat;

  /**
   * Image quality between 0 and 100 (jpeg and avif format only).
   */
  quality?: number;
}

export interface CodeToImageCoreOptions {
  highlighter: HighlighterCore;
  renderer: NativeRenderer;
}
