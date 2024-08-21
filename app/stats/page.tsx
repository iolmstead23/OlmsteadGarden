'use client'

import PlotDrawer from "@components/ui/plot_drawer";
import ResourceStats from "@/components/ui/resource_stats"
import { usePlotDataContext, useSortIndex } from "@/components/UIProvider";
import { PlotData, StatsProp } from "types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const statuses: { [key: string]: string } = { Healthy: 'text-green-400 bg-green-400/10', Warning: 'text-rose-400 bg-rose-400/10' }

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

/** MARK: -StatsPage */
export default function StatsPage() {

  const plots = usePlotDataContext();
  const index = useSortIndex();
  const [focusSummaryToggle, setFocusSummaryToggle] = useState<boolean>(false);
  const plotData: PlotData[] = plots.state.data;
  const router = useRouter();

  const plotSummary = () => {
    return ( 
      <Suspense>
        <PlotDrawer isOpen={focusSummaryToggle} setIsOpen={setFocusSummaryToggle} />
      </Suspense>
    );
  }

  const totalPlots = useMemo<number>(()=>plots.state.data.length, [plots.state.data]);

  // MARK: -Stats List
  const stats: StatsProp[] = [
    { name: 'Total Plots', value: totalPlots },
    { name: 'Total Water', value: 50},
    { name: 'Total Daylight', value: 100 },
    { name: 'Total Fertalizer', value: 10 },
  ];

  return (
    <div className="bg-primary-dark py-10 pl-10 lg:pl-[30%] min-h-screen ">
      
      <h2 className="text-base font-semibold leading-7 text-primary-dark lg:px-8 pl-5 pb-5">Latest Update: ~timestamp~</h2>
      
      <ResourceStats stats={stats} />
      
      {focusSummaryToggle && plotSummary()}

      <table className="w-3/4 text-left">
        <colgroup>
          <col className="lg:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-4/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-2xl leading-6 text-white">
          <tr>
            <th scope="col" className="pb-5 pl-4 pr-8 sm:pl-6 lg:pl-8">Plot</th>
            <th scope="col" className="pb-5 pl-0 pr-4 text-right sm:pr-8 sm:text-left lg:pr-20">Status</th>
            <th scope="col" className="pb-5 pl-0 pr-4 text-right sm:pr-8 sm:text-left lg:pr-20">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {/** MARK: -Map Plots */}
          {plotData && plotData.map((item: any, index: number) => (
            <tr key={index}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div
                    className="truncate text-sm font-medium leading-6 text-primary-dark"
                    onClick={() => {
                      setFocusSummaryToggle(true);
                      router.replace(`/stats?id=${item.id}`);
                    }}
                  >
                    <div className="flex flex-row items-center gap-x-2 py-auto">
                      <span className="hover:text-purple-500 hover:font-extrabold">{item.type}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                    <div className="h-3 w-3 rounded-full bg-current" />
                  </div>
                  <div className="hidden text-white sm:block">{item.status}</div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div className="truncate text-sm font-medium leading-6 text-white">{item.duration} weeks</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/** MARK: -Add Plot Button */}
      <div className="flex justify-start pt-5 pl-5">
        <button
          type="button"
          className="rounded-md bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            plots.dispatch({
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
            index.setSortIndex(true); // Sort the index
          }}
        >
          <div className="flex flex-row items-center gap-x-2 px-2 ">
            <PlusIcon aria-hidden="true" className="h-5 w-5" /> 
            <span className="pr-3">Add Plot</span>
          </div>
        </button>
      </div>
    </div>
  )
}