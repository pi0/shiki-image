import type { BundledLanguage, BundledTheme, HighlighterCore } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";
import type { Renderer as NativeRenderer } from "@takumi-rs/core";

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
   *  If no font is specified, it will be automatically downloaded from bunny.net/jetbrains-mono.
   */
  font?: string | ArrayBuffer;

  /**
   * Font ratio used to compute the final font size. Default is `0.63`.
   */
  fontRatio?: number;

  /**
   * Rendering width. By default is computed as `columns * fontSize * fontRatio`.
   *
   * Default font size is `18` and can be customized using `style.fontSize`.
   */
  width?: number;

  /**
   * Rendering height. By default is computed as `lines * fontSize * lineHeight`.
   *
   * Default `lineHeight` is `1.3` and can be customized using `style.lineHeight`.
   */
  height?: number;

  /**
   * Additional container styles. See takumi stylesheets.
   */
  style?: PartialStyle;

  /**
   * Output format: `png`, `webp`, or `jpeg`. Default is `webp`.
   */
  format?: "png" | "webp" | "jpeg";

  /**
   * Image quality between 0 and 100 (jpeg format only).
   */
  quality?: number;
}

export interface CodeToImageCoreOptions {
  highlighter: HighlighterCore;
  renderer: NativeRenderer;
}
