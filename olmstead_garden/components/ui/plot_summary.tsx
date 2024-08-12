'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function PlotSummary() {
  const [open, setOpen] = useState(true)

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                        transition
                        className="pointer-events-auto relative w-96 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <TransitionChild>
                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                            </div>
                            </TransitionChild>
                            <div className="h-full overflow-y-auto bg-white p-8">
                                <div>
                                    <h3 className="font-medium text-gray-900">Information</h3>
                                    <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Uploaded by</dt>
                                        <dd className="text-gray-900">Marie Culver</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Created</dt>
                                        <dd className="text-gray-900">June 8, 2020</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Last modified</dt>
                                        <dd className="text-gray-900">June 8, 2020</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Dimensions</dt>
                                        <dd className="text-gray-900">4032 x 3024</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Resolution</dt>
                                        <dd className="text-gray-900">72 x 72</dd>
                                    </div>
                                    </dl>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
