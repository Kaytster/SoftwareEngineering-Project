"use client";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import '../globals.css'
import Image from 'next/image';
import LandingNav from '../components/landingNavigation';

export default function LoginPage() {
  const router = useRouter();
  const backButton = () => {
      router.push('/')
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); // reset error

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // redirect to page based on role
    if (data.role === "Donor") {
      window.location.href = "/dashboard/donor";
    } else if (data.role === "CharityWorker") {
      window.location.href = "/dashboard/charity";
    } else if (data.role === "Admin") {
      window.location.href = "/admin-account";
    }
  }

  const togglePassword = () => {
    const passwordField = document.getElementById("grid-password") as HTMLInputElement | null;
    if (passwordField) {
      passwordField.type = passwordField.type === "password" ? "text" : "password";
    }
  };
  

  return (
  <main>
    <button className="absolute top-4 left-4 bg-[#729458] hover:bg-[#B6D99B] text-[#fff] font-bold py-2 px-4 rounded-full cursor-pointer" onClick={backButton}>
      Back
    </button>

      <div className="flex justify-center mx-auto mt-20">
        <div className="relative mx-auto bg-[#9CB7C8] rounded-md flex flex-col items-center p-8 w-full max-w-2xl">
          <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-3xl px-3 mb-6'>Log In</div>

          {/* error message */}
          {error && (
            <div className="w-full text-center mb-4 text-[#75100E] font-semibold">
              {error}
            </div>
          )}

          <form className="w-full" onSubmit={handleLogin}>
            {/* Email address */}
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email Address
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" 
                      type="email" 
                      placeholder="myemail@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>

            {/* Password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Password
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" 
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            
            {/* show password checkbox */}
            <div className="flex items-center justify-end mt-2 mb-2">
              <input id="show-password-checkbox" type="checkbox" className="w-4 h-4 text-[#729458] bg-gray-100 border-gray-300 rounded"
                onChange={togglePassword}
              />
              <label htmlFor="show-password-checkbox" className="ml-2 text-sm font-medium text-gray-800 select-none">
                Show Password
              </label>
            </div>

            <button type="submit" className="flex items-center mt-2 bg-[#fff] hover:bg-[#B6D99B] text-[#546e41] font-bold py-2 px-10 text-xl border-2 border-gray-600 rounded-full cursor-pointer">
              Log in
            </button>
          </form>

        </div>
      </div>
  </main>

  
  );
}

