import type { BundledLanguage, BundledTheme } from "shiki";
import { getSingletonHighlighter } from "shiki";

import type { PartialStyle } from "@takumi-rs/helpers";
import { Renderer } from "@takumi-rs/core";
import { container, text, em, percentage } from "@takumi-rs/helpers";

export interface CodeToImageOptions {
  lang: BundledLanguage;
  theme: BundledTheme;
  font: string | ArrayBuffer;
  width?: number;
  height?: number;
  style?: PartialStyle;
}

export async function codeToImage(code: string, options: CodeToImageOptions) {
  const hl = await getSingletonHighlighter({
    themes: [options.theme],
    langs: [options.lang],
  });

  const { tokens, fg, bg } = hl.codeToTokens(code, {
    theme: options.theme,
    lang: options.lang,
  });

  // console.log(tokens);

  const root = container({
    style: {
      color: fg,
      backgroundColor: bg,
      display: "flex",
      flexDirection: "column",
      width: percentage(100),
      height: percentage(100),
      padding: em(1),
      ...options.style,
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

  const font =
    typeof options.font === "string"
      ? await fetch(options.font).then((r) => r.arrayBuffer())
      : options.font;

  const renderer = new Renderer({ fonts: [font] });

  // Estimate width and height
  const _lines = code.split("\n");
  const lines = _lines.length;
  const columns = Math.max(..._lines.map((l) => l.length));
  const width = options.width || (columns + 2) * 10;
  const height = options.height || (lines + 2) * 20;

  const res = await renderer.renderAsync(root, {
    format: "Png" as any,
    width,
    height,
  });

  return res;
}
