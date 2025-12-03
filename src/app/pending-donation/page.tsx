import '../globals.css'
import AdminNav from '../components/charityNavigation';
import Image from 'next/image';
import avatar from '../components/icons/pfp-icon-temp.png';
export default function Function1() {
  return (
    <main>
        <header>
            <AdminNav />
        </header>
        <body>
            <div className="flex p-4 justify-center">
                <div className="flex flex-col p-10 justify-center">
                    <label className='inline-block rounded-md bg-[#729458] text-[#ffffff] text-3xl px-3 mb-6'>Pending Donations</label>
                </div>
                
                
                    
                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Edit
                    </button>
                
            </div>
        </body>
    </main>
  )
}