'use client'
import '@/app/globals.css'
import Image from 'next/image';
import AdminNav from '@/app/components/adminNavigation';
import { useState } from 'react';

//How many active users
//How many accepted donations
//How many donations created

export default function Reports() {

    const [activeReport, setActiveReport] = useState('activeUsers');
    const activeUserData = [
        {}
    ]

  return (
      <main>
        
        <header>
            <AdminNav />
        </header>

        <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                <div className="flex flex-col space-y-4 space-x-6 h-full">
                    <div>
                        <ul className='flex border-b'>
                            <li className='-mb-px  mr-1'>
                                <a className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='#'>Tab 1</a>
                            </li>
                            <li className='mr-1'>
                                <a className='bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold' href='#'>Tab 2</a>
                            </li>
                            <li className='mr-1'>
                                <a className='bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold' href='#'>Tab 3</a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div> 
        </div> 
    </main>
  )
}