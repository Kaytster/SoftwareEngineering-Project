import '@/app/globals.css'
import Image from 'next/image';
import sampleImage from '@/app/components/icons/sampleIMG.jpg';
import DonorNav from '@/app/components/charityNavigation';
export default function CharityDashboard() {
const progressCircle = ({totalWeight, currentWeight}) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const percentage = (currentWeight / totalWeight);
    const strokeDashoffset = circumference - (percentage * circumference);
    const progressColourClass = 'stroke-lime-600'; 
}

  return (
    <main>
        <header>
            <DonorNav />
        </header>

        <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            <div className="flex space-x-6 h-full">
                <div className="w-1/2 flex  flex-col justify-center items-center">
                    <svg
                    className="w-40 h-40 transform -rotate-90"
                    viewBox="0 0 120 120"
                    >
                        <circle
                        className="stroke-stone-800"
                        strokeWidth={10}
                        fill='transparent'
                        r={radius}
                        cx={60}
                        cy={60}
                        strokeLinecap='round'
                        />
                    </svg>

                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Add/Edit Image
                    </button>
                </div>
                {/* col2 */}
                <div className="w-1/2 flex  flex-col justify-center items-center">
                        <div className="relative w-100 h-100 mx-auto mb-1 bg-[#9CB7C8] rounded-md"> 
                            <p className='ml-10 mt-10'>USERNAME</p>
                            <div className='flex items-center'>
                                <p className='ml-10 mt-5'>Type: </p> 
                                <p className='ml-5 mt-5'>Donor</p>
                            </div>
                            <div className='flex items-center'>
                                <p className='ml-10 mt-5'>Name: </p>
                                <p className='ml-5 mt-5'>Firstname Lastname</p>
                            </div>
                            <div className='flex items-center'>
                                <p className='ml-10 mt-5'>Email: </p>
                                <p className='ml-5 mt-5'>email@email.com</p>
                            </div>
                            <div className='flex items-center'>
                                <p className='ml-10 mt-5 mb-10'>Pickup Point: </p>
                                <p className='ml-5 mt-5 mb-10'>123 New Street</p>
                            </div>
                        </div>
                        <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Edit
                        </button>
                    </div>
                </div>
            </div>  
        </div>
    </main>
  )
}