"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminNav from "../components/charityNavigation";
import "../globals.css";
import "./donation.css";

interface Donation {
    DonationID: string;
    ServerName: string;
    Description: string;
    ClothingSize: string;
    Brand: string;
    Colour: string;
    DonorName: string;
    DateTime: string;
    Status: string;
}

export default function DisplayDonations() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const router = useRouter();

    // Load donations on page load
    useEffect(() => {
        async function loadData() {
        const res = await fetch("/api/pendingDonations");
        const data = await res.json();
        setDonations(data);
        }
        loadData();
    }, []);

    const handleEditStatus = (donationId: string) => {
    // Redirect to the edit status page with the donation ID
        router.push(`../editStatus?donationId=${donationId}`);
    };

    return (
    <main>
        <header>
            <AdminNav />
        </header>

        <div className="flex flex-col items-center p-4 mt-8">
            <div className="mb-6">
                <div className="inline-block rounded-md bg-[#729458] text-white text-[26px] px-5 py-2">
                    Pending Donations
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
                        <th className="px-9 border">Donor</th>
                        <th className="p-5 border">Date and Time of Donation </th>
                        <th className="p-3 border">Status</th>
                        <th className="px-9 border">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {donations.map((d) => (
                    <tr key={d.DonationID} className="text-center">
                        <td className="p-3 border donorid-col">{d.DonationID}</td>
                        <td className="px-8 py-10 border">
                            <Image
                                src={`/uploads/${d.ServerName}`}
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
                        <td className="p-3 border">{d.DonorName}</td>
                        <td className="p-3 border">{d.DateTime}</td>
                        <td className="p-3 status-colour border">{d.Status}</td>
                        <td className="p-3 border">
                            <button className="bg-[#729458] text-[18px] text-white px-4 py-2 rounded-full hover:bg-[#B6D99B]
                             cursor-pointer" onClick={() => handleEditStatus(d.DonationID)}>
                                Edit status
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
