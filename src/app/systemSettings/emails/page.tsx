"use client"
import AdminNav from '@/app/components/adminNavigation';
import { useEmailContext} from '@/app/context/emailContext';
import { EmailType, EmailContent } from '@/app/utils/emailStorage';
import { useState, useEffect } from 'react';
import '@/app/globals.css'
import Image from 'next/image';
import Head from 'next/head';

type EmailType = 'CreatedAccount' | 'EditedAccount' | 'DeletedAccount' | 
                 'DonationCreated' | 'DonationAccepted' | 'DonationRejected';

const formatEmailType = (type: EmailType) => {
    return type.replace(/([A-Z])/g, '$1').trim();
}

export default function Emails() {
    const {getTemplates, updateTemplate} = useEmailContext();
    const [selectedType, setSelectedType] = useState<EmailType>('DonationCreated');
    const [currentContent, setCurrentContent] = useState<EmailContent>({subject: '', body: ''});
    const allEmailTypes: EmailType[] = [
        'CreatedAccount', 'EditedAccount', 'DeletedAccount', 
        'DonationCreated', 'DonationAccepted', 'DonationRejected'
    ];

    useEffect(() => {
        const templates = getTemplates();
        setCurrentContent(templates[selectedType]);
    }, [selectedType, getTemplates]);
        const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentContent(prev => ({...prev, subject: e.target.value}));
        };
        const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCurrentContent(prev => ({...prev, body: e.target.value}));
        };
        const handleSave = () => {
            updateTemplate(selectedType, currentContent);
            alert (`New template for ${selectedType} saved!`);
        };
}


  return (
      <main>
          <header>
              <AdminNav />
          </header>
          <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            <div className="flex space-x-6 h-full">
                <div className="w-1/2 flex  flex-col justify-center items-center">
                    {/* col1 */}
                    <h2 className='text-2xl font-bold mb-6 text-foreground'>
                        Customize Alerts
                    </h2>
                    <div className='flex space-x-4 mb-8'>
                        <div className='grid grid-cols-3 gap-3 mb-3'>
                            {allAlertTypes.slice(0, 9).map((type) => (
                                <button 
                                    className={getTypeStyles(type, selectedType)}
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {formatAlertType(type)} Alert
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* col2 */}
                <div className="w-1/2 flex  flex-col justify-center items-center">
                    <div className="relative w-100 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center">
                            <form className="w-full bg-[var(--primary)]">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label htmlFor='alert-msg'
                                            className='block mb-2 mt-5 text-sm font-medium text-[#0C0C0C]'>
                                                Alert Message Text: 
                                        </label>
                                        <input className='w-70 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5'
                                            id='alert-msg'
                                            type='text'
                                            value={currentMessage}
                                            onChange={handleInputChange}
                                            placeholder='Enter message...'
                                        />
                                    </div>
                                </div>
                            </form>
                            <button className='mt-6 px-6 py-2 bg-[var(--secondary)] text-white rounded-md font-bold hover:opacity-90 transition'
                                onClick={handleSave}
                        >
                            Save New Message
                        </button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
          <button className='px-4 py-2 bg-orange-500 text-white rounded'
                          onClick={() => showAlert(selectedType, currentMessage)}
          >
                    Show Success Alert
            </button>
      </main>
  )
