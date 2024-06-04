import { SearchIcon } from "../../components/Navbar/SearchIcon";
// import AcmeLogo from "../../assets/lp.png";
import { useState } from "react";
import UserPng from '../../assets/img/user.png'
import { getFile } from "../../util/index";
import Theme from "../../components/ThemeSwitch/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
  Image,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../util/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MSI from "../../assets/img/MSI.svg";
import Student from '../../assets/img/student.jpg'


export default function App() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const noti = {
    title: 'Notifications',

    info: [{
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    },
    {
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    }, {
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    },
    {
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    },
    {
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    },
    {
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    },
    {
      img: Student,
      message: 'Travis William made an announcement ',
      time: 2,
      status: false
    }]
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [seeAll, setSeeAll] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const navigate = useNavigate();
  const GetLoginData = localStorage.getItem("token");
  const StudentID = localStorage.getItem("id");

  const [notiList, setNotiList] = useState([])
  const [list, setList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [img, setImg] = useState('')
  // console.log(studentData.image, 'studentDatastudentData')

  const handleAllRead = () => {
    apiInstance.put("notifications").then(function () {
      // console.log(res.data.data, 'res')
    })
  };
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

    // navigate('/')
    window.location.href = '/';

  };
  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`subjects`).then((res) => {
        // console.log(res.data.data, "sub");
        setList(res.data.data);
      });
    };
    const userID = localStorage.getItem("id");
    const getUser = async () => {
      // console.log(userID);
      await apiInstance.get("user/" + userID).then((res) => {
        setUser(res.data.data);
        setEmail(res.data.data.email);
        // console.log(res.data.data);
        if (res.data.data.image) {
          setImgUrl(res.data.data);
        }
      });
    };
    const getNoti = async () => {
      await apiInstance.get("notifications").then((res) => {
        const sortedData = res.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setNotiList(res.data.data);
        // console.log(sortedData, 'resss')

      });
    };

    const getStudent = async () => {
      await apiInstance.get("students").then((res) => {

        // setNotiList(res.data.data);

        const Img = getFile({
          payload: res.data.data.filter((el) => el._id === StudentID)[0]?.image,
        });
        // console.log(Img, "ii");
        setImg(Img);
        // console.log(, 'resss')

      });
    };
    getStudent();
    getNoti();
    getUser();
    getAssign();
    const handleBeforeUnload = (e) => {
      // Call logoutUser() function when the tab is being closed
      logout();
      // Cancel the default action to show a confirmation dialog
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    };

    // Add event listener for window beforeunload
    // window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function
    // return () => {
    //   // Remove event listener when component unmounts
    //   // window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, [StudentID]);

  const handleSeeAll = () => {
    setSeeAll(!seeAll)
  }



  return (
    <>
      <div className=' sticky top-0 bg-white z-50 sm:w-[100%]'>
        <div className='flex gap-10 justify-around items-center'>
          <div className='align-left'>
            <Image src={MSI} width={180} height={60} />
          </div>
          <div
            className='w-96 mt-5'
            style={{ borderRadius: "200px", width: "486px", padding: "12px" }}
          >
            {/* <Input
              isClearable
              radius='lg'
              variant='underlined'
              placeholder='Type to search...'
              startContent={
                <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 shadow-lg' />
              }
            /> */}
          </div>
          <div className='flex gap-4 mt-5'>
            <div className='flex gap-5'>
              <Dropdown>
                <DropdownTrigger className='mt-2'>
                  <FontAwesomeIcon icon={faBell} size='xl' />

                </DropdownTrigger>
                <DropdownMenu closeOnSelect={false} aria-label='Profile Actions' variant='flat' className='p-2 sticky-top'>
                  <DropdownItem><span className='text-[20px] font-bold'>{noti.title}</span></DropdownItem>
                  {seeAll ? (notiList.slice(0).reverse().map((item, index) => (

                    <DropdownItem key={index} className='w-[430px]'>

                      <div className='flex gap-4 p-5'>
                        {allRead ? '' : (<div className={item.status === 'unread' && 'bg-indigo-600 rounded-full float-right w-[10px] h-[10px] mt-5'}></div>)}


                        <div><Image src={UserPng} className='w-[70px] h-[65px] rounded-full' /></div>

                        <div className=' flex flex-col gap-4 pt-2'>
                          <div className=' gap-20'>
                            <p className='w-[20px] flex'>{item.title}</p>
                          </div>

                          <span className='text-[#2C4AE7] text-[12px] font-medium'>{item.time} hours</span>
                        </div>

                      </div>

                      <Divider></Divider>
                    </DropdownItem>


                  ))) : (notiList.slice(0, 3).reverse().map((item, index) => (

                    <DropdownItem key={index} className='w-[430px]'>

                      <div className='flex gap-4 p-5'>
                        {allRead ? '' : (<div className={item.status === 'unread' && 'bg-indigo-600 rounded-full float-right w-[10px] h-[10px] mt-5'}></div>)}


                        <div><Image src={UserPng} className='w-[70px] h-[65px] rounded-full' /></div>
                        <div className=' flex flex-col gap-4 pt-2'>
                          <div className=' gap-20'>
                            <p className='w-[20px] flex'>{item.title}</p>
                          </div>

                          <span className='text-[#2C4AE7] text-[12px] font-medium'>{item.time} hours</span>
                        </div>

                      </div>

                      <Divider></Divider>
                    </DropdownItem>


                  )))}

                  <DropdownItem>
                    <div className='flex justify-between p-4'>
                      <span className='text-[#CA0008] text-[16px] font-medium mt-1' onClick={handleAllRead}>Mark All As Read</span>
                      <Button color='primary' variant='bordered' onClick={handleSeeAll}>See All</Button>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger className='mt-2'>
                  <FontAwesomeIcon icon={faGear} size='xl' />
                </DropdownTrigger>

                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className=' gap-2'>
                    {GetLoginData ? (
                      <>
                        <div className='hidden sm:flex' id='logoutButton' onClick={logout} >
                          Logout
                        </div>
                      </>
                    ) : (
                      <div className='hidden sm:flex mt-2 rounded hover:font-semibold'>
                        <Link to='/login'>Login</Link>
                      </div>
                    )}
                  </DropdownItem>
                  <DropdownItem>
                    {location.pathname === "/" ||
                      location.pathname === "/login" ? (
                      <div className='hidden sm:flex hover:font-semibold'>
                        <Link
                          to='/register'
                          color='primary'
                          href='#'
                          variant='flat'
                        >
                          Register
                        </Link>
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
                <Avatar isBordered src={img}
                  className='w-[35px] h-[35px] rounded-[50%] mt-[0.2rem]' />
                {/* <Image
                  src={img}
                  className='w-[35px] h-[35px] rounded-[50%] mt-[0.2rem]'
                /> */}
              </div>
            </div>
          </div>
        </div>

        <div className='sm:hidden'>
          <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className='sm:hidden'
              />
              <NavbarBrand>
                <AcmeLogo />
                <p className='font-bold text-inherit'>ACME</p>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden sm:flex gap-4' justify='center'>
              <NavbarItem>
                <Link color='foreground' href='#'>
                  Features
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link href='#' aria-current='page'>
                  Customers
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color='foreground' href='#'>
                  Integrations
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
              <NavbarItem className='hidden lg:flex'>
                <Link href='#'>Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='#' variant='flat'>
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    className='w-full'
                    href='#'
                    size='lg'
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </Navbar>
          {/* <Dropdown placement='bottom-end'>
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
          </Dropdown> */}
        </div>
      </div >
    </>
  );
}
