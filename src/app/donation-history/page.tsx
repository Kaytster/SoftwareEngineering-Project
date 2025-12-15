"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css'
import DonorNav from '../components/donorNavigation';
import Image from 'next/image';
import X from '../components/icons/X-image.png';
import sampleImg from '../components/icons/sampleIMG.jpg';
import ItemListed from '../components/item-listed';
export default function DonationHistory() {
    const router = useRouter();

    const [donations, setDonations] = useState([]);

    useEffect(() => {
        async function loadData() {
            const res = await fetch("/api/donation-history");
            const data = await res.json();
            setDonations(data);
        }
        loadData();
    }, []);

    return (
    <main>
        <header>
            <DonorNav />
        </header>
        <body>
            <div className="flex flex-col p-10 justify-center">
                {/* labels sorted by */}
                <div className="flex flex-row justify-left gap-3">
                    <button className="mb-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Today
                        <Image src={X} alt="X" width={20} height={20} className=" mr-1 inline-block w-4  h-4 rounded-full"/>
                    </button>
                    <button className=" mb-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Coat
                        <Image src={X} alt="X" width={20} height={20} className="mr-1 inline-block w-4  h-4 rounded-full"/>
                    </button>
                </div>
                {/* items list */}
                <div className="flex flex-col p-10 justify-center">
                    <ItemListed />
                    <ItemListed />
                    <ItemListed />
                    <ItemListed />
                    <ItemListed />
                </div>
            </div>
        </body>
    </main>
    )
}