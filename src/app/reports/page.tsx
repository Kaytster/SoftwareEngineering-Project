'use client'
import '@/app/globals.css'
import Image from 'next/image';
import AdminNav from '@/app/components/adminNavigation';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from 'recharts';

//How many active users
//How many accepted donations
//How many donations created

export default function Reports() {

    const data = [
        {
            name: 'Item 1',
            uv: 400,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Item 2',
            uv: 300,
            pv: 4567,
            amt: 2400,
        },
        {
            name: 'Item 3',
            uv: 320,
            pv: 2398,
            amt: 2400,
        },
        {
            name: 'Item 4',
            uv: 200,
            pv: 9800,
            amt: 2400,
        },
    ];

  return (
      <main>
        
        <header>
            <AdminNav />
        </header>

        <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                <div className="flex space-x-6 h-full">
                    <LineChart style={{width: '100%', aspectRatio: 1.618, maxWidth: 600}}
                               responsive data={data}>
                        <CartesianGrid />    
                        <Line dataKey="uv" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend />
                    </LineChart>
                </div>
            </div>  
        </div>
    </main>
  )
}