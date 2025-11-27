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
                <div className="w-1/2 flex  flex-col justify-center items-center">
                    {/* Profile Picture */}
                    
                    {/* Manage Notifications and Email templates */}
                    {/* Manage categories and condition tiers */}
                    {/* Approving new charities */} 
                    {/* Session Timeouts */}
                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Add/Edit Image
                    </button>
                </div>
                {/* col2 */}
                <div className="w-1/2 flex  flex-col justify-center items-center">
                        <div className="relative w-100 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Edit Details</div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block mb-2 mt-5 text-sm font-medium text-[#0C0C0C]">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-70 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5"
                                        placeholder="Enter Item Name"
                                    />
                                    <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-70 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5"
                                        placeholder="Enter Item Description"
                                    />
                                    <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        className="w-70 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4]"
                                        placeholder="Enter Tags"
                                    />
                                </div>
                            </form>
                        </div>
                        <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Submit
                        </button>
                    </div>
                </div>
            </div>  
        </div>
    </main>
  )
}