'use client'

import React, { useState } from 'react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
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

  const [isSelected, setIsSelected] = useState<number>(0);
  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto sidebar-bg-primary-dark px-6">
            <nav className="flex flex-1 flex-col pt-10">
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
      </div>
    </>
  )
}