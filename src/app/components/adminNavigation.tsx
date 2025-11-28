import Image from "next/image"
import homeIcon from './icons/home.png';
import loginIcon from './icons/avatar.png';
import editIcon from './icons/edit-icon-temp.png';
export default function AdminNav() {
  return (
        <ul className="flex justify-around bg-[#9CB7C8] py-3">
          <li className="mr-3">
            <a className="inline-block rounded-full py-2 px-4 bg-[#729458] hover:bg-[#3E592A] text-[#0C0C0C] flex items-center" href="#">
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
                  src={editIcon} 
                  alt="Review Donations" 
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
                  src={editIcon} 
                  alt="Review Accounts" 
                  width={20} 
                  height={20} 
                  className="mr-1 inline-block" 
              />
              Review Accounts
            </a>
          </li>
          <li className="mr-3">
            <a className="inline-block rounded-full text-[#0C0C0C] hover:bg-[#B6D99B] py-2 px-4 flex items-center cursor-pointer" href="#">
              <Image 
                  src={loginIcon} 
                  alt="My Account" 
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