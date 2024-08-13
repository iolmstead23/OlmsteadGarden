'use client'

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { PlotData } from "types"; // Use the path alias

interface State {
    data: Array<PlotData>;
};

interface EditPlotData {
    id: number;
    data: PlotData;
};

interface Action {
    type: 'get_plots' | 'add_plot' | 'edit_plot' | 'sort_index';
    payload?: State | PlotData | EditPlotData
};

interface PlotDataState {
    state: State;
    dispatch: React.Dispatch<Action>;
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

// Context for plot data
const PlotDataContext = createContext<PlotDataState | undefined>(undefined);

// Context for focused plot
const FocusPlotContext = createContext<FocusPlot | undefined>(undefined);

// Context for sorting index
const SortIndexContext = createContext<SortIndex | undefined>(undefined);

// List of plants
const PlantListContext = createContext<PlantList | undefined>(undefined);

// Dummy data
const dummyPlotData: State = {
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
            duration: '2 weeks',
            water_duration: '1 hour',
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
            duration: '1 week',
            water_duration: '1 hour',
        },
    ]
}

// Reducer
function reducer(state: State, action: Action): State {

    /** Fetch the initial plots */
    function get_plots(action: Action): State {
        return {data: action.payload!.data as PlotData[]};
    }

    //** Add a plot to the state **/
    function add_plot(state: State, action: Action): State {
        if (Array.isArray(action.payload)) {
            throw new Error("Payload should be of type PlotData, not PlotData[]");
        }
        return { data: state.data.concat(action.payload! as PlotData) };
    }

    /** Sort the index of the plots */
    function sort_index(state: State): State {
        return {data: state.data.map((item, index) => ({...item, id: index}))}; // Sort by index
    }

    function edit_plot(state: State, action: Action): State {

        const editedPlot = (action.payload as EditPlotData).data;
        
        if (Array.isArray(action.payload)) {
            throw new Error("Payload should be of type PlotData, not PlotData[]");
        }
        return { data: state.data.map((item) => item.id === editedPlot.id ? editedPlot: item) as PlotData[]};
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

const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, { data: [] });
    const [focusPlot, setFocusPlot] = useState<PlotData>(dummyPlotData.data[0]);
    const [sortIndex, setSortIndex] = useState<boolean>(false);

    const [plantList, setPlantList] = useState<string[]>(
        ['Tomato', 'Cucumber', 'Pumpkin', 'Carrot', 'Pepper', 'Onion', 'Garlic', 'Potato', 'Spinach', 'Lettuce']
    ); // List of plants

    useEffect(() => {
        dispatch({ type: 'get_plots', payload: dummyPlotData});
        setSortIndex(true);
    }, []);

    useEffect(() => {
        if (sortIndex==true) {
            dispatch({ type: 'sort_index' });
            setSortIndex(false);
        }
    }, [sortIndex]);

    return (
        <PlotDataContext.Provider value={{ state, dispatch }}>
            <FocusPlotContext.Provider value={{focusPlot, setFocusPlot}}>
                <SortIndexContext.Provider value={{sortIndex,setSortIndex}}>
                    <PlantListContext.Provider value={{plantList,setPlantList}}>
                        {children}
                    </PlantListContext.Provider>
                </SortIndexContext.Provider>
            </FocusPlotContext.Provider>
        </PlotDataContext.Provider>
    );
}

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

/** This lets other child components edit and change plotdata state */
export function usePlantListContext() {
    const context = useContext(PlantListContext);
    if (context === undefined) {
        throw new Error('usePlantList must be used within a UIProvider');
    }
    return context;
}

export default UIProvider;