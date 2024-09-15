"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  useNotifyContentContext,
  useNotifyToggleContext,
} from "@components/UIProvider";
import { useEffect } from "react";

export default function Notification() {
  /** This allows us to toggle the notification on and off */
  const { setNotifyToggle } = useNotifyToggleContext();
  /** This allows us to grab the contents for the notification */
  const { notifyContent, setNotifyContent } = useNotifyContentContext();

  // Timeout the notification box if enough time has passed
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifyToggle(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [notifyContent, setNotifyToggle]);

  /** This sets the appropriate icon */
  const symbol: any = (type: string) => {
    switch (type) {
      default:
        return type;
      case "success":
        return (
          <CheckCircleIcon
            aria-hidden="true"
            className="h-6 w-6 text-green-400"
          />
        );
      case "warning":
        return (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="h-6 w-6 text-red-400"
          />
        );
      case "attention":
        return (
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="h-6 w-6 text-yellow-400"
          />
        );
    }
  };

  return (
    /* Global notification live region, render this permanently at the end of the document */
    <div
      aria-live="assertive"
      className="z-50 pointer-events-none fixed w-[80%] left-[20%] lg:left-[55%] xl:left-[70%] top-[2%] flex items-end px-4 sm:items-start sm:p-6"
    >
      <div className="w-full items-end">
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {symbol(notifyContent?.status!)}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">
                  {notifyContent!.notification}
                </p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setNotifyContent({
                      status: "",
                      notification: "",
                      timestamp: new Date(),
                    });
                    setNotifyToggle(false);
                  }}
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
