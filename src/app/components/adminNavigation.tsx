<<<<<<< HEAD
// <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/add-user" title="add user icons">Add user icons created by Freepik - Flaticon</a>
// <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a>
// <a href="https://www.flaticon.com/free-icons/profile" title="profile icons">Profile icons created by Freepik - Flaticon</a>
=======
>>>>>>> fec1aa38f946e2942e15b01890b1b6ca7b59359e
"use client"
import Image from "next/image"
import { usePathname } from "next/navigation";
import homeIcon from './icons/home.png';
<<<<<<< HEAD
import reportIcon from './icons/report.png';
import userIcon from './icons/userAccount.png';
import settingsIcon from './icons/setting.png';
import accountIcon from './icons/avatar.png';
export default function AdminNav() {
    const currentPath = usePathname();
    const links = [
      {href: '/dashboard/admin', label: 'Home', icon: homeIcon, path: '/dashboard/admin'},
      {href: '/reports', label: 'Reports', icon: reportIcon, path: '/reports'},
      {href: '/userAccounts', label: 'User Accounts', icon: userIcon, path: '/userAccounts'},
      {href: '/systemSettings', label: 'System Settings', icon: settingsIcon, path: '/systemSettings'},
      {href: '/account/admin', label: 'My Account', icon: accountIcon, path: '/account/donor'}
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
  return (
        <ul className="flex justify-around bg-[#9CB7C8]">
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
                    </ul>
  )
}
=======
import donateIcon from './icons/donate.png';
import inventoryIcon from './icons/inventory.png'
import statIcon from './icons/graph.png';
import accountIcon from './icons/avatar.png';
import Link from "next/link";
export default function AdminNav() {
  const currentPath = usePathname();
  const links = [
    {href: '/dashboard/admin', label: 'Home', icon: homeIcon, path: '/dashboard/admin'},
    {href: '/reports', label: 'Reports', icon: donateIcon, path: '/reports'},
    {href: '/systemSettings', label: 'System Settings', icon: inventoryIcon, path: '/systemSettings'},
    {href: '/userAccounts', label: 'User Accounts', icon: statIcon, path: '/userAccounts'},
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
  return (
        <ul className="flex justify-around bg-[#9CB7C8]">
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
            </ul>
  );
}
   
>>>>>>> fec1aa38f946e2942e15b01890b1b6ca7b59359e
