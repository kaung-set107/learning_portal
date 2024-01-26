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
      <div className='sticky top-0 bg-white z-50 shadow-lg'>
        <div className='flex justify-between items-center mx-auto w-full lg:w-[90%]'>
          <div className='align-left'>
            <Image src={MSI} className='w-[300px]' />
          </div>
          <div
            className='hidden sm:flex justify-evenly gap-10'
            style={{
              borderRadius: "200px",
              width: "486px",
              padding: "12px",
              fontSize: "18px",
              color: "#224362",
            }}
          >
            <span
              onClick={() => handleTab(1)}
              className={activeTab === 1 ? "font-semibold text-lg" : "text-lg"}
            >
              Home
            </span>
            <span
              onClick={() => handleTab(2)}
              className={activeTab === 2 ? "font-semibold text-lg" : "text-lg"}
            >
              Courses
            </span>
            <span
              onClick={() => handleTab(3)}
              className={activeTab === 3 ? "font-semibold text-lg" : "text-lg"}
            >
              Events
            </span>
            <span
              onClick={() => handleTab(4)}
              className={activeTab === 4 ? "font-semibold text-lg" : "text-lg"}
            >
              About
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
          <div className='sm:hidden mr-5'>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <FontAwesomeIcon icon={faBars} size='xl' />
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' className='h-14 gap-2'>
                  <span>
                    <Link to='/login'>Login</Link>
                  </span>
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
      </div>
    </>
  );
}
