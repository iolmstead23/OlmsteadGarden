'use client'

import { PlotData, StatsProp } from 'types';
import { usePlantListContext, usePlotDataContext } from '@components/UIProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import ResourceStats from '@components/ui/resource_stats';
import LineChart from '@/components/ui/line_chart';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

// MARK: - Type Declarations
interface EditTypeDropdownProps {
    type: string;
}

interface EditPlotInputProps {
    editField: keyof PlotData;
}

//MARK: - PlotPage Function
// This page displays the details of a specific plot. It allows the user to edit the plot's details and view the plot's statistics.
export default function PlotPage() {

    const [focusPlotStats, setFocusPlotStats] = useState<string>('pH');
    const [editMode, setEditMode] = useState<boolean>(false);
    const plots = usePlotDataContext();
    const plantList = usePlantListContext();
    const id = Number(useParams().id);

    const editedPlotData = useRef<PlotData | undefined>(undefined);
    editedPlotData.current = plots.state.data[id];

    const [plotData,setPlotData] = useState<PlotData | undefined>(undefined);
    
    // MARK: - handleEdit Function
    const handleEdit = () => {
        plots.dispatch({type: 'edit_plot', payload: {id: id, data: editedPlotData.current!}});
        setEditMode(!editMode);
    };

    const statuses: { [key: string]: string } = { Healthy: 'text-green-400 bg-green-400/10', Warning: 'text-rose-400 bg-rose-400/10' }

    function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
    }

    const EditTypeDropdown: React.FC<EditTypeDropdownProps> = ({ type }) => {
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedPlant = event.target.value;
            editedPlotData.current!.type = selectedPlant;
            console.log(editedPlotData.current?.type);
        };
    
        return (
            <div className="py-auto flex flex-row items-center w-1/2">
                <select
                    id="plot_type"
                    name="plot_type"
                    className="text-left py-1 block form-field-bg-primary-dark text-primary-dark sm:text-sm sm:leading-6 pl-5"
                    defaultValue={type}
                    onChange={handleChange}
                >
                    {plantList.plantList.map((plant: string, index: number) => (
                        <option key={index} value={plant}>
                            {plant}
                        </option>
                    ))}
                    <option value="Add Plant Type">Add Plant Type</option>
                </select>
            </div>
        );
    };

    // MARK: - ChangeStatDropdown Function
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
                    className="text-left block py-1 form-field-bg-primary-dark text-primary-dark sm:text-sm sm:leading-6 pl-5"
                >
                    <option onClick={()=>setFocusPlotStats("pH")}>pH</option>
                    <option onClick={()=>setFocusPlotStats("Moisture")}>Moisture</option>
                    <option onClick={()=>setFocusPlotStats("Temperature")}>Temperature</option>
                    <option onClick={()=>setFocusPlotStats("Fertility")}>Fertility</option>
                </select>
            </div>
        );
    };

        // MARK: - EditPlotInput Function
    function EditPlotInput({editField}: EditPlotInputProps) {
    
        const value = plotData![editField] as string;

        function handleChange(e: any) {
            switch (String(editField)) {
                case 'size':
                    editedPlotData.current!.size = Number(e);
                    console.log(editedPlotData.current);
                    break;
            }
        }
    
        return (
            <div className="flex flex-row items-center">
                <input
                    type="text"
                    name={editField as string}
                    id={editField as string}
                    className="text-left block form-field-bg-primary-dark text-primary-dark sm:text-sm sm:leading-6 pl-5"
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

    // MARK: - Update Plot Data
    useEffect(() => {
        const plotData: PlotData = plots.state.data[Number(id)];
        if (plotData) {setPlotData(plotData);}
    }, [plots.state.data, id]);

    return (
        <div className="bg-primary-dark py-10 pl-[10%] md:pl-[15%] lg:pl-[30%] min-h-screen overflow-y-auto">
            <ResourceStats stats={stats} />
            <div className="py-20">
                <table className="relative text-left border-b border-white/10">
                    <colgroup>
                        <col className="w-[20%]" />
                        <col className="w-[20%]" />
                        <col className="w-[20%]" />
                    </colgroup>
                    <tbody>
                        <tr className="border-b border-white/10 text-2xl leading-6 text-primary-dark">
                            <th className="py-5 pl-5 pr-8 sm:pl-6 lg:pl-8">Type</th>
                            <td className="py-5 text-sm leading-6 sm:pr-8 lg:pr-20">
                                {editMode ? (
                                    <EditTypeDropdown type={plotData?.type!} />
                                ) : (
                                    <span>{plotData?.type}</span>
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
                                <div className="flex items-center gap-x-2 justify-start">
                                    <div className={classNames(statuses[plotData?.status!], 'flex-none rounded-full p-1')}>
                                        <div className="h-3 w-3 rounded-full bg-current" />
                                    </div>
                                    <span>{plotData?.status}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='pt-3 pl-5 flex flex-col items-start'>
                    <button
                        type="button"
                        className="mt-5 p-5 w-1/3 md:w-28 rounded-md bg-indigo-600 py-2 lg:px-5 text-primary-dark shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleEdit}
                    >
                        {editMode ?
                            (
                                <div className='flex flex-row items-center'>
                                    <span className="pl-5">Save</span>
                                </div>
                            )
                        :
                            (
                                <div className='flex flex-row items-center'>
                                    <span className="pl-5">Edit</span>
                                </div>
                            )
                        }
                    </button>
                </div>
            </div>
            {/** MARK: ChangeStateDropdown*/}
            <div className='flex flex-col items-start w-full pl-5'>
                <div className='mb-10'>
                    <ChangeStatDropdown />
                </div>
                <LineChart statPlotData={focusPlotStats}/>
            </div>
        </div>
    );
};