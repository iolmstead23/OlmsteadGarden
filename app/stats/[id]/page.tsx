'use client'

import { PlotData, StatsProp } from 'types';
import { usePlantListContext, usePlotDataContext } from '@components/UIProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import ResourceStats from '@components/ui/resource_stats';
import LineChart from '@/components/ui/line_chart';

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
    editedPlotData.current = plots.plotState.data[id];

    const [plotData,setPlotData] = useState<PlotData | undefined>(undefined);
    
    // MARK: - handleEdit Function
    const handleEdit = () => {
        plots.plotDispatch({type: 'edit_plot', payload: {id: id, data: editedPlotData.current!}});
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
        };
    
        return (
            <div className="py-auto flex flex-row items-center w-1/2">
                <select
                    id="plot_type"
                    name="plot_type"
                    className="text-left py-1 block bg-form_field text-text drop-shadow-lg sm:text-sm sm:leading-6 pl-5"
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
                <label htmlFor="plot_type" className="block text-sm font-medium leading-6 text-text drop-shadow-lg">
                    <div className='w-36 text-2xl font-semibold'>Plot Stats</div>
                </label>
                <select
                    id="plot_type"
                    name="plot_type"
                    defaultValue={focusPlotStats}
                    className="text-left block py-1 bg-form_field text-text drop-shadow-lg sm:text-sm sm:leading-6 pl-5"
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
                    break;
            }
        }
    
        return (
            <div className="flex flex-row items-center">
                <input
                    type="text"
                    name={editField as string}
                    id={editField as string}
                    className="text-left block bg-form_field text-text drop-shadow-lg sm:text-sm sm:leading-6 pl-5"
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
        const plotData: PlotData = plots.plotState.data[Number(id)];
        if (plotData) {setPlotData(plotData);}
    }, [plots.plotState.data, id]);

    return (
        <div className="flex flex-col gap-y-20 bg-background py-20 pl-[10%] md:pl-[15%] lg:pl-[30%] min-h-screen">
            <ResourceStats stats={stats} />
            <table className="relative text-left">
                <colgroup>
                    <col className="w-[20%]" />
                    <col className="w-[20%]" />
                    <col className="w-[20%]" />
                </colgroup>
                <tbody>
                    <tr className="text-2xl leading-6 text-text drop-shadow-lg">
                        <th className="py-5 pr-8">Type</th>
                        <td className="text-sm leading-6 sm:pr-8 lg:pr-20">
                            {editMode ? (
                                <EditTypeDropdown type={plotData?.type!} />
                            ) : (
                                <span>{plotData?.type}</span>
                            )}
                        </td>
                    </tr>
                    <tr className="text-2xl leading-6 text-text drop-shadow-lg">
                        <th className="py-5 pr-8">Size</th>
                        <td className="text-sm leading-6 sm:pr-8 lg:pr-20">
                            {editMode ? (
                                <EditPlotInput editField='size'/>
                            ) : (
                                <span>{plotData?.size} Square Feet</span>
                            )}
                        </td>
                    </tr>
                    <tr className="text-2xl leading-6 text-text drop-shadow-lg">
                        <th className="py-5 pr-8">Days until harvest</th>
                        <td className="ext-sm leading-6 sm:pr-8 lg:pr-20">
                            <span>10 days</span>
                        </td>
                    </tr>
                    <tr className="text-2xl leading-6 text-text drop-shadow-lg">
                        <th className="py-5 pr-8">Status</th>
                        <td className="text-sm leading-6 sm:pr-8 lg:pr-20">
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

            <div className='flex flex-col items-start'>
                <button
                    type="button"
                    className="mt-5 p-5 w-1/3 md:w-28 rounded-md bg-button py-2 lg:px-5 text-text drop-shadow-lg shadow-sm hover:bg-button/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
            {/** MARK: ChangeStateDropdown*/}
            <div className='flex flex-col items-start w-full'>
                <div className='mb-10'>
                    <ChangeStatDropdown />
                </div>
                <LineChart statPlotData={focusPlotStats}/>
            </div>
        </div>
    );
};