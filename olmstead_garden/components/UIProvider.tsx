'use client'

import { createContext, useContext, useEffect, useReducer } from "react";

interface PlotData {
    id: number;
    name: string;
    status: string;
    duration: string;
    water_duration: string;
};

interface State {
    data: PlotData[];
};

interface Action {
    type: 'add_plot';
    payload: PlotData[];
};

interface PlotDataState {
    state: State;
    dispatch: React.Dispatch<Action>;
}

// Context for plot data
const PlotDataContext = createContext<PlotDataState | undefined>(undefined);

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
        name: 'Pumpkins',
        status: 'Healthy',
        duration: '1 week',
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

    function add_plot(state: State, action: Action) {
        return {...state, data: action.payload};
    }

    switch (action.type) {
        default:
            return state;
        case 'add_plot':
            return add_plot(state, action);
    }
}

const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, { data: [] });

    useEffect(() => {
        dispatch({ type: 'add_plot', payload: dummyPlotData });
    }, []);

    return (
        <PlotDataContext.Provider value={{ state, dispatch }}>
            {children}
        </PlotDataContext.Provider>
    );
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