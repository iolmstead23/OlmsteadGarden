'use client'

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { PlotData, SettingsData } from "types";
import Dashboard from "@components/ui/dashboard";
import { Inter } from "next/font/google";
import data from "json/plot_data_dummy.json";

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

interface NotificationToggleState {
    notifyToggle: boolean;
    setNotifyToggle: (e: boolean) => void;
}

interface NotificationContentState {
    notifyContent: [string, string];
    setNotifyContent: (e: [string, string]) => void;
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

const NotificationToggleContext = createContext<NotificationToggleState | undefined>(undefined);

const NotificationContentContext = createContext<NotificationContentState | undefined>(undefined)

const dummyPlotData = data;

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
    /**This stores the state of the index sort trigger */
    const [sortIndex, setSortIndex] = useState<boolean>(false);
    /** This stores the toggle state of the Notification Box */
    const [notifyToggle, setNotifyToggle] = useState<boolean>(false);
    /** This stores the content state of the Notification Box */
    const [notifyContent, setNotifyContent] = useState<[string, string]>(['', '']);

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
                            <NotificationToggleContext.Provider value={{notifyToggle,setNotifyToggle}}>
                                <NotificationContentContext.Provider value={{notifyContent,setNotifyContent}}>
                                    <PlantListContext.Provider value={{plantList,setPlantList }}>
                                        <Dashboard />
                                        {children}
                                    </PlantListContext.Provider>
                                </NotificationContentContext.Provider>
                            </NotificationToggleContext.Provider>
                        </SortIndexContext.Provider>
                    </FocusPlotContext.Provider>
                </SettingsDataContext.Provider>
            </PlotDataContext.Provider>
        </body>
    );
}

// MARK: -Custom Hooks
/** This lets other child components edit and change focus state */
export function useFocusPlotContext() {
    const context = useContext(FocusPlotContext);
    if (context === undefined) {
        throw new Error('useFocusPlotContext must be used within a UIProvider');
    }
    return context;
}

/** This lets other child components edit and change sort index state */
export function useSortIndexContext() {
    const context = useContext(SortIndexContext);
    if (context === undefined) {
        throw new Error('useSortIndexContext must be used within a UIProvider');
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

/** This lets other child components toggle notification box on and off */
export function useNotifyToggleContext() {
    const context = useContext(NotificationToggleContext);
    if (context === undefined) {
        throw new Error('useNotifyToggleContext must be used within a NotificationToggleContextProvider');
    }
    return context;
}

/** This lets other child components provide the notification box content */
export function useNotifyContentContext() {
    const context = useContext(NotificationContentContext);
    if (context === undefined) {
        throw new Error('useNotifyContentContext must be used within a NotificationContentContextProvider');
    }
    return context;
}

export default UIProvider;