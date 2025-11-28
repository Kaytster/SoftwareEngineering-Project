import '../globals.css'
import Image from 'next/image';
import sampleImage from '../components/icons/sampleIMG.jpg';
import CharityNav from '../components/charityNavigation';



export default function EditInventory() {
  return (
    <main>
        <header>
            <CharityNav />
        </header>

        <div className="relative w-300 h-130 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            <div className="flex space-x-6 h-full">
                <div className="w-1/3 flex  flex-col justify-center items-center">
                    {/* Profile Picture */}
                    <Image 
                    src={sampleImage} 
                    alt="Account" 
                    width={20} 
                    height={20} 
                    className="mr-1 inline-block w-70  h-130 rounded-md " 
                />

                </div>
                {/* col2 */}
                <div className="w-1/3 flex  flex-col justify-center items-center">
                        <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Edit Details</div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block mb-2 mt-5 text-sm font-medium text-[#0C0C0C]">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-40 px-4 py-2 border-2
                                                border-[#57809A] rounded-md
                                                focus:outline-none focus:ring-2
                                                focus:ring-blue-500 bg-[#DBEBF4] mb-5"
                                        placeholder="Enter Item Name"
                                    />
                                    <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-40 px-4 py-2 border-2
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
                                        className="w-40 px-4 py-2 border-2
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
                {/* Col 3 */}
                <div className="w-1/3 flex  flex-col justify-center items-center">
                        <div className="relative w-50 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                            <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3'>Actions</div>
                            <form className="space-y-4">
                                <div>
                                    
                                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 checked:text-red-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                                    <label className="block mb-2 text-sm font-medium text-[#0C0C0C]">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-40 px-4 py-2 border-2
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
                                        className="w-40 px-4 py-2 border-2
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