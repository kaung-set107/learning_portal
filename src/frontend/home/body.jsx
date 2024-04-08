import React, { ReactElement, useState, Component, useEffect } from "react";
import { Image, Button, Card, Link } from "@nextui-org/react";
// import { Link } from "react-router-dom";
import MSINav from "./msinav";
import { Testimonials } from "./home_components/Testimonials";
import Welcome from "../../assets/img/welcomeTeam.jpg";
import Thingyan from "../../assets/img/thing.jpg";
import MSIHead from "../../assets/img/msinewimg.png";
import CVBanner from "../../assets/img/cvbanner.png";
import EHome from "../../assets/img/EllipseHome.png";
import EBlue from "../../assets/img/EllipseHalf-blue.png";
import EHalf from "../../assets/img/EllipseHalf.png";
import posed, { PoseGroup } from 'react-pose';
import Footer from "./footer";
import apiInstance from "../../util/api";
import { getFile } from "../../util";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router";
// import Footer from '../../frontend/home/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck, faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
// Define the animation for the text
// import { Wave } from 'react-animated-text';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Body = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [eventList, setEventList] = useState([

  ]);
  const control = useAnimation();
  const [ref, inView] = useInView();
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 }
  };
  useEffect(() => {

    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        console.log(res.data.data, "course res");
        console.log(catList, "cat");
        setCourseList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        console.log(res.data.data, "cou");
      });
    };
    const getCat = async () => {
      await apiInstance.get(`categories`).then((res) => {
        console.log(res.data.data, "cat res");
        setCatList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    const getEvent = async () => {
      await apiInstance.get(`events`).then((res) => {
        // console.log(res.data.data, "ev res");
        setEventList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    getEvent();
    getCat();

    getAssign();

  }, []);
  const handleRoute = (data) => {
    console.log(data, "da");
    setId(id);
    setValue(value);
    navigate("/home-course-detail", { state: { data: data } });
  };
  return (
    <div>
      <MSINav />

      {/* Banner */}

      <div style={{
        backgroundImage: `url(${CVBanner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
      }} className='h-[50vh] sm:h-[100vh]' >

        <div style={{
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.47) 100%)"
        }} className='flex flex-col gap-1 justify-center items-center absolute w-full h-[50vh] sm:h-[100vh]'>
          <span className=' text-[22px] sm:text-[48px] font-medium text-[#FFF]'>"Explore Limitless Opportunities:</span>
          <span className='text-[16px] sm:text-[48px] font-medium text-[#FFF]'>Your Gateway to Overseas MSI Education"</span>
        </div >

      </div >
      {/* Header */}

      < div className='flex justify-around pl-[26px]  sm:pl-[57px] pr-[26px] sm:pr-[57px] pt-[20px] sm:pt-[100px] relative' >

        <img
          src={EHome}
          className="absolute top-12 -rotate-17 -left-32 w-[200px] h-[100px]  sm:w-[250px]"
          alt=""
        />
        <div className='w-[654px] flex flex-col gap-10  mt-10'>
          <ScrollAnimation animateIn='wobble'
          >
            <h1
              className='text-[30px] sm:text-[48px] 2xl:text-[50px] text-secondary font-semibold w-[300px] sm:w-[562px] font-Poppins '
              style={{ color: "#1F4164", fontWeight: "900" }}
            >

              Join MSI Academy for your brighter future
            </h1>
          </ScrollAnimation>
          <p className=' font-normal text-[16px] sm:text-[18px]  2xl:text-[25px] w-[330px] sm:w-full leading-[20px] sm:leading-[34px]'>
            MSI Academy, Myanmar Scholastic Innovation Academy, is fulfilling
            the educational and language requirements for Myanmar young leaners'
            dreams of international education in U.S.A,UK,Europe and Asia
            countries as well as kindly consulting in choosing the appropriate
            specializations and engaging the career life style in accordance
            with students' apptitude.
          </p>
          <div className='flex flex-col sm:flex-row gap-10 w-full '>
            <div className='w-[230px] 2xl:w-[400px] flex gap-2'>

              <FontAwesomeIcon icon={faCheck} size='md' className='text-[#2563EB] border-1 border-sky-500 rounded-[100%] p-2' />
              <span className='text-[18px] leading-[24px] 2xl:text-[25px] font-medium w-[206px] 2xl:w-[260px]'>Get unlimited design inspirations. Level up your design.</span>
            </div>
            <div className='w-[230px] flex gap-2 2xl:w-[400px]'>
              <FontAwesomeIcon icon={faCheck} size='md' className='text-[#2563EB] border-1 border-sky-500 rounded-[100%] p-2' />
              <span className='text-[18px] leading-[24px] font-medium w-[206px] 2xl:text-[25px] 2xl:w-[260px]'>
                14+ Premium tailwind UI kits. Start with unlimited product downloads.
              </span>
            </div>
          </div>

        </div>
        <div className=''>
          <Image src={MSIHead} className='sm:w-[464px] sm:h-[454px]' />
        </div>

        <img
          src={EHalf}
          className="absolute bottom-0 right-0 z-10 w-[100px]  top-[450px]"
          alt=""
        />

      </div >


      {/* Course Section */}
      <ScrollAnimation animateIn='fadeIn'
        animateOut='fadeOut'
        scrollableParentSelector='#cou'>
        < div className='flex flex-col p-5 md:p-5  relative' id='cou' >

          <h1
            className=' p-10 md:p-20  flex justify-center text-[25px] sm:text-[40px] font-[semibold] py-5'
            style={{ color: "#BC1F40", fontWeight: "900" }}
          >
            Courses We Offer
          </h1>

          <div className='grid grid-cols-1 sm:grid-cols-4 gap-44 2xl:gap-0 sm:gap-0 items-center justify-between md:flex-row sm:py-10 2xl:py-0'>
            {courseList.slice(0, 4).map((e) => (
              <div
                onClick={() => handleRoute(e)}

                className='w-[300px]  md:w-[350px] h-[300px] md:h-[500px]'
              >
                <div>
                  <Image
                    // style={{ width: "500px", height: "280px" }}
                    alt={e.image?.originalname}
                    src={getFile({ payload: e.image })}
                    className='w-full h-full sm:w-[350px] sm:h-[240px] sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                  />
                  <div className='flex p-5 flex-col justify-start flex-grow '>
                    <span className='w-[332px] text-[14px] font-semibold text-[#B72041]'>MSI Academy</span>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "600px",
                        fontSize: "24px",
                        letterSpacing: "-0.96px",
                      }}
                      className='w-[340px]'
                    >
                      {e.title}
                    </span>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "400px",
                        // width: "400px",
                        // height: "auto",
                      }}
                      className='w-full md:w-[340px] md:h-[auto]'
                    >
                      {e?.description.substring(0, 50)}...
                    </div>
                    {/* card footer */}
                    <div
                      className='py-10'
                      style={{
                        width: "300px",
                        height: "19px",
                        fontSize: "14px",
                        fontWeight: "400px",
                      }}
                    >
                      Duration -{" "}
                      <span style={{ color: "#262FD9" }}>{e.durationValue ? e.durationValue : 0} {e.durationType ? e.durationType : 'months'}</span>
                      <br></br>
                      Price - <span style={{ color: "#262FD9" }}>{e.fee ? e.fee : 0} MMK</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to='/home-course' className='flex justify-center py-5 pt-32 sm:pt-0 '>
            <span className=' text-[18px] sm:text-[20px] py-2 text-secondary hover:text-danger font-semibold text-center cursor-pointer border-1 border-secondary-300 w-[130px] rounded-lg hover:border-danger-400'>
              See All
            </span>
          </Link>
        </div >
      </ScrollAnimation>
      {/* Event */}

      < div style={{ background: "var(--blue-pale, #F4FAFF)", height: '120vh' }} className='flex flex-col gap-10 sm:gap-24 relative' >
        {/* <img
          src={EBlue}
          className="absolute bottom-0 left-0 z-0 w-[150px] md:w-[150px]"
          alt=""
        /> */}
        <div className='flex flex-col justify-center items-center gap-4 pt-[44px]'>
          <span className='text-[#1F4164] text-[30px] sm:text-[48px] font-semibold w-full  sm:w-[679px] h-[55px] text-center'>Our Events</span>
          <p className='text-[#1F4164] text-[16px] sm:text-[18px] font-normal w-full  sm:w-[639px] h-[54px] text-center'>
            Clarity gives you the blocks & components you need to create a truly professional website, landing page or admin panel for your SaaS.
          </p>
        </div>

        {/* Web */}
        <div className='hidden sm:grid grid-cols-4 items-center justify-around flex-wrap pl-[130px] pr-[33px]'>
          {eventList?.map((b, index) => (
            <Link href={`/events/${b._id}`} key={index}>
              <div className='relative cursor-pointer hover:translate-y-1 hover:scale-105 duration-500'>
                <Image
                  src={`data:image/jpeg;base64,${b?.image}`}
                  className=' w-[320px] h-[511px]  rounded-[24px]'
                // width={620}
                // height={354}
                />
                <div
                  className='h-[200px] flex flex-col items-center justify-center absolute bottom-0 w-[284px] p-2 z-50 rounded-[20px]'
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                  }}
                >
                  <h3 className=' text-[20px]  text-white font-semibold '>
                    {b.title}
                  </h3>
                  <p className='font-[light] text-[15px] text-white'>
                    {b.startDate?.split('T')[0]}
                  </p>
                </div>
              </div>
            </Link>
          )



          )}
        </div>
        {/* Mobile */}
        <div className='grid sm:hidden grid-cols-1 items-center justify-around flex-wrap pl-[40px] pr-[33px]'>
          {eventList?.slice(0, 1).map((b, index) => (
            <Link href={`/events/${b._id}`} key={index}>
              <div className='relative cursor-pointer'>
                <Image
                  src={`data:image/jpeg;base64,${b?.image}`}
                  className=' w-[300px] h-[411px]  rounded-[24px]'
                // width={620}
                // height={354}
                />
                <div
                  className='h-[200px] flex flex-col items-center justify-center absolute bottom-0 w-[300px] p-2 z-50 rounded-[20px]'
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                  }}
                >
                  <h3 className=' text-[20px]  text-white font-semibold '>
                    {b.title}
                  </h3>
                  <p className='font-[light] text-[15px] text-white'>
                    {b.startDate?.split('T')[0]}
                  </p>
                </div>
              </div>
            </Link>
          )

          )}
        </div>
        <div className='flex justify-center '>
          <Link href='/events'>
            <button className='text-[#18181B] text-[16px] hover:text-primary font-semibold border-1 border-blue-700 p-2 rounded-lg sm:hover:-translate-y-1 sm:hover:scale:110 duration-500'>
              See All Events &nbsp; <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-[blue]' />
            </button>
          </Link>
        </div>

      </div >
      <div className='pt-0 sm:pt-[150px] 2xl:pt-[100px] mx-2'>
        <Testimonials />
      </div>
      <div className='mt-4 mx-2'>
        <Footer />
      </div>



    </div >
  );
};

export default Body;
