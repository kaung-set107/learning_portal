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
      <div className='sticky top-0 bg-white z-50 shadow-lg'>
        <div className='flex justify-between items-center mx-auto w-full lg:w-[90%] '>
          <div className='align-left'>
            <Image src={MSI} style={{ width: "300px" }} />
          </div>
          <div
            className='flex justify-evenly gap-10'
            style={{
              borderRadius: "200px",
              width: "486px",
              padding: "12px",
              fontSize: "18px",
              color: "#224362",
            }}
          >
            <span>Home</span>
            <span>Courses</span>
            <span>Events</span>
            <span>About</span>
            <span>Contact</span>
            <span>Login</span>
          </div>
        </div>
      </div>
    </>
  );
}
