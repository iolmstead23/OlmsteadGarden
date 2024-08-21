'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
    { id: 0, name: 'Dashboard', href: '/', icon: HomeIcon },
    { id: 1, name: 'Reports', href: '/stats', icon: ChartPieIcon },
    { id: 2, name: 'Files*', href: '#', icon: FolderIcon },
  ]
  
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<number>(0);

  return (
    <>
      <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              {/* MARK: -Mobile Sidebar*/}
              <div className="lg:hidden flex grow flex-col gap-y-5 bg-gray-900 p-5 ring-1 ring-white/10">

                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                item.id === isSelected
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                              onClick={() => setIsSelected(item.id)}
                            >
                              <item.icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* MARK: -Desktop Sidebar*/}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 p-5">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.id === isSelected
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                          onClick={() => setIsSelected(item.id)}
                        >
                          <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
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
          <div className="sticky h-10 top-0 z-40 flex shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-5 shadow-sm sm:gap-x-6 lg:hidden">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
