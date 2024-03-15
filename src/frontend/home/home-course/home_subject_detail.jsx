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
import Footer from '../footer'
import { getFile } from "../../../util";
import Module from "../../../assets/img/modules.svg";
import Chapter from "../../../assets/img/chapter.svg";
import Download from "../../../assets/img/download.svg";
import TV from "../../../assets/img/tv.svg";
import ReadBook from "../../../assets/img/readbook.gif";
import Book from "../../../assets/img/book.svg";
import Date from "../../../assets/img/date.svg";
import Person from "../../../assets/img/person.svg";
import Time from "../../../assets/img/time.svg";
import WhiteTime from "../../../assets/img/whitetime.svg";
import Certi from "../../../assets/img/certi.svg";
import MSINav from "../msinav";

import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const SubjectDetail = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const SubData = location.state.data;
  // console.log(location.state.data, "sub ii");
  const courseData = location.state.courseData;
  // console.log(props.id, "id");
  const [subjectList, setSubjectList] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
  const [teacherImage, setTeacherImage] = useState([]);
  useEffect(() => {
    const getCourseDetail = async () => {
      await apiInstance.get("courses/" + props.id).then((res) => {
        // console.log(res.data.data.subjects, "c detail");
        setSubjectList(res.data.data.subjects);
      });
    };
    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {
        console.log(
          res.data.data.filter((el) => el._id === SubData._id)[0],
          "c subject"
        );
        const Filter = res.data.data.filter((el) => el._id === SubData._id)[0];
        setTeacherName(Filter);
        const Img = getFile({
          payload: Filter.instructor.image,
        });
        setTeacherImage(Img);
      });
    };
    getSubjects();
    getCourseDetail();
  }, []);

  const handleBack = () => {
    navigate("/course-detail", { state: { data: courseData } });
  };
  return (
    <>
      <MSINav />
      <div className=' md:p-[24 20 100 40]'>
        <div className='flex flex-col gap-10 md:gap-20 duration-100'>
          {/* Video Section */}
          <div className='flex flex-col gap-10 md:gap-56 pt-5 md:pt-20 md:flex-row'>
            <div className='flex w-full gap-2 md:w-[900px] '>
              <div className='hidden md:flex'>
                <Button
                  color='primary'
                  variant='light'
                  onClick={handleBack}
                  style={{ borderRadius: "100px", padding: "5px" }}
                  className='flex hove:cursor-pointer'
                >
                  <FontAwesomeIcon icon={faAngleLeft} size='2xl' />
                </Button>
              </div>
              <div>
                {" "}
                <iframe
                  src='https://www.youtube.com/embed/AJhplp3dct8'
                  allowfullscreen=''
                  //   width='911'
                  //   height='306'
                  className='border w-[375px] h-[136px] md:w-[911px] md:h-[306px]'
                ></iframe>
              </div>
            </div>
            <div className=' '>
              <div
                style={{
                  border: "1px solid red",
                  borderRadius: "12px",
                }}
                className='flex items-center mx-4 md:mx-0 md:pr-[24] w-[345px] h-[134px] md:w-[275px] md:h-[306px]'
              >
                <div className='flex flex-col gap-5 p-5'>
                  <h1 style={{ fontSize: "20px", fontWeight: "700" }}>
                    This Subject Include
                  </h1>
                  <div className='grid grid-cols-3 gap-4 align-middle md:grid-cols-1'>
                    <div className='flex gap-2'>
                      <img
                        src={Module}
                        style={{ width: "16px", height: "16px" }}
                      />{" "}
                      <span className='text-[8px] font-normal md:text-[14px]'>
                        4 modules
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <img
                        src={Chapter}
                        style={{ width: "16px", height: "16px" }}
                      />{" "}
                      <span className='text-[8px] font-normal md:text-[14px]'>
                        26 chapters
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <img
                        src={Download}
                        style={{ width: "16px", height: "16px" }}
                      />{" "}
                      <span className='text-[8px] font-normal md:text-[14px]'>
                        64 downloadable resources
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <img src={TV} style={{ width: "16px", height: "16px" }} />{" "}
                      <span className='text-[8px] font-normal md:text-[14px]'>
                        Full lifetime access
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <img src={TV} style={{ width: "16px", height: "16px" }} />{" "}
                      <span className='text-[8px] font-normal md:text-[14px]'>
                        Certificate of completion
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Detail Section */}
          <div style={{ height: "241px" }}>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mx-4 '>
              <div
                style={{
                  //   width: "305px",
                  //   height: "177px",
                  //   padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col w-[160px] h-[119px] md:w-[305px] md:h-[177px] md:p-[24px 120px 50px 120px]'
              >
                <Image
                  src={Time}
                  className='w-[40px] h-[40px] md:w-[64px] md:h-[64px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Duration
                </span>
                <span
                  style={{
                    // fontSize: "24px",
                    // fontWeight: "700",
                    paddingLeft: "40px",
                    // width: "298px",
                    // height: "29px",
                  }}
                  className='text-[14px] w-[200px]  h-[24px] md:text-[24px] font-medium md:w-[298px] md:h-[29px]'
                >
                  {teacherName?.duration ? parseInt((teacherName?.duration * 30) / 7) : 0} Weeks &{" "}
                  {teacherName?.duration ? (teacherName?.duration * 30) % 7 : 0} Days
                </span>
              </div>
              <div
                style={{
                  //   width: "305px",
                  //   height: "177px",
                  //   padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col w-[160px] h-[119px] md:w-[305px] md:h-[177px] md:p-[24px 120px 50px 120px]'
              >
                <Image
                  src={Person}
                  className='w-[40px] h-[40px] md:w-[64px] md:h-[64px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Instructor
                </span>
                <span className='text-[16px] pl-4 md:pl-0 md:text-[24px] font-bold w-[98px] h-[29px]'>
                  Tr.{teacherName.instructor ? teacherName.instructor?.name : 'Hein'}
                </span>
              </div>
              <div
                style={{
                  //   width: "305px",
                  //   height: "177px",
                  //   padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col w-[160px] h-[119px] md:w-[305px] md:h-[177px] md:p-[24px 120px 50px 120px]'
              >
                <Image
                  src={Book}
                  className='w-[40px] h-[40px] md:w-[64px] md:h-[64px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Batch 10
                </span>
                <span className='text-[16px] pl-8 md:pl-0 md:text-[24px] font-bold w-[158px] h-[29px]'>
                  {teacherName?.noOfEnrolledStudent} Students
                </span>
              </div>
              <div
                style={{
                  //   width: "305px",
                  //   height: "177px",
                  //   padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col w-[160px] h-[119px] md:w-[305px] md:h-[177px] md:p-[24px 120px 50px 120px]'
              >
                <Image
                  src={Date}
                  className='w-[40px] h-[40px] md:w-[64px] md:h-[64px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Exam
                </span>
                <span className='text-[16px] pl-6 md:pl-0 md:text-[24px] font-bold w-[128px] h-[29px]'>
                  Mid + Final
                </span>
              </div>
            </div>
          </div>
          {/* About Section */}
          <div className='flex'>
            <div className='w-[375px] h-full sm:h-[426px] pt-[24px] md:w-[946px] md:h-[426px] md:p-[24px] mx-4 md:mx-0'>
              <div className='flex flex-col gap-10'>
                <span className='text-[20px] md:text-[40px] font-bold '>
                  About This Course
                </span>
                <p className='text-[11px] pt-0 md:text-[16px] font-medium'>
                  Embark on a comprehensive IELTS preparation journey with our
                  meticulously designed course, offering in-depth insights into
                  each section of the test, expert strategies, and personalized
                  feedback to help you achieve your desired band score." "Our
                  IELTS course goes beyond the basics, providing a tailored
                  learning experience that covers all aspects of the exam – from
                  honing language skills to mastering test-taking strategies,
                  ensuring you're fully equipped for success." "Unlock your
                  potential with our IELTS preparation course, where dynamic
                  lessons, interactive exercises, and real-time feedback
                  converge to optimize your language proficiency and test
                  performance." "Join our IELTS program and experience a
                  holistic approach to language development, strategically
                  designed to enhance your listening, reading, writing, and
                  speaking skills, empowering you to excel in the IELTS exam."
                  "Immerse yourself in a targeted IELTS curriculum that not only
                  sharpens your English language abilities but also equips you
                  with the tactics and confidence needed to ace the IELTS test
                  and secure your academic or professional aspirations." "Our
                  IELTS course is your roadmap to success, featuring
                  comprehensive study materials, simulated practice tests, and
                  expert guidance to elevate your performance and ensure you
                  reach your desired IELTS score." "Elevate your IELTS journey
                  with our course, offering a blend of engaging lessons,
                  authentic practice materials, and individualized coaching to
                  maximize your potential and achieve your IELTS goals."
                  "Prepare with precision for the IELTS exam through our
                  thoughtfully curated course, where experienced instructors
                  guide you through intensive skill-building exercises, practice
                  tests, and invaluable tips for success.
                </p>
              </div>
            </div>
            <div className='hidden md:flex md:w-[565px] md:h-[565px] p-[66.79 4.442 81.946 3.637]'>
              <Image src={ReadBook} />
            </div>
          </div>
          {/* Meet Teacher */}
          <div className='flex flex-col gap-10 p-0 w-[355px] h-[600px] sm:h-[550px] md:w-[693px] md:p-[24px] mx-4 md:mx-0'>
            {" "}
            <span
              //   style={{ fontSize: "40px", fontWeight: "700" }}
              className='text-[20px] md:text-[40px] font-bold'
            >
              Meet Your Teacher
            </span>
            <div className='flex flex-col gap-0 md:gap-20 md:flex-row w-[345px] h-full md:w-[1360px] md:h-[565px]'>
              <div>
                <Image
                  //   style={{ width: "565px", height: "565px" }}
                  // alt={teacherName.instructor.image?.originalname}
                  className='w-[335px] h-[300px] md:w-[565px] md:h-[565px]'
                  src={teacherImage}
                />
              </div>
              <div
                style={{
                  padding: "80px 10px 40px 20px",
                }}
                className='w-full h-[130px] md:w-[718px] md:h-[365px]'
              >
                {/* Info */}
                <div className='flex flex-col gap-2'>
                  <span className='text-[16px] md:text-[40px] font-bold'>
                    Tr.{teacherName.instructor ? teacherName.instructor?.name : 'Hein'}
                  </span>
                  <span className='text-[16px] md:text-[24px] font-medium'>
                    {teacherName.course?.title} Teacher
                  </span>
                </div>

                {/* Description */}
                <div
                  style={{
                    // width: "718px",
                    // height: "auto",

                  }}
                  className='flex flex-col gap-4 w-[309px] h-full sm:h-[400px] md:w-[718px] md:h-[auto]'
                >
                  <p
                    // style={{
                    //   fontSize: "24px",
                    //   fontWeight: "500",
                    // }}
                    className='text-[12px] md:text-[24px] font-medium'
                  >
                    Hello, I'm [Teacher's Name], your dedicated IELTS
                    instructor. With [X] years of teaching experience and a
                    [Your Degree] in [Your Field], I'm committed to guiding you
                    to success in the IELTS exam. My classes focus on
                    interactive learning and personalized feedback to enhance
                    your skills. Let's work together to achieve your IELTS
                    goals!
                  </p>
                  {/* Email & Phone */}
                  <div className=''>
                    <span
                      style={{
                        color: "#FFF",
                      }}
                      className='text-[8px] md:p-[8px] md:text-[14px] font-medium bg-[#215887] rounded-[12px] w-[35px] h-[16px] md:w-[73px] md:h-[33px] p-1'
                    >
                      Email : {teacherName.instructor?.email}
                    </span>{" "}
                    &nbsp;
                    <span
                      style={{
                        color: "#FFF",
                      }}
                      className='text-[8px] md:p-[8px] md:text-[14px] font-medium bg-[#215887] rounded-[12px] w-[35px] h-[16px] md:w-[73px] md:h-[33px] p-1'
                    >
                      Phone : {teacherName.instructor?.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Course Curriculum Section */}
          <div className=' flex flex-col w-[345px] pt-[64px] pb-[24px]  gap-5 md:w-[100%] md:p-[24px] md:pt-[150px] mx-4 md:mx-0'>
            <span className='text-[20px] md:text-[40px] font-bold'>
              Course Curriculum
            </span>
            <div className='flex flex-col gap-10'>
              <div
                style={{
                  //   width: "auto",
                  //   height: "220px",
                  backgroundColor: "#215887",
                  borderLeft: "5px solid #F00",
                  //   padding: "40px",
                  alignItems: "center",
                }}
                className='w-[335px] h-[110px] p-[16px] md:w-[auto] md:h-[auto] md:p-[40px]'
              >
                <div className='flex gap-5 md:gap-52 justify-between'>
                  {/* Left */}
                  <div
                    className='flex flex-col gap-0 md:gap-6 w-[57px] h-[56px] md:w-[86px] md:h-[96px]'
                    style={{
                      //   width: "86px",
                      //   height: "96px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        paddingTop: "10px",
                      }}
                      className='text-[16px] text-white md:text-[24px] font-semibold'
                    >
                      Module
                    </span>
                    <span className='text-[24px] text-white md:text-[64px] font-semibold'>
                      1
                    </span>
                  </div>
                  {/* Center */}
                  <div className='flex flex-col gap-0 md:gap-6'>
                    <span className='hidden md:flex  text-white text-[32px] font-medium w-[158px]'>
                      Introduction to IELTS
                    </span>
                    <div className='flex flex-row gap-1 md:hidden'>
                      <span className='text-[16px] text-white md:text-[32px] font-medium w-[158px]'>
                        Introduction to IELTS
                      </span>
                      <span
                        // style={{ color: "#FFF" }}
                        className='flex flex-row justify-between text-white md:gap-2 mt-1'
                      >
                        <Image src={WhiteTime} className='w-[27px]  h-[10px]' />
                        <span className=' text-[8px] md:text-[16px] w-[40px]'>
                          15 mins
                        </span>
                      </span>
                    </div>

                    <p
                      //   style={{
                      //     width: "674px",
                      //   }}
                      className='w-[229px] md:w-[674px] text-[8px] text-white md:text-[16px] font-medium'
                    >
                      Get ready to enhance your listening skills! I'm [Your
                      Name], your guide through the IELTS Listening module.
                      Let's dive into interactive activities to sharpen your
                      ability to understand spoken English
                    </p>
                  </div>
                  {/* Mins */}
                  <div
                    // style={{ color: "#FFF" }}
                    className='hidden md:flex gap-0 text-white md:gap-1 mt-1'
                  >
                    <Image src={WhiteTime} className='w-[54px]  h-[20px]' />
                    <span className=''>15 mins</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  //   width: "auto",
                  //   height: "220px",
                  backgroundColor: "#7ECDC6",
                  borderLeft: "5px solid #0047FF",
                  //   padding: "40px",
                  alignItems: "center",
                }}
                className='w-[335px] h-[110px] p-[16px] md:w-[auto] md:h-[auto] md:p-[40px]'
              >
                <div className='flex gap-5 md:gap-52 justify-between'>
                  {/* Left */}
                  <div
                    className='flex flex-col gap-0 md:gap-6 w-[57px] h-[56px] md:w-[86px] md:h-[96px]'
                    style={{
                      //   width: "86px",
                      //   height: "96px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        paddingTop: "10px",
                      }}
                      className='text-[16px] text-white md:text-[24px] font-semibold'
                    >
                      Module
                    </span>
                    <span className='text-[24px] text-white md:text-[64px] font-semibold'>
                      2
                    </span>
                  </div>
                  {/* Center */}
                  <div className='flex flex-col gap-0 md:gap-6'>
                    <span className='hidden md:flex  text-white text-[32px] font-medium w-[258px]'>
                      Introduction to IELTS
                    </span>
                    <div className='flex flex-row md:hidden'>
                      <span className='text-[16px] text-white md:text-[32px] font-medium w-[158px]'>
                        Introduction to IELTS
                      </span>
                      <span
                        // style={{ color: "#FFF" }}
                        className='flex flex-row gap-0 justify-between text-white md:gap-2 mt-1'
                      >
                        <Image src={WhiteTime} className='w-[27px]  h-[10px]' />
                        <span className=' text-[8px] md:text-[16px] w-[40px]'>
                          15 mins
                        </span>
                      </span>
                    </div>

                    <p
                      //   style={{
                      //     width: "674px",
                      //   }}
                      className='w-[229px] md:w-[674px] md:h-[auto] text-[8px] text-white md:text-[16px] font-medium'
                    >
                      Get ready to enhance your listening skills! I'm [Your
                      Name], your guide through the IELTS Listening module.
                      Let's dive into interactive activities to sharpen your
                      ability to understand spoken English
                    </p>
                  </div>
                  {/* Mins */}
                  <div
                    // style={{ color: "#FFF" }}
                    className='hidden md:flex gap-0 text-white md:gap-1 mt-1'
                  >
                    <Image src={WhiteTime} className='w-[54px]  h-[20px]' />
                    <span className=''>15 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-[30px] mx-2'>
        <Footer />
      </div>
    </>
  );
};
export default SubjectDetail;
