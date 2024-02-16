import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <div className='text-white' style={{ background: "#BC1F40" }}>
      <div className='w-full md:w-[80%] mx-auto py-10'>
        <div className='flex flex-wrap items-center justify-between p-5'>
          <div className='w-[300px]'>
            <h1
              className=' text-white pb-5 font-semibold'
              style={{ fontSize: "30px" }}
            >
              Contact Us
            </h1>
            <div className='pb-3 flex gap-4'>
              <FontAwesomeIcon icon={faLocationDot} size='lg' />{" "}
              <p>
                Room 303,Third Floor, Khattar Street, Grand Khattar Residence,
                Sanchaung Township, Yanogn, Myanmar.
              </p>
            </div>
            <div className='pb-3 flex gap-3'>
              <FontAwesomeIcon icon={faPhone} size='lg' />{" "}
              <p>+959 422 557 884</p>
            </div>
            <div className='pb-3 flex gap-4'>
              <FontAwesomeIcon icon={faEnvelope} size='lg' />
              <p className='flex flex-col gap-1'>
                <span>info@msiacademy.edu.mm</span>
                <span>academicdept@msiacademy.edu.mm</span>
              </p>
            </div>
            {/* <h1 className='font-[regular] text-2xl my-5'>About MSI Academy</h1>
                        <p className='font-[light]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesqe sit amet sapien.</p> */}
            {/* <img src="/assets/images/logo.jpeg" onClick={()=>router.push("/")} className='cursor-pointer w-[300px] p-5' alt="" /> */}
          </div>
          <div>
            <ul className='flex list-none items-center justify-evenly py-5 font-semibold '>
              <Link href='/'>
                <li className='mr-5 text-white font-regular cursor-pointer'>
                  Home
                </li>
              </Link>
              <Link href='/about'>
                <li className='mr-5 text-white font-regular cursor-pointer'>
                  About
                </li>
              </Link>
              <Link href='/courses'>
                <li className='mr-5 text-white font-regular cursor-pointer'>
                  Courses
                </li>
              </Link>
              <Link href='/events'>
                <li className='mr-5 text-white font-regular cursor-pointer'>
                  Events
                </li>
              </Link>
              <Link href='/contact'>
                <li className=' text-white font-regular cursor-pointer'>
                  Contact Us
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className='text-md flex items-center flex-wrap justify-between p-5 border-t-[0.5px] border-white'>
          <h1>Powered by NEOMOCA.</h1>
          <h1 className='my-5'>
            © 2022 MSI Academy Education Centre. All right reserved.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
