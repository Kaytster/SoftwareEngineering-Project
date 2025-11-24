import Image from "next/image"
import homeIcon from './icons/home.png';
import signupIcon from './icons/add-user.png';
import loginIcon from './icons/avatar.png';
export default function AdminNav() {
  return (
        <ul className="flex justify-around bg-[#9CB7C8]">
          <li className="mr-3">
            <a className="inline-block rounded-full py-2 px-4 bg-[#729458] hover:bg-[#3E592A] text-[#0C0C0C] flex items-center cursor-pointer" href="#">
              <Image 
                  src={homeIcon} 
                  alt="Home" 
                  width={20} 
                  height={20} 
                  className="mr-1 inline-block" 
              />
              Home
              </a>
          </li>
          <li className="mr-3">
            <a className="inline-block rounded-full text-[#0C0C0C] hover:bg-[#B6D99B] py-2 px-4 flex items-center cursor-pointer" href="#">
              <Image 
                  src={signupIcon} 
                  alt="Sign Up" 
                  width={20} 
                  height={20} 
                  className="mr-1 inline-block" 
              />
              Review Donations
            </a>
          </li>
          <li className="mr-3">
            <a className="inline-block rounded-full text-[#0C0C0C] hover:bg-[#B6D99B] py-2 px-4 flex items-center cursor-pointer" href="#">
              <Image 
                  src={loginIcon} 
                  alt="Log In" 
                  width={20} 
                  height={20} 
                  className="mr-1 inline-block" 
              />
              Review Account
            </a>
          </li>
          <li className="mr-3">
            <a className="inline-block rounded-full text-[#0C0C0C] hover:bg-[#B6D99B] py-2 px-4 flex items-center cursor-pointer" href="#">
              <Image 
                  src={loginIcon} 
                  alt="Log In" 
                  width={20} 
                  height={20} 
                  className="mr-1 inline-block" 
              />
              My Account
            </a>
          </li>
      </ul>
  )
}