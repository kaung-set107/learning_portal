import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import AcmeLogo from "../../assets/lp.png";
import { useState } from "react";
useState;
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
    <Navbar>
      <NavbarBrand>
        {/* <img src={AcmeLogo} style={{width:'180px',marginTop:'1em'}}/> */}
        <h3 className="text-3xl text-purple-900 font-semibold">E-Learning</h3>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 text-xl" justify="center">
        {links.map((link) => (
          <NavbarItem key="link.href">
            <Link
              href={link.href}
              className={`nav-link ${activeLink === link.href ? "active" : ""}`}
              onClick={() => setActiveLink(link.href)}>
              <b className="text-black font-medium">{link.text}</b>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link color="primary" href="/login">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

    </>
  );
}
