'use client'
import '@/app/globals.css'
import Image from 'next/image';
import AdminNav from '@/app/components/adminNavigation';
import ActiveUsersChart from '../components/charts/activeUsers';
import AcceptedDonationsChart from '../components/charts/acceptedDonations';
import CreatedDonationsChart from '../components/charts/createdDonations';
import { useState, useEffect } from 'react';

//How many active users
//How many accepted donations
//How many donations created

// const activeUserData = [
//     {month: 'Jan', activeUsers: 10},
//     {month: 'Feb', activeUsers: 15},
//     {month: 'Mar', activeUsers: 20},
//     {month: 'Apr', activeUsers: 25},
//     {month: 'May', activeUsers: 30},
//     {month: 'Jun', activeUsers: 35},
//     {month: 'Jul', activeUsers: 20},
//     {month: 'Aug', activeUsers: 21},
//     {month: 'Sep', activeUsers: 32},
//     {month: 'Oct', activeUsers: 33},
//     {month: 'Nov', activeUsers: 30},
//     {month: 'Dec', activeUsers: 30},
// ];

// const acceptedDonationsData = [
//     {month: 'Jan', acceptedDonations: 10},
//     {month: 'Feb', acceptedDonations: 15},
//     {month: 'Mar', acceptedDonations: 20},
//     {month: 'Apr', acceptedDonations: 25},
//     {month: 'May', acceptedDonations: 30},
//     {month: 'Jun', acceptedDonations: 50},
//     {month: 'Jul', acceptedDonations: 20},
//     {month: 'Aug', acceptedDonations: 21},
//     {month: 'Sep', acceptedDonations: 32},
//     {month: 'Oct', acceptedDonations: 33},
//     {month: 'Nov', acceptedDonations: 30},
//     {month: 'Dec', acceptedDonations: 30},
// ];
const createdDonationsData = [
    {month: 'Jan', createdDonations: 10},
    {month: 'Feb', createdDonations: 15},
    {month: 'Mar', createdDonations: 20},
    {month: 'Apr', createdDonations: 25},
    {month: 'May', createdDonations: 30},
    {month: 'Jun', createdDonations: 35},
    {month: 'Jul', createdDonations: 20},
    {month: 'Aug', createdDonations: 50},
    {month: 'Sep', createdDonations: 32},
    {month: 'Oct', createdDonations: 33},
    {month: 'Nov', createdDonations: 30},
    {month: 'Dec', createdDonations: 30},
];

export type ReportName = 'activeUsers' | 'acceptedDonations' | 'createdDonations';
export type DataPoint = {
    month: string;
    activeUsers?: number;
    acceptedDonations?: number;
    createdDonations?: number;
}
export type ReportData = DataPoint[];


export default function Reports() {
  const [activeUserData, setActiveUserData] = useState<ReportData>([]);
  const [acceptedDonationsData, setAcceptedDonationsData] = useState<ReportData>([]);
  const [createdDonationsData, setCreatedDonationsData] = useState<ReportData>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [activeReport, setActiveReport] = useState<ReportName>('activeUsers');
  
  const getTabClass = (reportName: ReportName) => {
    const isActive = activeReport === reportName;
    let classes = 'inline-block py-2 px-4 font-semibold cursor-pointer transition duration-150 ease-in-out';
    if (isActive) {
        classes += 'bg-white border-l border-t border-r rounded-t text-blue-700';
    } else {
        classes += 'bg-white text-blue-500 hover:text-blue-800';
    }
    return classes;
  }

  const renderChart = () => {
    if (isLoading) {
        return <div className="text-center py-20 text-lg text-gray-500">Loading Active Users Data...</div>
    }
    if (activeReport === 'activeUsers' && activeUserData.length === 0) {
        return <div className="text-center py-20 text-lg text-red-500">No Active Users Data Available for this period.</div>
    }

    switch (activeReport) {
        case 'activeUsers':
            return <ActiveUsersChart data={activeUserData} />;
        case 'acceptedDonations':
            return <AcceptedDonationsChart data={acceptedDonationsData} />;
        case 'createdDonations':
            return <CreatedDonationsChart data={createdDonationsData} />;
        default:
            return <ActiveUsersChart data={activeUserData} />;
    }
  }

  useEffect(() => {
    async function fetchActiveUsersData() {
        try {
            const response = await fetch ('/api/reports/active-users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ReportData = await response.json();
            setActiveUserData(data);
        } catch (error) {
            console.error("error fetching active users report: ", error);
        } finally {
            setIsLoading(false);
        }
    }
    fetchActiveUsersData();

    async function fetchAcceptedDonationsData() {
          try {
              const response = await fetch ('/api/reports/accepted-donations');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data: ReportData = await response.json();
              setAcceptedDonationsData(data);
          } catch (error) {
              console.error("error fetching accepted donations report: ", error);
          } finally {
              setIsLoading(false);
          }
      }
      fetchAcceptedDonationsData();

      async function fetchCreatedDonationsData() {
          try {
              const response = await fetch ('/api/reports/created-donations');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data: ReportData = await response.json();
              setCreatedDonationsData(data);
          } catch (error) {
              console.error("error fetching created donations report: ", error);
          } finally {
              setIsLoading(false);
          }
      }
      fetchCreatedDonationsData();
  }, []);
  

  return (
      <main>
        
        <header>
            <AdminNav />
        </header>

        <div className="relative w-300 h-100 mx-auto mt-20">
            <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
                <div className="flex flex-col space-y-4 space-x-6 h-full">
                    <div>
                        <ul className='flex border-b'>
                            <li className='-mb-px  mr-1'>
                                <a className={getTabClass('activeUsers')} 
                                   onClick={() => setActiveReport('activeUsers')}>
                                    Tab 1
                                </a>
                            </li>
                            <li className='mr-1'>
                                <a className={getTabClass('acceptedDonations')} 
                                   onClick={() => setActiveReport('acceptedDonations')}>
                                    Tab 2
                                </a>
                            </li>
                            <li className='mr-1'>
                                <a className={getTabClass('createdDonations')} 
                                   onClick={() => setActiveReport('createdDonations')}>
                                    Tab 3
                                </a>
                            </li>
                        </ul>
                        {renderChart()}
                    </div>
                </div>
            </div> 
        </div> 
    </main>
  )
}