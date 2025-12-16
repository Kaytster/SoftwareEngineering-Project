import { useState, useCallback } from "react";
import { EmailType, EmailMessages, EmailContent,
         loadEmailMessages, saveEmailMessages } from './emailStorage';

export const useEmail = () => {
    const [emailTemplates, setEmailTemplates] = useState<EmailMessages>(loadEmailMessages);
    const getTemplates = useCallback(() => emailTemplates, [emailTemplates]);
    const updateTemplate = useCallback((type: EmailType, content: EmailContent => {
        setEmailTemplates(prev => {
            const newTemplates = {...prev, [type]: content};
            saveEmailMessages(newTemplates);
            return newTemplates;
        });
    }, []);

    return {
        getTemplates, updateTemplate
    };
}