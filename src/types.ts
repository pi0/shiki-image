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
   * If a URL is passed, it will be cached in memory for next renders.
   * If no font is provided, a default font will be downloaded from [bunny.net/ubuntu-sans-mono](https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2).
   */
  font?: string | ArrayBuffer;
  /**
   * Rendering width. By default is computed as `(columns + 2) * 10`.
   */
  width?: number;
  /**
   * Rendering height. By default is computed as `(lines + 2) * 20`.
   */
  height?: number;
  /**
   * Additional container styles. See takumi stylesheets.
   */
  style?: PartialStyle;
  /**
   * Output format: 'png', 'webp', or 'jpeg'. Default is 'png'.
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
