import type { ContainerNode } from "takumi-js";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";
import { container, text } from "takumi-js/helpers";

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
          text({
            text: token.content,
            style: {
              color: token.color,
              display: "inline",
            },
          }),
        ),
      }),
    ),
  });

  return root;
}
