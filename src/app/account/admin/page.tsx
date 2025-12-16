import '@/app/globals.css'
import AdminNav from '../../components/adminNavigation';
import Image from 'next/image';
import avatar from '../components/icons/pfp-icon-temp.png';
export default function adminAccount() {
  return (
    <main>
        <header>
            <AdminNav />
        </header>
        <body>
            <div className="flex p-4 justify-center">
                <div className="flex flex-col p-10 justify-center">
                    <div className="flex flex-row justify-left">
                        <Image 
                        src={avatar} 
                        alt="Avatar" 
                        width={20} 
                        height={20} 
                        className="mr-1 inline-block w-100  h-100 rounded-full" 
                        />
                    </div>
                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Add/Edit Image
                    </button>
                </div>
                
                <div className="flex flex-col p-10 justify-center">
                    <div className='inline-block p-12 rounded-md bg-[#9CB7C8] text-[#0C0C0C] text-2xl min-w-150 min-h-100'>
                        <p>[username]</p>
                        <br />
                        <p>type: Staff</p>
                        <br />
                        <p>Name: [First Last]</p>
                        <br />
                        <p>Email: [email address]</p>
                        <br />
                        <p>Number: [number]</p>
                    </div>
                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Edit
                    </button>
                </div>
            </div>
        </body>
    </main>
    )
}