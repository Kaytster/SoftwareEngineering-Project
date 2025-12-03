type AlertType = 'Success' | 'Error' | 'Warning';

export type AlertMessages = {
    [key in AlertType]: string;
};

const STORAGE_KEY = 'adminAlertMessages';

const defaultMessages: AlertMessages = {
    Success: 'Success!',
    Error: 'Error!',
    Warning: 'Warning',
};

export const loadAlertMessages = (): AlertMessages => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored) as AlertMessages;
            } catch (e) {
                console.error("Could not parse messages.", e);
            }
        }
    }
    return defaultMessages;
};

export const saveAlertMessages = (messages: AlertMessages) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
};