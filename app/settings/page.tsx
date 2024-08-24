'use client'

import { useSettingsDataContext } from "@/components/UIProvider";
import { useEffect, useState } from "react";

export default function SettingsPage() {

    const { settingsState, setSettingState } = useSettingsDataContext();
    const themesList = ["bulbasaur","squirtle","charmander"];
    const [hydrated, setHydrated] = useState<boolean>(false);

    const ChangeThemeDropdown = () => {
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedTheme = event.target.value;
            setSettingState({...settingsState, theme: selectedTheme});
        };
    
        return (
            <div className="py-auto flex flex-row items-center w-1/2">
                <select
                    id="theme"
                    name="theme"
                    className="text-left py-1 block bg-form_field text-text drop-shadow-lg sm:text-sm sm:leading-6 pl-5"
                    defaultValue={settingsState.theme}
                    onChange={handleChange}
                >
                    {themesList.map((theme: string, index: number) => (
                        <option key={index} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    useEffect(() => {
        // this forces a rerender
        setHydrated(true);
    }, []);

    return (
        <div className="bg-background py-20 pl-[10%] md:pl-[15%] lg:pl-[30%] min-h-screen">
            <h2 className="drop-shadow-lg text-text font-semibold leading-7 pb-5">App Settings</h2>
            <div className="flex flex-col gap-y-20">
                <div className="text-lg text-text drop-shadow-lg">
                    <span>Theme</span>
                    {hydrated && ChangeThemeDropdown()}
                </div> 
            </div>
        </div>
    )
}