import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Image,
  Input,
  Progress,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Footer from '../footer'
import { getFile } from "../../../util";
import Module from "../../../assets/img/modules.svg";
import Chapter from "../../../assets/img/chapter.svg";
import Download from "../../../assets/img/download.svg";
import TV from "../../../assets/img/tv.svg";
import Certi from "../../../assets/img/certi.svg";
import Earth from "../../../assets/img/earth.svg";
import apiInstance from "../../../util/api";
import Loading from '../../../assets/img/finalloading.gif'
import { useNavigate, useLocation } from "react-router-dom";
// import SubDetail from "./SubjectDetail/subjectDetail";
import MSINav from "../msinav";
// import Head from "../head";
export default function CourseDetail(props) {
  const variant = 'bordered'
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state.data;
  const [course, setCourse] = useState([]);
  const [value, setValue] = useState("");
  const [showVideoList, setShowVideoList] = useState([])
  // const handleSubjectDetail = (data, value) => {
  //   setValue(value);
  //   navigate("/home-sub-detail", {
  //     state: { data: data, courseData: courseData },
  //   });
  // console.log(location.state.data, "sub");
  // };
  const [subjectList, setSubjectList] = useState([]);
  const [subjectAndTeacherList, setSubjectAndTeacherList] = useState([]);
  useEffect(() => {
    // window.scroll(0, 0)
    const getCourseDetail = async () => {
      await apiInstance.get("courses/" + courseData._id).then((res) => {
        // console.log(res.data.data, "c detail");
        setCourse(res.data.data);
        setSubjectList(res.data.data.subjects);
        setShowVideoList(res.data.data.previewVideo ? JSON.parse(res.data.data.previewVideo) : '');
      });
    };
    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {
        // console.log(
        //   res.data.data.filter((el) => el.course._id),
        //   "c subject"
        // );
        setSubjectAndTeacherList(
          res.data.data.filter((el) => el.course?._id === courseData?._id)
        );
      });
    };
    getSubjects();
    getCourseDetail();
  }, []);

  return (
    <>
      <MSINav />
      <div className='sm:pr-[20px] sm:pb-[100px] sm:pl-[40px] container '>
        <>
          {/* <Head /> */}
          <div className='flex flex-col gap-5 sm:gap-10 md:gap-10 lg:gap-16 xl:gap-20 2xl:gap-28 duration-100'>
            {/* Video Section */}
            <div className='flex flex-col gap-10 lg:gap-20 pt-5 md:pt-20 md:flex-row'>
              {!showVideoList[0] ? (
                <div className='flex justify-center pt-[40px] w-full gap-2 md:w-[900px]'>
                  <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />

                </div>
              ) : (

                showVideoList ?
                  (showVideoList.map((video) => (
                    <div className='flex w-full gap-2 md:w-[900px] ' key={video}>
                      <iframe
                        src={
                          "https://www.youtube.com/embed/" +
                          video.links?.split("/")[3]
                        }
                        //   title={assignList.name}
                        allowFullScreen
                        className='border w-[375px] h-[136px] sm:w-[600px] sm:h-[250px] md:w-[711px] md:h-[306px] lg:w-[580px] xl:w-[850px] '
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      // style={{ width:'1400px',height:'500px' }}
                      ></iframe>
                    </div>
                  ))) : (
                    <div className='flex w-full gap-2 md:w-[900px] lg:w-[800px] ' >
                      <iframe
                        src='https://www.youtube.com/embed/AJhplp3dct8'
                        //   title={assignList.name}
                        allowFullScreen
                        className='border w-[375px] h-[136px] md:w-[711px] md:h-[306px] lg:w-[580px] xl:w-[850px]]'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      // style={{ width:'1400px',height:'500px' }}
                      ></iframe>
                    </div>
                  ))}


              <div className='py-20 md:py-0'>
                <div

                  className='flex justify-center sm:justify-start sm:items-center mx-4 md:mx-0 pr-[20px] md:pr-[24px] w-[330px] h-[120px] sm:w-[560px] sm:h-[250px] md:w-[275px] md:h-[306px] lg:w-[300px] '
                >
                  <div className='flex flex-col gap-10 sm:gap-5  sm:p-5 justify-center'>
                    <h1 style={{ fontSize: "20px", fontWeight: "700" }}>
                      This Course Include
                    </h1>
                    <div className=' grid grid-cols-2 sm:grid sm:grid-cols-3 gap-4 align-middle md:grid-cols-1 text-[14px] font-normal sm:text-[16px] md:text-[14px]  border-1 border-red-600 p-5 sm:p-6 rounded-lg sm:rounded-lg '>
                      <div className='flex gap-2'>
                        <img
                          src={Module}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className=''>
                          4 modules
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <img
                          src={Chapter}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className=''>
                          26 chapters
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <img
                          src={Download}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className=''>
                          64 downloadable resources
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <img
                          src={TV}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className=''>
                          Full lifetime access
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <img
                          src={TV}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className=''>
                          Certificate of completion
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* To Wrap Earth Png */}
            {/* Web View */}
            <div
              style={{
                backgroundImage: `url(${Earth})`,
                backgroundPosition: "right",
                backgroundSize: "70% 100%",
                backgroundAttachment: "scroll",
                backgroundRepeat: "no-repeat",
                padding: "64px 0px -180px 0px",
              }}
              className='hidden sm:flex flex-col mt-0 sm:mt-20 md:bg-right md:bg-contain'
            >
              {/* <div className='w-[375px] h-full sm:w-full sm:h-[272px]'>
                <div className=''>
                  <span className='text-[20px] font-semibold sm:text-[40px]'>
                    Not sure where to start?
                  </span>

                  <div className='flex flex-col gap-5'>
                    <p className='text-[12px] font-medium w-[330px] h-[36px] sm:w-[466px] sm:h-[72px] sm:text-[16px]'>
                      No problem, we are here to help! Just answer a couple of
                      questions related to your interests and goals, and we will
                      help set you on the right path on your learning journey.{" "}
                    </p>
                    <Button className='text-[#fff] bg-[#215887] text-[12px] sm:text-[16px] rounded-[4px] sm:rounded-[8px] mt-5 sm:mt-10 sm:hover:-translate-x-1 sm:hover:scale-110 duration-700 w-[67px] h-[26px] sm:w-[227px] sm:h-[48px] lg:w-[200px] lg:h-[40px]'>
                      <span className='p-2'>Take Quiz</span>
                    </Button>
                  </div>

                </div>
              </div> */}

              {/* Subjects Section Start */}
              <div className='sm:pt-0 pt-10'>
                <span className='text-[30px] font-semibold sm:text-[40px]'>
                  Subjects
                </span>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-10'>
                  {subjectList.map((e) => (
                    <>
                      <div
                        style={{
                          backgroundColor: "#215887",
                          borderRadius: "14px",
                          boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.10)",
                          // width: "490px",
                          // height: "463px",
                          padding: "14px 13px",
                        }}
                        className='w-full sm:w-[280px] sm:h-auto md:w-[320px] xl:w-[380px] md:h-[463px] flex flex-col gap-3 sm:hover:-translate-y-2  sm:hover:scale-105 hover:bg-indigo-500 duration-700'
                      >
                        <Image
                          radius='sm'
                          alt={e.image.originalname}

                          className='sm:w-[280px] sm:h-[180px] md:w-[300px] xl:w-[350px] w-[364px] h-[200px]'
                          src={getFile({ payload: e.image })}
                        />

                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            color: "#FFF",

                            borderBottom: "1px dotted white",
                          }}
                          className='w-full h-full lg:w-[350px] xl:w-[370px] 2xl:w-[380px]'
                        >
                          {e.title}
                        </span>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#FFF",
                          }}
                          className='min-w:[464px] h-[100px]'
                        >
                          {e.description.substring(0, 100)}
                        </p>
                        <div
                          // style={{ padding: "70px 28px 0px 120px" }}
                          className='flex justify-center'
                        >
                          <Link to={'/home-sub-detail/' + e._id}
                            className='bg-red-500 hover:bg-red-700 p-3 w-full flex justify-center items-center text-[#fff] text-[12px] sm:text-[16px] font-normal sm:font-medium rounded-[6px] sm:rounded-[12px]  lg:h-[40px]'
                          // onClick={() => { handleSubjectDetail(e, "sub-detail"), window.scroll(0, 0) }}
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </>
                  ))}
                  {/* {subjectList?.length > 3 && (
              <div className='py-10'>
                <button
                  style={{
                    padding: "16px",
                    width: "150px",
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
                    {console.log(subjectList?.length - 3, "sub")}
                    Show {subjectList?.length - 3} More
                  </span>
                </button>
              </div>
            )} */}
                </div>
              </div>
              {/* Subject Section End */}


              {/* Teacher Section End */}
            </div>

            {/* Mobile View */}
            <div
              style={{

              }}
              className='flex sm:hidden flex-col mt-0 sm:mt-20 md:bg-right md:bg-contain'
            >


              {/* Subjects Section Start */}
              <div className='sm:pt-0 pt-10 mx-2'>
                <span className='text-[30px] font-semibold sm:text-[40px]'>
                  Subjects
                </span>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 pt-10'>
                  {subjectList.slice(0, 3).map((e) => (
                    <>
                      <div
                        style={{
                          backgroundColor: "#215887",
                          borderRadius: "14px",
                          boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.10)",
                          // width: "490px",
                          height: "433px",
                          padding: "14px 13px",
                        }}
                        className=' w-full sm:m-w:[490px] sm:hover:-translate-y-2 sm:hover:rotate-1 sm:hover:scale-110 sm:hover:bg-indigo-500 sm:duration-500'
                      >
                        <Image
                          radius='sm'
                          alt={e.image.originalname}

                          className='sm:w-[464px] sm:h-[238px] w-[364px] h-[200px]'
                          src={getFile({ payload: e.image })}
                        />

                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            color: "#FFF",


                            borderBottom: "1px dotted white",
                          }}
                          className='w-full h-full lg:w-[350px] xl:w-[370px] 2xl:w-[380px]'
                        >
                          {e.title}
                        </span>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#FFF",
                          }}
                          className='min-w:[464px] min-h:[auto]'
                        >
                          {e.description.substring(0, 150)}
                        </p>
                        <div
                          // style={{ padding: "70px 28px 0px 120px" }}
                          className='flex justify-center pt-10 sm:pt-0'
                        >
                          <Link to={'/home-sub-detail/' + e._id}
                            className='bg-red-500 hover:bg-red-700 p-3 w-full flex justify-center items-center text-[#fff] text-[12px] sm:text-[16px] font-normal sm:font-medium rounded-[6px] sm:rounded-[12px]  lg:h-[40px]'
                          // onClick={() => { handleSubjectDetail(e, "sub-detail"), window.scroll(0, 0) }}
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </>
                  ))}
                  {/* {subjectList?.length > 3 && (
              <div className='py-10'>
                <button
                  style={{
                    padding: "16px",
                    width: "150px",
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
                    {console.log(subjectList?.length - 3, "sub")}
                    Show {subjectList?.length - 3} More
                  </span>
                </button>
              </div>
            )} */}
                </div>
              </div>
              {/* Subject Section End */}

              {/* Teacher Section End */}

              {/* Teacher Section End */}
            </div>
            {/* End To Wrap Earth Png */}

            {/* Certificate Section Start */}
            <div

              className='flex justify-center mt-20 bg-[#215887] h-[429px] p-[32px 0px] mx-2'
            >
              {/* Web View */}
              <div
                className='hidden md:grid md:grid-cols-2 gap-52 lg:gap-[200px] h-[629px] p-[32px 0px]'

              >
                <div
                  style={{
                    width: "642px",
                    height: "304px",
                    padding: "107.35px 15.212px 107.35px 30.038px",
                  }}
                  className='sm:w-[642px] sm:h-[304px] w-[242px] h-[204px]'
                >
                  <span

                    className='text-[30px] sm:text-[40px] font-medium sm:font-bold text-[#fff]'
                  >
                    Earn a certificate
                  </span>
                  <p

                    className='text-[12px] sm:text-[16px] font-normal sm:font-medium text-[#fff]'
                  >
                    Complete our IELTS course with excellence and earn a
                    prestigious certificate, a testament to your enhanced
                    language proficiency and preparedness for success in the
                    IELTS examination. This certificate not only showcases your
                    commitment to mastering English skills but also serves as a
                    valuable credential, opening doors to academic pursuits and
                    professional opportunities.
                  </p>
                </div>

                <div className='hidden sm:block'>
                  <div

                    className='hover:cursor-pointer hover:-translate-y-2 hover:rotate-1 hover:scale-110 duration-500'
                  >
                    <Image
                      src={Certi}
                      // style={{
                      //   width: "380.905px",
                      //   height: "346.011px",
                      // }}
                      className='pl-[60px] w-[300.905px] h-[346.011px] 2xl:w-full '
                    />
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div
                className='grid md:hidden grid-cols-1 gap-12 h-[159px]'

              >
                <div

                  className='sm:w-[642px] sm:h-[304px] w-full h-full p-5 sm:p-6 md:p-0'
                >
                  <span

                    className='text-[30px] sm:text-[40px]  pt-3 font-medium sm:font-bold text-[#fff] p-3'
                  >
                    Earn a certificate
                  </span>
                  <div className='flex flex-col'>
                    <p

                      className='text-[12px] sm:text-[16px] font-normal sm:font-medium text-[#fff] w-[300px] sm:w-[530px]'
                    >
                      Complete our IELTS course with excellence and earn a
                      prestigious certificate, a testament to your enhanced
                      language proficiency and preparedness for success in the
                      IELTS examination. This certificate not only showcases your
                      commitment to mastering English skills but also serves as a
                      valuable credential, opening doors to academic pursuits and
                      professional opportunities.
                    </p>
                    <Image
                      src={Certi}
                      // style={{
                      //   width: "316.905px",
                      //   height: "346.011px",
                      // }}
                      className='w-[220px] h-[200px] sm:w-[240px] sm:h-[230px] lg:w-full'
                    />

                  </div>

                </div>


              </div>
            </div>
            {/* Certificate Section End */}
          </div>
          {/* Info Section Start */}

          <div
            className='hidden md:flex'
            style={{
              height: "327px",
            }}
          >
            {/* Web View */}
            <div
              style={{
                width: "455px",
                height: "325px",
                backgroundColor: "#215887",
                padding: "64px 0px 89px 40px",
                position: "absolute",
              }}
              className='flex flex-col gap-1 ml-2'
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#FFF",
                }}
              >
                Get More
              </span>
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "600",
                  color: "#F0CC00",
                }}
              >
                Information
              </span>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#FFF",
                  width: "250px",
                  height: "72px",
                }}
              >
                Want to know more? Enter your information to learn more about
                this course from MSI Academy.
              </p>
            </div>
            <div
              style={{
                width: "395px",
                height: "175px",
                backgroundColor: "#FFF",

                position: "absolute",
                left: "310px",
                marginTop: "8rem",
              }}
              className='-rotate-17 2xl:hidden flex'
            ></div>
            <div
              style={{
                height: "180px",
                width: "1856px",
                padding: "60px 0px 0px 500px",
              }}
              className='flex flex-col gap-10'
            >
              <div className='flex gap-2'>
                <Input type='text' variant={variant} placeholder='First Name' />
                <Input type='text' variant={variant} placeholder='Last Name' />
              </div>
              <div className='flex gap-2'>
                {" "}
                <Input type='phone' variant={variant} placeholder='Phone Number' />
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#215887",
                    color: "white",
                    padding: "10px 20px",
                  }}
                  className='hover:-translate-x-1 hover:scale-110 duration-700'
                >
                  Request more information
                </Button>
              </div>
            </div>

          </div>

          <div
            className='flex flex-col gap-10 md:hidden pt-10 mx-2'

          >
            {/* Mobile View */}
            <div
              style={{

                backgroundColor: "#215887",

                position: "absolute",
              }}
              className='flex flex-col gap-1 p-3  sm:h-[527px] sm:w-[560px] w-[330px] h-[500px]'
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#FFF",
                }}
              >
                Get More
              </span>
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "600",
                  color: "#F0CC00",
                }}
              >
                Information
              </span>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#FFF",
                  width: "320px",
                  height: "72px",
                }}
              >
                Want to know more? Enter your information to learn more about
                this course from MSI Academy.
              </p>
            </div>

            {/* Form */}
            <div

              className='flex flex-col gap-10 pt-60 mx-3  '
            >
              <div className='flex gap-2 w-full'>
                <Input type='text' placeholder='First Name' />
                <Input type='text' placeholder='Last Name' />
              </div>
              <div className='flex gap-2'>
                {" "}
                <Input type='phone' placeholder='Phone Number' />
              </div>
              <div className='flex justify-center'>
                <Button
                  style={{
                    backgroundColor: "#2C4AE7",
                    color: "white",
                    padding: "10px 20px",
                  }}
                  className='hover:-translate-x-1 hover:scale-110 duration-700'
                >
                  Request more information
                </Button>
              </div>
            </div>
          </div>
          {/* Info Section End */}

        </>

      </div >

      <div className='pt-[100px] mx-2'>
        <Footer />
      </div>
    </>
  );
}
