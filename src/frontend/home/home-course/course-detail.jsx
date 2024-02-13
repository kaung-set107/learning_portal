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
import { getFile } from "../../../util";
import Module from "../../../assets/img/modules.svg";
import Chapter from "../../../assets/img/chapter.svg";
import Download from "../../../assets/img/download.svg";
import TV from "../../../assets/img/tv.svg";
import Certi from "../../../assets/img/certi.svg";
import Earth from "../../../assets/img/earth.svg";
import apiInstance from "../../../util/api";
import { useNavigate, useLocation } from "react-router-dom";
// import SubDetail from "./SubjectDetail/subjectDetail";
import MSINav from "../msinav";
// import Head from "../head";
export default function CourseDetail(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state.data;
  const [course, setCourse] = useState([]);
  const [value, setValue] = useState("");
  const handleSubjectDetail = (data, value) => {
    setValue(value);
    navigate("/home-sub-detail", {
      state: { data: data, courseData: courseData },
    });
    console.log(data, "sub");
  };
  const [subjectList, setSubjectList] = useState([]);
  const [subjectAndTeacherList, setSubjectAndTeacherList] = useState([]);
  useEffect(() => {
    const getCourseDetail = async () => {
      await apiInstance.get("courses/" + courseData._id).then((res) => {
        // console.log(res.data.data.subjects, "c detail");
        setCourse(res.data.data);
        setSubjectList(res.data.data.subjects);
      });
    };
    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {
        console.log(
          res.data.data.filter((el) => el.course._id),
          "c subject"
        );
        setSubjectAndTeacherList(
          res.data.data.filter((el) => el.course._id === courseData._id)
        );
      });
    };
    getSubjects();
    getCourseDetail();
  }, []);

  return (
    <>
      <MSINav />
      <div className=' sm:pt-[24px] sm:pr-[20px] sm:pb-[100px] sm:pl-[40px]'>
        <>
          {/* <Head /> */}
          <div className='flex flex-col gap-5 sm:gap-10 md:gap-20 duration-100'>
            {/* Video Section */}
            <div className='flex flex-col gap-10 md:gap-56 pt-5 md:pt-20 md:flex-row'>
              <div className='flex w-full gap-2 md:w-[900px] '>
                <iframe
                  src='https://www.youtube.com/embed/AJhplp3dct8'
                  allowfullscreen=''
                  className='border w-[375px] h-[136px] md:w-[911px] md:h-[306px]'
                ></iframe>
              </div>
              <div className=''>
                <div
                  style={{
                    border: "1px solid red",
                    borderRadius: "12px",
                  }}
                  className='flex items-center mx-4 md:mx-0 md:pr-[24] w-[345px] h-[134px] md:w-[275px] md:h-[306px]'
                >
                  <div className='flex flex-col gap-5 p-5'>
                    <h1 style={{ fontSize: "20px", fontWeight: "700" }}>
                      This Course Include
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
                        <img
                          src={TV}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className='text-[8px] font-normal md:text-[14px]'>
                          Full lifetime access
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <img
                          src={TV}
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className='text-[8px] font-normal md:text-[14px]'>
                          Certificate of completion
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* To Wrap Earth Png */}
            <div
              style={{
                backgroundImage: `url(${Earth})`,
                backgroundPosition: "right",
                backgroundSize: "70% 100%",
                backgroundAttachment: "scroll",
                backgroundRepeat: "no-repeat",
                padding: "64px 0px -180px 0px",
              }}
              className='flex flex-col mt-0 sm:mt-20 md:bg-right md:bg-contain'
            >
              <div className='w-[375px] h-[140px] sm:w-full sm:h-[272px]'>
                <div className=''>
                  <span className='text-[20px] font-semibold sm:text-[40px]'>
                    Not sure where to start?
                  </span>
                  <p className='text-[8px] font-medium w-[233px] h-[36px] sm:w-[466px] sm:h-[72px] sm:text-[16px]'>
                    No problem, we are here to help! Just answer a couple of
                    questions related to your interests and goals, and we will
                    help set you on the right path on your learning journey.{" "}
                  </p>
                  <Button className='text-[#fff] bg-[#053CFF] rounded-[4px] sm:rounded-[8px] mt-5 sm:mt-10 hover:-translate-x-1 hover:scale-110 duration-700 w-[67px] h-[26px] sm:w-[227px] sm:h-[48px]'>
                    <span className='p-2'>Take Quiz</span>
                  </Button>
                </div>
              </div>

              {/* Subjects Section Start */}
              <div className=''>
                <span className='text-[20px] font-semibold sm:text-[40px]'>
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
                          height: "463px",
                          padding: "14px 13px",
                        }}
                        className='min-w:[490px]  flex flex-col gap-3 hover:-translate-y-2 hover:rotate-1 hover:scale-110 hover:bg-indigo-500 duration-500'
                      >
                        <Image
                          radius='sm'
                          alt={e.image.originalname}
                          style={{ width: "464px", height: "238px" }}
                          src={getFile({ payload: e.image })}
                        />

                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            color: "#FFF",
                            width: "464px",
                            height: "56px",
                            borderBottom: "1px dotted white",
                          }}
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
                          {e.description}
                        </p>
                        <div
                          // style={{ padding: "70px 28px 0px 120px" }}
                          className='pt-8  left-[98px] b-[-13px] pl-unit-20 sm:pt-unit-18 sm:pl-unit-28'
                        >
                          <Button
                            className='bg-red-500 hover:bg-red-700 text-[#fff] text-[8px] sm:text-[16px] font-medium rounded-[6px] sm:rounded-[12px] w-[127px] h-[26px] sm:w-[227px] sm:h-[48px]'
                            onClick={() => handleSubjectDetail(e, "sub-detail")}
                          >
                            See More
                          </Button>
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
              <div className='mt-20'>
                <span style={{ fontSize: "40px", fontWeight: "600" }}>
                  Teachers
                </span>
                <div className='grid grid-cols-3 gap-10 pt-10'>
                  {subjectAndTeacherList.slice(0, 3).map((e) => (
                    <>
                      <div
                        style={{
                          border: "2px solid red",
                          borderRadius: "14px",
                          boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.10)",
                          // width: "490px",
                          // height: "463px",
                          padding: "14px 13px",
                          backgroundColor: "white",
                        }}
                        className='min-w:[490px] min-h:[463px] flex flex-col gap-3 hover:-translate-y-2 hover:rotate-1 hover:scale-110 hover:bg-indigo-500 duration-500'
                      >
                        <Image
                          radius='sm'
                          alt={e.instructor.image.originalname}
                          style={{ width: "464px", height: "238px" }}
                          src={getFile({ payload: e.instructor.image })}
                        />
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",

                            width: "464px",
                            height: "56px",
                          }}
                          className='flex flex-col'
                        >
                          {e.instructor.name}
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#868686",
                              width: "464px",
                              height: "56px",
                            }}
                          >
                            {e.instructor.email}
                          </span>
                        </span>

                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "400",
                            color: "#ACACAC",
                            // width: "464px",
                            // height: "auto",
                          }}
                          className='min-w:[464px] min-h:[auto]'
                        >
                          {e.instructor?.introduction}
                        </p>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            color: "#ED1D25",
                            width: "182px",
                            height: "27px",
                          }}
                          className=''
                        >
                          {e.instructor.qualification}
                        </span>
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
              {/* Teacher Section End */}
            </div>
            {/* End To Wrap Earth Png */}

            {/* Certificate Section Start */}
            <div
              style={{
                height: "629px",
                backgroundColor: "#215887",
                padding: "32px 0px",
              }}
              className='flex justify-center mt-20'
            >
              <div
                className='grid grid-cols-2 gap-52'
                style={{
                  height: "629px",
                  padding: "32px 0px 32px 0px",
                }}
              >
                <div
                  style={{
                    width: "642px",
                    height: "304px",
                    padding: "107.35px 15.212px 107.35px 30.038px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      fontWeight: "700",
                      color: "#FFF",
                    }}
                  >
                    Earn a certificate
                  </span>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#FFF",
                    }}
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

                <div style={{ width: "565px", height: "565px" }}>
                  <div
                    style={{
                      padding: "50.35px 0px 107.35px 13.038px",
                    }}
                    className='hover:cursor-pointer hover:-translate-y-2 hover:rotate-1 hover:scale-110 duration-500'
                  >
                    <Image
                      src={Certi}
                      style={{
                        width: "416.905px",
                        height: "346.011px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Certificate Section End */}
          </div>
          {/* Info Section Start */}
          <div
            className='flex'
            style={{
              height: "327px",
            }}
          >
            <div
              style={{
                width: "455px",
                height: "327px",
                backgroundColor: "#215887",
                padding: "64px 0px 89px 40px",
                position: "absolute",
              }}
              className='flex flex-col gap-1'
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
                width: "370px",
                height: "140px",
                backgroundColor: "#FFF",

                position: "absolute",
                left: "296px",
                marginTop: "8rem",
              }}
              className='-rotate-17'
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
                <Input type='text' placeholder='First Name' />
                <Input type='text' placeholder='Last Name' />
              </div>
              <div className='flex gap-2'>
                {" "}
                <Input type='phone' placeholder='Phone Number' />
              </div>
              <div>
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
      </div>
    </>
  );
}
