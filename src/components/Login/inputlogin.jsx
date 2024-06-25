import { loginFields } from "../../constant/formfield";
import FormAction from "../../components/Login/formAction";
import { Image, Input, DateInput } from "@nextui-org/react";
import { EyeFilledIcon } from "./eyefilledicon";
import { EyeSlashFilledIcon } from "./eyeslashicon";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance, { CrmAPI } from "../../util/api.js";
import { MailFilledIcon } from "./mailicon";
import Swal from "sweetalert2";
import SideBar from "../Sidebar/index";
import { Spinner } from "../../util/Spinner.jsx";
import LoginVideo from '../../assets/video/login.mp4'
import MSI from '../../assets/img/MSI.svg'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Select, SelectItem } from "@nextui-org/select";
import { useEffect } from "react";
// Also possible:
// import { videoPlayer } from 'cloudinary-video-player';
import { Button } from "@nextui-org/react";
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {

  const [loading, setLoading] = useState("");
  const [arr, setArr] = useState([]);
  const [courseList, setCourseList] = useState([])
  const [batchList, setBatchList] = useState([])
  const [showForgotPage, setShowForgotPage] = useState(false)
  const [showLoginPage, setShowLoginPage] = useState(true)
  const [showRegisterPage, setShowRegisterPage] = useState(false)
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const eduRef = useRef(null);
  const schoolRef = useRef(null);
  const dateRef = useRef(null);
  const phoneRef = useRef(null);
  // const courseRef = useRef(null);
  const [course, setCourse] = useState('')
  const [batch, setBatch] = useState('')
  const [batchName, setBatchName] = useState('')
  const countryRef = useRef(null)
  const [birthDate, setBirthDate] = useState('')
  // console.log(birthDate, 'dateRef.current.value')
  const handleCourse = (id) => {

    setCourse(id)
    // console.log(courseList.filter(el => el._id === id)[0], 'c')
    setBatch(courseList.filter(el => el._id === id)[0].batch?._id)
    setBatchName(courseList.filter(el => el._id === id)[0].batch?.name)
    // console.log(batchList.filter(el => el.course._id === id).filter(cl => cl.active === true)[0]._id, 'ress')
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const dealId = {
      deal: '6641e653c281ba5613abaf34'
    }
    CrmAPI.post('verify-app-accessibility', dealId).then((res) => {
      // console.log(res.data.data.isAccessible, 'crm')
      if (res.data.data.isAccessible === true) {
        const data = {
          username: nameRef.current.value,
          password: passRef.current.value,
        };
        apiInstance
          .post("auth/login", data)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data?.data?.student?._id);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            setLoading("login");

            if (res.data.data.roles[0].includes("instructor")) {
              Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome Instructor!",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
              });
              navigate("/by-instructor");
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
              });
              navigate("/student", { state: { rol } });

              const timer = setTimeout(() => {
                window.location.reload()
              }, 2000); // 3000 milliseconds = 3 seconds

              return () => clearTimeout(timer);

              // window.location.reload()
            } else if (res.data.data.roles[0].includes("admin")) {
              Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome Admin!",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
              });
              navigate("/instru");
              window.location.reload()
              setLoading(false);
              return setArr(res.data.data);
            }
          })
          .catch((error) => {

            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: error.response.data.message,
              showCancelButton: false,
              showConfirmButton: false,
              timer: 3000,
            });
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Your subscription has been Expired.",
          text: "Please, renew your payment!",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })

  };

  const handleRegisterCreate = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      birthDate: birthDate,
      educationBackground: eduRef.current.value,
      attendedHighSchool: schoolRef.current.value,
      course: course,
      batch: batch,
      desiredCountry: countryRef.current.value,

    };

    apiInstance
      .post("register-waiting-lists", data)
      .then((res) => {
        nameRef.current = null
        Swal.fire({
          icon: "success",
          title: "Register Successful",
          text: "",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });

      }).catch((error) => {
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
  }

  useEffect(() => {
    const getCourse = async () => {
      await apiInstance.get('courses').then((res) => {
        // console.log(res.data.data, 'cou')
        setCourseList(res.data.data)
      })
    }
    const getBatches = async () => {
      await apiInstance.get('batches').then((res) => {
        // console.log(res.data.data, 'cou')
        setBatchList(res.data.data)
      })
    }
    getBatches()
    getCourse()

  }, [])
  //Handle Login API Integration here
  // console.log(arr, "dat");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleForgot = () => {
    setShowForgotPage(true)
    setShowLoginPage(false)
    setShowRegisterPage(false)
  }
  const handleBack = () => {
    setShowForgotPage(false)
    setShowRegisterPage(false)
    setShowLoginPage(true)
  }
  const handleRegister = () => {
    setShowRegisterPage(true)
    setShowForgotPage(false)
    setShowLoginPage(false)
  }
  return (
    <>

      <div className='flex'>
        {/* Left Side */}
        <div className='hidden lg:flex' >


          <video
            id="player"
            muted
            autoPlay="autoplay"
            className=' object-fill h-screen'
            loop
            src={LoginVideo}

          >

          </video>

        </div>
        {/* Right Side */}

        {/* Forgot Page */}
        {showForgotPage && (
          <div className='p-4 sm:p-6 md:p-10 flex flex-col justify-center'>

            <div className=' flex flex-col pl-6 sm:pl-10 md:pl-18 items-center gap-4 '>
              <span className=' text-[#262626] text-[18px] sm:text-[21px] md:text-[32px] font-semibold font-inter text-center'>Forgot Password?</span>
              <p className='flex text-[#898989] text-center text-[12px] sm:text-[16px] font-medium items-center w-[300px] sm:w-[357px] h-[44px]'>Please enter your email address. We will send you an email to resend  your password.</p>

            </div>
            <div className='w-[320px] sm:w-[350px] md:w-[522px] h-[120px] pt-12'>
              <form className='' onSubmit={handleSubmit}>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                  <div>
                    <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label>
                    <Input
                      variant='bordered'
                      type='email'
                      placeholder='  Enter your email'

                      ref={nameRef}
                      endContent={
                        <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                    />
                  </div>


                </div>

                <div className='mt-1'>
                  <FormAction handleSubmit={() => handleSubmit()} text='Send Email' />
                </div>
                <div className='pt-12 flex justify-center '>
                  <span className='font-medium text-[#5A5A5D] text-[16px]' onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size='xl' /> &nbsp;Back To Login
                  </span>

                </div>
              </form>
            </div>

          </div>

        )}

        {/* Login Page */}
        {showLoginPage && (
          <div className='p-4 sm:p-7 md:p-10 lg:p-[12px] 2xl:p-[14px] flex flex-col justify-center'>

            <div className='flex flex-col  ' style={{ fontFamily: 'JaguarJC' }}>
              {/* Header Logo */}
              <div className='flex justify-center flex-col items-center'>

                <Image src={MSI} className='w-[180px] sm:w-[200px] md:w-[260px] lg:w-[270px] 2xl:w-[280px] md:h-[90px] lg:h-[100px] 2xl:h-[110px]' />

                <div className='w-[250px] sm:w-[280px] md:w-[318px] text-center'>
                  <span className='text-[#262626] text-[24px] sm:text-[28px] md:text-[30px] lg:text-[38px] 2xl:text-[42px] font-bold ml-2 sm:ml-5'>Welcome to</span>
                </div>

                <div className='flex gap-2 w-[250px] sm:w-[318px] ml-24 sm:ml-10 md:ml-[12px] lg:ml-[100px]'>
                  <span className='text-[#C1193E] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] 2xl:text-[48px] font-bold'>MSI</span> <span className='text-[#1F4163] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] 2xl:text-[48px] font-bold'>Academy</span>
                </div>
              </div>

              {/* Login Form */}
              <div className='pt-8 w-full sm:w-[450px] md:w-[650px] lg:w-[522px] lg:p-5'>
                <form className='' onSubmit={handleSubmit}>
                  <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <div>
                      <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Username</label>
                      <Input
                        variant='bordered'
                        type='text'
                        placeholder='  Enter your username'
                        ref={nameRef}
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
                  <div className='mt-1 '>
                    <FormAction handleSubmit={() => handleSubmit()} className='' text='Login' />
                  </div>
                  <div className='mt-3 flex justify-center '>
                    <span className='font-medium text-[#5A5A5D] text-[16px]'>
                      Don’t have an account?   <span className='text-[blue]' onClick={handleRegister}>Register</span>
                    </span>

                  </div>
                </form>
              </div>


            </div>
          </div>

        )}
        {/* Register Page */}
        {showRegisterPage && (
          <div className='pl-10 pr-10  flex flex-col'>

            <div className=' flex flex-col pl-9 sm:pl-18 items-center gap-4 pt-4 sm:pt-4'>
              <span className=' text-[#262626] text-[18px] sm:text-[32px] lg:text-[20px] xl:text-[23px] 2xl:text-[25px] font-semibold font-inter text-center'>Student Registration</span>

            </div>
            <div className='w-[350px] sm:w-[400px] md:w-[522px] lg:w-[450px]  pt-4 '>
              <form onSubmit={handleRegisterCreate}>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 lg:gap-2'>
                  <div>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <Input
                      variant='bordered'
                      type='text'
                      placeholder=' Enter your name'

                      ref={nameRef}

                    />
                  </div>

                  <div>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <Input
                      variant='bordered'
                      type='phone'
                      placeholder=' Contact No (Student or Parent)'

                      ref={phoneRef}

                    />
                  </div>
                  <div>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <Input
                      variant='bordered'
                      type='email'
                      placeholder=' Email Address'

                      ref={emailRef}

                    />
                  </div>
                  <div>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <Input
                      variant='bordered'
                      type='text'
                      placeholder=' Address'

                      ref={addressRef}

                    />
                  </div>
                  <div className='relative'>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <input

                      type='date'

                      className="appearance-none border  border-gray-300 rounded-[12px] w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline custom-input"
                      onChange={(e) => setBirthDate(e.target.value)}

                    />
                    {/* {birthDate === '' && (
                      <span className="absolute mb-1 h-20 inset-y-0 left-4  flex items-start pr-1 text-gray-500 pointer-events-none">
                        Birth Date
                      </span>
                    )} */}
                  </div>
                  <div>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <Input
                      variant='bordered'
                      type='text'
                      placeholder=' Education Background'

                      ref={eduRef}

                    />
                  </div>
                  <div>
                    {/* <label className='flex justify-start text-[#5A5A5D] text-[14px] font-semibold'>Email</label> */}
                    <Input
                      variant='bordered'
                      type='text'
                      placeholder=' Attended High School'

                      ref={schoolRef}

                    />
                  </div>
                  <div>
                    <select
                      className="w-full p-3 border rounded-[12px] hover:border-gray-400 focus:border-gray-400"
                      ref={countryRef}
                    >
                      <option hidden>Select Country</option>

                      <option value=' United State' >
                        United State
                      </option>
                      <option value='Singapore' >
                        Singapore
                      </option>
                      <option value='Australia' >
                        Australia
                      </option>
                    </select>

                  </div>
                  <div>
                    <select
                      className="w-full p-3 border rounded-[12px] hover:border-gray-400 focus:border-gray-400"
                      onChange={(e) => handleCourse(e.target.value)}
                    >
                      <option hidden>Select Course</option>
                      {courseList.map((item) => (
                        <option key={item._id} value={item._id} >
                          {item.title}
                        </option>
                      ))}
                    </select>

                  </div>
                  {batch && (
                    <div>
                      <Input type='text' value={batchName} variant='bordered' />
                    </div>
                  )}

                </div>

                <div className='flex gap-2 justify-center'>
                  <div className="w-[100px] h-[20px] pt-10">
                    <Button className='font-medium text-[#5A5A5D] text-[16px] ' onClick={handleBack}>
                      Cancel
                    </Button>
                  </div>
                  <div className='w-[100px] h-[20px]'>
                    <FormAction handleSubmit={() => handleRegisterCreate()} text='Register' />
                  </div>



                </div>

              </form>
            </div>

          </div>

        )}
      </div>
      {/* Right Side End */}

    </>
  );
}
