// <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/add-user" title="add user icons">Add user icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/profile" title="profile icons">Profile icons created by Freepik - Flaticon</a>

"use client"
import Image from "next/image"
import { usePathname } from "next/navigation";
import homeIcon from './icons/home.png';
import signupIcon from './icons/add-user.png';
import loginIcon from './icons/avatar.png';
export default function LandingNav() {
  const currentPath = usePathname();
  const links = [
    {href: '/', label: 'Home', icon: homeIcon, path: '/'},
    {href: '/signup', label: 'Sign Up', icon: signupIcon, path: '/signup'},
    {href: '/login', label: 'Log In', icon: loginIcon, path: '/login'}
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