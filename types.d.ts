export interface PlotData {
    id: number;
    size: number;
    type: string;
    subtype: string;
    data: {
        pH: number;
        moisture: number;
        temperature: number;
        fertility: number;
    };
    status: string;
    duration: number;
    planted_date: sting;
}

export interface SettingsData {
    tempFormat?: string;
    theme?: string;
    lang?: string;
}

export interface SettingsCookieData {
    settings: void | null;
}

export interface StatsProp {
    name: string;
    value: string | number;
}

interface PlantData {
    optimal_ph: number;
    sunlight: string;
    moisture: string;
    temperature: string;
    soil_type: string;
}
  
interface PlantMetadata {
    species: string;
    genus: string;
    average_height: string;
    location: string;
}
  
export interface PlantNote {
    name: string;
    description: string;
    image: string;
    data: PlantData;
    metadata: PlantMetadata;
}

export interface NotificationToggleState {
    notifyToggle: boolean;
    setNotifyToggle: (e: boolean) => void;
}

export interface NotificationLogEntry {
    status: string;
    notification: string;
    timestamp: Date;
}

export interface NotificationContentState {
    notifyContent: NotificationLogEntry | undefined;
    setNotifyContent: (e: NotificationLogEntry) => void;
}

export interface NotificationLogState {
    notifyLogContent: NotificationLogEntry[];
    setNotifyLogContent: (e: NotificationLogEntry[]) => void;
}