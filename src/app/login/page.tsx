import '../globals.css'
import Image from 'next/image';
import LandingNav from '../components/landingNavigation';

export default function Home() {
  return (
  <main>
    {/* NAV BAR */}
    <header> 
        <LandingNav />
    </header>

      <div className="flex justify-center mx-auto mt-20">
        <div className="relative mx-auto bg-[#9CB7C8] rounded-md flex flex-col items-center p-8 w-full max-w-2xl">
          <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-3xl px-3 mb-6'>Log In</div>

          <form className="w-full">
            {/* Email address */}
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email Address
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="email@email.com" />
                </div>
            </div>

            {/* Password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Password
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
              </div>
            </div>
            
          </form>
          <button className="mt-2 bg-[#fff] hover:bg-[#B6D99B] text-[#546e41] font-bold py-2 px-10 text-xl border-2 border-gray-600 rounded-full cursor-pointer">
              Log in
          </button>

        </div>
      </div>
      

  </main>
  );
}
