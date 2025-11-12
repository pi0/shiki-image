import { codeToContainer } from "./_utils";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";

export { loadFont } from "./_utils";

export type { CodeToImageOptions } from "./types";

export async function codeToImageCore(
  code: string,
  opts: CodeToImageOptions,
  coreOpts: CodeToImageCoreOptions,
) {
  const container = codeToContainer(code, opts, coreOpts);
  return await coreOpts.renderer.render(container, {
    format: opts.format,
    quality: opts.quality,
  });
}
