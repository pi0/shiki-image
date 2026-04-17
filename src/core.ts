import { render } from "takumi-js";
import { codeToContainer } from "./_utils";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";
import type { FontLoader } from "takumi-js/node";

export type { CodeToImageOptions } from "./types";

export async function codeToImageCore(
  code: string,
  opts: CodeToImageOptions,
  coreOpts: CodeToImageCoreOptions,
) {
  const container = codeToContainer(code, opts, coreOpts);
  return await render(container, {
    ...opts,
    fonts: opts.font ? [resolveFontInput(opts.font)] : [],
    format: opts.format ?? "webp",
  });
}

function resolveFontInput(font: string | ArrayBuffer | Uint8Array): FontLoader {
  if (typeof font === "string") {
    return {
      key: font,
      async data() {
        const res = await fetch(font);

        if (!res.ok) {
          throw new Error(
            `Font fetch failed (${res.status} ${res.statusText}): ${font}`,
          );
        }

        return res.arrayBuffer();
      },
    };
  }

  return font;
}
