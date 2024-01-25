import { useState, useEffect } from "react";
import { Image, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import MSINav from "./msinav";
import Testimonials from "./testimonials";
import Welcome from "../../assets/img/welcomeTeam.jpg";
import EHome from "../../assets/img/EllipseHome.png";
import EHalf from "../../assets/img/EllipseHalf.png";
import EBlue from "../../assets/img/EllipseHalf-blue.png";
import ELP from "./image/el.png";
import apiInstance from "../../util/api";
import { getFile } from "../../util";
import { Fade } from "react-awesome-reveal";
// import Footer from '../../frontend/home/footer';
export default function body() {
  const [courseList, setCourseList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [events, setEvents] = useState([
    {
      _id: "1",
      title: "MSI Academy Education Center - Graduration Ceremony",
      createdAt: "November 12, 2022",
      shortDescription: "GRADUATION CEREMONY",
      coverPic: "/assets/images/welcomeTeam.jpg",
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
  return (
    <div className=''>
      <MSINav />
      <>
        <div className='flex items-center justify-around flex-wrap relative mb-10 py-[100px]'>
          <img
            src={EHome}
            className='absolute top-0 left-0 z-0 w-[150px] md:w-[250px]'
            alt=''
          />

          <div className='w-full px-5 md:m-0 lg:w-[490px] leading-[60px] static z-10'>
            <h1
              className='text-[50px] font-[semibold]'
              style={{ color: "#BC1F40", fontWeight: "900" }}
            >
              Welcome to MSI Academy
            </h1>
            <p className='font-[regular] text-xl'>
              MSI Academy, Myanmar Scholastic Innovation Academy, is fulfilling
              the educational and language requirements for Myanmar young
              leaners' dreams of international education in U.S.A,UK,Europe and
              Asia countries as well as kindly consulting in choosing the
              appropriate specializations and engaging the career life style in
              accordance with students' apptitude.
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
            className='text-[40px] font-[semibold]  ml-5 py-10'
            style={{ color: "#BC1F40", fontWeight: "900" }}
          >
            Courses We Offer
          </h1>

          {catList.map((item, index) => (
            <Fade>
              <div className='flex gap-6'>
                <div className='pt-32'>
                  {/* <div
                    style={{
                      color: "#000",
                      fontSize: "40px",
                      fontWeight: "600px",
                      wordSpacing: "-1.6px",
                    }}
                  >
                    {item?.title} Courses
                  </div> */}
                  <div
                    className='grid grid-cols-2 gap-10 pt-10 md:grid-cols-3'
                    style={{ width: "1440px", height: "auto" }}
                  >
                    {courseList
                      .filter((el) => el.category._id === item._id)
                      .map((e) => (
                        <div
                          onClick={() => handleRoute(e)}
                          style={{ height: "470px" }}
                          className='min-w:[490px]  flex flex-col gap-3 hover:-translate-y-1 hover:rotate-1 hover:scale-110 duration-500'
                        >
                          <div>
                            <Image
                              style={{ width: "500px", height: "280px" }}
                              alt={e.image?.originalname}
                              src={getFile({ payload: e.image })}
                            />
                            <div className='flex p-5 flex-col justify-start flex-grow'>
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
                                  width: "500px",
                                  height: "auto",
                                }}
                              >
                                {e?.description}
                              </div>
                              {/* card footer */}
                              <div
                                className='py-10'
                                style={{
                                  width: "388px",
                                  height: "19px",
                                  fontSize: "14px",
                                  fontWeight: "400px",
                                }}
                              >
                                Duration -{" "}
                                <span style={{ color: "#262FD9" }}>
                                  3 months
                                </span>
                                <br></br>
                                Price -{" "}
                                <span style={{ color: "#262FD9" }}>
                                  50000 MMK
                                </span>
                              </div>

                              {/* rating state */}
                              {/* <div
                                style={{
                                  width: "388px",
                                  height: "19px",
                                  fontSize: "14px",
                                  fontWeight: "400px",
                                }}
                              >
                                <ReactStars {...firstExample} />
                              </div> */}
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* {item.subjects?.length > 3 && (
                      <div className='py-10'>
                        <button
                          style={{
                            padding: "16px",
                            width: "125px",
                            height: "43px",
                            alignItems: "center",
                            border: "1px solid #053CFF",
                            borderRadius: "8px",
                          }}
                          className='flex justify-start'
                        >
                          <span
                            style={{
                              color: "#053CFF",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontWeight: "500px",
                            }}
                          >
                            {console.log(item.subjects?.length - 3, "sub")}
                            Show {item.subjects?.length - 3} More
                          </span>
                        </button>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </Fade>
          ))}

          <Link href='/courses'>
            <h1 className='text-2xl py-10 text-primary hover:text-secondary font-[semibold] text-center cursor-pointer'>
              See All
            </h1>
          </Link>
        </div>

        <div className='p-5 md:p-10 bg-secondary'>
          <div className='flex items-center flex-wrap justify-between md:px-[135px] my-10'>
            <h3 className='text-white text-[40px] leading-[50px] font-[semibold]'>
              Our Events
            </h3>
            <button className='text-white text-[20px] hover:text-primary font-[semibold]'>
              <Link href='/events'>View all</Link>
            </button>
          </div>
          <div className='flex items-center justify-around flex-wrap'>
            {events?.map((b, index) => {
              return (
                <Link href={`/events/${b._id}`} key={index}>
                  <div className='relative cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 my-10'>
                    <Image
                      src={b.coverPic}
                      className='absolute object-cover w-full h-full z-10 rounded-[24px]'
                      width={320}
                      height={354}
                    ></Image>
                    <div
                      className='h-[200px] flex flex-col items-start justify-center absolute bottom-1 w-full p-5 z-20 rounded-[24px]'
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                      }}
                    >
                      <h3 className='font-[semibold] text-[20px] ] text-white '>
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
      </>

      {/* <div className='bg-slate-900 h-32 py-4 px-5 flex items-end'>
   <Footer/>
     </div> */}
    </div>
  );
}
