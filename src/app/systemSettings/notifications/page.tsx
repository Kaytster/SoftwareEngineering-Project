"use client"
import AdminNav from '@/app/components/adminNavigation';
import { useAlert } from '@/app/utils/useAlert';
import { useState, useEffect } from 'react';
import '@/app/globals.css'
import Image from 'next/image';
import Head from 'next/head';

type AlertType = 'Success' | 'Error' | 'Warning';

const getTypeStyles = (type: AlertType, currentType: AlertType) => {
    const isSelected = type === currentType;
    let base = "px-4 py-2 font-bold transition duration-300 rounded-lg text-white";

    if (type === 'Success') base += isSelected ? 'bg-green-600 shadow-lg' : 'bg-green-500 hover:bg-green-600';
    if (type === 'Error') base += isSelected ? 'bg-red-600 shadow-lg' : 'bg-red-500 hover:bg-red-600';
    if (type === 'Warning') base += isSelected ? 'bg-orange-600 shadow-lg' : 'bg-orange-500 hover:bg-orange-600';

    return base;
}

export default function Notifications() {
    const {showAlert} = useAlert();
  return (
      <main>
          <header>
              <AdminNav />
          </header>
          <div className="relative w-300 h-130 mx-auto mt-20">
              <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                  <div className="flex space-x-6 h-full"></div>
                  {/* <button className='px-4 py-2 bg-green-500 text-white rounded'
                          onClick={() => showAlert('Success', 'success')}
                  >
                    Show Success Alert
                  </button>
                  <button className='px-4 py-2 bg-red-500 text-white rounded'
                          onClick={() => showAlert('Error', 'error')}
                  >
                    Show Error Alert
                  </button>
                  <button className='px-4 py-2 bg-orange-500 text-white rounded'
                          onClick={() => showAlert('Warning', 'info')}
                  >
                    Show Warning Alert
                  </button> */}


              </div>  
          </div>
      </main>
  )
}