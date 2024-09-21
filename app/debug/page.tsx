/*
 * Created on Fri Sep 20 2024
 * Author: Ian Olmstead
 *
 * License: GNU Affero General Public License (AGPL-3.0)
 *
 *For details, see https://www.gnu.org/licenses/agpl-3.0-standalone.html
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU Affero General Public License as published
 *by the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 */

"use client";

import { useDebugLogContext } from "@components/UIProvider";
import { DebugLog } from "@/types";

export default function DebugPage() {
  const { debugLogContent } = useDebugLogContext();

  return (
    <div className="custom-bg-background w-full min-h-screen">
      <div className="flow-root">
        {
          <ul role="list" className="-mb-8">
            {debugLogContent.length > 0 ? (
              <>
                {debugLogContent.map(
                  (debugLog: DebugLog, index: number) =>
                    index < 10 && (
                      <li key={`debug_${String(index)}`}>
                        <div className="pb-8">
                          <div className="relative flex flex-row gap-x-5 xl:gap-x-16 justify-between mr-10 xl:mr-20 items-center">
                            <div className="w-full flex flex-row items-center gap-x-5">
                              <span>{debugLog.status}</span>
                              <span>{debugLog.message}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                )}

                {debugLogContent.length > 10 && (
                  <div className="text-center font-extrabold">
                    To view more debug logs, please download your logs file.
                  </div>
                )}
              </>
            ) : (
              <li>
                <div className="pb-8">
                  <div className="relative flex flex-row gap-x-5 xl:gap-x-16 justify-between mr-10 xl:mr-20 items-center">
                    <span>No debug logs to display</span>
                  </div>
                </div>
              </li>
            )}
          </ul>
        }
      </div>
    </div>
  );
}
