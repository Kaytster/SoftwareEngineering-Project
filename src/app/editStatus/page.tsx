"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";
import AdminNav from "../components/charityNavigation";
import "../globals.css";

export default function EditDonationStatus() {
    const router = useRouter();
    const backButton = () => {
      router.push('/pending-donation')
    }
    const searchParams = useSearchParams();
    const donationId = searchParams.get("donationId");


    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchDonation() {
        try {
            const res = await fetch(`/api/edit-status?donationId=${donationId}`);
            const data = await res.json();
            setStatus(data.Status);
        } 
        catch (err) {
            console.error(err);
        } 
        finally {
            setLoading(false);
        }}
        fetchDonation();
    }, [donationId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to update this status?");
        if (!confirmed) return; // stop if user cancels

        try {
            const res = await fetch(`/api/edit-status?donationId=${donationId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Status: status }),
        });
        

        if (res.ok) {
            alert("Status updated successfully!");
            router.push("/pending-donation");  
        } 
        else {
            setMessage("Failed to update status.");
        }} 
        
        catch (err) {
        console.error(err);
        setMessage("Error updating status.");
        }
    };

    return (
    <main>
        <header>
            <AdminNav />
        </header>

        <button className="absolute top-16 left-4 bg-[#729458] hover:bg-[#B6D99B] text-[#fff] text-xl font-bold py-2 px-4 rounded-full cursor-pointer" onClick={backButton}>
            Back
        </button>

        <div className="flex flex-col items-center p-4 mt-8">
            <div className="mb-6">
                <div className="inline-block rounded-md bg-[#729458] text-white text-[26px] px-5 py-2">
                    Edit Donation Status
                </div>
            </div>

            <div className="relative mx-auto bg-[#ccdde8] rounded-md flex flex-col items-center p-8 w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {message && <p className="mt-4 text-red-500 text-[18px]">{message}</p>}

                    <div className="flex items-center gap-9 text-[23px]">
                        <label className="flex flex-col font-bold">
                            Donation ID:
                        </label>
                        <p>{donationId}</p>
                    </div>
                    <div className="flex items-center gap-9 mb-10 text-[23px]">
                        <label className="flex flex-col font-bold">
                            Status:
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 p-2 border rounded cursor-pointer text-[20px]">

                            <option value="PENDING">PENDING</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </div>
                    

                    <button type="submit" className="bg-[#0b89d9] hover:bg-green-500 text-white py-2 rounded text-[20px] cursor-pointer">
                        Update Status
                    </button>

                </form>
            </div>
            
        </div>
                    
    </main>

    );
};