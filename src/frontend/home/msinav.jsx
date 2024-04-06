import { SearchIcon } from "../../components/Navbar/SearchIcon";
// import AcmeLogo from "../../assets/lp.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { getFile } from "../../util/index";
import Theme from "../../components/ThemeSwitch/index";

import {
  Navbar,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import apiInstance from "../../util/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MSI from "../../assets/img/MSI.svg";
export default function App() {
  const location = useLocation()
  const ID = location.pathname.split('/')[2]
  const menuItems = [
    { link: "#", title: "Home" },
    { link: "#", title: "Courses" },
    { link: "#", title: "Events" },
    { link: "#", title: "About" },
    { link: "#", title: "Contact" },
    { link: "/login", title: "Login" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const handleTab = (value) => {
    setActiveTab(value);
  };

  const [list, setList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const handleSelect = (val) => {
    navigate("/student", { state: { val } });
  };

  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`subjects`).then((res) => {
        console.log(res.data.data, "sub");
        setList(res.data.data);
      });
    };
    const userID = localStorage.getItem("id");
    const getUser = async () => {
      console.log(userID);
      await apiInstance.get("user/" + userID).then((res) => {
        setUser(res.data.data);
        setEmail(res.data.data.email);
        console.log(res.data.data);
        if (res.data.data.image) {
          setImgUrl(res.data.data);
        }
      });
    };
    getUser();
    getAssign();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "Welcome Home!",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/");
  };

  return (
    <>
      <div className='sticky top-0 bg-white z-50 shadow-lg mx-auto  w-[375px] sm:w-[100%] xl:w-[100%] 2xl:w-[100%]'>
        <div className='flex sm:gap-10 xl:gap-5 2xl:gap-96 justify-between sm:justify-around 2xl:justify-around items-center'>
          <div className='align-left'>
            <Image
              src={MSI}
              className={isMenuOpen ? "hidden" : "w-[200px] sm:w-[300px] xl:w-[200px] 2xl:w-[250px]"}
            />
          </div>
          <div
            className='hidden md:flex justify-evenly 2xl:justify-end gap-10 w-[486px] xl:[380px] 2xl:w-[260px]'
            style={{
              borderRadius: "200px",

              padding: "12px",
              fontSize: "18px",
              color: "#224362",
            }}
          >
            <span className='hover:-translate-y-1 hover:scale-110 duration-500'>
              <Link
                to='/'
                className={
                  location.pathname === "/"
                    ? "font-semibold text-[18px] xl:text-[16px] 2xl:text-[20px]"
                    : "text-[18px] xl:text-[16px] 2xl:text-[20px]"
                }
              >
                Home
              </Link>
            </span>
            <span className='hover:-translate-y-1 hover:scale-110 duration-500'>
              <Link
                to='/home-course'
                className={
                  location.pathname === "/home-course" ||
                    location.pathname === "/home-course-detail" ||
                    location.pathname === "/home-sub-detail"
                    ? "font-semibold text-[18px] xl:text-[16px] 2xl:text-[20px]"
                    : "text-[18px] xl:text-[16px] 2xl:text-[20px]"
                }
              >
                {" "}
                Courses
              </Link>
            </span>
            <span className='hover:-translate-y-1 hover:scale-110 duration-500'>
              <Link
                to='/events'
                className={
                  location.pathname === '/events' || location.pathname === `/events/${ID}`
                    ? "font-semibold text-[18px] xl:text-[16px] 2xl:text-[20px]"
                    : "text-[18px] xl:text-[16px] 2xl:text-[20px] "
                }
              >
                Events
              </Link>
            </span>
            <span className='hover:-translate-y-1 hover:scale-110 duration-500'>
              <Link
                to='/about'
                className={
                  location.pathname === "/about"
                    ? "font-semibold text-[18px] xl:text-[16px] 2xl:text-[20px]"
                    : "text-[18px] xl:text-[16px] 2xl:text-[20px]"
                }
              >
                About
              </Link>
            </span>
            <span className='hover:-translate-y-1 hover:scale-110 duration-500'>
              <Link
                to='/booking'
                className={
                  location.pathname === "/booking"
                    ? "font-semibold text-[18px] xl:text-[16px] 2xl:text-[20px]"
                    : "text-[18px] xl:text-[16px] 2xl:text-[20px]"
                }
              >
                Booking
              </Link>
            </span>
            <span
              className='hover:-translate-y-1 hover:scale-110 duration-500'
            >
              <Link
                to='/contact'
                className={
                  location.pathname === "/contact"
                    ? "font-semibold text-[18px] xl:text-[16px] 2xl:text-[20px]"
                    : "text-[18px] xl:text-[16px] 2xl:text-[20px]"
                }
              >
                Contact
              </Link>

            </span>
            <span className='hover:-translate-y-1 hover:scale-110 duration-500 text-[18px] xl:text-[16px] 2xl:text-[20px] '>
              <Link to='/login'>Login</Link>
            </span>
          </div>
          <div className='flex  lg:hidden gap-10 pr-5'>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
              <NavbarContent>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className='sm:hidden'
                />
              </NavbarContent>

              <NavbarMenu className='bg-white top-14'>
                <NavbarItem>
                  <Link
                    to='/'
                    className={
                      location.pathname === "/"
                        ? "font-semibold text-lg"
                        : "text-lg"
                    }
                  >
                    Home
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link
                    to='/home-course'
                    className={
                      location.pathname === "/home-course" ||
                        location.pathname === "/home-course-detail" ||
                        location.pathname === "/home-sub-detail"
                        ? "font-semibold text-lg"
                        : "text-lg"
                    }
                  >
                    {" "}
                    Courses
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link
                    to='/events'
                    className={
                      location.pathname === '/events' || location.pathname === `/events/${ID}`
                        ? "font-semibold text-lg"
                        : "text-lg"
                    }
                  >
                    Events
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link
                    to='/about'
                    className={
                      location.pathname === "/about"
                        ? "font-semibold text-lg"
                        : "text-lg"
                    }
                  >
                    About
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link
                    to='/booking'
                    className={
                      location.pathname === "/booking"
                        ? "font-semibold text-lg"
                        : "text-lg"
                    }
                  >
                    Booking
                  </Link>
                </NavbarItem>
                <NavbarItem
                  onClick={() => handleTab(5)}
                  className={
                    activeTab === 5 ? "font-semibold text-lg" : "text-lg"
                  }
                >
                  Contact
                </NavbarItem>
                <NavbarItem>
                  <Link to='/login'>Login</Link>
                </NavbarItem>
              </NavbarMenu>
            </Navbar>
            {/* <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <FontAwesomeIcon icon={faBars} size='xl' />
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='logout' color='danger'>
                  Home
                </DropdownItem>
                <DropdownItem key='settings'>Courses</DropdownItem>
                <DropdownItem key='team_settings'>Events</DropdownItem>
                <DropdownItem key='analytics'>About</DropdownItem>
                <DropdownItem key='system'>Contact</DropdownItem>

                <DropdownItem key='profile' className='h-14 gap-2'>
                  <span>
                    <Link to='/login'>Login</Link>
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        </div>
      </div>
    </>
  );
}
