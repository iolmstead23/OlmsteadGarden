'use client'

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { PlotData } from "types"; // Use the path alias

interface State {
    data: PlotData[];
};

interface Action {
    type: 'get_plots' | 'add_plot' | 'sort_index';
    payload?: PlotData[];
};

interface PlotDataState {
    state: State;
    dispatch: React.Dispatch<Action>;
}

interface FocusPlot {
    focusPlot: PlotData;
    setFocusPlot: (e:PlotData) => void;
    id?: number;
}

interface SortIndex {
    sortIndex: boolean;
    setSortIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

// Context for plot data
const PlotDataContext = createContext<PlotDataState | undefined>(undefined);

// Context for focused plot
const FocusPlotContext = createContext<FocusPlot | undefined>(undefined);

// Context for sorting index
const SortIndexContext = createContext<SortIndex | undefined>(undefined);

// Dummy data
const dummyPlotData: PlotData[] = [
    {
        id: -1,
        name: 'Carrots',
        status: 'Healthy',
        duration: '2 weeks',
        water_duration: '1 hour',
    },
    {
        id: -1,
        name: 'Cucumbers',
        status: 'Warning',
        duration: '1 week',
        water_duration: '1 hour',
    },
]

// Reducer
function reducer(state: State, action: Action): State {

    function get_plots(action: Action): State {
        return {data: action.payload!};
    }

    function add_plot(state: State, action: Action): State {
        return {data: state.data.concat(action.payload!)};
    }

    function sort_index(state: State): State {
        return {data: state.data.map((item, index) => ({...item, id: index}))}; // Sort by index
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
    }
}

const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, { data: [] });
    const [focusPlot, setFocusPlot] = useState<PlotData>(dummyPlotData[0]);
    const [sortIndex, setSortIndex] = useState<boolean>(false);

    useEffect(() => {
        dispatch({ type: 'get_plots', payload: dummyPlotData });
    }, []);

    useEffect(() => {
        if (sortIndex) {
            dispatch({ type: 'sort_index' });
            setSortIndex(false);
        }
    }, [sortIndex]);

    return (
        <PlotDataContext.Provider value={{ state, dispatch }}>
            <FocusPlotContext.Provider value={{focusPlot, setFocusPlot}}>
                <SortIndexContext.Provider value={{sortIndex,setSortIndex}}>
                    {children}
                </SortIndexContext.Provider>
            </FocusPlotContext.Provider>
        </PlotDataContext.Provider>
    );
}

/** This lets other child components edit and change focus state */
export function useFocusPlot() {
    const context = useContext(FocusPlotContext);
    if (context === undefined) {
        throw new Error('usePlotData must be used within a UIProvider');
    }
    return context;
}

/** This lets other child components edit and change sort index state */
export function useSortIndex() {
    const context = useContext(SortIndexContext);
    if (context === undefined) {
        throw new Error('usePlotData must be used within a UIProvider');
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

export default UIProvider;