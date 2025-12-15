"use client"
import React, {ReactNode, createContext, useEffect, useState, useCallback} from 'react';
// import Alert from '../components/alert';
import { EmailType, EmailMessages, EmailContent,
         loadEmailMessages, saveEmailMessages
 } from '../utils/emailStorage';

//Emails:
//Account Creation
//Account Deletion
//Account Details Edit
//Donation Accepted
//Donation Rejected
//Donation Created

type EmailContextType = {
    getTemplates: () => EmailMessages;
    updateTemplate: (type: EmailType, context: EmailContent) => void;
};

const defaultTemplates = loadEmailMessages();

export const EmailContext = createContext<EmailContextType> ({
    getTemplates: () => defaultTemplates,
    updateTemplate: () => {},
});

type EmailContextProviderProps = {
    children: ReactNode;
}

export const EmailProvider: React.FC<EmailContextProviderProps> = ({children}) => {
    const [emailTemplates, setEmailTemplates] = useState<EmailMessages>(loadEmailMessages);
    const getTemplates = useCallback(() => emailTemplates, [emailTemplates]);
    const updateTemplate = useCallback((type: EmailType, content: EmailContent) => {
        setEmailTemplates(prev => {
            const newTemplates: EmailMessages = {...prev, [type]: content};
            saveEmailMessages(newTemplates);
            return newTemplates;
        });
    }, []);
    const contextValue: EmailContextType = {
        getTemplates,
        updateTemplate
    };

    return (
        <EmailContext.Provider value={contextValue}>
            {children}
        </EmailContext.Provider>
    )
}

export const useEmailContext = () => {
    const context = React.useContext(EmailContext);
    if (context === undefined) {
        throw new Error('useEmailContext must be used within an EmailProvider');
    }
    return context;
}
