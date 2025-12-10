'use client'
import '@/app/globals.css'
import Image from 'next/image';
import AdminNav from '@/app/components/adminNavigation';
import { useEffect, useRef } from 'react';

export default function Reports() {


  return (
    <main>
        

        <header>
            <AdminNav />
        </header>

        <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                <div className="flex space-x-6 h-full">
                    
                </div>
            </div>  
        </div>
    </main>
  )
}