import '../globals.css'
import AdminNav from '../components/charityNavigation';
import Image from 'next/image';
import avatar from '../components/icons/avatar.png';
export default function Function1() {
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
                        Submit
                    </button>
                </div>
                
                <div className="flex flex-col p-10 justify-center">
                    <div className='inline-block p-10 rounded-md bg-[#729458] text-[#0C0C0C] text-2xl min-w-150 min-h-100'>
                        <p>[username]</p>
                        <p>type: Donor</p>
                        <p>Name: [First Last]</p>
                        <p>Email: [email address]</p>
                        <p>Pick up point: [address]</p>
                    </div>
                    <button className=" mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-4 rounded-full">
                        Submit
                    </button>
                </div>
            </div>
        </body>
    </main>
    )
}