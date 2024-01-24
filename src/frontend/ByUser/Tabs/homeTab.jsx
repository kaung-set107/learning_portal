import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Image,
  Progress,
} from "@nextui-org/react";

import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from "react";
import apiInstance from "../../../util/api";
import { getFile } from "../../../util";
import Course from "../../../assets/img/course.jpg";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import CourseDetail from "../CourseDetail/courseDetail";
export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const [id, setId] = useState("");
  const StudentId = localStorage.getItem("id");
  const [coursesList, setCoursesList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [myCourseList, setMyCourseList] = useState([]);
  const [value, setValue] = useState("");

  const firstExample = {
    size: 30,
    value: 2,
    edit: false,
  };
  //handle progress value
  const handleRoute = (data) => {
    setId(id);
    setValue(value);
    navigate("/course-detail", { state: { data: data } });
  };
  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        console.log(res.data.data, "course res");
        console.log(catList, "cat");
        setCoursesList(res.data.data);
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

    const getEnrollment = async () => {
      await apiInstance
        .get(`overall-enrollments`, { paramsms: { status: "waiting" } })
        .then((res) => {
          console.log(
            res.data.data.filter((el) => el.student?._id === StudentId),
            "enr waits"
          );
          setMyCourseList(
            res.data.data.filter((el) => el.student?._id === StudentId)
          );
          // const count = res.data.data.filter((el) => el.subjects.length);
          // console.log(count, "count");
        });
    };

    getCat();
    getEnrollment();

    getAssign();
  }, []);

  // Rating Handle
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      {/* Home Page Wrap */}
      {value === "detail" ? (
        <CourseDetail id={id} />
      ) : (
        <div className='flex flex-col pt-16 pr-0' id='home'>
          <div>
            {/* My Course at Home Header */}
            <div className='flex flex-col gap-4'>
              <h1 style={{ fontSize: "40px", fontWeight: "600" }}>
                My Courses
              </h1>
              <div className='justify-start flex gap-4'>
                <div>
                  <Button
                    className={
                      activeTab === 1
                        ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center  duration-500"
                        : "w-52 text-center"
                    }
                    color='primary'
                    variant='bordered'
                    onClick={() => handleTabClick(1)}
                  >
                    {myCourseList[0]?.subject?.title}
                  </Button>
                  &nbsp;
                  {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
                </div>
                <div>
                  <Button
                    className={
                      activeTab === 2
                        ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center  duration-500"
                        : "text-center w-52"
                    }
                    color='primary'
                    variant='bordered'
                    // style={{ fontWeight: "400px", fontSize: "16px" }}
                    onClick={() => handleTabClick(2)}
                  >
                    {myCourseList[0]?.subject?.title}
                  </Button>{" "}
                  &nbsp;
                  {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
                </div>
                <div>
                  <Button
                    className={
                      activeTab === 3
                        ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center duration-500"
                        : "w-52 text-center"
                    }
                    color='primary'
                    variant='bordered'
                    onClick={() => handleTabClick(3)}
                  >
                    {myCourseList[0]?.subject?.title}
                  </Button>{" "}
                  {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
                </div>
              </div>
            </div>
            <div
              className='flex rounded-md pt-16'
              style={{ width: "1080px", height: "200px" }}
            >
              <div>
                <Image
                  src={Course}
                  style={{
                    width: "300px",
                    height: "200px",
                  }}
                />
              </div>

              <div className='flex flex-col gap-5 '>
                <div className='flex flex-col gap-10 p-7'>
                  <div className='flex flex-col gap-4'>
                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {myCourseList[0]?.subject.title}
                    </h1>
                    <div>
                      Total Lessons: <span className='font-semibold'>35</span>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#05F",
                        width: "120px",
                        height: "19px",
                      }}
                      className='ml-24'
                    >
                      <div>45% completed</div>
                    </div>
                    <div>
                      <Progress
                        size='sm'
                        aria-label='Loading...'
                        value={45}
                        className='mt-2'
                        // onChange={(e) => handleValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {catList.map((item, index) => (
            <Fade>
              <div className='flex gap-6'>
                <div className='pt-32'>
                  <div
                    style={{
                      color: "#000",
                      fontSize: "40px",
                      fontWeight: "600px",
                      wordSpacing: "-1.6px",
                    }}
                  >
                    {item?.title} Courses
                  </div>
                  <div
                    className='grid grid-cols-2 gap-10 pt-10 md:grid-cols-3'
                    style={{ width: "1440px", height: "auto" }}
                  >
                    {coursesList
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
        </div>
      )}

      {/* {location.pathname === "/course-detail" && <CourseDetail />} */}
    </div>
  );
}
