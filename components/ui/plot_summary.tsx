'use client'

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { MagnifyingGlassCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation';
import { usePlotDataContext } from '../UIProvider';
import { useEffect, useState } from 'react';
import { PlotData } from 'types';

export default function PlotSummary({isOpen, setIsOpen}:{isOpen: boolean, setIsOpen: (e:boolean)=>void}) {

    const params = useSearchParams();
    const plotDataContext = usePlotDataContext();
    const [plotData,setPlotData] = useState<PlotData | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        // make sure not to set any dependencies in the useEffect hook
        const plotSummaryData: PlotData = plotDataContext.state.data[Number(params.get('id'))];
        if (plotSummaryData) {
            setPlotData(plotSummaryData);
        }
    },[plotDataContext.state.data, params]);

    return (
        <Dialog open={isOpen} onClose={()=>setIsOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                        transition
                        className="pointer-events-auto relative w-96 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <TransitionChild>
                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                            </div>
                            </TransitionChild>
                            <div className="h-full overflow-y-auto bg-white p-8">
                                <div>
                                    <h3 className="font-medium text-gray-900">Summary</h3>
                                    <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                        <div className="flex justify-between py-3 text-sm font-medium">
                                            <dt className="text-gray-500">Plant</dt>
                                            <dd className="text-gray-900">{plotData?.type}</dd>
                                        </div>
                                        <div className="flex justify-between py-3 text-sm font-medium">
                                            <dt className="text-gray-500">Status</dt>
                                            <dd className="text-gray-900">{plotData?.status}</dd>
                                        </div>
                                    </dl>
                                    <div className="flex justify-start pt-5">
                                        <button
                                            type="button"
                                            className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={() => {
                                                setIsOpen(false);
                                                router.replace(`/stats/${plotData?.id}`);
                                            }}
                                        >
                                            <div className="flex flex-row items-center gap-x-2 px-5">
                                                <MagnifyingGlassCircleIcon aria-hidden="true" className="h-5 w-5" /> 
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
    )
}
