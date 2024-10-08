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

import { PlotData, StatsProp } from "types";
import {
  useDebugLogContext,
  useFocusPlotContext,
  useNotifyContentContext,
  useNotifyToggleContext,
  usePlantListContext,
  usePlotDataContext,
} from "@components/UIProvider";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ResourceStats from "@components/ui/resource_stats";
import LineChart from "@components/ui/line_chart";
import PlantInfoCard from "@components/ui/plant_infocard";
import plants from "@json/plant_data_species.json";
import plantNotes from "@json/plant_data_notes.json";
import ModalWrapper from "@/components/ui/modal_wrapper";
import { Datepicker } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// MARK: - Type Declarations
interface EditTypeDropdownProps {
  type?: string;
  variety?: string;
}

interface EditPlotInputProps {
  editField: keyof PlotData;
}

//MARK: - PlotPage Function
// This page displays the details of a specific plot. It allows the user to edit the plot's details and view the plot's statistics.
export default function PlotPage() {
  const [focusPlotStats, setFocusPlotStats] = useState<string>("pH");
  const [render, setRender] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [plotData, setPlotData] = useState<PlotData | undefined>(undefined);
  const [harvestDate, setHarvestDate] = useState<string | undefined>(undefined);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const editedPlotData = useRef<PlotData | undefined>(undefined);

  const plots = usePlotDataContext();
  const plantList = usePlantListContext();
  const { setNotifyToggle } = useNotifyToggleContext();
  const { setNotifyContent } = useNotifyContentContext();
  const { setFocusPlot } = useFocusPlotContext();
  const { debugLogContent, setDebugLogContent } = useDebugLogContext();

  const id = Number(useParams().id);
  const plantNoteData = plantNotes.plantNotes;
  editedPlotData.current = plots.plotState.data[id];

  // Format using reusable function
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: Date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  }

  // MARK: - handleEdit Function
  const handleEdit = () => {
    plots.plotDispatch({
      type: "edit_plot",
      payload: { id: id, data: editedPlotData.current! },
    });
    if (editMode) {
      setNotifyContent({
        status: "success",
        notification: "Applied changes to " + editedPlotData.current?.type,
        timestamp: new Date(),
      });
      setNotifyToggle(true);
    }
    setDebugLogContent([
      {
        status: "action",
        message: `Edit mode ${editMode ? "disabled" : "enabled"}`,
      },
      ...debugLogContent,
    ]);
    setFocusPlot(editedPlotData.current!);
    setEditMode(!editMode);
  };

  // This object shows the status of the plot as a colored dot
  const statuses: { [key: string]: string } = {
    Healthy: "text-green-400 bg-green-400/10",
    Warning: "text-rose-400 bg-rose-400/10",
  };

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  function DatepickerModalWrapper() {
    return (
      modalIsOpen && (/*
 * Created on Fri Sep 20 2024
 *
 * Copyright (c) 2024 Your Company
 */

        <ModalWrapper isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
          <Datepicker
            maxDate={new Date()}
            weekStart={0}
            defaultDate={plantDate}
            inline
            onSelectedDateChanged={(date: Date) => {
              const plantedDate = new Date(date);
              const plantNote = plantNotes.plantNotes.find(
                (note) => note.name === plotData!.type
              );
              const harvestLength = plantNote?.metadata.harvest_length || 0;

              // Calculate the harvest date
              const harvestDate = new Date(plantedDate);
              harvestDate.setDate(plantedDate.getDate() + harvestLength * 7);

              setHarvestDate(harvestDate.toLocaleDateString());
              editedPlotData.current!.planted_date = date.toLocaleDateString();

              setModalIsOpen(false);
            }}
          />
        </ModalWrapper>
      )
    );
  }

  const EditTypeDropdown: React.FC<EditTypeDropdownProps> = ({ type }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedPlant = event.target.value;
      editedPlotData.current!.type = selectedPlant;
      editedPlotData.current!.variety = plants.plants.find(
        (plant) => plant.name === selectedPlant
      )?.variation[0].name!;
      // This needs to render the variety dropdown so its in sync with the type dropdown
      setRender(!render);
    };

    return (
      <div className="flex flex-row items-center">
        <select
          id="plot_type"
          name="plot_type"
          className="text-center w-40 py-1 block bg-form_field custom-text sm:text-sm sm:leading-6 pl-5"
          defaultValue={type}
          onChange={handleChange}
        >
          {plantList.plantList.map((plant: string, index: number) => (
            <option key={index} value={plant}>
              {plant}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const EditVarietyDropdown: React.FC<EditTypeDropdownProps> = ({
    variety,
  }) => {
    const [variations, setVariations] = useState<string[]>([]);
    const [selectedVariety, setSelectedVariety] = useState<string>(variety!);

    // This updates the variety dropdown when the type dropdown is changed
    useEffect(() => {
      const plantVariations = plants.plants.find(
        (plant) => plant.name === editedPlotData.current?.type
      );
      setVariations(
        plantVariations?.variation.map((variation) => variation.name) || []
      );
    }, [render]);

    // This sets the variety to the current selection if the plot is being edited
    useEffect(() => {
      setSelectedVariety(editedPlotData.current?.variety!);
    }, [variety]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedPlant = event.target.value;
      setSelectedVariety(selectedPlant);
      editedPlotData.current!.variety = selectedPlant;
    };

    return (
      <div className="flex flex-row items-center">
        <select
          id="plot_variety"
          name="plot_variety"
          className="text-center w-40 py-1 block bg-form_field custom-text sm:text-sm sm:leading-6 pl-5"
          value={selectedVariety}
          onChange={handleChange}
        >
          {variations?.map((variation: string, index: number) => (
            <option key={index} value={variation}>
              {variation}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // MARK: - ChangeStatDropdown Function
  function ChangeStatDropdown() {
    return (
      <div className="flex flex-row items-center">
        <label
          htmlFor="chart_type"
          className="block text-sm font-medium leading-6 custom-text"
        >
          <div className="w-36 text-2xl font-semibold">Plot Stats</div>
        </label>
        <select
          id="chart_type"
          name="chart_type"
          defaultValue={focusPlotStats}
          className="text-center block py-1 custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5"
        >
          <option
            onClick={() => {
              setFocusPlotStats("pH");
            }}
            id="ph"
          >
            pH
          </option>
          <option
            onClick={() => {
              setFocusPlotStats("Moisture");
            }}
            id="moisture"
          >
            Moisture
          </option>
          <option
            onClick={() => {
              setFocusPlotStats("Temperature");
            }}
            id="temperature"
          >
            Temperature
          </option>
          <option
            onClick={() => {
              setFocusPlotStats("Fertility");
            }}
            id="fertility"
          >
            Fertility
          </option>
        </select>
      </div>
    );
  }

  // MARK: - EditPlotInput Function
  function EditPlotInput({ editField }: EditPlotInputProps) {
    // This gets the current value of the field being edited
    const value = plotData![editField] as string;

    function handleChange(e: any) {
      // This sets the value of the field being edited
      switch (String(editField)) {
        case "size":
          editedPlotData.current!.size = Number(e);
          break;
      }
    }

    return (
      <div className="flex flex-row items-center">
        <input
          type="text"
          name={editField as string}
          id={editField as string}
          className="text-center block custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5 w-40"
          defaultValue={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </div>
    );
  }

  const stats: StatsProp[] = [
    { name: "Ph", value: String(plotData?.data.pH) },
    { name: "Moisture", value: String(plotData?.data.moisture) },
    { name: "Temperature", value: String(plotData?.data.temperature) },
    { name: "Fertility", value: String(plotData?.data.fertility) },
  ];

  // MARK: - Update Plot Data
  useEffect(() => {
    const plotData: PlotData = plots.plotState.data[Number(id)];
    plotData ? setPlotData(plotData) : null;
  }, [plots.plotState.data, id]);

  useEffect(() => {
    editMode &&
      setDebugLogContent([
        { status: "update", message: "Plot data updated" },
        ...debugLogContent,
      ]);
  }, [editMode]);

  useEffect(() => {
    if (plotData?.planted_date && plotData?.type) {
      const plantedDate = new Date(plotData.planted_date);
      const plantNote = plantNoteData.find(
        (note) => note.name === plotData.type
      );
      const harvestLength = plantNote?.metadata.harvest_length || 0;

      // Calculate the harvest date
      const harvestDate = new Date(plantedDate);
      harvestDate.setDate(plantedDate.getDate() + harvestLength * 7);

      setHarvestDate(formatDate(harvestDate));
    }
  }, [plotData?.type, plotData?.planted_date]);

  const plantDate: Date = new Date(plotData?.planted_date!);

  // TODO: - Add a way to check if the harvest date is past end of season

  return (
    <>
      <Suspense fallback={<Skeleton count={10} />}>
        {modalIsOpen && <DatepickerModalWrapper />}
        <div className="flex flex-col gap-y-20 custom-bg-background min-h-screen h-full">
          <div className="w-4/5 xl:w-full">
            <ResourceStats stats={stats} />
          </div>
          <div className="flex flex-row text-left w-full">
            <div className="w-4/5 xl:w-[40%]">
              <table cellPadding={0} cellSpacing={0}>
                <colgroup>
                  <col className="w-full" />
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <tbody>
                  <tr className="text-2xl leading-6 custom-text">
                    <th className="py-5 pr-8">Type</th>
                    <td className="text-sm font-extrabold leading-6 lg:pr-20">
                      <div className="flex flex-row w-40 justify-end">
                        {editMode ? (
                          <div className="flex flex-col">
                            <EditTypeDropdown type={plotData?.type!} />
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span>{plotData?.type}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr className="text-2xl leading-6 custom-text">
                    <th className="py-5 pr-8">Variety</th>
                    <td className="text-sm font-extrabold leading-6 lg:pr-20">
                      <div className="flex flex-row w-40 justify-end">
                        {editMode ? (
                          <div className="flex flex-col">
                            <EditVarietyDropdown variety={plotData?.variety!} />
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span>{plotData?.variety}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr className="text-2xl leading-6 custom-text">
                    <th className="py-5 pr-8">Size</th>
                    <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                      <div className="flex flex-row w-40 justify-end">
                        {editMode ? (
                          <div className="flex flex-col">
                            <EditPlotInput editField="size" />
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span>{plotData?.size} Sqr. Feet</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr className="text-2xl leading-6 custom-text">
                    <th className="py-5 pr-8">Date Planted</th>
                    <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                      {editMode ? (
                        <button
                          type="button"
                          className="custom-bg-button custom-text-button py-2 px-4"
                          onClick={() => setModalIsOpen(true)}
                        >
                          <span>{formatDate(plantDate)}</span>
                        </button>
                      ) : (
                        <div className="flex flex-row w-40 justify-end">
                          <span>{formatDate(plantDate)}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr className="text-2xl leading-6 custom-text">
                    <th className="py-5 pr-8">Harvest Date</th>
                    <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                      <div className="flex flex-row w-40 justify-end">
                        <span>{String(harvestDate)}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-2xl leading-6 custom-text">
                    <th className="py-5 pr-8">Status</th>
                    <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                      <div className="flex items-center w-40 gap-x-2 justify-end">
                        <span>{plotData?.status}</span>
                        <div
                          className={classNames(
                            statuses[plotData?.status!],
                            "flex-none rounded-full p-1"
                          )}
                        >
                          <div className="h-3 w-3 rounded-full bg-current" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="hidden xl:block">
              <div className="flex flex-col items-start">
                <PlantInfoCard />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <button
              type="button"
              className="custom-bg-button custom-text-button mb-6 min-w-20 py-2"
              onClick={handleEdit}
            >
              {editMode ? <span>Save</span> : <span>Edit</span>}
            </button>
          </div>

          {/** MARK: ChangeStateDropdown*/}
          <div className="flex flex-col items-start w-full">
            <div className="mb-10">
              <ChangeStatDropdown />
            </div>
            <LineChart statPlotData={focusPlotStats} />
          </div>
        </div>
      </Suspense>
    </>
  );
}
