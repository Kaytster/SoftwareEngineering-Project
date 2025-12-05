type AlertType = 'SuccessfulDonation' | 'UnsuccessfulDonation' | 'DonationAccept' | 'DonationReject' |
                 'SuccessfulEdit' | 'UnsuccessfulEdit' | 'SuccessfulDelete' | 'UnsuccessfulDelete' |
                 'SuccessfulEditAcc' | 'UnsuccessfulEditAcc';

export type AlertMessages = {
    [key in AlertType]: string;
};

const STORAGE_KEY = 'adminAlertMessages';

const defaultMessages: AlertMessages = {
    SuccessfulDonation: 'Success!',
    UnsuccessfulDonation: 'Error!',
    DonationAccept: 'Success!',
    DonationReject: 'Error!',
    SuccessfulEdit: 'Success!',
    UnsuccessfulEdit: 'Error!',
    SuccessfulDelete: 'Success!',
    UnsuccessfulDelete: 'Error!',
    SuccessfulEditAcc: 'Success!',
    UnsuccessfulEditAcc: 'Error!',
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