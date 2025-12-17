"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import homeIcon from './icons/home.png';
import donateIcon from './icons/donate.png';
import inventoryIcon from './icons/inventory.png'
import statIcon from './icons/graph.png';
import accountIcon from './icons/avatar.png';
import logoutIcon from "./icons/logout.png";
import Link from "next/link";
import { deleteSession } from "../../../lib/session";

export default function AdminNav() {
  const router = useRouter();
  const currentPath = usePathname();
  const links = [
    {href: '/dashboard/admin', label: 'Home', icon: homeIcon, path: '/dashboard/admin'},
    {href: '/reports', label: 'Reports', icon: donateIcon, path: '/reports'},
    {href: '/systemSettings', label: 'System Settings', icon: inventoryIcon, path: '/systemSettings'},
    {href: '/user-accounts', label: 'User Accounts', icon: statIcon, path: '/userAccounts'},
    {href: '/account/admin', label: 'My Account', icon: accountIcon, path: '/account/admin'}
  ];
  const navItems = "inline-block rounded-full py-2 px-4 hover:bg-[#3E592A] text-[#0C0C0C] flex items-center";
  const getLinks = (path: string) => {
    const isActive = currentPath == path;
    let linkItems = `${navItems} hover:bg-[#3b512a]`;
    if (isActive) {
      linkItems = `${navItems} bg-[#729458] hover:bg-[#3E592A]`;
    }
    return linkItems;
  };

  function handleLogOut(e: React.MouseEvent<HTMLButtonElement>): void {
    deleteSession().then(() => {
        router.push("/login");
      }
    );
  }

  return (
        <ul className="flex justify-around bg-[#9CB7C8] py-2">
              {links.map((link) => (
                <li key={link.path} className="mr-3">
                  <a className={getLinks(link.path)} href={link.href}>
                    <Image 
                          src={link.icon} 
                          alt={link.label} 
                          width={20} 
                          height={20} 
                          className="mr-1 inline-block" 
                      />
                      {link.label}
                  </a>
                </li>
              ))}
              <button onClick={handleLogOut} className="cursor-pointer hover:bg-[#3E592A] rounded-full py-2 px-4 text-[#0C0C0C]">
                <Image
                  src={logoutIcon}
                  alt="Logout icon"
                  width={20}
                  height={20}
                  className="mr-1 inline-block"
                />
                Log out
              </button>
            </ul>
  );
}
   