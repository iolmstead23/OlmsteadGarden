'use client'

import { NotificationLogEntry } from '@/types';
import { useNotifyLogContext } from '@components/UIProvider';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const symbol: any = (type: string) => {
    switch (type) {
        default:
          return type;
        case 'success':
          return <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />;
        case 'warning':
          return <ExclamationCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />;
        case 'attention':
            return <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-yellow-400" />;
    }
};

export default function NotificationsPage() {

    const { notifyLogContent: notifications } = useNotifyLogContext();

    return (
        
        <div className="custom-bg-background w-full min-h-screen">
            <div className="flow-root">
                <ul role="list" className="-mb-8 w-1/2">
                    {notifications && notifications.map((notification: NotificationLogEntry, index: number) => (
                        <li key={`notification_${String(index)}`}>
                            <div className="relative pb-8">
                                {index !== notifications.length - 1 ? (
                                    <span aria-hidden="true" className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" />
                                ) : null}
                                <div className="relative flex flex-row space-x-3">
                                    <span>{notification.status}</span>
                                    {symbol(notification.status)}
                                    <span>{notification.notification}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}