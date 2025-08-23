import type { BundledLanguage, BundledTheme, HighlighterCore } from "shiki";
import type { PartialStyle } from "@takumi-rs/helpers";
import type { Renderer as NativeRenderer } from "@takumi-rs/core";

export interface CodeToImageOptions {
  lang: BundledLanguage;
  theme: BundledTheme;
  font: string | ArrayBuffer;
  width?: number;
  height?: number;
  style?: PartialStyle;
  format?: "png" | "webp" | "jpeg";
}

export interface CodeToImageCoreOptions {
  highlighter: HighlighterCore;
  renderer: NativeRenderer;
}
