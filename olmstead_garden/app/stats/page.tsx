'use client'

import PlotSummary from "@/components/ui/plot_summary";
import ResourceStats from "@/components/ui/resource_stats"
import { usePlotDataContext } from "@/components/UIProvider";
import { useState } from "react";

const statuses: { [key: string]: string } = { Healthy: 'text-green-400 bg-green-400/10', Warning: 'text-rose-400 bg-rose-400/10' }

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function StatsPage() {

  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);
  const { state } = usePlotDataContext();
  const plotData = state.data;

  return (
    <div className="bg-primary-dark py-10 h-full pl-[20%]">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8 pb-5">Latest Update: ~timestamp~</h2>
      <ResourceStats />
      {summaryOpen && (
        <PlotSummary />)}
      <table className="w-3/4 text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-4/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              Plot
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Status
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Duration
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Watered
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {plotData && plotData.map((item: any, index: number) => (
            <tr key={index}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div
                    className="truncate text-sm font-medium leading-6 text-white"
                    onClick={() => setSummaryOpen(true)}
                  >{item.name}</div>
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
                  <div className="truncate text-sm font-medium leading-6 text-white">{item.duration}</div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div className="truncate text-sm font-medium leading-6 text-white">{item.water_duration} ago</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}