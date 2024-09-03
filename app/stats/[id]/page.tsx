'use client'

import { PlotData, StatsProp } from 'types';
import { useFocusPlotContext, useNotifyContentContext, useNotifyToggleContext, usePlantListContext, usePlotDataContext } from '@components/UIProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import ResourceStats from '@components/ui/resource_stats';
import LineChart from '@components/ui/line_chart';
import PlantInfoCard from '@components/ui/plant_infocard';
import plants from "json/plant_data_species.json";

// MARK: - Type Declarations
interface EditTypeDropdownProps {
    type?: string;
    subtype?: string;
}

interface EditPlotInputProps {
    editField: keyof PlotData;
}

//MARK: - PlotPage Function
// This page displays the details of a specific plot. It allows the user to edit the plot's details and view the plot's statistics.
export default function PlotPage() {

    const [focusPlotStats, setFocusPlotStats] = useState<string>('pH');
    const [render, setRender] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const plots = usePlotDataContext();
    const plantList = usePlantListContext();
    const id = Number(useParams().id);

    const editedPlotData = useRef<PlotData | undefined>(undefined);
    editedPlotData.current = plots.plotState.data[id];

    const [plotData,setPlotData] = useState<PlotData | undefined>(undefined);
    const { setNotifyToggle } = useNotifyToggleContext();
    const { setNotifyContent } = useNotifyContentContext();
    const { setFocusPlot } = useFocusPlotContext();
    
    // MARK: - handleEdit Function
    const handleEdit = () => {
        plots.plotDispatch({type: 'edit_plot', payload: {id: id, data: editedPlotData.current!}});
        editMode && setNotifyContent(['success', 'Plot data has been updated']);
        editMode && setNotifyToggle(true);
        setFocusPlot(editedPlotData.current!);
        setEditMode(!editMode);
    };

    // This object shows the status of the plot as a colored dot
    const statuses: { [key: string]: string } = { Healthy: 'text-green-400 bg-green-400/10', Warning: 'text-rose-400 bg-rose-400/10' };

    function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
    }

    const EditTypeDropdown: React.FC<EditTypeDropdownProps> = ({ type }) => {
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedPlant = event.target.value;
            editedPlotData.current!.type = selectedPlant;
            editedPlotData.current!.subtype = plants.plants.find((plant) => plant.name === selectedPlant)?.variation[0].name!;
            setRender(!render);
        };
    
        return (
            <div className="py-auto flex flex-row items-center">
                <select
                    id="plot_type"
                    name="plot_type"
                    className="text-left w-[60%] xl:w-fit py-1 block bg-form_field custom-text sm:text-sm sm:leading-6 pl-5"
                    defaultValue={type}
                    onChange={handleChange}
                >
                    {plantList.plantList.map((plant: string, index: number) => (
                        <option key={index} value={plant}>
                            {plant}
                        </option>
                    ))}
                    <option value="Add Plant Type">Add Plant Type*</option>
                </select>
            </div>
        );
    };
    
    const EditSubtypeDropdown: React.FC<EditTypeDropdownProps> = ({subtype}) => {
        const [variations, setVariations] = useState<string[]>([]);
        const [selectedSubtype, setSelectedSubtype] = useState<string>(subtype!);
    
        useEffect(() => {
            const plantVariations = plants.plants.find((plant) => plant.name === editedPlotData.current?.type);
            setVariations(plantVariations?.variation.map((variation) => variation.name) || []);
        }, [editedPlotData.current?.type]);
    
        useEffect(() => {
            setSelectedSubtype(editedPlotData.current?.subtype!);
        }, [subtype]);
    
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedPlant = event.target.value;
            setSelectedSubtype(selectedPlant);
            editedPlotData.current!.subtype = selectedPlant;
        };
    
        return (
            <div className="py-auto flex flex-row items-center">
            <select
                id="plot_subtype"
                name="plot_subtype"
                className="text-left w-[60%] xl:w-fit py-1 block bg-form_field custom-text sm:text-sm sm:leading-6 pl-5"
                value={selectedSubtype}
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
            <div className="flex flex-row items-center my-auto">
                <label htmlFor="chart_type" className="block text-sm font-medium leading-6 custom-text">
                    <div className='w-36 text-2xl font-semibold'>Plot Stats</div>
                </label>
                <select
                    id="chart_type"
                    name="chart_type"
                    defaultValue={focusPlotStats}
                    className="text-left block py-1 custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5"
                >
                    <option onClick={()=>setFocusPlotStats("pH")} id='ph'>pH</option>
                    <option onClick={()=>setFocusPlotStats("Moisture")} id="moisture">Moisture</option>
                    <option onClick={()=>setFocusPlotStats("Temperature")} id="temperature">Temperature</option>
                    <option onClick={()=>setFocusPlotStats("Fertility")} id="fertility">Fertility</option>
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
                    className="text-left block custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5 w-[50%]"
                    defaultValue={value}
                    onChange={(e) => {handleChange(e.target.value)}}
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
        <div className="flex flex-col gap-y-20 custom-bg-background min-h-screen h-full">
            <ResourceStats stats={stats} />
            <div className='flex flex-row text-left w-full'>
                <div className="w-full xl:w-[55%]">
                    <table cellPadding={0} cellSpacing={0}>
                        <colgroup>
                            <col className="w-1/2 xl:w-[55%]" />
                            <col className="w-1/2" />
                            <col className="w-1/2" />
                        </colgroup>
                        <tbody>
                            <tr className="text-2xl leading-6 custom-text">
                                <th className="py-5 pr-8">Type</th>
                                <td className="text-sm font-extrabold leading-6 lg:pr-20">
                                    {editMode ? (
                                        <div className='flex flex-col'>
                                            <EditTypeDropdown type={plotData?.type!} />
                                        </div>
                                    ) : (
                                        <div className='flex flex-col'>
                                            <span>{plotData?.type}</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr className="text-2xl leading-6 custom-text">
                                <th className="py-5 pr-8">Subype</th>
                                <td className="text-sm font-extrabold leading-6 lg:pr-20">
                                    {editMode ? (
                                        <div className='flex flex-col'>
                                            <EditSubtypeDropdown subtype={plotData?.subtype!} />
                                        </div>
                                    ) : (
                                        <div className='flex flex-col'>
                                            <span>{plotData?.subtype}</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr className="text-2xl leading-6 custom-text">
                                <th className="py-5 pr-8">Size</th>
                                <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                                    {editMode ? (
                                        <EditPlotInput editField='size'/>
                                    ) : (
                                        <span>{plotData?.size} Sqr. Feet</span>
                                    )}
                                </td>
                            </tr>
                            <tr className="text-2xl leading-6 custom-text">
                                <th className="py-5 pr-8">Date Planted</th>
                                <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                                    <span>{String(plotData?.planted_date)}</span>
                                </td>
                            </tr>
                            <tr className="text-2xl leading-6 custom-text">
                                <th className="py-5 pr-8">Status</th>
                                <td className="text-sm font-extrabold leading-6 sm:pr-8 lg:pr-20 w-full">
                                    <div className="flex items-center gap-x-2 justify-start">
                                        <span>{plotData?.status}</span>
                                        <div className={classNames(statuses[plotData?.status!], 'flex-none rounded-full p-1')}>
                                            <div className="h-3 w-3 rounded-full bg-current" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="hidden xl:block -ml-[15%]">
                    <div className='flex flex-col items-start'>
                        <PlantInfoCard />
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-start'>
                <button
                    type="button"
                    className="custom-bg-button custom-text-button rounded-md mb-6 min-w-20 py-2"
                    onClick={handleEdit}
                >
                    {editMode ?
                        ( <span>Save</span> )
                    :
                        ( <span>Edit</span> )
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