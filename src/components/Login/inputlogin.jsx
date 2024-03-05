import { loginFields } from "../../constant/formfield";
import FormAction from "../../components/Login/formAction";
import { Image, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./eyefilledicon";
import { EyeSlashFilledIcon } from "./eyeslashicon";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../util/api.js";
import { MailFilledIcon } from "./mailicon";
import Swal from "sweetalert2";
import SideBar from "../Sidebar/index";
import { Spinner } from "../../util/Spinner.jsx";
import LoginVideo from '../../assets/video/login.mp4'
import MSI from '../../assets/img/MSI.svg'
// Also possible:
// import { videoPlayer } from 'cloudinary-video-player';
import 'cloudinary-video-player/cld-video-player.min.css';
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loading, setLoading] = useState("");
  const [arr, setArr] = useState([]);
  const [showForgotPage, setShowForgotPage] = useState(false)
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passRef.current.value,
    };
    apiInstance
      .post("auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.data.student);
        localStorage.setItem("user", res.data.data);
        setLoading("login");
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Login Successful',
        //   text: 'Welcome back!',
        //   confirmButtonText: 'OK',
        //   confirmButtonColor: '#3085d6'
        // })

        console.log(res.data, "login res");
        if (res.data.data.roles[0].includes("instructor")) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome Instructor!",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/instructor");
          setLoading(false);
        } else if (res.data.data.roles[0].includes("student")) {
          const rol = res.data.data.roles[0];
          setArr(res.data.data);
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome Student!",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
            // confirmButtonText: 'OK',
            // confirmButtonColor: '#3085d6'
          });

          navigate("/student", { state: { rol } });
          window.location.reload()
        } else if (res.data.data.roles[0].includes("admin")) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome Admin!",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/home");
          setLoading(false);
          return setArr(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  //Handle Login API Integration here
  console.log(arr, "dat");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleForgot = () => {
    setShowForgotPage(true)
  }
  return (
    <>

      <div className='flex'>
        {/* Left Side */}
        <div className='hidden lg:flex' >
          {/* <iframe
            src={LoginVideo}
            title="Embedded Content"

          /> */}

          <video
            id="player"
            muted
            autoplay="autoplay"
            className='object-cover h-[750px]'
            loop
            src={LoginVideo}

          >

          </video>

        </div>
        {/* Right Side */}
        <div className=' p-10 flex flex-col justify-center'>
          {showForgotPage ? (
            <div className='w-[540px] flex flex-col items-center'>
              <span className='flex text-[#262626] text-[32px] font-semibold font-inter justify-center'>Forgot Password?</span>
              <p className='flex text-[#89898] text-[16px] font-medium items-center w-[375px]'>Please enter your email address. We will send you an email to resend  your password.</p>
            </div>
          ) : (
            <>

              <div className='flex flex-col  ' style={{ fontFamily: 'JaguarJC' }}>
                {/* Header Logo */}
                <div className='flex justify-center flex-col items-center'>

                  <Image src={MSI} className='w-[260px] h-[130px]' />

                  <div className='w-[318px] text-center'>
                    <span className='text-[#262626] text-[48px] font-bold ml-5'>Welcome to</span>
                  </div>

                  <div className='flex gap-2 w-[318px] ml-10'>
                    <span className='text-[#C1193E] text-[48px] font-bold'>MSI</span> <span className='text-[#1F4163] text-[48px] font-bold'>Academy</span>
                  </div>
                </div>

                {/* Login Form */}
                <div className='pt-8 w-[522px]'>
                  <form className='' onSubmit={handleSubmit}>
                    <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                      <div>
                        <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Username</label>
                        <Input
                          variant='bordered'
                          type='text'
                          placeholder='  Enter your username'

                          ref={usernameRef}
                          endContent={
                            <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                          }
                        />
                      </div>
                      <div>
                        <label className='flex justify-start  '>Password</label>
                        <Input
                          variant='bordered'
                          ref={passRef}
                          type={isVisible ? "text" : "password"}
                          placeholder='  Enter your password'

                          endContent={
                            <button
                              className='focus:outline-none'
                              type='button'
                              onClick={toggleVisibility}
                            >
                              {isVisible ? (
                                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                              ) : (
                                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                              )}
                            </button>
                          }
                        />
                      </div>

                    </div>
                    <div className='mt-3 flex justify-start text-[blue]' onClick={handleForgot}>
                      Forgot Password ?
                    </div>
                    <div className='mt-1'>
                      <FormAction handleSubmit={() => handleSubmit()} text='Login' />
                    </div>
                    <div className='mt-3 flex justify-center '>
                      <span className='font-medium text-[#5A5A5D] text-[16px]'>
                        Don’t have an account?   <a href='' className='text-[blue]'>Register</a>
                      </span>

                    </div>
                  </form>
                </div>


              </div>
            </>

          )}

        </div>
      </div>


    </>
  );
}
