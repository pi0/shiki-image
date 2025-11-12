import type { ContainerNode } from "@takumi-rs/helpers";
import { container, text } from "@takumi-rs/helpers";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";

const DEFAULT_FONT_SIZE = 32;
const DEFAULT_LINE_HEIGHT = 1.3;

export function codeToContainer(
  code: string,
  opts: CodeToImageOptions,
  coreOpts: CodeToImageCoreOptions,
): ContainerNode {
  const { tokens, fg, bg } = coreOpts.highlighter.codeToTokens(code, {
    theme: opts.theme,
    lang: opts.lang,
  });

  const root = container({
    style: {
      color: fg,
      backgroundColor: bg,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      paddingInline: "2rem",
      fontSize: DEFAULT_FONT_SIZE,
      lineHeight: DEFAULT_LINE_HEIGHT,
      fontFamily: "monospace",
      whiteSpace: "pre",
      ...opts.style,
    },
    children: tokens.map((line) =>
      container({
        style: {
          display: "block",
          minHeight: "1em",
          width: "100%",
        },
        children: line.map((token) =>
          text(token.content, { color: token.color, display: "inline" }),
        ),
      }),
    ),
  });

  return root;
}

export async function loadFont(font: string | ArrayBuffer | Uint8Array) {
  let fontData: Uint8Array | ArrayBuffer;

  if (typeof font === "string") {
    const fontCache: Map<string, Uint8Array | ArrayBuffer> = ((
      globalThis as any
    ).__shikiImageFontCache__ ||= new Map());

    const cachedFont = fontCache.get(font);
    if (cachedFont) {
      fontData = cachedFont;
    } else {
      const res = await fetch(font);
      if (!res.ok) {
        throw new Error(
          `Font fetch failed (${res.status} ${res.statusText}): ${font}`,
        );
      }
      fontData = await res.arrayBuffer();
      fontCache.set(font, fontData);
    }
    return fontData;
  }

  if (font instanceof ArrayBuffer) {
    fontData = new Uint8Array(font);
    return fontData;
  }

  if (font instanceof Uint8Array) {
    fontData = font;
    return fontData;
  }

  throw new Error(
    "Invalid font type. Expected a string, ArrayBuffer, or Uint8Array",
  );
}
