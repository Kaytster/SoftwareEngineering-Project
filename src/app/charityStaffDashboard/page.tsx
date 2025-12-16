"use client";
import '../globals.css';
import CharityNav from '../components/charityNavigation';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//for charts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, BarChart, Bar, Legend } from 'recharts'; 



export default function CharityDashboard() {
    const [donation, setDonation] = useState<any>(null);
    const [weeklyDistributions, setWeeklyDistributions] = useState([]);
    const [stockByCategory, setStockByCategory] = useState([]);
    const router = useRouter();

    //for distribution
    useEffect(() => {
        async function loadDonation() {
            const res = await fetch("/api/recentDonation");
            const data = await res.json();
            setDonation(data[0]);
            
            const distRes = await fetch("/api/distPerWeek");
            const distData = await distRes.json();
            setWeeklyDistributions(distData);

            const stockRes = await fetch("/api/stockByCategory");
            const stockData = await stockRes.json();
            setStockByCategory(stockData);
        }
        loadDonation();
    }, []);

    const handleEditStatus = (donationId: string) => {
    // Redirect to the edit status page with the donation ID
        router.push(`../editStatus?donationId=${donationId}`);
    };

    return (
    <main>
        <header>
            <CharityNav />
        </header>
        
        <div className="flex flex-row p-10 justify-center gap-8">
            {/* recent donation box */}
            <div className="relative w-100 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center pt-10 text-[20px] py-15"> 
                <div className='inline-block rounded-md bg-[#62804b] text-[#fff] text-2xl px-3 mt-10 mb-6'>
                    Recent Donation
                </div>

                <div className="w-90 rounded-md bg-[#f2f0f0] p-2 mx-5 ">
                    <div className="inline-block text-[#0C0C0C] font-bold pl-4 pr-3">Status:</div>
                    <div className="inline-block text-[#0C0C0C]">{donation ? donation.Status : "Loading..."}</div>

                    <button className="bg-[#729458] text-[18px] text-white px-4 py-2 ml-2 rounded-full hover:bg-[#B6D99B]
                            cursor-pointer" onClick={() => handleEditStatus(donation.DonationID)}>
                            Edit status
                    </button>
                </div>
                
                {donation && (
                    <div className="w-90 m-2 rounded-md  flex justify-center items-center bg-[#f2f0f0]">
                        <Image
                            src={`/uploads/${donation.ServerName}`}
                            width={140}
                                height={150}
                            alt="Clothing Item Image"
                            className="mr-1 inline-block w-40 h-40 mb-2 rounded-md center"
                        />
                    </div>
                )}

                {/* item desc */}
                <div className="m-4 pl-4 py-3 rounded-md flex-wrap bg-[#f2f0f0] text-[18px]">
                    {donation ? (
                        <>
                            <p><strong>Donor:</strong> {donation.DonorName}</p>
                            <p><strong>Item Description:</strong> {donation.Description}, {donation.Brand}, {donation.Colour}</p>
                            <p><strong>Date:</strong> {donation.DateTime}</p>
                        </>
                        ) : 
                        ("Loading recent donation.")
                    } 
                </div>
            </div>



            {/* weekly distribution box*/}
            <div className="relative w-full max-w-[450px] min-h-[400px] mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                <div className='inline-block rounded-md bg-[#62804b] text-[#fff] text-2xl px-3 mb-6'>
                    Distribution per week
                </div>


                <div className="bg-white p-3 my-[3px] w-[390px] h-[380px] rounded-md border border-gray-200">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={weeklyDistributions}
                        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="week">
                                <Label value="Week Range" position="bottom"/>
                            </XAxis>

                            <YAxis allowDecimals={false}>
                                <Label value="Donations Per Week" angle={-90} position="insideLeft" dy={60}/>
                            </YAxis>

                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#ca7c28ff" strokeWidth={3}/>
                        </LineChart>    
                    </ResponsiveContainer>
                </div>
            </div>



            {/* stock levels by category box */}
            <div className="relative w-150 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                <div className='inline-block rounded-md bg-[#62804b] text-[#fff] text-2xl px-3 mb-6'>
                    Current Stock Levels by Category
                </div>

                <div className="bg-white p-3 my-[3px] w-[480px] h-[380px] rounded-md border border-gray-200">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={stockByCategory} layout="vertical" margin={{ left: 35 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#ca7c28ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>



        </div>
        
    </main>
    )
}