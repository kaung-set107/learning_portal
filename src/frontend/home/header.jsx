import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import AcmeLogo from "../../assets/lp.png";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";

export default function App() {
  const [activeLink, setActiveLink] = useState("/home");
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const links = [
    { href: "/home", text: "Home" },
    { href: "/course", text: "Course" },
    { href: "/class", text: "Class" },
    { href: "/sub", text: "Subjects" },
    { href: "/contact", text: "Contact" },
    // Add more links as needed
  ];
  //   const menuItems = [
  //   "Profile",
  //   "Dashboard",
  //   "Activity",
  //   "Analytics",
  //   "System",
  //   "Deployments",
  //   "My Settings",
  //   "Team Settings",
  //   "Help & Feedback",
  //   "Log Out",
  // ];
  return (
    <>
    <Navbar className='bg-slate-100  py-3'>
      <div className=''>
        {/* <img src={AcmeLogo} style={{width:'180px',marginTop:'1em'}}/> */}
        <h3 className="text-3xl font-semibold sm:text-2xl">E-Learning</h3>
      </div>
      <div className="hidden sm:flex gap-4 ">
        {links.map((link) => (
          <NavbarItem key="link.href">
            <Link
              href={link.href}
              className='hover:bg-neutral-300 hover:rounded-lg'
              onClick={() => setActiveLink(link.href)}>
              <span className='text-black font-semibold py-2 px-2'>{link.text}</span>
            </Link>
          </NavbarItem>
        ))}
      </div>
      <div className='flex gap-4'>
        <NavbarItem className="hidden sm:flex">
          <Link color="primary" href="/login">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="primary" href="#" variant="flat">
            Register
          </Button>
        </NavbarItem>
      </div>
      <div className='sm:hidden'>
        

              <Dropdown placement="bottom-end">
        <DropdownTrigger>
        <FontAwesomeIcon icon={faBars} size='xl'/>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <Link href='/login' className="font-semibold">Login</Link>
           
          </DropdownItem>
            <DropdownItem key="logout" color="danger">
            Register
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
        
        </DropdownMenu>
      </Dropdown>
  
      </div>
    </Navbar>

    </>
  );
}
