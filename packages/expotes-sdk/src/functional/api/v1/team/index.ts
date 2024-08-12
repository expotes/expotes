/**
 * @packageDocumentation
 * @module api.functional.api.v1.team
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Format } from "typia/lib/tags/Format";

import type { OmitCreateTeamDtouserId } from "../../../../structures/OmitCreateTeamDtouserId";

/**
 * @controller TeamController.create
 * @path POST /api/v1/team/create
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function create(
  connection: IConnection,
  dto: create.Input,
): Promise<create.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...create.METADATA,
      template: create.METADATA.path,
      path: create.path(),
    },
    dto,
  );
}
export namespace create {
  export type Input = OmitCreateTeamDtouserId;
  export type Output = {
    id: string;
    handle: string;
    createdAt: null | (string & Format<"date-time">);
  };

  export const METADATA = {
    method: "POST",
    path: "/api/v1/team/create",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/api/v1/team/create";
}
