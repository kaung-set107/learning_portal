import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import MSINav from "./msinav";
import { Testimonials } from "./home_components/Testimonials";
import Welcome from "../../assets/img/welcomeTeam.jpg";
import EHome from "../../assets/img/EllipseHome.png";
import EHalf from "../../assets/img/EllipseHalf.png";
import EBlue from "../../assets/img/EllipseHalf-blue.png";

import Footer from "./footer";
import apiInstance from "../../util/api";
import { getFile } from "../../util";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router";
// import Footer from '../../frontend/home/footer';
const Body = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [events, setEvents] = useState([
    {
      _id: "1",
      title: "MSI Academy Education Center - Graduration Ceremony",
      createdAt: "November 12, 2022",
      shortDescription: "GRADUATION CEREMONY",
    },
  ]);

  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        console.log(res.data.data, "course res");
        console.log(catList, "cat");
        setCourseList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
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
    <>
      <MSINav />

      <div className='flex items-center justify-around flex-wrap relative mb-10 py-[100px]'>
        <img
          src={EHome}
          className='absolute top-0 left-0 z-0 w-[150px] md:w-[250px]'
          alt=''
        />

        <div className='w-full px-5 md:m-0 lg:w-[490px] leading-[60px] mt-10'>
          <h1
            className='text-[50px] text-secondary font-[semibold] '
            style={{ color: "#BC1F40", fontWeight: "900" }}
          >
            Welcome to MSI Academy
          </h1>
          <p className='font-[regular] text-xl w-full md:w-[90%]'>
            MSI Academy, Myanmar Scholastic Innovation Academy, is fulfilling
            the educational and language requirements for Myanmar young leaners'
            dreams of international education in U.S.A,UK,Europe and Asia
            countries as well as kindly consulting in choosing the appropriate
            specializations and engaging the career life style in accordance
            with students' apptitude.
          </p>
        </div>
        <div className='px-5 py-10 z-0'>
          <Image src={Welcome} />
        </div>

        <img
          src={EHalf}
          className='absolute bottom-0 right-0 z-10 w-[100px] md:w-[150px]'
          alt=''
        />
      </div>

      <div className='p-5 md:p-10 relative'>
        <img
          src={EBlue}
          className='absolute bottom-0 left-0 z-0 w-[150px] md:w-[250px]'
          alt=''
        />
        <h1
          className='text-[40px] font-[semibold] py-5'
          style={{ color: "#BC1F40", fontWeight: "900" }}
        >
          Courses We Offer
        </h1>

        <div className='flex flex-col gap-32 items-center justify-center md:flex-row flex-wrap py-10'>
          {courseList.map((e) => (
            <div
              onClick={() => handleRoute(e)}
              className='w-full hover:-translate-y-1 hover:scale-110 hover:rotate-1 hover:duration-500 md:w-[390px] h-full md:h-[610px]'
            >
              <div>
                <Image
                  // style={{ width: "500px", height: "280px" }}
                  alt={e.image?.originalname}
                  src={getFile({ payload: e.image })}
                  className='w-full h-full sm:w-[500px] sm:h-[280px]'
                />
                <div className='flex p-5 flex-col justify-start flex-grow '>
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "600px",
                      fontSize: "24px",
                      letterSpacing: "-0.96px",
                    }}
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
                    className='w-full md:w-[400px] md:h-[auto]'
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
                    <span style={{ color: "#262FD9" }}>3 months</span>
                    <br></br>
                    Price - <span style={{ color: "#262FD9" }}>50000 MMK</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to='/home-course' className='flex justify-center py-10'>
          <h1 className='text-2xl py-10 text-secondary hover:text-danger font-semibold text-center cursor-pointer'>
            See All
          </h1>
        </Link>
      </div>

      <div
        className='p-5 md:p-10 min-w[768px]'
        style={{ backgroundColor: `rgb(188, 31, 64)` }}
      >
        <div className='flex items-center flex-wrap justify-between md:px-[135px] my-10'>
          <h3 className='text-white text-[40px] leading-[50px] font-semibold'>
            Our Events
          </h3>
          <Link href='/events'>
            <button className='text-white text-[20px] hover:text-primary font-semibold'>
              View All
            </button>
          </Link>
        </div>
        <div className='flex items-center justify-around flex-wrap'>
          {events?.map((b, index) => {
            return (
              <Link href={`/events/${b._id}`} key={index}>
                <div className='relative cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 my-10'>
                  <Image
                    src={Welcome}
                    className='object-cover w-full h-full z-10 rounded-[24px]'
                    width={320}
                    height={354}
                  />
                  <div
                    className='h-[200px] flex flex-col items-start justify-center absolute bottom-1 w-full p-5 z-20 rounded-[24px]'
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                    }}
                  >
                    <h3 className=' text-[20px]  text-white font-semibold '>
                      {b.title}
                    </h3>
                    <p className='font-[light] text-[15px] text-white'>
                      {b.createdAt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Testimonials />
      <Footer />
    </>
  );
};

export default Body;
