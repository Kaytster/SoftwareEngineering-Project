"use client"
import AdminNav from '../components/adminNavigation';
import { useRouter } from 'next/navigation';
import '../globals.css'
import Image from 'next/image';
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
                    
                    {/* col1 */}
                    <div className="mr-10 flex flex-col justify-center items-center">
                        {/* Manage Notifications and Email templates */}
                        <div className="relative w-48 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center p-4 pt-6"> 
                                <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                                <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'
                                onClick={() => router.push('/systemSettings/notifications')}>
                                    Manage Notifications
                                </button>
                                <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20'>
                                    Manage E-mail Templates
                                </button>
                        </div>
                    </div>

                    {/* col2 */}
                    <div className="mr-10 flex flex-col justify-center items-center">
                        {/* Manage categories and condition tiers */}
                        <div className="relative w-48 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center p-4 pt-6"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Manage Categories
                            </button>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20'>
                                Manage Condition Tiers
                            </button> 
                        </div>
                    </div>

                    {/* col3 */}
                    <div className="mr-10 flex flex-col justify-center items-center">
                        {/* Approving new charities */} 
                        <div className="relative w-48 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center p-4 pt-6"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Manage Charities
                            </button>   
                        </div>
                    </div>
                    {/* col4 */}
                    <div className=" flex flex-col justify-center items-center">
                        {/* Session Timeouts */}
                        <div className="relative w-48 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center p-4 pt-6"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Session Timeouts
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </main>
  )
}