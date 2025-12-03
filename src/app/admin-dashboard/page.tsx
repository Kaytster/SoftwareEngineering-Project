import '../globals.css'
import AdminNav from '../components/adminNavigation';
import Image from 'next/image';
import sampleImg from '../components/icons/sampleIMG.jpg';
export default function AdminDashboard() {
  return (
    <main>
        <header>
            <AdminNav />
        </header>
        <body>
            <div className="flex flex-row p-10 justify-center gap-10">
                {/* recent donation box */}
                <div className="relative w-100 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center pt-10"> 
                    <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-6'>
                        Recent Donation
                    </div>
                    <div className='inline-block rounded-md bg-[#ffffff] text-[#0C0C0C] text-2xl px-3 mb-6'>
                        Status
                    </div>
                    <Image src={sampleImg} alt="clothing item" width={20} height={20} className=" mr-1 inline-block w-40  h-40 rounded-full"/>
                    <div className="p-10 flex-wrap text-center text-xl">
                        filler text bbbbbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbb 
                    </div>
                </div>
                {/* recent statistics box */}
                <div className="relative w-100 h-120 mx-auto mb-1 bg-[#9CB7C8] rounded-md flex flex-col items-center justify-center"> 
                    <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-6'>
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
                        10 kg
                        </div>
                    </div>
                    <p className="text-center text-xl">
                    <br></br>
                    CO<sub>2</sub> saved this month
                    </p>
                </div>
            </div>
        </body>
    </main>
    )
}