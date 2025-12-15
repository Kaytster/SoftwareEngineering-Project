"use client"
import AdminNav from '../components/adminNavigation';
import { useRouter } from 'next/navigation';
import '../globals.css'
import Image from 'next/image';
import Head from 'next/head';



export default function SystemSettings() {
    const router = useRouter();
  return (
        <main>
            <header>
                <AdminNav />
            </header>
            <div className="relative w-full max-w-6xl h-130 mx-auto mt-20">
                <div className=" p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                    <div className="flex flex-wrap items-start justify-center gap-6">
                        
                        <button className='inline-block rounded-full bg-[var(--secondary)] hover:bg-[#acd190] text-[#0C0C0C] text-m w-40 h-20 mb-10'
                        onClick={() => router.push('/systemSettings/notifications')}>
                            Manage Notifications
                        </button>
                        <button className='inline-block rounded-full bg-[var(--secondary)] hover:bg-[#acd190] text-[#0C0C0C] text-m w-40 h-20'
                        onClick={() => router.push('/systemSettings/emails')}>
                            Manage E-mail Templates
                        </button>

                    </div>
                </div>  
            </div>
        </main>
  )
}