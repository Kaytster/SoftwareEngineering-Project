export type EmailType = 'CreatedAccount' | 'EditedAccount' | 'DeletedAccount' | 
                 'DonationCreated' | 'DonationAccepted' | 'DonationRejected'

export type EmailContent = {
    subject: string;
    body: string;
}

export type EmailMessages = {
    [key in EmailType]: string;
};

const STORAGE_KEY = 'adminEmailMessages';

const defaultMessages: EmailMessages = {
    CreatedAccount: {subject: 'Account Creation.', body: 'Welcome to SustainWear! Your account has been created successfully.'},
    EditedAccount: {subject: 'Your details have been changed.', body: 'Your account details have been changed recently, if this was not you please secure your account'},
    DeletedAccount: {subject: 'Account Deletion.', body: 'Thankyou for using SustainWear. Your account has been deleted successfully'},
    DonationCreated: {subject: 'Thankyou for your donation.', body: 'Your donation was created successfully. You will receive another email regarding the status of your donation'},
    DonationAccepted: {subject: 'Donation Accepted', body: 'Your donation has been accepted!'},
    DonationRejected: {subject: 'Donation Rejected', body: 'Unfortunately, your donation has been rejected'},
};

export const loadEmailMessages = (): EmailMessages => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored) as EmailMessages;
            } catch (e) {
                console.error("Could not parse messages.", e);
            }
        }
    }
    return defaultMessages;
};

export const saveEmailMessages = (messages: EmailMessages) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
};

