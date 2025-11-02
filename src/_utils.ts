import type { ContainerNode } from "@takumi-rs/helpers";
import { container, text, em, percentage } from "@takumi-rs/helpers";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";

const DEFAULT_FONT_SIZE = 32;
const DEFAULT_FONT_RATIO = 0.63;
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
      width: percentage(100),
      height: percentage(100),
      padding: em(1),
      fontSize: DEFAULT_FONT_SIZE,
      lineHeight: DEFAULT_LINE_HEIGHT,
      fontFamily: "monospace",
      ...opts.style,
    },
    children: tokens.map((line) =>
      container({
        style: {
          display: "block",
          minHeight: em(1),
          width: percentage(100),
        },
        children: line.map((token) =>
          text(token.content, { color: token.color, display: "inline" }),
        ),
      }),
    ),
  });

  return root;
}

export async function loadFont(font: string | ArrayBuffer | Buffer) {
  let fontData: Buffer | ArrayBuffer;

  if (typeof font === "string") {
    const fontCache: Map<string, Buffer | ArrayBuffer> = ((
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
    fontData = Buffer.from(font);
    return fontData;
  }

  if (font instanceof Buffer) {
    fontData = font;
    return fontData;
  }

  throw new Error(
    "Invalid font type. Expected a string, ArrayBuffer, or Buffer",
  );
}

export function renderOptions(code: string, opts: CodeToImageOptions) {
  const lines = code.split("\n").length;
  const columns = Math.max(...code.split("\n").map((l) => l.length));

  const fontRatio = opts?.fontRatio || DEFAULT_FONT_RATIO;
  const fontSize =
    Number.parseInt(opts.style?.fontSize as string) || DEFAULT_FONT_SIZE;
  const lineHeight =
    Number.parseInt(opts.style?.lineHeight as string) || DEFAULT_LINE_HEIGHT;

  const width = opts.width || (columns + 2) * (fontSize * fontRatio);
  const height = opts.height || (lines + 2) * (fontSize * lineHeight);

  const format = opts.format || ("webp" as const);

  return { width, height, format };
}
