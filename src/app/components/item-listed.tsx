import Image from "next/image";
import sampleImg from '../components/icons/sampleIMG.jpg';
export default function itemListed() {
    return (
        <div className="flex flex-row justify-center gap-3 p-2">
            <Image src={sampleImg} alt="item" width={20} height={20} className="mr-1 inline-block w-30 h-30 rounded-full"/>
            <div className=" ">
                <div className="relative w-220 h-30 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                    Name of item + details
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <button className="ml-4 w-40 h-15 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                    Accepted
                </button>
            </div>
        </div>
    )
}