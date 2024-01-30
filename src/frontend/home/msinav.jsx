import { Button, Image, Input } from "@nextui-org/react";
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
      <div className='sticky top-0 bg-white z-50 shadow-lg mx-auto  w-[375px] sm:w-[100%]'>
        <div className='flex gap-10 justify-between sm:justify-around items-center '>
          <div className='align-left'>
            <Image src={MSI} className=' w-[200px] sm:w-[300px] ' />
          </div>
          <div
            className='hidden md:flex justify-evenly gap-10'
            style={{
              borderRadius: "200px",
              width: "486px",
              padding: "12px",
              fontSize: "18px",
              color: "#224362",
            }}
          >
            <span>
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
            </span>
            <span>
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
            </span>
            <span>
              <Link
                to='/event'
                // className={
                //   location.pathname === "/home-course"
                //     ? "font-semibold text-lg"
                //     : "text-lg"
                // }
              >
                Events
              </Link>
            </span>
            <span>
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
            </span>
            <span
              onClick={() => handleTab(5)}
              className={activeTab === 5 ? "font-semibold text-lg" : "text-lg"}
            >
              Contact
            </span>
            <span>
              <Link to='/login'>Login</Link>
            </span>
          </div>
          <div className='flex  md:hidden gap-10 pr-5'>
            <Dropdown placement='bottom-end'>
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
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
