'use client'

import { useDebugLogContext } from "@components/UIProvider";
import { DebugLog } from "@/types";

export default function DebugPage() {

    const { debugLogContent } = useDebugLogContext();

    return (
        <div className="custom-bg-background w-full min-h-screen">
            <div className="flow-root">
                {<ul role="list" className="-mb-8">
                    {debugLogContent.length > 0 ?
                        <>
                            {debugLogContent.map((debugLog: DebugLog, index: number) => (
                                (index < 10) && <li key={`debug_${String(index)}`}>
                                    <div className="pb-8">
                                        <div className="relative flex flex-row gap-x-5 xl:gap-x-16 justify-between mr-10 xl:mr-20 items-center">
                                            <div className='w-full flex flex-row items-center gap-x-5'>
                                                <span>{debugLog.status}</span>
                                                <span>{debugLog.message}</span> 
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}

                            {debugLogContent.length > 10 &&
                                <div className='text-center font-extrabold'>
                                    To view more debug logs, please download your logs file.
                                </div>
                            }
                        </>
                    :
                        <li>
                            <div className="pb-8">
                                <div className="relative flex flex-row gap-x-5 xl:gap-x-16 justify-between mr-10 xl:mr-20 items-center">
                                    <span>No debug logs to display</span>
                                </div>
                            </div>
                        </li>
                    }
                </ul>}
            </div>
        </div>
    )
}