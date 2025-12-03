"use client"
import React, {ReactNode, createContext, useEffect, useState, useCallback} from 'react';
import Alert from '../components/alert';
import { AlertMessages, loadAlertMessages, saveAlertMessages } from '../utils/alertStorage';

// type AlertType = 'Success' | 'Error' | 'Warning';

// type Alert = {
//     type: AlertType;
//     message: string;
// };

// type AlertContext = {
//     showAlert: (type: AlertType, message: string) => void;
// };

// type AlertContextProvider = {
//     children: ReactNode;
// };

// export const AlertContext = createContext<AlertContext> ({
//     showAlert: () => {},
// });

// export const AlertProvider: React.FC<AlertContextProvider> = ({children}) => {
//     const [alertMessages, setAlertMessages] = useState<Alert[]>([]);
//     const hideAlert = (index: number) => {
//         setAlertMessages((prev) => prev.filter((_, i) => i !== index));
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setAlertMessages((prevItems) => {
//                 if (prevItems.length > 0) {
//                     return prevItems.slice(1);
//                 }
//                 clearInterval(interval);
//                 return prevItems;
//             });
//         }, 8 * 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const contextValue: AlertContext = {
//         showAlert: (type, message) => {
//             const alertMessage: Alert = {
//                 type,
//                 message,
//             };
//             setAlertMessages((prev) => [...prev, alertMessage]);
//         },
//     };

//     return (
//         <AlertContext.Provider value={contextValue}>
//             {alertMessages.map((alert, index) => (
//                 <Alert
//                     message={alert.message}
//                     type={alert.type}
//                     key={index}
//                     onClose={() => hideAlert(index)}
//                 />
//             ))}
//             {children}
//         </AlertContext.Provider>
//     );
// };

type AlertType = 'Success' | 'Error' | 'Warning';

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
    getMessages: () => ({Success: '', Error: '', Warning: ''} as AlertMessages),
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
