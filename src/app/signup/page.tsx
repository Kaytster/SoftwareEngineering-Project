"use client"
import '../globals.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function SignUp() {
    const router = useRouter();
        const backButton = () => {
            router.push('/')
        }

    //Form Data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    //Messages
    const [error, setError] = useState("");
    const [checkPass, setCheckPass] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setCheckPass("");
      setMessage("");
      
      if (password.length < 8) {
        return setCheckPass("Password must be at least 8 characters long.");
      }
      if (password !== confirmPass) {
        return setCheckPass("Passwords do not match.");
      }

      const formData = {
        email,
        password,
        firstName,
        lastName,
      };

      try {
        const res = await fetch ("/api/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Registration failed. Please try again.");
            return;
        }

        setMessage("Registration successful! Welcome to Sustainwear");

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");

        setTimeout(() => {
            router.push('/dashboard/donor');
        }, 3000);
      } catch (err) {
        setError("A network error has occured.");
        console.error(err);
      }
    }

  return (
    <main className="flex justify-center items-center min-h-screen"> 
        <button className="absolute top-4 left-4 bg-[#729458] hover:bg-[#B6D99B] text-[#fff] font-bold py-2 px-4 rounded-full cursor-pointer" onClick={backButton}>
            Back
        </button>
        <div className="flex flex-col items-center">
            <div className="relative mx-auto bg-[#9CB7C8] rounded-md flex flex-col items-center p-8">
                <div className='inline-block rounded-md bg-[#729458] text-[#0C0C0C] text-2xl px-3 mb-6'>Sign Up</div>

                {error && <div className="text-[#75100E] mb-4 font-semibold">{error}</div>}
                {checkPass && <div className="text-[#75100E] mb-4 font-semibold">{checkPass}</div>}
                {message && <div className="text-[#75100E] mb-4 font-semibold">{message}</div>}

                <form className="w-full max-w-lg" onSubmit={handleSignUp}>
                    {/* NAME */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   required />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Last Name
                            </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" 
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               required />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Email Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="email@email.com"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required />
                            <p className="text-gray-600 text-xs italic">Minimum 8 characters</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" 
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required />
                            <p className="text-gray-600 text-xs italic">Minimum 8 characters</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Confirm Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" 
                                   value={confirmPass}
                                   onChange={(e) => setConfirmPass(e.target.value)}
                                   required />
                        </div>
                    </div>
                <button className="mt-4 bg-[#729458] hover:bg-[#B6D99B] text-[#0C0C0C] font-bold py-2 px-10 text-l rounded-full cursor-pointer">
                    Submit
                </button>
                </form>

            </div>
        </div>
    </main>

  )
}