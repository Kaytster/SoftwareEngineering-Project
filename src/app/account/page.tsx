import '../globals.css'
import Image from 'next/image';
import sampleImage from '../components/icons/sampleIMG.jpg';
import DonorNav from "../components/donorNavigation";
export default function Home() {
  return (
    <main>
        <header>
            <DonorNav />
        </header>

        <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            <div className="flex space-x-6 h-full">
                <div className="w-1/2 flex  flex-col justify-center items-center">
                    {/* Profile Picture */}
                    <Image 
                    src={sampleImage} 
                    alt="Account" 
                    width={20} 
                    height={20} 
                    className="mr-1 inline-block w-70  h-100 rounded-full " 
                />

                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Add/Edit Image
                    </button>
                </div>
                {/* col2 */}
                <div className="w-1/2 flex  flex-col justify-center items-center">
                        <div className="relative w-100 h-100 mx-auto mt-1 bg-[#9CB7C8] rounded-md"> 
                            <p>USERNAME</p>
                            <p>TYPE</p>
                            <p>NAME</p>
                            <p>PICKUP POINT</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </main>
  )
}