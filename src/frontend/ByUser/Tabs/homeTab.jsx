import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Image,
  Progress,
} from "@nextui-org/react";

// import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from "react";
import apiInstance from "../../../util/api";
import { getFile } from "../../../util";
import LoginGif from "../../../assets/img/login.gif";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import CourseDetail from "../CourseDetail/courseDetail";
import Loading from '../../../assets/img/finalloading.gif'
export default function Home() {
  // const posts = useSelector(state => state.posts)
  // console.log(posts, 'pos id')
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [firstDefaultCourseId, setFirstDefaultCourseId] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [filterId, setFilterId] = useState([]);
  const StudentId = localStorage.getItem("id");

  const [catList, setCatList] = useState([]);
  const [myCourseList, setMyCourseList] = useState([]);
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [showPage, setShowPage] = useState(false);
  const enr_id = myCourseList[0]?._id
  // console.log(StudentId, 'my')
  const [enrollId, setEnrollId] = useState(enr_id)

  const filterSubList = filterId.filter(
    (el) => el._id === (courseId ? courseId : firstDefaultCourseId)

  );
  // console.log(filterSubList, "f i");

  const handleTabClick = (ind, enroll_Id, courseid) => {
    setCourseId(courseid);
    setActiveTab(ind);
    setEnrollId(enroll_Id)
    // console.log(enroll_Id, 'enr')
  };

  const handleSubjectDetail = (data, enrollID) => {
    // console.log(data, 'hee hee')
    navigate("/mycourse-sub-detail", { state: { data: data, enroll_id: handleTabClick() ? enrollID : enr_id } });
    // navigate("/mycourse-sub-detail/2", { state: { data: data } });
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
        // console.log(res.data.data, "course res");
        // console.log(catList, "cat");
        setCoursesList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };
    const getCat = async () => {
      await apiInstance.get(`categories`).then((res) => {
        // console.log(res.data.data, "cat res");
        setCatList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    const getEnrollment = async () => {
      await apiInstance.get(`enrollments`).then((res) => {
        // console.log(res.data.data, "first id");

        setFirstDefaultCourseId(
          res.data.data.filter((el) => el.student === StudentId)[0]?.course._id
        );
        setMyCourseList(res.data.data.filter((el) => el.student === StudentId));
        setFilterId(
          res.data.data
            .filter((el) => el.student === StudentId)
            .map((i) => i.course)
        );
        // const count = res.data.data.filter((el) => el.subjects.length);

      });
    };
    getEnrollment();
    getCat();

    getAssign();

  }, [firstDefaultCourseId, StudentId]);


  return (

    <div>
      {/* Home Page Wrap Start */}
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
              {myCourseList[0] ? (
                <>
                  <div className='flex flex-row gap-4'>
                    {myCourseList.map((item, index) => (
                      <>
                        <div key={item._id}>
                          <Button
                            className={
                              activeTab === index
                                ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center  duration-500"
                                : "w-52 text-center"
                            }
                            color='primary'
                            variant='bordered'
                            onClick={() => handleTabClick(index, item._id, item.course._id)}
                          >
                            {item.course?.title}
                          </Button>
                        </div>
                      </>
                    ))}
                  </div>
                  <div>
                    {filterSubList && (
                      <div className='grid grid-cols-2 gap-20 rounded-md pt-16 w-full'>
                        {filterSubList[0]?.subjects.map((e, ind) => (
                          <div
                            className='flex gap-1 bg-[#e1ddec] rounded-[12px]'
                            onClick={() => handleSubjectDetail(e, enrollId)}
                          >
                            <div>
                              <Image
                                src={getFile({ payload: e.image })}
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
                                    {e.title}
                                  </h1>
                                  <div>
                                    Total Lessons:{" "}
                                    <span className='font-semibold'>35</span>
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
                        ))}
                      </div>
                    )}
                  </div></>
              ) : (<div className='flex flex-col gap-10 items-center pt-[40px]'>
                <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
                <span className='text-[20px] font-semibold'>
                  Please wait ... !
                </span>
              </div>)}

            </div>
          </div>
          {/* All Course Section */}
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
                  <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 xl:gap-5 gap-2 sm:gap-4 md:gap-12 lg:gap-5 2xl:gap-10  items-center justify-center md:justify-start md:items-start sm:py-10 2xl:py-20'>
                    {coursesList.filter(el => el.category?._id === item._id)?.map((e) => (
                      <div
                        onClick={() => handleRoute(e)}

                        className='w-[310px] sm:w-[280px]  md:w-[260px] lg:w-[320px] xl:w-[300px] xl:h-[470px] 2xl:w-[400px] md:h-[480px] h-[470px]'
                      >
                        <div >
                          <Image
                            // style={{ width: "500px", height: "280px" }}
                            alt={e.image?.originalname}
                            src={getFile({ payload: e.image })}
                            className='w-[310px] h-full md:w-[250px] md:h-[180px] lg:w-[320px] lg:h-[270px] xl:w-[320px] xl:h-[270px]  2xl:w-[370px] sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                          />
                          <div className='flex p-5 flex-col justify-start flex-grow '>
                            <span className='md:w-[230px] lg:w-[280px] text-[14px] font-semibold text-[#B72041] flex'>MSI Academy
                            </span>
                            <span
                              style={{
                                fontFamily: "Inter",
                                fontWeight: "600px",
                                fontSize: "20px",
                                letterSpacing: "-0.96px",
                              }}
                              className='sm:w-full md:w-[240px] md:h-[50px] lg:w-[290px] lg:h-[60px]'
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
                              className='md:w-[230px] md:h-[35px] lg:w-[280px] lg:h-[40px]'
                            >
                              {e?.description.substring(0, 50)}...
                            </div>
                            {/* card footer */}
                            <div
                              className='py-5 flex sm:flex-col lg:flex-row justify-center gap-2 md:w-[240px] lg:w-[260px] w-[290px]'

                            >
                              <div className='h-[24px] w-full sm:w-[150px] md:w-[200px] lg:w-[250px]  text-start bg-[#ECEFFF] rounded-2xl md:text-[12px] text-[13px] font-medium'>
                                <span>Duration -</span>
                                <span style={{ color: "#262FD9" }}>{e.durationValue ? e.durationValue : 0} {e.durationType ? e.durationType : 'months'}</span>
                              </div>

                              <div className='h-[24px] w-full sm:w-[150px] md:w-[200px] lg:w-[250px]  text-start bg-[#FFF3F6] rounded-2xl md:text-[12px] text-[13px] font-medium'>
                                Price - <span style={{ color: "#262FD9" }}>{e.fee ? e.fee : 0} MMK</span>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      )}

      {/* Home Page Wrap End */}
    </div>

  );
}
