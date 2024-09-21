/*
 * Created on Fri Sep 20 2024
 * Author: Ian Olmstead
 *
 * License: GNU Affero General Public License (AGPL-3.0)
 *
 *For details, see https://www.gnu.org/licenses/agpl-3.0-standalone.html
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU Affero General Public License as published
 *by the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 */

"use client";

import { useSettingsDataContext } from "@components/UIProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { settingsState, setSettingState } = useSettingsDataContext();
  const themesList: string[] = ["bulbasaur", "squirtle", "charmander"];
  const [hydrated, setHydrated] = useState<boolean>(false);

  const ChangeThemeDropdown = () => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedTheme = event.target.value;
      setSettingState({ ...settingsState, theme: selectedTheme });
    };

    return (
      <div className="py-auto flex flex-row items-start w-1/2">
        <select
          id="theme"
          name="theme"
          className="text-center py-1 block w-[200px] custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5 min-w-52" 
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
  };

  useEffect(() => {
    // This lets other components know the page has been hydrated
    setHydrated(true);
  }, []);

  return (
    <div className="custom-bg-background min-h-screen">
      <div className="flex flex-col gap-y-5">
        {/* Each block is separated by its own div */}
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 custom-text">
                App Settings
              </h2>
              <p className="mt-1 text-sm leading-6 custom-text">
                Controls your app settings.
              </p>
            </div>
            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium leading-6 custom-text"
                  >
                    Theme
                  </label>
                  <div className="mt-2">
                    {hydrated && ChangeThemeDropdown()}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-5 py-16 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 custom-text">
                Location Info
              </h2>
              <p className="mt-1 text-sm leading-6 custom-text">
                Controls your current location and timezone.
              </p>
            </div>
            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium leading-6 custom-text"
                  >
                    Timezone*
                  </label>
                  <div className="mt-2">
                    <select
                      id="timezone"
                      name="timezone"
                      className="text-center block py-1 custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5 min-w-52"
                    >
                      <option>Pacific Standard Time</option>
                      <option>Eastern Standard Time</option>
                      <option>Greenwich Mean Time</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium leading-6 custom-text"
                  >
                    Growing Zone*
                  </label>
                  <div className="mt-2">
                    <select
                      id="timezone"
                      name="timezone"
                      className="text-center block py-1 custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5 min-w-52"
                    >
                      <option>1A</option>
                      <option>1B</option>
                      <option>2A</option>
                      <option>2B</option>
                      <option>3A</option>
                      <option>3B</option>
                      <option>4A</option>
                      <option>4B</option>
                      <option>5A</option>
                      <option>5B</option>
                      <option>6A</option>
                      <option>6B</option>
                      <option>7A</option>
                      <option>7B</option>
                      <option>8A</option>
                      <option>8B</option>
                      <option>9A</option>
                      <option>9B</option>
                      <option>10A</option>
                      <option>10B</option>
                      <option>11A</option>
                      <option>11B</option>
                      <option>12A</option>
                      <option>12B</option>
                      <option>13A</option>
                      <option>13B</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium leading-6 custom-text"
                  >
                    Temperature*
                  </label>
                  <div className="mt-2">
                    <select
                      id="timezone"
                      name="timezone"
                      className="text-center block py-1 custom-bg-formfield custom-text sm:text-sm sm:leading-6 pl-5 min-w-52"
                    >
                      <option>Celsius</option>
                      <option>Fahrenheit</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="text-lg custom-text flex flex-row items-center gap-x-10">
          <button className="custom-bg-button custom-text-button py-2 px-4">
            Download Notification Logs*
          </button>
        </div>
        <div className="text-lg custom-text flex flex-row items-center gap-x-10">
          <Link
            href="/debug"
            className="custom-bg-button custom-text-button py-2 px-4"
          >
            Go to debug log
          </Link>
        </div>
      </div>
    </div>
  );
}
