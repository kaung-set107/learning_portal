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
export default function CourseDetail(props) {
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

  return (
    <>
      <div className='flex flex-col gap-32'>
        <div className='flex gap-32 pt-20' style={{ height: "370px" }}>
          <div style={{ width: "900px" }}>
            <iframe
              src='https://www.youtube.com/embed/AJhplp3dct8'
              allowfullscreen=''
              width='911'
              height='306'
              className='border'
            ></iframe>
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
                  This course include
                </h1>
                <div className='flex gap-2'>
                  <img src={Module} style={{ width: "16px", height: "16px" }} />{" "}
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
        {/* To Wrap Earth Png */}
        <div
          style={{
            backgroundImage: `url(${Earth})`,
            backgroundPosition: "right",
            backgroundSize: "994px 994px",

            backgroundRepeat: "no-repeat",
          }}
          className='flex flex-col gap-20'
        >
          <div style={{ height: "272px" }} className='flex flex-col'>
            <div style={{ width: "468px", height: "120px" }}>
              <span style={{ fontSize: "40px", fontWeight: "600" }}>
                Not sure where to start?
              </span>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                No problem, we are here to help! Just answer a couple of
                questions related to your interests and goals, and we will help
                set you on the right path on your learning journey.{" "}
              </p>
              <Button
                style={{
                  width: "227px",
                  height: "48px",
                  backgroundColor: "#053CFF",
                  color: "white",
                }}
                className='mt-10'
              >
                <span className='p-2'>Take Quiz</span>
              </Button>
            </div>
          </div>

          {/* Subjects Section Start */}
          <div className=''>
            <span style={{ fontSize: "40px", fontWeight: "600" }}>
              Subjects
            </span>
            <div className='grid grid-cols-3 pt-10'>
              {subjectList.slice(0, 3).map((e) => (
                <>
                  <div
                    style={{
                      backgroundColor: "#215887",
                      borderRadius: "14px",
                      boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.10)",
                      width: "490px",
                      height: "463px",
                      padding: "14px 13px",
                    }}
                    className='flex flex-col gap-2'
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
                        width: "464px",
                        height: "auto",
                      }}
                    >
                      {e.description}
                    </p>
                    <div style={{ padding: "80px 28px 0px 132px" }}>
                      <Button
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          backgroundColor: "#ED1D25",
                          borderRadius: "12px",
                          color: "#FFF",
                          width: "227px",
                          height: "48px",
                        }}
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
          <div className=''>
            <span style={{ fontSize: "40px", fontWeight: "600" }}>
              Teachers
            </span>
            <div className='grid grid-cols-3 pt-10'>
              {subjectAndTeacherList.slice(0, 3).map((e) => (
                <>
                  <div
                    style={{
                      border: "2px solid red",
                      borderRadius: "14px",
                      boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.10)",
                      width: "490px",
                      height: "463px",
                      padding: "14px 13px",
                    }}
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
                        width: "464px",
                        height: "auto",
                      }}
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
            padding: "32px 0px 32px 0px",
          }}
          className='flex justify-center'
        >
          <div
            className='grid grid-cols-2 gap-10'
            style={{
              height: "629px",
              padding: "32px 0px 32px 0px",
            }}
          >
            <div
              style={{
                width: "642px",
                height: "304px",
                padding: "107.35px 15.212px 107.35px 13.038px",
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
                Complete our IELTS course with excellence and earn a prestigious
                certificate, a testament to your enhanced language proficiency
                and preparedness for success in the IELTS examination. This
                certificate not only showcases your commitment to mastering
                English skills but also serves as a valuable credential, opening
                doors to academic pursuits and professional opportunities.
              </p>
            </div>

            <div style={{ width: "565px", height: "565px" }}>
              <div
                style={{
                  padding: "50.35px 0px 107.35px 13.038px",
                }}
              >
                <Image
                  src={Certi}
                  style={{
                    width: "516.905px",
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
        className='flex justify-between'
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
            Want to know more? Enter your information to learn more about this
            course from MSI Academy.
          </p>
        </div>
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
            >
              Request more information
            </Button>
          </div>
        </div>
      </div>

      {/* Info Section End */}
    </>
  );
}
