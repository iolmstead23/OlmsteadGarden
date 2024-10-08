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

import { PlantNote } from "types";
import plants from "@json/plant_data_notes.json";
import { useFocusPlotContext } from "@components/UIProvider";
import { useEffect, useState } from "react";

export default function PlantInfoCard() {
  const plantFocus = useFocusPlotContext().focusPlot;
  const [focusPlantData, setFocusPlantData] = useState<PlantNote | undefined>(
    undefined
  );
  const [focusInfo, setFocusInfo] = useState<string>("Description");
  const plantsData: PlantNote[] = plants.plantNotes;

  useEffect(() => {
    if (plantFocus) {
      const plantData: PlantNote = plantsData.find(
        (plant: PlantNote) => plant.name === plantFocus.type
      )!;
      setFocusPlantData(plantData);
    } else {
      setFocusPlantData(undefined);
    }
  }, [plantFocus.type]);

  return (
    <div className="shadow-lg p-8 custom-text absolute custom-bg-plotdrawer w-[32%] h-[40vh] min-h-[310px]">
      <div>
        {focusPlantData ? (
          <>
            {focusInfo === "Description" ? (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {focusPlantData?.name}
                </h2>
                <p className="text-gray-600">{focusPlantData?.description}</p>
              </div>
            ) : null}

            {focusInfo === "Data" ? (
              <div className="flex flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data</h3>
                  <div className="flex flex-col gap-y-2 w-44">
                    <div className="flex flex-row items-center justify-between">
                      <span>pH: </span>
                      <span>{focusPlantData?.data.optimal_ph}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Sunlight: </span>
                      <span>{focusPlantData?.data.sunlight}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Moisture: </span>
                      <span>{focusPlantData?.data.moisture}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Temp: </span>
                      <span>{focusPlantData?.data.temperature}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Soil: </span>
                      <span>{focusPlantData?.data.soil_type}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Metadata</h3>
                  <div className="flex flex-col gap-y-2 w-60">
                    <div className="flex flex-row items-center justify-between">
                      <span>Species: </span>
                      <span>{focusPlantData?.metadata.species}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Genus: </span>
                      <span>{focusPlantData?.metadata.genus}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Average Height: </span>
                      <span>{focusPlantData?.metadata.average_height}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <span>Location: </span>
                      <span>{focusPlantData?.metadata.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div>Please Select Plot Type</div>
        )}
      </div>
      <button
        className="p-2 custom-bg-button custom-text-button absolute bottom-0 mb-6 min-w-20"
        onClick={() =>
          setFocusInfo(focusInfo === "Description" ? "Data" : "Description")
        }
      >
        Next
      </button>
    </div>
  );
}
