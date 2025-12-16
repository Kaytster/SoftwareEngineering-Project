"use client"
import AdminNav from '@/app/components/adminNavigation';
import { useAlert } from '@/app/utils/useAlert';
import { useState, useEffect } from 'react';
import '@/app/globals.css'
import Image from 'next/image';
import Head from 'next/head';

type AlertType = 'SuccessfulDonation' | 'UnsuccessfulDonation' | 'DonationAccept' | 'DonationReject' |
                 'SuccessfulEdit' | 'UnsuccessfulEdit' | 'SuccessfulDelete' | 'UnsuccessfulDelete' |
                 'SuccessfulEditAcc' | 'UnsuccessfulEditAcc';

const getTypeStyles = (type: AlertType, currentType: AlertType) => {
    const isSelected = type === currentType;
    let base = "px-4 py-2 font-bold transition duration-300 rounded-lg text-white bg-[var(--primary)]";

    let colourClasses ='';
    const successAlerts = ['SuccessfulDonation', 'DonationAccept', 'SuccessfulEdit', 
                          'SuccessfulDelete', 'SuccessfulEditAcc'];
    const unsuccessfulAlerts = ['UnsuccessfulDonation', 'DonationReject', 'UnsuccessfulEdit', 
                                'UnsuccessfulDelete', 'UnsuccessfulEditAcc'];

    if (isSelected) {
        if (successAlerts.includes(type)) {
            colourClasses = 'bg-green-500 hover:bg-green-600';
    } else if (unsuccessfulAlerts.includes(type)) {
        colourClasses = 'bg-red-500 hover:bg-red-600';
    } else {
        colourClasses = ' bg-[var(--primary)]';
    }
} else {
    colourClasses = ' bg-[var(--primary)]';
    if (successAlerts.includes(type)) {
            colourClasses += ' hover:bg-green-400 hover:shadow-md';
        } else if (unsuccessfulAlerts.includes(type)) {
            colourClasses += ' hover:bg-red-400 hover:shadow-md';
        } else {
            colourClasses = ' bg-[var(--primary)]';
        }
    
}
    
    return base + colourClasses;

    // if (type === 'SuccessfulDonation') base += isSelected ? 'bg-green-600 shadow-lg' : 'bg-green-500 hover:bg-green-600';
    // if (type === 'UnsuccessfulDonation') base += isSelected ? 'bg-red-600 shadow-lg' : 'bg-red-500 hover:bg-red-600';
    // if (type === 'DonationAccept') base += isSelected ? 'bg-orange-600 shadow-lg' : 'bg-orange-500 hover:bg-orange-600';
    // if (type === 'DonationReject') base += isSelected ? 'bg-green-600 shadow-lg' : 'bg-green-500 hover:bg-green-600';
    // if (type === 'SuccessfulEdit') base += isSelected ? 'bg-red-600 shadow-lg' : 'bg-red-500 hover:bg-red-600';
    // if (type === 'UnsuccessfulEdit') base += isSelected ? 'bg-orange-600 shadow-lg' : 'bg-orange-500 hover:bg-orange-600';
    // if (type === 'SuccessfulDelete') base += isSelected ? 'bg-green-600 shadow-lg' : 'bg-green-500 hover:bg-green-600';
    // if (type === 'UnsuccessfulDelete') base += isSelected ? 'bg-red-600 shadow-lg' : 'bg-red-500 hover:bg-red-600';
    // if (type === 'SuccessfulEditAcc') base += isSelected ? 'bg-orange-600 shadow-lg' : 'bg-orange-500 hover:bg-orange-600';
    // if (type === 'UnsuccessfulEditAcc') base += isSelected ? 'bg-green-600 shadow-lg' : 'bg-green-500 hover:bg-green-600';

    //return base;
}

const formatAlertType = (type: AlertType) => {
    return type.replace(/([A-Z])/g, ' $1').trim();
}

export default function Notifications() {
    const {showAlert, getMessages, updateMessage} = useAlert();
    const [selectedType, setSelectedType] = useState<AlertType>('SuccessfulDonation');
    const [currentMessage, setCurrentMessage] = useState<string>('');

    const allAlertTypes: AlertType[] = [
        'SuccessfulDonation', 'UnsuccessfulDonation', 'DonationAccept',
        'DonationReject', 'SuccessfulEdit', 'UnsuccessfulEdit',
        'SuccessfulDelete', 'UnsuccessfulDelete', 'SuccessfulEditAcc',
        'UnsuccessfulEditAcc' 
    ];

    useEffect(() => {
        const messages = getMessages();
        setCurrentMessage(messages[selectedType]);
    }, [selectedType, getMessages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.target.value);
    };

    const handleSave = () => {
        updateMessage(selectedType, currentMessage);
        alert(`New message for ${selectedType} saved!`);
    };

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
}



        // <div className="relative w-300 h-130 mx-auto mt-20">
        //       <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
        //           <div className="flex space-x-6 h-full">
        //             <h2 className='text-2xl font-bold mb-6 text-foreground'>
        //                 Customize Alerts
        //             </h2>
        //             <div className='flex space-x-4 mb-8'>
        //                 {['Success', 'Error', 'Warning'].map((type) => (
        //                     <button className={getTypeStyles(type as AlertType, selectedType)}
        //                             key={type}
        //                             onClick={() => setSelectedType(type as AlertType)}
        //                     >
        //                         {type} Alert
        //                     </button>
        //                 ))}
        //             </div>

        //             <div className='flex flex-col'>
        //                 <label htmlFor='alert-msg'
        //                        className='mb-2 font-medium text-gray-700'>
        //                         Alert Message Text: 
        //                 </label>
        //                 <input className='p-3 border border-gray-300 rounded-md text-black focus:ring-secondary focus:border-secondary'
        //                        id='alert-msg'
        //                        type='text'
        //                        value={currentMessage}
        //                        onChange={handleInputChange}
        //                        placeholder='Enter message...'
        //                 />
        //             </div>
        //             <button className='mt-6 px-6 py-2 bg-secondary text-white rounded-md font-bold hover:opacity-90 transition'
        //                     onClick={handleSave}
        //             >
        //                 Save New {selectedType} Message
        //             </button>
        //           </div>
        //       </div>  
        //   </div>