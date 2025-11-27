import AdminNav from '../components/adminNavigation';
import '../globals.css'
import Image from 'next/image';
export default function SystemSettings() {
  return (
    <main>
        <header>
            <AdminNav />
        </header>
        <div className="relative w-300 h-130 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            <div className="flex space-x-6 h-full">
                {/* col1 */}
                <div className="w-1/4 flex  flex-col justify-center items-center">
                    {/* Manage Notifications and Email templates */}
                    <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Manage Notifications
                            </button>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20'>
                                Manage E-mail Templates
                            </button>
                    </div>
                </div>
                {/* col2 */}
                <div className="w-1/4 flex  flex-col justify-center items-center">
                    {/* Manage categories and condition tiers */}
                        <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Manage Categories
                            </button>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20'>
                                Manage Condition Tiers
                            </button>
                            
                        </div>
                    </div>
                </div>
                {/* col3 */}
                <div className="w-1/4 flex  flex-col justify-center items-center">
                    {/* Approving new charities */} 
                    <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Manage Charities
                            </button>
                            
                    </div>
                </div>
                {/* col4 */}
                <div className="w-1/4 flex  flex-col justify-center items-center">
                    {/* Session Timeouts */}
                    <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-10'>Edit Details</div>
                            <button className='inline-block rounded-full bg-[var(--primaryLight)] text-[#0C0C0C] text-m w-40 h-20 mb-10'>
                                Session Timeouts
                            </button>
                    </div>
                </div>
            </div>  
        </div>
    </main>
  )
}