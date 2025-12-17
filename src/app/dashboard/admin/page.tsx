"use client";
import AdminNav from '@/app/components/adminNavigation';
import '@/app/globals.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//for charts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, BarChart, Bar, Legend } from 'recharts'; 


export default function AdminDashboard() {
    //const [weeklyDonations, setWeeklyDonations] = useState([]);
    const [allDonations, setAllDonations] = useState([])
    const [viewMode, setViewMode] = useState<"week" | "month">("week");

    const [usersRoles, setUsersRoles] = useState([]);
    const router = useRouter();

    //for distribution
    useEffect(() => {
        async function loadDonation() {
            // const res = await fetch("/api/allDonationsPerW");
            // const data = await res.json();
            // setWeeklyDonations(data);

            const endpoint =
                viewMode === "week"
                    ? "/api/allDonationsPerW"
                    : "/api/allDonationsPerM";

            const res = await fetch(endpoint);
            const data = await res.json();
            setAllDonations(data);

            const userRes = await fetch("/api/usersRoles");
            const userData = await userRes.json();
            setUsersRoles(userData);
        }
        loadDonation();
    }, [viewMode]);

    return (
    <main>
        <header>
            <AdminNav />
        </header>
        <body>
            <div className="flex flex-row p-10 justify-center gap-8">
                {/* monitor platform usage --> donations made per week and moth */}
                <div className="relative w-110 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                    <div className='inline-block rounded-md bg-[#62804b] text-[#fff] text-2xl px-3 mt-5 mb-6'>
                        Donations Per Week/Month
                    </div>

                    <div className="bg-white p-3 mr-[15px] ml-[15px] w-[390px] h-[370px] rounded-md border border-gray-200">
                        <select value={viewMode}
                            onChange={(e) => setViewMode(e.target.value as "week" | "month")}
                            className="mb-4 px-3 py-2 rounded-md border border-gray-300"
                        >
                            <option value="week">Per Week</option>
                            <option value="month">Per Month</option>
                        </select>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={allDonations}
                            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey={viewMode === "week" ? "week" : "month"}>
                                    <Label value={viewMode === "week" ? "Amount of donations" : "Amount of donations"} position="bottom"/>
                                </XAxis>

                                <YAxis allowDecimals={false}>
                                    <Label value={viewMode === "week" ? "Donations Per Week" : "Donations Per Month"} angle={-90} position="insideLeft" dy={60}/>
                                </YAxis>

                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#ca7c28ff" strokeWidth={3}/>
                            </LineChart>    
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* users roles levels */}
                <div className="relative w-140 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                    <div className='inline-block rounded-md bg-[#62804b] text-[#fff] text-2xl px-3 mt-10 mb-6'>
                        Amount of users
                    </div>
                    <div className="bg-white p-2 my-[3px] w-[500px] h-[360px] rounded-md border border-gray-200">
                        <ResponsiveContainer width="100%" height={330}>
                            <BarChart data={usersRoles} layout="vertical" margin={{ left: 55 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category" dataKey="role" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#ca7c28ff" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* recent statistics box */}
                <div className="relative w-100 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                    <div className='inline-block rounded-md bg-[#729458] text-[#fff] text-2xl px-3 mb-6'>
                        Recent Statistics
                    </div>
                    <div
                        className="aspect-1/1 bg-gray-300 rounded-full flex justify-center items-center w-70"
                        style={{
                            backgroundImage:
                            "conic-gradient(#729458 0, #729458 120deg, #44403b 120deg, #44403b 0)"
                        }}
                    >
                        <div
                            className="aspect-1/1 rounded-full bg-secondary flex justify-center items-center text-4xl font-bold"
                            style={{ width: "calc(100% - 3rem)" }}
                        >
                        30
                        </div>
                    </div>
                    <p className="text-center text-xl">
                    <br></br>
                    accounts managed this month
                    </p>
                </div>
            </div>
        </body>
    </main>
    )
}
