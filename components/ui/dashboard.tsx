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

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellAlertIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import Notification from "@components/ui/notification";
import { useNotifyToggleContext } from "@components/UIProvider";

{
  /* MARK: -Navigation Items */
}
const navigation = [
  { id: 0, name: "Dashboard", href: "/", icon: HomeIcon },
  { id: 1, name: "Reports", href: "/stats", icon: ChartPieIcon },
  { id: 2, name: "Files*", href: "#", icon: FolderIcon },
  { id: 3, name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { id: 4, name: "Notifications", href: "/notifications", icon: BellAlertIcon },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<number>(0);
  const { notifyToggle } = useNotifyToggleContext();

  return (
    <>
      <div>
        {notifyToggle == true && (
          <div>
            <Notification />
          </div>
        )}

        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 custom-text "
                    />
                  </button>
                </div>
              </TransitionChild>

              {/* MARK: -Mobile Sidebar*/}
              {sidebarOpen && (
                <div className="lg:hidden custom-bg-sidebar flex slide-component-width flex-col gap-y-5 p-5">
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item, index: number) => (
                            <li key={item.name} id={String(index)}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.id === isSelected
                                    ? "custom-bg-background custom-text"
                                    : "custom-text",
                                  "group flex gap-x-3 p-2 text-sm font-semibold leading-6"
                                )}
                                onClick={() => {
                                  setIsSelected(item.id);
                                  setSidebarOpen(false);
                                }}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="h-5 w-5 shrink-0"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </DialogPanel>
          </div>
        </Dialog>

        {/* MARK: -Desktop Sidebar*/}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col slide-component-width">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto custom-bg-sidebar p-5">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item, index: number) => (
                      <li key={item.name} id={String(index)}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.id === isSelected
                              ? "custom-bg-background custom-text "
                              : "custom-text ",
                            "group flex gap-x-3  p-2 text-sm font-semibold leading-6"
                          )}
                          onClick={() => {
                            setIsSelected(item.id);
                          }}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* MARK: -Navbar */}
        <div className="lg:pl-72">
          <div className="sticky h-10 top-0 z-40 flex shrink-0 items-center gap-x-4 custom-bg-mobilenav px-5 sm:gap-x-6 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 custom-text lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
