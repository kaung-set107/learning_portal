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
import { getFile } from "../../../../util";
import Module from "../../../../assets/img/modules.svg";
import Chapter from "../../../../assets/img/chapter.svg";
import Download from "../../../../assets/img/download.svg";
import TV from "../../../../assets/img/tv.svg";
import ReadBook from "../../../../assets/img/readbook.gif";
import Book from "../../../../assets/img/book.svg";
import Date from "../../../../assets/img/date.svg";
import Person from "../../../../assets/img/person.svg";
import Time from "../../../../assets/img/time.svg";
import WhiteTime from "../../../../assets/img/whitetime.svg";
import Certi from "../../../../assets/img/certi.svg";
import Nav from "../../../home/header";
import Head from "../../head";
import apiInstance from "../../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
export default function CourseDetail(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const SubData = location.state.data;
  // console.log(location.state.data, "sub ii");
  const courseData = location.state.courseData;
  // console.log(props.id, "id");
  const [subjectList, setSubjectList] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
  const [teacherImage, setTeacherImage] = useState([]);
  const [headVideoLink, setHeadVideoLink] = useState('')
  useEffect(() => {
    const getCourseDetail = async () => {
      await apiInstance.get("courses/" + props.id).then((res) => {
        // console.log(res.data.data.subjects, "c detail");
        setSubjectList(res.data.data.subjects);
      });
    };
    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {
        // console.log(
        //   JSON.parse(res.data.data.filter((el) => el._id === SubData._id)[0].previewVideo)[0].links,
        //   "c subject"
        // );
        setHeadVideoLink(JSON.parse(res.data.data.filter((el) => el._id === SubData._id)[0].previewVideo)[0].links?.split('/')[3])
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
      <Nav />
      <div style={{ padding: "24px 20px 100px 40px" }}>
        <Head />

        <div className='flex flex-col flex-grow gap-10 duration-100'>
          {/* Video Section */}
          <div className='flex gap-56 pt-20'>
            <div style={{ width: "900px" }} className='flex gap-2'>
              <div>
                <Button
                  color='primary'
                  variant='light'
                  onClick={handleBack}
                  style={{ borderRadius: "100px", padding: "5px" }}
                  className='flex hove:cursor-pointer'
                >
                  <FontAwesomeIcon icon={faAngleLeft} size='2xl' />
                  {/* <span className='mt-1 font-semibold'>Back</span> */}
                </Button>
              </div>
              <div>
                {" "}

                <iframe
                  src={
                    "https://www.youtube.com/embed/" +
                    headVideoLink
                  }
                  allowfullscreen=''
                  width='911'
                  height='306'
                  className='border'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                ></iframe>
              </div>
            </div>
            <div className=' pr-24'>
              <div
                style={{
                  width: "275px",
                  height: "306px",
                  border: "2px solid red",
                  borderRadius: "12px",
                }}
              >
                <div className='flex flex-col gap-5 p-5'>
                  <h1 style={{ fontSize: "20px", fontWeight: "700" }}>
                    This Subject Include
                  </h1>
                  <div className='flex gap-2'>
                    <img
                      src={Module}
                      style={{ width: "16px", height: "16px" }}
                    />{" "}
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      4 modules
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <img
                      src={Chapter}
                      style={{ width: "16px", height: "16px" }}
                    />{" "}
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      26 chapters
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <img
                      src={Download}
                      style={{ width: "16px", height: "16px" }}
                    />{" "}
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      64 downloadable resources
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <img src={TV} style={{ width: "16px", height: "16px" }} />{" "}
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      Full lifetime access
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <img src={TV} style={{ width: "16px", height: "16px" }} />{" "}
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      Certificate of completion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Detail Section */}
          <div style={{ height: "241px" }}>
            <div className='grid grid-cols-4 gap-10'>
              <div
                style={{
                  width: "305px",
                  height: "177px",
                  padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col'
              >
                <Image src={Time} style={{ width: "64px", height: "64px" }} />
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  Duration
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    paddingLeft: "40px",
                    width: "298px",
                    height: "29px",
                  }}
                >
                  {parseInt((teacherName?.duration * 30) / 7)} Weeks &{" "}
                  {(teacherName?.duration * 30) % 7} Days
                </span>
              </div>
              <div
                style={{
                  width: "305px",
                  height: "177px",
                  padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col'
              >
                <Image src={Person} style={{ width: "64px", height: "64px" }} />
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  Instructor
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    width: "98px",
                    height: "29px",
                  }}
                >
                  Tr.{teacherName.instructor?.name}
                </span>
              </div>
              <div
                style={{
                  width: "305px",
                  height: "177px",
                  padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col'
              >
                <Image src={Book} style={{ width: "64px", height: "64px" }} />
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    width: "88px",
                  }}
                >
                  Batch 10
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    width: "128px",
                    height: "29px",
                  }}
                >
                  {teacherName?.noOfEnrolledStudent} Students
                </span>
              </div>
              <div
                style={{
                  width: "305px",
                  height: "177px",
                  padding: "24px 120px 50px 120px",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#FFF",
                  boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.10)",
                }}
                className='flex flex-col'
              >
                <Image src={Date} style={{ width: "64px", height: "64px" }} />
                <span style={{ fontSize: "20px", fontWeight: "500" }}>
                  Exam
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    width: "120px",
                    height: "29px",
                  }}
                >
                  Mid + Final
                </span>
              </div>
            </div>
          </div>
          {/* About Section */}
          <div className='flex'>
            <div style={{ width: "946px", padding: "24px" }}>
              <div style={{}} className='flex flex-col gap-10'>
                <span style={{ fontSize: "40px", fontWeight: "700" }}>
                  About This Course
                </span>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
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
            <div
              style={{
                width: "565px",
                height: "565px",
                padding: "66.79px 4.442px 81.946px 3.637px",
              }}
            >
              <Image src={ReadBook} />
            </div>
          </div>
          {/* Meet Teacher */}
          <div style={{ height: "693px" }} className='flex flex-col gap-10'>
            {" "}
            <span style={{ fontSize: "40px", fontWeight: "700" }}>
              Meet Your Teacher
            </span>
            <div
              style={{ width: "1360px", height: "565px" }}
              className='flex gap-20'
            >
              <div>
                <Image
                  style={{ width: "565px", height: "565px" }}
                  // alt={teacherName.instructor.image?.originalname}
                  src={teacherImage}
                />
              </div>
              <div
                style={{
                  width: "718px",
                  height: "365px",
                  padding: "80px 10px 40px 20px",
                }}
              >
                {/* Info */}
                <div className='flex flex-col gap-2'>
                  <span style={{ fontSize: "40px", fontWeight: "700" }}>
                    {teacherName.instructor?.name}
                  </span>
                  <span style={{ fontSize: "24px", fontWeight: "500" }}>
                    {teacherName.course?.title} Teacher
                  </span>
                  {/* Email & Phone */}
                  <div className=''>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        backgroundColor: "#4AACFF",
                        borderRadius: "12px",
                        width: "73px",
                        height: "33px",
                        padding: "8px",
                        color: "#ED1A00",
                      }}
                    >
                      Email : {teacherName.instructor?.email}
                    </span>{" "}
                    &nbsp;
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        backgroundColor: "#4AACFF",
                        borderRadius: "12px",
                        width: "73px",
                        height: "33px",
                        padding: "8px",
                        color: "#ED1D25",
                      }}
                    >
                      Phone : {teacherName.instructor?.phone}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div
                  style={{
                    width: "718px",
                    height: "auto",
                    paddingTop: "20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "500",
                    }}
                  >
                    Hello, I'm [Teacher's Name], your dedicated IELTS
                    instructor. With [X] years of teaching experience and a
                    [Your Degree] in [Your Field], I'm committed to guiding you
                    to success in the IELTS exam. My classes focus on
                    interactive learning and personalized feedback to enhance
                    your skills. Let's work together to achieve your IELTS
                    goals!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Course Curriculum Section */}
          <div className=' flex flex-col gap-5'>
            <span style={{ fontSize: "40px", fontWeight: "700" }}>
              Course Curriculum
            </span>
            <div className='flex flex-col gap-10'>
              <div
                style={{
                  width: "auto",
                  height: "220px",
                  backgroundColor: "#215887",
                  borderLeft: "5px solid #F00",
                  padding: "40px",
                  alignItems: "center",
                }}
              >
                <div className='flex gap-52 justify-between'>
                  {/* Left */}
                  <div
                    className='flex flex-col gap-6'
                    style={{
                      width: "86px",
                      height: "96px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#FFF",
                        paddingTop: "10px",
                      }}
                    >
                      Module
                    </span>
                    <span
                      style={{
                        fontSize: "64px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      1
                    </span>
                  </div>
                  {/* Center */}
                  <div className='flex flex-col gap-6'>
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      Introduction to IELTS
                    </span>
                    <p
                      style={{
                        width: "674px",

                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Get ready to enhance your listening skills! I'm [Your
                      Name], your guide through the IELTS Listening module.
                      Let's dive into interactive activities to sharpen your
                      ability to understand spoken English
                    </p>
                  </div>
                  {/* Mins */}
                  <div style={{ color: "#FFF" }} className='flex gap-2'>
                    <Image src={WhiteTime} />
                    <span className='mt-1'>15 mins</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "auto",
                  height: "220px",
                  backgroundColor: "#7ECDC6",
                  borderLeft: "5px solid #0047FF",
                  padding: "40px",
                  alignItems: "center",
                }}
              >
                <div className='flex gap-52 justify-between'>
                  {/* Left */}
                  <div
                    className='flex flex-col gap-6'
                    style={{
                      width: "86px",
                      height: "96px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#FFF",
                        paddingTop: "10px",
                      }}
                    >
                      Module
                    </span>
                    <span
                      style={{
                        fontSize: "64px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      2
                    </span>
                  </div>
                  {/* Center */}
                  <div className='flex flex-col gap-6'>
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      Introduction to IELTS
                    </span>
                    <p
                      style={{
                        width: "674px",

                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Get ready to enhance your listening skills! I'm [Your
                      Name], your guide through the IELTS Listening module.
                      Let's dive into interactive activities to sharpen your
                      ability to understand spoken English
                    </p>
                  </div>
                  {/* Mins */}
                  <div style={{ color: "#FFF" }} className='flex gap-2'>
                    <Image src={WhiteTime} />
                    <span className='mt-1'>15 mins</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "auto",
                  height: "220px",
                  backgroundColor: "#FFB700",
                  borderLeft: "5px solid #B20015",
                  padding: "40px",
                  alignItems: "center",
                }}
              >
                <div className='flex gap-52 justify-between'>
                  {/* Left */}
                  <div
                    className='flex flex-col gap-6'
                    style={{
                      width: "86px",
                      height: "96px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#FFF",
                        paddingTop: "10px",
                      }}
                    >
                      Module
                    </span>
                    <span
                      style={{
                        fontSize: "64px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      3
                    </span>
                  </div>
                  {/* Center */}
                  <div className='flex flex-col gap-6'>
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      Introduction to IELTS
                    </span>
                    <p
                      style={{
                        width: "674px",

                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Get ready to enhance your listening skills! I'm [Your
                      Name], your guide through the IELTS Listening module.
                      Let's dive into interactive activities to sharpen your
                      ability to understand spoken English
                    </p>
                  </div>
                  {/* Mins */}
                  <div style={{ color: "#FFF" }} className='flex gap-2'>
                    <Image src={WhiteTime} />
                    <span className='mt-1'>15 mins</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "auto",
                  height: "220px",
                  backgroundColor: "#ED1D25",
                  borderLeft: "5px solid #215887",
                  padding: "40px",
                  alignItems: "center",
                }}
              >
                <div className='flex gap-52 justify-between'>
                  {/* Left */}
                  <div
                    className='flex flex-col gap-6'
                    style={{
                      width: "86px",
                      height: "96px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#FFF",
                        paddingTop: "10px",
                      }}
                    >
                      Module
                    </span>
                    <span
                      style={{
                        fontSize: "64px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      4
                    </span>
                  </div>
                  {/* Center */}
                  <div className='flex flex-col gap-6'>
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        color: "#FFF",
                      }}
                    >
                      Introduction to IELTS
                    </span>
                    <p
                      style={{
                        width: "674px",

                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#FFF",
                      }}
                    >
                      Get ready to enhance your listening skills! I'm [Your
                      Name], your guide through the IELTS Listening module.
                      Let's dive into interactive activities to sharpen your
                      ability to understand spoken English
                    </p>
                  </div>
                  {/* Mins */}
                  <div style={{ color: "#FFF" }} className='flex gap-2'>
                    <Image src={WhiteTime} />
                    <span className='mt-1'>15 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
