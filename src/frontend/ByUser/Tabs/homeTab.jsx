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
import Course from "../../../assets/img/course.jpg";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import CourseDetail from "../CourseDetail/courseDetail";
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
              </div>
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
                  <div
                    className='grid grid-cols-2 gap-10 pt-10 md:grid-cols-3'
                    style={{ width: "1440px", height: "auto" }}
                  >
                    {coursesList
                      .filter((el) => el?.category?._id === item?._id)
                      .map((e) => (
                        <div
                          onClick={() => handleRoute(e)}

                          className='min-w:[490px] min-h:[463px] flex flex-col gap-3 hover:-translate-y-2  hover:scale-105 duration-500'
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
                                  width: "400px",
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

      {/* Home Page Wrap End */}
    </div>
  );
}
