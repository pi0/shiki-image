import type { BundledLanguage, BundledTheme, HighlighterCore } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";
import type {
  Renderer as NativeRenderer,
  RenderOptions,
} from "@takumi-rs/core";

/**
 * Options for rendering code to image.
 */
export interface CodeToImageOptions extends RenderOptions {
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
  style?: PartialStyle;

  /**
   * Output format: `png`, `webp`, `avif`, or `jpeg`.
   *
   * @default webp
   */
  format?: RenderOptions["format"];
}

export interface CodeToImageCoreOptions {
  highlighter: HighlighterCore;
  renderer: NativeRenderer;
}
