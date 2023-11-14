import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
// import AcmeLogo from "../../assets/lp.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getFile } from '../../util/index';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useEffect } from "react";
import apiInstance from "../../util/api";
import { useNavigate } from "react-router-dom";
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
    const [imgUrl, setImgUrl] = useState('')
  const [user, setUser] = useState(null)
    const [email, setEmail] = useState('');

    const handleSelect=val=>{
      navigate('/student',{state:{val}})
    }

  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`subjects`).then((res) => {
        console.log(res.data.data, "sub");
        setList(res.data.data);
      });
    };
     const userID = localStorage.getItem('id')
    const getUser = async () => {
      console.log(userID)
      await apiInstance.get('user/' + userID)
        .then(res => {
          setUser(res.data.data)
          setEmail(res.data.data.email)
          console.log(res.data.data)
          if (res.data.data.image) {
            setImgUrl(res.data.data)
          }
        })
    }
    getUser()
    getAssign();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar className="bg-slate-100  py-3">
        <div className="">
          {/* <img src={AcmeLogo} style={{width:'180px',marginTop:'1em'}}/> */}
          <h3 className="text-3xl font-semibold sm:text-2xl">E-Learning</h3>
        </div>
        <div className="hidden sm:flex gap-4 ">
          {/* {links.map((link) => ( */}
          <NavbarItem key="link.href">
            <Link
              href="#"
              className="hover:bg-neutral-300 hover:rounded-lg"
              onClick={() => setActiveLink()}>
              <span className="text-black font-semibold py-2 px-2">Home</span>
            </Link>
          </NavbarItem>
          <NavbarItem key="link.href">
            <Link
              href="#"
              className="hover:bg-neutral-300 hover:rounded-lg"
              onClick={() => setActiveLink()}>
              <span className="text-black font-semibold py-2 px-2">Course</span>
            </Link>
          </NavbarItem>
          <NavbarItem key="link.href">
            <Link
              href="#"
              className="hover:bg-neutral-300 hover:rounded-lg"
              onClick={() => setActiveLink()}>
              <span className="text-black font-semibold py-2 px-2">Class</span>
            </Link>
          </NavbarItem>

          <NavbarItem key="link.href" className="font-semibold">
          {location.pathname !== '/instructor' ? (<select
              className="form-control border-none mt-3"
              aria-label="Default select example"
              onClick={e=>handleSelect(e.target.value)}
              >
              <option hidden>Subject</option>
              {list.map((i) => (
                <option value={i._id} key={i._id}>
                  {i.title}
                </option>
              ))}
            </select>) : ( <Link
              href="#"
              className="hover:bg-neutral-300 hover:rounded-lg"
              onClick={() => setActiveLink()}>
              <span className="text-black font-semibold py-2 px-2">Something</span>
            </Link>)}
            
          </NavbarItem>
          <NavbarItem key="link.href">
            <Link
              href="#"
              className="hover:bg-neutral-300 hover:rounded-lg"
              onClick={() => setActiveLink()}>
              <span className="text-black font-semibold py-2 px-2">About</span>
            </Link>
          </NavbarItem>
          {/* ))} */}
        </div>
        <div className="flex gap-4">
          {location.pathname === "/student" ||
          location.pathname === "/instructor" ? (
            <>
            <NavbarItem className="hidden sm:flex">
              <Button className="" onClick={logout}>
                Logout
              </Button>
            </NavbarItem>
              <NavbarItem className="hidden sm:flex">
             <User
                  avatarProps={{
                    radius: "lg",
                    src:
                      imgUrl ? getFile({payload:imgUrl.image.fileName}) : '',
                  }}
               />
                </NavbarItem>
                </>
          ) : (
            <NavbarItem className="hidden sm:flex">
              <Link color="primary" href="/login">
                Login
              </Link>
            </NavbarItem>
          )}

{location.pathname === '/' || location.pathname === '/login' ? ( <NavbarItem className="hidden sm:flex">
            <Button as={Link} color="primary" href="#" variant="flat">
              Register
            </Button>
          </NavbarItem>) : ('')}
         
        </div>
        <div className="sm:hidden">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <FontAwesomeIcon icon={faBars} size="xl" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Home
              </DropdownItem>
              <DropdownItem key="settings">Course</DropdownItem>
              <DropdownItem key="team_settings">Class</DropdownItem>
              <DropdownItem key="analytics">Subjects</DropdownItem>
              <DropdownItem key="system">Contact</DropdownItem>
              <DropdownItem key="configurations">About</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
}
