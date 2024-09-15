"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlotDataContext } from "@components/UIProvider";
import { useEffect, useState } from "react";
import { PlotData } from "types";

// MARK: -PlotDrawer
export default function PlotDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}) {
  const params = useSearchParams();
  const plotDataContext = usePlotDataContext();
  const [plotData, setPlotData] = useState<PlotData | undefined>(undefined);
  const router = useRouter();

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

  const plantDate: Date = new Date(plotData?.planted_date!);

  useEffect(() => {
    // make sure not to set any dependencies in the useEffect hook
    const plotSummaryData: PlotData =
      plotDataContext.plotState.data[Number(params.get("id"))];
    if (plotSummaryData) {
      setPlotData(plotSummaryData);
    }
  }, [plotDataContext.plotState.data, params]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex slide-component-width">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-full transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="relative custom-text  focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="h-full overflow-y-auto p-8 custom-bg-plotdrawer">
                <div>
                  <h3 className="font-medium custom-text">Summary</h3>
                  <dl className="mt-2 divide-y divide-text">
                    <div className="flex justify-between py-3 text-sm font-medium">
                      <dt className="custom-text">Plant</dt>
                      <dd className="custom-text">{plotData?.type}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                      <dt className="custom-text">Variation</dt>
                      <dd className="custom-text">{plotData?.variety}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                      <dt className="custom-text">Status</dt>
                      <dd className="custom-text">{plotData?.status}</dd>
                    </div>
                    <div className="flex justify-between py-3 text-sm font-medium">
                      <dt className="custom-text">Date Created</dt>
                      <dd className="custom-text">{formatDate(plantDate)}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-start pt-5">
                    <button
                      type="button"
                      className=" custom-bg-button p-1 custom-text-button"
                      onClick={() => {
                        setIsOpen(false);
                        router.replace(`/stats/${plotData?.id}`);
                      }}
                    >
                      <div className="flex flex-row items-center gap-x-2 px-5">
                        <MagnifyingGlassCircleIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                        <span className="pr-3">Inspect Plot</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
