import Image from "next/image";
import './globals.css'

export default function Home() {
  return (
  <main>
    {/* NAV BAR */}
    <header> 
        <ul className="flex justify-around bg-[#9CB7C8]">
          <li className="mr-3">
            <a className="inline-block rounded-full py-2 px-4 bg-[#729458] hover:bg-[#3E592A] text-[#0C0C0C]" href="#">Home</a>
          </li>
          <li className="mr-3">
            <a className="inline-block rounded-full text-[#0C0C0C] hover:bg-[#B6D99B] py-2 px-4" href="#">Sign Up</a>
          </li>
          <li className="mr-3">
            <a className="inline-block rounded-full text-[#0C0C0C] hover:bg-[#B6D99B] py-2 px-4" href="#">Log In</a>
          </li>
      </ul>
    </header>

      <div className="relative w-300 h-100 mx-auto mt-20">
          <div className="absolute inset-0 bg-[#C0D6E4] border-2 border-[#608842] rounded-lg translate-x-3 translate-y-3 z-10"> </div>

          <div className="absolute inset-0 p-8 bg-[#E9F1F6] border-2 border-[#729458] rounded-lg shadow-xl z-20">
            <div className="flex space-x-6 h-full">
              {/* col1 */}
              <div className="w-1/2 flex  flex-col justify-center items-center"> 
                <h1 className="text-4xl font-bold text-center mb-2">Welcome to</h1>
                <h2 className="text-5xl font-extrabold text-center mb-6">SustainWear</h2>
              </div>
              {/* col2 */}
              <div className="w-1/2 flex  flex-col justify-center items-center">
                <p className="text-2xl text-center mb-8">Donating has never been easier.</p>
                
                <p className="text-center">
                    <a href="#" className="underline text-[#729458] hover:text-blue-800">Sign Up </a> 
                    or 
                    <a href="#" className="underline text-[#729458] hover:text-blue-800"> Log In </a> 
                    to get started.
                </p>
              </div>
            </div>
          </div>
    </div>

  </main>
  );
}
