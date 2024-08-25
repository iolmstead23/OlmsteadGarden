'use client'

import PlotDrawer from "@components/ui/plot_drawer";
import ResourceStats from "@/components/ui/resource_stats"
import { usePlotDataContext, useSortIndex } from "@/components/UIProvider";
import { PlotData, StatsProp } from "types";
import { AdjustmentsHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const statuses: { [key: string]: string } = { Healthy: 'text-green-400 bg-green-400/10', Warning: 'text-rose-400 bg-rose-400/10' }

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

/** MARK: -StatsPage */
export default function StatsPage() {

  const plots = usePlotDataContext();
  const sortIndex = useSortIndex();
  const [focusSummaryToggle, setFocusSummaryToggle] = useState<boolean>(false);
  const [plotData, setPlotData] = useState<PlotData[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const router = useRouter();

  const totalPlots = useMemo<number>(()=>plotData.length, [plotData]);

  // MARK: -Stats List
  const stats: StatsProp[] = [
    { name: 'Total Plots', value: totalPlots },
    { name: 'Total Water', value: 50},
    { name: 'Total Daylight', value: 100 },
    { name: 'Total Fertilizer', value: 10 },
  ];

  useEffect(() => {
    setPlotData(plots.plotState.data);
  },[plots.plotState.data]);

  useEffect(() => {
    setHydrated(true);
  },[]);

  return hydrated ? (
    <div className="custom-bg-background py-20 pl-[10%] md:pl-[15%] lg:pl-[30%] min-h-screen">
      <h2 className=" text-text font-semibold leading-7 pb-5">Latest Update: ~timestamp~</h2>
      <div className="flex flex-col gap-y-20">
        
        <ResourceStats stats={stats} />
        
        {focusSummaryToggle && <PlotDrawer isOpen={focusSummaryToggle} setIsOpen={setFocusSummaryToggle} />}

        <div className="flex flex-col justify-start">
          <table className="w-3/4 text-left">
            <colgroup>
              <col className="lg:w-4/12" />
              <col className="lg:w-4/12" />
              <col className="lg:w-4/12" />
            </colgroup>
            <thead className="border-b border-white/10 text-2xl leading-6 text-text ">
              <tr>
                <th scope="col" className="pb-5 pr-8">Plot</th>
                <th scope="col" className="pb-5 pl-0 pr-4 text-right sm:pr-8 sm:text-left lg:pr-20">Status</th>
                <th scope="col" className="pb-5 pl-0 pr-4 text-right sm:pr-8 sm:text-left lg:pr-20">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {/** MARK: -Map Plots */}
              {plotData && plotData.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="flex py-2">
                    <div className="flex items-center">
                      <button
                        className="rounded-md min-w-40 bg-button p-1 text-text  shadow-sm hover:bg-button/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          setFocusSummaryToggle(true);
                          router.replace(`/stats?id=${item.id}`);
                        }}
                      >
                        <div className="flex pl-5 justify-left items-center gap-x-2">
                          <AdjustmentsHorizontalIcon aria-hidden="true" className="h-5 w-5" />
                          <span>{item.type}</span>
                        </div>
                      </button>
                    </div>
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center gap-x-2 justify-center lg:justify-start">
                      <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                        <div className="h-3 w-3 rounded-full bg-current" />
                      </div>
                      <div className="hidden text-text  sm:block">{item.status}</div>
                    </div>
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center gap-x-2 justify-start">
                      <div className="truncate text-sm font-medium leading-6 text-text ">{item.duration} weeks</div>
                    </div>
                  </td>
                </tr>
              ))}
              {/** MARK: -Add Plot Button */}
              <tr>
                <td>
                  <div className="flex justify-start py-2">
                    <button
                      type="button"
                      className="rounded-md min-w-40 bg-button p-1 text-text  shadow-sm hover:bg-button/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        plots.plotDispatch({
                          type: "add_plot",
                          payload: {
                            id: -1,
                            size: 0,
                            type: "Empty",
                            data: {
                              temperature: 0,
                              fertility: 0,
                              pH: 0,
                              moisture: 0,
                            },
                            status: "No Signal",
                            duration: 0,
                          },
                        });
                        sortIndex.setSortIndex(true); // Sort the index
                      }}
                    >
                      <div className="flex pl-5 justify-left items-center gap-x-2">
                        <PlusIcon aria-hidden="true" className="h-5 w-5" />
                        <span>Add Plot</span>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null;
}