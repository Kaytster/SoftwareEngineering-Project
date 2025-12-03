// <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/add-user" title="add user icons">Add user icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/profile" title="profile icons">Profile icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/authors/orvipixel" title="orvipixel"> orvipixel </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
"use client"
import Image from "next/image"
import { usePathname } from "next/navigation";
import homeIcon from './icons/home.png';
import donateIcon from './icons/donate.png';
import inventoryIcon from './icons/inventory.png'
import statIcon from './icons/graph.png';
import accountIcon from './icons/avatar.png';
export default function CharityNav() {
  const currentPath = usePathname();
  const links = [
    {href: '/dashboard/charity', label: 'Home', icon: homeIcon, path: '/dashboard/charity'},
    {href: '/pendingDonations', label: 'View Donations', icon: donateIcon, path: '/pendingDonations'},
    {href: '/viewInventory', label: 'View Inventory', icon: inventoryIcon, path: '/viewInventory'},
    {href: '/statistics/charity', label: 'View Statistics', icon: statIcon, path: '/statistics/charity'},
    {href: '/account/charity', label: 'My Account', icon: accountIcon, path: '/account/charity'}
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