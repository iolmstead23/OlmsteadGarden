'use client'

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { PlotData, SettingsData } from "types"; // Use the path alias
import Dashboard from "./ui/dashboard";
import { Inter } from "next/font/google";

// MARK: -Type Declarations
interface PlotState {
    data: Array<PlotData>;
};

interface EditPlotData {
    id: number;
    data: PlotData;
};

interface PlotAction {
    type: 'get_plots' | 'add_plot' | 'edit_plot' | 'sort_index';
    payload?: PlotState | PlotData | EditPlotData;
};

interface PlotDataState {
    plotState: PlotState;
    plotDispatch: React.Dispatch<PlotAction>;
}
interface SettingsDataState {
    settingsState: SettingsData;
    setSettingState: React.Dispatch<React.SetStateAction<SettingsData>>;
}

interface FocusPlot {
    focusPlot: PlotData;
    setFocusPlot: React.Dispatch<React.SetStateAction<PlotData>>;
    id?: number;
}

interface SortIndex {
    sortIndex: boolean;
    setSortIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PlantList {
    plantList: string[];
    setPlantList: React.Dispatch<React.SetStateAction<string[]>>;
}

// MARK: -Contexts
// Context for plot data
const PlotDataContext = createContext<PlotDataState | undefined>(undefined);

// Context for Settings data
const SettingsDataContext = createContext<SettingsDataState | undefined>(undefined);

// Context for focused plot
const FocusPlotContext = createContext<FocusPlot | undefined>(undefined);

// Context for sorting index
const SortIndexContext = createContext<SortIndex | undefined>(undefined);

// List of plants
const PlantListContext = createContext<PlantList | undefined>(undefined);

// MARK: -Dummy data
const dummyPlotData: PlotState = {
    data: [
        {
            id: -1,
            type: 'Carrot',
            size: 100,
            data: {
                pH: 7,
                moisture: 50,
                temperature: 70,
                fertility: 5,
            },
            status: 'Healthy',
            duration: 2,
        },
        {
            id: -1,
            type: 'Cucumber',
            size: 50,
            data: {
                pH: 6,
                moisture: 40,
                temperature: 75,
                fertility: 6,
            },
            status: 'Warning',
            duration: 1,
        },
    ]
}

const inter = Inter({ subsets: ["latin"] });

// MARK: -Plot Data Reducer
function plotReducer(state: PlotState, action: PlotAction): PlotState {

    /** Fetch the initial plots */
    function get_plots(action: PlotAction): PlotState {
        return { data: action.payload?.data as PlotData[] };
    }

    //** Add a plot to the state **/
    function add_plot(state: PlotState, action: PlotAction): PlotState {
        if (Array.isArray(action.payload)) {
            throw new Error("Payload should be of type PlotData, not PlotData[]");
        }
        return { data: state.data.concat(action.payload! as PlotData) };
    }

    /** Sort the index of the plots */
    function sort_index(state: PlotState): PlotState {
        return { data: state.data.map((item, index) => ({...item, id: index}))}; // Sort by index
    }

    /** Edit a plot in the state */
    function edit_plot(state: PlotState, action: PlotAction): PlotState {

        const editedPlot = action.payload as EditPlotData;
        
        if (Array.isArray(action.payload)) {
            throw new Error("Payload should be of type PlotData, not PlotData[]");
        }
        return { data: state.data.map((item) => item.id === editedPlot.id ? editedPlot.data : item) as PlotData[]};
    }

    switch (action.type) {
        default:
            return state;
        case 'get_plots':
            return get_plots(action);
        case 'add_plot':
            return add_plot(state, action);
        case 'sort_index':
            return sort_index(state);
        case 'edit_plot':
            return edit_plot(state, action);
    }
}

// MARK: -UIProvider Component
const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [plotState, plotDispatch] = useReducer(plotReducer, { data: [] });
    const [settingsState, setSettingState] = useState<SettingsData>({theme: 'bulbasaur', lang: 'en', tempFormat: 'F'});
    const [focusPlot, setFocusPlot] = useState<PlotData>({id: -1, type: 'Empty', size: 0, data: {pH: 0, moisture: 0, temperature: 0, fertility: 0}, status: 'No Signal', duration: 0});
    const [sortIndex, setSortIndex] = useState<boolean>(false);

    const [plantList, setPlantList] = useState<string[]>(
        ['Tomato', 'Cucumber', 'Pumpkin', 'Carrot', 'Pepper', 'Onion', 'Garlic', 'Potato', 'Spinach', 'Lettuce']
    ); // List of plants

    useEffect(() => {
        plotDispatch({ type: 'get_plots', payload: dummyPlotData});
        setSortIndex(true);
        setFocusPlot(dummyPlotData.data[0]);
    }, []);

    useEffect(() => {
        if (sortIndex==true) {
            plotDispatch({ type: 'sort_index' });
            setSortIndex(false);
        }
    }, [sortIndex]);

    return (
        <body className={inter.className} data-theme={String(settingsState.theme)}>
            <PlotDataContext.Provider value={{ plotState, plotDispatch }}>
                <SettingsDataContext.Provider value={{ settingsState, setSettingState}}>
                    <FocusPlotContext.Provider value={{focusPlot, setFocusPlot }}>
                        <SortIndexContext.Provider value={{sortIndex,setSortIndex }}>
                            <PlantListContext.Provider value={{plantList,setPlantList }}>
                                <Dashboard />
                                {children}
                            </PlantListContext.Provider>
                        </SortIndexContext.Provider>
                    </FocusPlotContext.Provider>
                </SettingsDataContext.Provider>
            </PlotDataContext.Provider>
        </body>
    );
}

// MARK: -Custom Hooks
/** This lets other child components edit and change focus state */
export function useFocusPlot() {
    const context = useContext(FocusPlotContext);
    if (context === undefined) {
        throw new Error('useFocusPlot must be used within a UIProvider');
    }
    return context;
}

/** This lets other child components edit and change sort index state */
export function useSortIndex() {
    const context = useContext(SortIndexContext);
    if (context === undefined) {
        throw new Error('useSortIndex must be used within a UIProvider');
    }
    return context;
}

/** This lets other child components edit and change plotdata state */
export function usePlotDataContext() {
    const context = useContext(PlotDataContext);
    if (context === undefined) {
        throw new Error('usePlotData must be used within a UIProvider');
    }
    return context;
}

/** This lets other child components edit and change settings state */
export function useSettingsDataContext() {
    const context = useContext(SettingsDataContext);
    if (context === undefined) {
        throw new Error('useSettingsData must be used within a UIProvider');
    }
    return context;
}

/** This lets other child components edit and change plant list state */
export function usePlantListContext() {
    const context = useContext(PlantListContext);
    if (context === undefined) {
        throw new Error('usePlantList must be used within a UIProvider');
    }
    return context;
}

export default UIProvider;