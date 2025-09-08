import { codeToContainer, renderOptions } from "./_utils";
import type { CodeToImageCoreOptions, CodeToImageOptions } from "./types";

export { loadFont } from "./_utils";

export type { CodeToImageOptions } from "./types";

export async function codeToImageCore(
  code: string,
  opts: CodeToImageOptions,
  coreOpts: CodeToImageCoreOptions,
) {
  const container = codeToContainer(code, opts, coreOpts);
  const { width, height, format } = renderOptions(code, opts);
  return await coreOpts.renderer.renderAsync(container, {
    width,
    height,
    format,
    quality: opts.quality,
  });
}
