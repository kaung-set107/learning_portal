import React, { ReactElement, useState, Component, useEffect } from "react";
import { Image, Button, Card, Link } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { Link } from "react-router-dom";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import MSINav from "./msinav";
import { Testimonials } from "./home_components/Testimonials";
// import { NewsVsActivities } from "./home_components/NewsVsActivities";
import { format } from 'date-fns';
import Welcome from "../../assets/img/welcomeTeam.jpg";
import Sli1 from '../../assets/Slider/Sli1.jpg'
import Sli2 from '../../assets/Slider/Sli2.jpg'
import Sli3 from '../../assets/Slider/Sli3.jpg'
import Sli4 from '../../assets/Slider/Sli4.jpg'
import Sli5 from '../../assets/Slider/Sli5.jpg'
import Sli6 from '../../assets/Slider/Sli6.jpg'
import Thingyan from "../../assets/img/thing.jpg";
import MSIHead from "../../assets/img/msinewimg.png";
import CVBanner from "../../assets/img/cvbanner.png";
import EHome from "../../assets/img/EllipseHome.png";
import EBlue from "../../assets/img/EllipseHalf-blue.png";
import EHalf from "../../assets/img/EllipseHalf.png";
import posed, { PoseGroup } from 'react-pose';
import Footer from "./footer";
import apiInstance from "../../util/api"
import { getFile } from "../../util";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router";
// import Footer from '../../frontend/home/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck, faArrowUpRightFromSquare, faCircleArrowLeft, faCircleArrowRight, faChevronLeft, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import AOS from 'aos';
import "aos/dist/aos.css";
// Define the animation for the text
// import { Wave } from 'react-animated-text';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Activities from "./home_components/activities";
const Body = () => {

  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [eventList, setEventList] = useState([

  ]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const [bannerList, setBannerList] = useState([])
  const time = (val) => {
    format(new Date(val), 'dd MMM yyyy')
  }
  const control = useAnimation();
  const [ref, inView] = useInView();
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 }
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    window.scroll(0, 0)
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
    const getBanner = async () => {
      await apiInstance.get(`banners`).then((res) => {
        console.log(res.data.data[0].images, "ev res");
        setBannerList(res.data.data[0].images);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    getBanner();
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
      <div className='h-[30vh] sm:h-[60vh] mb-[100px]'>

        <Carousel

          showDots={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          // centerMode={true}
          stopOnHover={true}
          centerSlidePercentage='100'
          // customLeftArrow={<FontAwesomeIcon
          //   icon={faChevronLeft}

          //   size="2xl"
          //   className="absolute top-1/2 text-[#000] hover:text-[#fff] hover:scale-110 duration-700 left-10 max-w-4 cursor-pointer hover:bg-slate-800 p-3 rounded-[100%] w-[30px] h-[30px] "
          // />}
          // customRightArrow={
          //   <FontAwesomeIcon
          //     icon={faChevronRight}

          //     size="2xl"
          //     className="absolute top-1/2 text-[#000] hover:text-[#fff] hover:scale-110 duration-700 right-10 max-w-4 cursor-pointer hover:bg-slate-800 p-3 rounded-[100%] w-[30px] h-[30px] "
          //   />}
          // customTransition="all .5"
          responsive={responsive}
          className='p-0  bg-transparent'

        >
          {bannerList.map((i) => (
            <>
              <img src={getFile({ payload: i })} className=' h-[50vh] sm:h-[70vh] lg:h-[80vh] lg:w-full w-[10vh] ' />
            </>
          ))}

        </Carousel>
      </div>


      < div data-aos={"fade-up"} className='flex justify-around pl-[26px]  sm:pl-[57px] pr-[26px] sm:pr-[57px] pt-[20px] sm:pt-[100px] relative  overflow-hidden' >

        <div
          className="absolute bg-[#0B2743] top-0 sm:top-2 lg:top-16 -left-[130px] sm:-left-48 lg:-left-[240px] w-[170px] h-[140px] rounded-full md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[200px]"

        ></div>
        <div className='w-[654px] flex flex-col gap-10  mt-14 lg:mt-16'>
          <ScrollAnimation animateIn='wobble'
          >
            <h1
              className='text-[20px] md:text-[28px] lg:text-[38px] text-center sm:text-start  text-secondary font-semibold w-[300px] sm:w-[562px] font-Poppins '
              style={{ color: "#1F4164", fontWeight: "900" }}
            >

              Join MSI Academy for your brighter future
            </h1>
          </ScrollAnimation>
          <p className=' font-normal text-[16px] md:text-[18px]  lg:text-[20px] w-[330px] sm:w-full leading-[20px] sm:leading-[34px]'>
            MSI Academy, Myanmar Scholastic Innovation Academy, is fulfilling
            the educational and language requirements for Myanmar young leaners'
            dreams of international education in U.S.A,UK,Europe and Asia
            countries as well as kindly consulting in choosing the appropriate
            specializations and engaging the career life style in accordance
            with students' apptitude.
          </p>
          <div className='flex flex-col sm:flex-row gap-10 w-full '>
            <div className='w-[230px] 2xl:w-[400px] flex gap-2' data-aos={"fade-up"}>

              <FontAwesomeIcon icon={faCheck} size='md' className='text-[#2563EB] border-1 border-sky-500 rounded-[100%] p-2' />
              <span className='text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] font-medium w-[206px] 2xl:w-[260px]'>Get unlimited design inspirations. Level up your design.</span>
            </div>
            <div className='w-[230px] flex gap-2 2xl:w-[400px]' data-aos={"fade-up"}>
              <FontAwesomeIcon icon={faCheck} size='md' className='text-[#2563EB] border-1 border-sky-500 rounded-[100%] p-2' />
              <span className='text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] font-medium w-[206px]  2xl:w-[260px]'>
                14+ Premium tailwind UI kits. Start with unlimited product downloads.
              </span>
            </div>
          </div>

        </div>
        <div className='hidden sm:flex overflow-hidden lg:mt-16 mt-14'>
          <Image src={MSIHead} className='md:w-[400px] md:h-[400px] lg:w[450px] lg:h-[450px] ' />
        </div>

        <img
          src={EHalf}
          className="absolute  right-0 w-[80px]  lg:top-[600px]"
          alt=""
        />

      </div >


      {/* Course Section */}

      {/* Event */}
      <ScrollAnimation animateIn='fadeIn'
        animateOut='fadeOut'
        scrollableParentSelector='#cou' >
        < div className='flex flex-col p-5 md:p-5  relative ' id='cou' data-aos={"fade-up"} >

          <h1
            className=' p-10 md:p-20  flex justify-center text-[30px] sm:text-[40px] font-[semibold] py-5'
            style={{ color: "#BC1F40", fontWeight: "900" }}
          >
            Courses We Offer
          </h1>

          <div data-aos={"fade-up"} className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-36 lg:gap-10 2xl:gap-10 sm:gap-0 items-center justify-center sm:py-10 2xl:py-20 container'>
            {courseList?.slice(0, 4).map((e) => (
              <div
                onClick={() => handleRoute(e)}

                className='w-[310px]  md:w-[320px] lg:w-[300px] xl:w-[310px] 2xl:w-[370px] md:h-[480px] h-[470px]'
              >
                <div >
                  <Image
                    // style={{ width: "500px", height: "280px" }}
                    alt={e.image?.originalname}
                    src={getFile({ payload: e.image })}
                    className='w-[310px] h-full md:w-[280px] md:h-[200px] lg:w-[280px] lg:h-[250px] xl:w-[300px] xl:h-[260px] 2xl:w-[370px] sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                  />
                  <div className='flex p-5 flex-col justify-start flex-grow 2xl:w-[350px]'>
                    <span className='w-[280px]  text-[14px] font-semibold text-[#B72041] flex'>MSI Academy
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "600px",
                        fontSize: "20px",
                        letterSpacing: "-0.96px",
                      }}
                      className='w-[290px] h-auto py-2'
                      data-aos={"fade-up"}
                    >
                      {e.title}
                    </span>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "400px",
                        // width: "400px",
                        // height: "auto",
                      }}
                      className='w-[280px] h-[40px]'
                      data-aos={"fade-up"}
                    >
                      {e?.description.substring(0, 50)}...
                    </div>
                    {/* card footer */}
                    <div
                      className='py-5 flex justify-center gap-2 md:w-[250px] w-[290px]'
                      data-aos={"fade-up"}
                    >
                      <div className='h-[24px] w-full md:w-[200px]  text-start bg-[#ECEFFF] rounded-2xl md:text-[12px] text-[13px] font-medium'>
                        <span>Duration -</span>
                        <span style={{ color: "#262FD9" }}>{e.durationValue ? e.durationValue : 0} {e.durationType ? e.durationType : 'months'}</span>
                      </div>

                      <div className='h-[24px] w-full md:w-[200px]  text-start bg-[#FFF3F6] rounded-2xl md:text-[12px] text-[13px] font-medium'>
                        Price - <span style={{ color: "#262FD9" }}>{e.fee ? e.fee : 0} MMK</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href='/home-course' data-aos={"zoom-in"} className='flex justify-center py-5 pt-20 md:pt-[25px] lg:pt-[30px] 2xl:pt-[40px] sm:pt-0 '>
            <span className=' text-[16px] sm:text-[20px] py-2 text-[#1F4164] hover:text-danger font-semibold text-center cursor-pointer border-1 border-[#1F4164] w-[110px] sm:w-[130px] rounded-lg hover:border-danger-400'>
              See All
            </span>
          </Link>
        </div >
      </ScrollAnimation >
      < div data-aos={"fade-up"} style={{ background: "var(--blue-pale, #F4FAFF)" }} className='flex flex-col gap-10 sm:gap-24 relative container h-[800px] lg:h-[880px] xl:h-[950px] sm:h-[1200px]' >
        {/* <img
          src={EBlue}
          className="absolute bottom-0 left-0 z-0 w-[150px] md:w-[150px]"
          alt=""
        /> */}
        < div className='flex flex-col justify-center items-center gap-4 pt-[44px]' data-aos={"fade-up"} >
          <span className='text-[#1F4164] text-[30px] sm:text-[48px] font-semibold w-full  sm:w-[679px] h-[55px] text-center'>Our Events</span>
          <p className='text-[#1F4164] text-[14px] sm:text-[18px] font-normal w-full  sm:w-[639px] h-[54px] text-center'>
            Clarity gives you the blocks & components you need to create a truly professional website, landing page or admin panel for your SaaS.
          </p>
        </div >

        {/* Web */}
        < div className='hidden sm:grid grid-cols-4 lg:gap-5 items-center justify-around flex-wrap pl-[130px] pr-[33px]' data-aos={"fade-up"}>
          {eventList?.slice(0, 4)?.map((b, index) => (
            <Link href={`/events/${b._id}`} key={index}>
              <div className='relative cursor-pointer hover:translate-y-1 hover:scale-105 duration-500'>
                <Image
                  src={`data:image/jpeg;base64,${b?.image}`}
                  className=' md:w-[320px] md:h-[511px] lg:w-[390px] lg:h-[450px]  rounded-[24px]'
                // width={620}
                // height={354}
                />
                <div
                  className='h-[200px] flex flex-col pt-20  justify-start absolute bottom-0 w-full p-4 z-50 rounded-[20px]'
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                  }}
                >
                  <h3 className=' text-[20px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]  text-white font-semibold '>
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
        </div >
        {/* Mobile */}
        < div data-aos={"fade-up"} className='grid sm:hidden grid-cols-1 items-center justify-around flex-wrap pl-[40px] pr-[33px]' >
          {
            eventList?.slice(0, 1).map((b, index) => (
              <Link href={`/events/${b._id}`} key={index}>
                <div className='relative cursor-pointer'>
                  <Image
                    src={`data:image/jpeg;base64,${b?.image}`}
                    className=' w-[300px] h-[411px]  rounded-[24px]'
                  // width={620}
                  // height={354}
                  />
                  <div
                    className='h-[200px] flex flex-col items-start justify-start sm:items-center sm:justify-center absolute bottom-0 w-[200px] sm:w-[300px] p-2 z-50 rounded-[20px]'
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                    }}
                  >
                    <h3 className='text-[16px] w-[200px] sm:w-full sm:text-[20px]  text-white font-semibold pt-[80px] sm:pt-0 '>
                      {b.title}
                    </h3>
                    <p className='font-[light] text-[15px] text-white'>
                      {b.startDate?.split('T')[0]}
                    </p>
                  </div>
                </div>
              </Link>
            )

            )
          }
        </div >
        <div className='flex justify-center ' data-aos={"zoom-in"}>
          <Link href='/events'>
            <button className='text-[#18181B] text-[16px] hover:text-primary font-semibold border-1 border-blue-700 p-2 rounded-lg sm:hover:-translate-y-1 sm:hover:scale:110 duration-500'>
              See All Events &nbsp; <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-[blue]' />
            </button>
          </Link>
        </div>

      </div >
      <Activities />
      <Testimonials />

      <div className='mt-4 mx-2'>
        <Footer />
      </div>



    </div >
  );
};

export default Body;
