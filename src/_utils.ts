import type { ContainerNode } from "@takumi-rs/helpers";
import { container, text, em, percentage } from "@takumi-rs/helpers";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";

const DEFAULT_FONT =
  "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2";

const FORMAT_MAP = {
  png: "Png" as any,
  webp: "WebP" as any,
  jpeg: "Jpeg" as any,
};

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
      ...opts.style,
    },
    children: tokens.map((line) =>
      container({
        style: {
          display: "flex",
          minHeight: em(1),
        },
        children: line.map((token) =>
          token.content.trim() === ""
            ? container({
                style: {
                  minWidth: em(0.5 * token.content.length),
                  minHeight: em(1),
                  // backgroundColor: "gray",
                },
              })
            : // TODO: fontStyle
              text(token.content, { color: token.color }),
        ),
      }),
    ),
  });

  return root;
}

export async function loadFont(font: string | ArrayBuffer | undefined) {
  let fontData: ArrayBuffer;
  if (!font) {
    font = DEFAULT_FONT;
  }
  if (typeof font === "string") {
    const fontCache: Map<string, ArrayBuffer> = ((
      globalThis as any
    ).__shikiImageFontCache__ ||= new Map());
    fontData =
      fontCache.get(font) || (await fetch(font).then((r) => r.arrayBuffer()));
    fontCache.set(font, fontData);
  } else {
    fontData = font;
  }
  return fontData;
}

export function renderOptions(code: string, opts: CodeToImageOptions) {
  const lines = code.split("\n").length;
  const columns = Math.max(...code.split("\n").map((l) => l.length));
  const width = opts.width || (columns + 2) * 10;
  const height = opts.height || (lines + 2) * 20;
  const format = FORMAT_MAP[opts.format || "webp"] as any;
  return { width, height, format };
}
