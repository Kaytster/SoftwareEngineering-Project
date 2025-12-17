"use client"
import React, {ReactNode, createContext, useEffect, useState, useCallback} from 'react';
import Alert from '@/app/components/alert';
import { AlertMessages, loadAlertMessages, saveAlertMessages } from '../utils/alertStorage';

//ALERTS:
//Successful Donation
//Unsuccessful Donation
//Donation Accepted
//Donation Rejected
//Donation Edit Successful
//Donation Delete Successful
//Donation Edit Unsuccessful
//Donation Delete Unsuccessful
//Account Edit Successful
//Account Edit Unsuccessful

type AlertType = 'SuccessfulDonation' | 'UnsuccessfulDonation' | 'DonationAccept' | 'DonationReject' |
                 'SuccessfulEdit' | 'UnsuccessfulEdit' | 'SuccessfulDelete' | 'UnsuccessfulDelete' |
                 'SuccessfulEditAcc' | 'UnsuccessfulEditAcc';

type AlertData = {
    type: AlertType;
    message: string;
};

type AlertContextType = {
    showAlert: (type: AlertType, customMessage?: string) => void;
    getMessages: () => AlertMessages;
    updateMessage: (type: AlertType, message: string) => void;
};

export const AlertContext = createContext<AlertContextType> ({
    showAlert: () => {},
    getMessages: () => ({SuccessfulDonation: '', UnsuccessfulDonation: '', DonationAccept: '',
                        DonationReject: '', SuccessfulEdit: '', UnsuccessfulEdit: '', SuccessfulDelete: '',
                        UnsuccessfulDelete: '', SuccessfulEditAcc: '', UnsuccessfulEditAcc: '',
    } as AlertMessages),
    updateMessage: () => {},
});

type AlertContextProviderProps = {
    children: ReactNode;
}

export const AlertProvider: React.FC<AlertContextProviderProps> = ({children}) => {
    const [alertMessages, setAlertMessages] = useState<AlertData[]>([]);
    const [globalMessages, setGlobalMessages] = useState<AlertMessages>(loadAlertMessages);
    
    const hideAlert = (index: number) => {
        setAlertMessages((prev) => prev.filter((_, i) => i !== index));
    };

    const updateMessage = useCallback((type: AlertType, message: string) => {
        setGlobalMessages(prev => {
            const newMessages = {...prev, [type]: message};
            saveAlertMessages(newMessages);
            return newMessages;
        });
    }, []);
    const getMessages = useCallback(() => globalMessages, [globalMessages]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertMessages((prevItems) => {
                if (prevItems.length > 0) {
                    return prevItems.slice(1);
                }
                return prevItems;
            });
        }, 4000);
        return () => clearTimeout(timer);
    }, [alertMessages]);

    const contextValue: AlertContextType = {
        showAlert: (type, customMessage) => {
            const message = customMessage || globalMessages[type];
            const newAlert: AlertData = {
                type,
                message,
            };
            setAlertMessages((prev) => [...prev, newAlert]);
        },
        getMessages,
        updateMessage,
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {alertMessages.map((alert, index) => (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    key={index}
                    onClose={() => hideAlert(index)}
                />
            ))}
            {children}
        </AlertContext.Provider>
    )
}