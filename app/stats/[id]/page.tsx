'use client'

import { PlotData, StatsProp } from 'types';
import { usePlantListContext, usePlotDataContext } from '@components/UIProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import ResourceStats from '@components/ui/resource_stats';
import LineChart from '@/components/ui/line_chart';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

interface EditTypeDropdownProps {
    type: string;
}

interface EditPlotInputProps {
    editField: keyof PlotData;
}

export default function PlotPage() {

    const [focusPlotStats, setFocusPlotStats] = useState<string>('pH');
    const [editMode, setEditMode] = useState<boolean>(false);
    const plots = usePlotDataContext();
    const plantList = usePlantListContext();
    const id = Number(useParams().id);

    const editedPlotData = useRef<PlotData | undefined>(undefined);
    editedPlotData.current = plots.state.data[id];

    const [plotData,setPlotData] = useState<PlotData | undefined>(undefined);
    const plotDataContext = usePlotDataContext();
    
    const handleEdit = () => {
        plots.dispatch({type: 'edit_plot', payload: {id: id, data: editedPlotData.current!}})
        setEditMode(!editMode);
    };

    const statuses: { [key: string]: string } = { Healthy: 'text-green-400 bg-green-400/10', Warning: 'text-rose-400 bg-rose-400/10' }

    function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
    }

    function EditTypeDropdown({type}: EditTypeDropdownProps) {
        return (
            <div className="py-auto flex flex-row items-center w-1/2 h-5">
                <select
                    id="plot_type"
                    name="plot_type"
                    className="bg-transparent pb-2 text-primary-dark block w-full rounded-md border-b pl-5 pr-10 text-primary-dark sm:text-sm sm:leading-6"
                    defaultValue={type}
                >
                    {plantList.plantList.map((plant: string) => (
                        <option
                            key={plant}
                            onClick={()=>(editedPlotData.current!.type = plant)}
                        >
                            {plant}
                        </option>)
                    )}

                    <option>Add Plant Type</option>
                </select>
            </div>
        );
    };

    function ChangeStatDropdown() {
        return (
            <div className="flex flex-row items-center my-auto">
                <label htmlFor="plot_type" className="block text-sm font-medium leading-6 text-primary-dark">
                    <div className='w-36 text-2xl font-semibold'>Plot Stats</div>
                </label>
                <select
                    id="plot_type"
                    name="plot_type"
                    defaultValue={focusPlotStats}
                    className="bg-transparent text-primary-dark pb-2 block w-full rounded-md border-b pl-5 pr-10 text-primary-dark sm:text-sm sm:leading-6"
                >
                    <option onClick={()=>setFocusPlotStats("pH")}>pH</option>
                    <option onClick={()=>setFocusPlotStats("Moisture")}>Moisture</option>
                    <option onClick={()=>setFocusPlotStats("Temperature")}>Temperature</option>
                    <option onClick={()=>setFocusPlotStats("Fertility")}>Fertility</option>
                </select>
            </div>
        );
    };

    function EditPlotInput({editField}: EditPlotInputProps) {
    
        const value = plotData![editField] as string;

        function handleChange(e: any) {
            switch (String(editField)) {
                case 'size':
                    editedPlotData.current!.size = Number(e);
                    break;
            }
        }
    
        return (
            <div className="py-auto flex pb-2 flex-row items-center rounded-md border-b w-1/2 h-5">
                <input
                    type="text"
                    name={editField as string}
                    id={editField as string}
                    className="text-left block bg-transparent text-primary-dark sm:text-sm sm:leading-6 pl-5"
                    defaultValue={value}
                    onChange={(e) => {handleChange(e.target.value);
                    }}
                />
            </div>
        );
    }

    const stats: StatsProp[] = [
        { name: 'Ph', value: String(plotData?.data.pH) },
        { name: 'Moisture', value: String(plotData?.data.moisture) },
        { name: 'Temperature', value: String(plotData?.data.temperature) },
        { name: 'Fertility', value: String(plotData?.data.fertility) },
    ];

    useEffect(() => {
        const plotData: PlotData = plotDataContext.state.data[Number(id)];
        if (plotData) {setPlotData(plotData);}
    }, [plotDataContext.state.data, id]);

    return (
        <div className="bg-primary-dark py-10 pl-[20%]">
            <ResourceStats stats={stats} />
            <div className="py-20">
                <table className="w-3/4 text-left border-b border-white/10 ">
                    <colgroup>
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                    </colgroup>
                    <tbody>
                        <tr className="border-b border-white/10 text-2xl leading-6 text-primary-dark">
                            <th className="py-5 pl-5 pr-8 sm:pl-6 lg:pl-8">Type</th>
                            <td className="py-5 text-sm leading-6 sm:pr-8 lg:pr-20">
                                {editMode ? (
                                    <EditTypeDropdown type={plotData?.type!} />
                                ) : (
                                    <span className="text-left mt-2 blocksm:text-sm sm:leading-6">
                                        {plotData?.type}
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr className="border-b border-white/10 text-2xl leading-6 text-primary-dark">
                            <th className="py-5 pl-5 pr-8 sm:pl-6 lg:pl-8">Size</th>
                            <td className="py-5 text-sm leading-6 sm:pr-8 lg:pr-20">
                            {editMode ? (
                                    <EditPlotInput editField='size'/>
                                ) : (
                                    <span>{plotData?.size} Square Feet</span>
                                )}
                            </td>
                        </tr>
                        <tr className="border-b border-white/10 text-2xl leading-6 text-primary-dark">
                            <th className="py-5 pl-5 pr-8 sm:pl-6 lg:pl-8">Days until harvest</th>
                            <td className="py-5 text-sm leading-6 sm:pr-8 lg:pr-20">
                                <span>10 days</span>
                            </td>
                        </tr>
                        <tr className="border-b border-white/10 text-2xl leading-6 text-white">
                            <th className="py-5 pl-5 pr-8 sm:pl-6 lg:pl-8">Status</th>
                            <td className="py-5 text-sm leading-6 sm:pr-8 lg:pr-20">
                                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                    <div className={classNames(statuses[plotData?.status!], 'flex-none rounded-full p-1')}>
                                        <div className="h-3 w-3 rounded-full bg-current" />
                                    </div>
                                    <span>{plotData?.status}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='pt-3 pl-8 flex flex-col items-start'>
                    <button
                        type="button"
                        className="mt-5 w-1/12 rounded-md bg-indigo-600 py-2 px-5 text-primary-dark shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleEdit}
                    >
                        {editMode ?
                            (
                                <div className='flex flex-row items-center'>
                                    <LockClosedIcon aria-hidden="true" className="h-5 w-5" />
                                    <span className="pl-5">Save</span>
                                </div>
                            )
                        :
                            (
                                <div className='flex flex-row items-center'>
                                    <LockOpenIcon aria-hidden="true" className="h-5 w-5" />
                                    <span className="pl-5">Edit</span>
                                </div>
                            )
                        }
                    </button>
                </div>
            </div>

            <div className='flex flex-col items-start m-8'>
                <div className='mb-10'>
                    <ChangeStatDropdown />
                </div>
                <LineChart statPlotData={focusPlotStats}/>
            </div>
        </div>
    );
};