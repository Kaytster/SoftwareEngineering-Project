"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css'
import "../pending-donation/donation.css";
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
    
            <div className="flex flex-col items-center p-4 mt-8">
                <div className="mb-6">
                    <div className="inline-block rounded-md bg-[#729458] text-white text-[26px] px-5 py-2">
                        View Inventory
                    </div>
                </div>
    
                {/* donations Table */}
                <table className="w-full max-w-6xl bg-white border rounded-md overflow-hidden">
                    <thead className="">
                        <tr>
                            <th className="px-3 border donorid-header">Donation ID</th>
                            <th className="px-8 border">Image</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Size</th>
                            <th className="p-3 border">Brand</th>
                            <th className="p-3 border">Colour</th>
                            <th className="p-5 border">Date and Time of Donation </th>
                            <th className="p-3 border">Status</th>
                            <th className="px-9 border">Action</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {donations.map((d: any) => (
                        <tr key={d.DonationID} className="text-center">
                            <td className="p-3 border donorid-col">{d.DonationID}</td>
                            <td className="px-8 py-10 border">
                                <Image
                                    src={`/images/${d.ServerName}`}
                                    width={140}
                                    height={150}
                                    alt="Donation Image"
                                    className="rounded"
                                />
                            </td>
                            <td className="p-3 border">{d.Description}</td>
                            <td className="p-3 border">{d.ClothingSize}</td>
                            <td className="p-3 border">{d.Brand}</td>
                            <td className="p-3 border">{d.Colour}</td>
                            <td className="p-3 border">{d.DateTime}</td>
                            <td className="p-3 border">{d.Status}</td>
                            <td className="p-3 border">
                                <button className="bg-[#729458] text-[18px] text-white px-4 py-2 rounded-full hover:bg-[#B6D99B] cursor-pointer"
                                        onClick={() => {
                                       
                                        router.push(`/editDonation/${d.ItemID}`); 
                                    }}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    
        );
    }


//     return (
//     <main>
//         <header>
//             <DonorNav />
//         </header>
//         <body>
//             <div className="flex flex-col p-10 justify-center">
//                 {/* labels sorted by */}
//                 <div className="flex flex-row justify-left gap-3">
//                     <button className="mb-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
//                         Today
//                         <Image src={X} alt="X" width={20} height={20} className=" mr-1 inline-block w-4  h-4 rounded-full"/>
//                     </button>
//                     <button className=" mb-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
//                         Coat
//                         <Image src={X} alt="X" width={20} height={20} className="mr-1 inline-block w-4  h-4 rounded-full"/>
//                     </button>
//                 </div>
//                 {/* items list */}
//                 <div className="flex flex-col p-10 justify-center">
//                     <ItemListed />
//                     <ItemListed />
//                     <ItemListed />
//                     <ItemListed />
//                     <ItemListed />
//                 </div>
//             </div>
//         </body>
//     </main>
//     )
// }