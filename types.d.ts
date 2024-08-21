export interface PlotData {
    id: number;
    size: number;
    type: string;
    data: {
        pH: number;
        moisture: number;
        temperature: number;
        fertility: number;
    };
    status: string;
    duration: number;
}

export interface StatsProp {
    name: string;
    value: string | number;
}