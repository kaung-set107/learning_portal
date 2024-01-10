import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Image,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "../../components/Navbar/SearchIcon";
// import AcmeLogo from "../../assets/lp.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { getFile } from "../../util/index";
import Theme from "../../components/ThemeSwitch/index";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../util/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MSI from "../../assets/img/MSI.png";
export default function App() {
  const [activeLink, setActiveLink] = useState("/home");
  const navigate = useNavigate();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const links = [
  //   { href: "/", text: "Home" },
  //   { href: "/course", text: "Course" },
  //   { href: "/class", text: "Class" },
  //   { href: "/sub", text: "Subjects" },
  //   { href: "/contact", text: "Contact" },
  //   { href: "/about", text: "About" },
  //   // Add more links as needed
  // ];
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
      <div className='mt-5 mx-4'>
        <div className='flex justify-between' style={{ padding: "24px 40px" }}>
          <div className='align-left'>
            <Image src={MSI} width={180} height={60} />
          </div>
          <div
            className='w-96 mt-5'
            style={{ borderRadius: "200px", width: "486px", padding: "12px" }}
          >
            <Input
              isClearable
              radius='lg'
              placeholder='Type to search...'
              startContent={
                <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
              }
            />
          </div>
          <div className='flex gap-4 mt-5'>
            <div>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger className='mt-2'>
                  <FontAwesomeIcon icon={faGear} size='xl' />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className=' gap-2'>
                    {location.pathname === "/student" ||
                    location.pathname === "/instructor" ? (
                      <>
                        <div className='hidden sm:flex' onClick={logout}>
                          Logout
                        </div>
                      </>
                    ) : (
                      <div className='hidden sm:flex mt-2 rounded hover:font-semibold'>
                        <Link to='/login'>Login</Link>
                      </div>
                    )}

                    {location.pathname === "/" ||
                    location.pathname === "/login" ? (
                      <div className='hidden sm:flex'>
                        <Button
                          as={Link}
                          color='primary'
                          href='#'
                          variant='flat'
                        >
                          Register
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div>
              <div className='hidden sm:flex '>
                <User
                  avatarProps={{
                    radius: "xl",
                    src: imgUrl
                      ? getFile({ payload: imgUrl.image.fileName })
                      : "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='sm:hidden'>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <FontAwesomeIcon icon={faBars} size='xl' />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <Link href='/login' className='font-semibold'>
                  Login
                </Link>
              </DropdownItem>
              <DropdownItem key='logout' color='danger'>
                Home
              </DropdownItem>
              <DropdownItem key='settings'>Course</DropdownItem>
              <DropdownItem key='team_settings'>Class</DropdownItem>
              <DropdownItem key='analytics'>Subjects</DropdownItem>
              <DropdownItem key='system'>Contact</DropdownItem>
              <DropdownItem key='configurations'>About</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
