'use client'

import { NotificationLogEntry } from 'types';
import { useNotifyLogContext } from '@components/UIProvider';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const symbol: any = (type: string) => {
    switch (type) {
        default:
          return type;
        case 'success':
          return <CheckCircleIcon aria-hidden="true" className="h-10 w-10 text-green-400" />;
        case 'warning':
          return <ExclamationCircleIcon aria-hidden="true" className="h-10 w-10 text-red-400" />;
        case 'attention':
            return <ExclamationTriangleIcon aria-hidden="true" className="h-10 w-10 text-yellow-400" />;
    }
};

export default function NotificationsPage() {

    const { notifyLogContent: notifications } = useNotifyLogContext();

    return (
        
        <div className="custom-bg-background w-full min-h-screen">
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {notifications.length > 0 ?
                        <>
                            {notifications.map((notification: NotificationLogEntry, index: number) => (
                                (index < 10) && <li key={`notification_${String(index)}`}>
                                    <div className="pb-8">
                                        <div className="relative flex flex-row gap-x-5 xl:gap-x-16 justify-between mr-10 xl:mr-20 items-center">
                                            {symbol(notification.status)}
                                            <div  className='w-60 xl:max-w-[20vw]'>
                                                <span>{notification.notification}</span>
                                            </div>
                                            <div className='text-sm hidden xl:block'>
                                                <span>{String(notification.timestamp.toLocaleTimeString())}</span>
                                                <span className='px-5'>{String(notification.timestamp.toDateString())}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {notifications.length > 10 &&
                                <div className='text-center font-extrabold'>
                                    To view more notifications, please download your logs file.
                                </div>
                            }
                        </>
                    :
                        <li>
                            <div className="pb-8">
                                <div className="relative flex flex-row gap-x-5 xl:gap-x-16 justify-between mr-10 xl:mr-20 items-center">
                                    <span>No notifications to display</span>
                                </div>
                            </div>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}