/**
 * @packageDocumentation
 * @module api.functional.api.v1.assets
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { NotFoundException } from "../../../../structures/NotFoundException";
import type { StreamableFile } from "../../../../structures/StreamableFile";

/**
 * @controller AssetsController.getAssets
 * @path GET /api/v1/assets/:assetId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getAssets(
  connection: IConnection,
  assetId: string,
): Promise<getAssets.Output> {
  return PlainFetcher.fetch(connection, {
    ...getAssets.METADATA,
    template: getAssets.METADATA.path,
    path: getAssets.path(assetId),
  });
}
export namespace getAssets {
  export type Output = NotFoundException | StreamableFile;

  export const METADATA = {
    method: "GET",
    path: "/api/v1/assets/:assetId",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (assetId: string) =>
    `/api/v1/assets/${encodeURIComponent(assetId ?? "null")}`;
}
