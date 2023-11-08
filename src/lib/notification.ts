import { writable } from "svelte/store"

export enum NotificationType {
    SUCCESS = "Success",
    WARNING = "Warning",
    ERROR = "Error",
    INFO = "Info",
}

export class Notification {

    type: NotificationType
    message: string

    constructor(type: NotificationType, message: string) {
        this.type = type
        this.message = message
    }

    getStyle() {
        switch (this.type) {
            case NotificationType.SUCCESS:
                return "bg-green-100 border-green-400 text-green-700"
            case NotificationType.WARNING:
                return "bg-yellow-100 border-yellow-400 text-yellow-700"
            case NotificationType.ERROR:
                return "bg-red-100 border-red-400 text-red-700"
            case NotificationType.INFO:
                return "bg-blue-100 border-blue-400 text-blue-700"
        }
    }
}

const _notificationStore = writable<Notification[]>([])
const _notifications = () => {

    const { subscribe, set, update } = _notificationStore

    function removeToast() {
        update((state) => {
            return [...state.slice(0, state.length - 1)]
        })
    }

    return {
        subscribe: subscribe,
        set: set,
        update: update,
        show: (type: NotificationType, message: string) => {
            const notification = new Notification(type, message)
            update((state) => [notification, ...state])
            setTimeout(removeToast, 5000)
        },
    }
}

export const notifications = _notifications()
