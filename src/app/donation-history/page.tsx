import '../globals.css'
import DonorNav from '../components/donorNavigation';
import Image from 'next/image';
import X from '../components/icons/X-image.png';
import sampleImg from '../components/icons/sampleIMG.jpg';
export default function DonationHistory() {
    return (
    <main>
        <header>
            <DonorNav />
        </header>
        <body>
            <div className="flex flex-col p-10 justify-center">
                {/* labels sorted by */}
                <div className="flex flex-row justify-left">
                    <button className=" mb-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Today
                        <Image src={X} alt="X" width={20} height={20} className="mr-1 inline-block w-4  h-4 rounded-full"/>
                    </button>
                    <button className=" mb-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Coat
                        <Image src={X} alt="X" width={20} height={20} className="mr-1 inline-block w-4  h-4 rounded-full"/>
                    </button>
                </div>
                {/* items list */}
                <div className="flex flex-col p-10 justify-center">
                    {/* 1 */}
                    <div className="flex flex-row justify-center">
                        <Image src={sampleImg} alt="item" width={20} height={20} className="mr-1 inline-block w-20  h-20 rounded-full"/>
                        <div className=" ">
                            <div className="relative w-250 h-20 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                                Name of item + details
                            </div>
                        </div>
                        <button className="ml-4 h-10 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Accepted
                        </button>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-row justify-center">
                        <Image src={sampleImg} alt="item" width={20} height={20} className="mr-1 inline-block w-20  h-20 rounded-full"/>
                        <div className=" ">
                            <div className="relative w-250 h-20 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> </div>
                        </div>
                        <button className="ml-4 h-10 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Accepted
                        </button>
                    </div>
                    {/* 3 */}
                    <div className="flex flex-row justify-center">
                        <Image src={sampleImg} alt="item" width={20} height={20} className="mr-1 inline-block w-20  h-20 rounded-full"/>
                        <div className=" ">
                            <div className="relative w-250 h-20 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> </div>
                        </div>
                        <button className="ml-4 h-10 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Accepted
                        </button>
                    </div>
                    {/* 4 */}
                    <div className="flex flex-row justify-center">
                        <Image src={sampleImg} alt="item" width={20} height={20} className="mr-1 inline-block w-20  h-20 rounded-full"/>
                        <div className=" ">
                            <div className="relative w-250 h-20 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> </div>
                        </div>
                        <button className="ml-4 h-10 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                            Accepted
                        </button>
                    </div>
                </div>
            </div>
        </body>
    </main>
    )
}