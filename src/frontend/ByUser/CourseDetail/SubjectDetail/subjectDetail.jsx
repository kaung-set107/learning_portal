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
  console.log(location.state.courseData, "sub ii");
  const courseData = location.state.courseData;
  console.log(props.id, "id");
  const [subjectList, setSubjectList] = useState([]);
  const [subjectAndTeacherList, setSubjectAndTeacherList] = useState([]);
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
          res.data.data.filter((el) => el.course._id === props.id),
          "c subject"
        );
        setSubjectAndTeacherList(
          res.data.data.filter((el) => el.course._id === props.id)
        );
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
      <div style={{ padding: "24px 40px" }}>
        <Head />

        <div className='flex flex-col flex-grow gap-10 duration-100'>
          {/* Video Section */}
          <div className='flex gap-32 pt-20'>
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
                  <span className='mt-1 font-semibold'>Back</span>
                </Button>
              </div>
              <div>
                {" "}
                <iframe
                  src='https://www.youtube.com/embed/AJhplp3dct8'
                  allowfullscreen=''
                  width='911'
                  height='306'
                  className='border'
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
                    width: "98px",
                    height: "29px",
                  }}
                >
                  6 Weeks
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
                  Tr.Jenny
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
                  15 Students
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
        </div>
      </div>
    </>
  );
}
