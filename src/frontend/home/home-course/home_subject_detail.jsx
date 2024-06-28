import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Image,
  Input,
  Progress,
  Spinner
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
import Loading from '../../../assets/img/finalloading.gif'
import Roadmap from '../../../assets/img/roadmap.jpg'
import FunQuizPage from "./funQuiz/funQuizPage";
import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const SubjectDetail = (props) => {
  const location = useLocation();
  const SubidfromCourse = location.pathname.split('/')[2]
  const navigate = useNavigate();

  const [subjectList, setSubjectList] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
  const [funQuizData, setFunQuizData] = useState([])
  const [teacherImage, setTeacherImage] = useState([]);
  const [showVideoList, setShowVideoList] = useState([])
  const [subjectDetailData, setSubjectDetailData] = useState([])
  const [courseData, setCourseData] = useState({})
  const [showMore, setShowMore] = useState(false)
  const handleMore = (id) => {
    // console.log(id, 'id')
    setShowMore(true)

  }
  useEffect(() => {
    window.scroll(0, 0)
    const getCourseDetail = async () => {
      await apiInstance.get("courses/" + props.id).then((res) => {
        // console.log(res.data.data.subjects.filter(el => el._id === SubidfromCourse), "c sub detail");
        setSubjectList(res.data.data.subjects);
      });
    };
    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {
        setFunQuizData(res.data.data.filter((el) => el._id === SubidfromCourse)[0])

        setCourseData(res.data.data.filter((el) => el._id === SubidfromCourse)[0].course)
        const Filter = res.data.data.filter((el) => el._id === SubidfromCourse)[0];
        // console.log(JSON.parse(Filter), 'sub detail')

        setShowVideoList(JSON.parse(Filter.previewVideo));
        setSubjectDetailData(Filter.subjectSections)
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

  const handleFunQuizPage = (val, stu) => {

    navigate(`/fun-quiz/${val?._id}`, { state: { FunQuizData: val?.quiz, StudentID: val?.student, SubID: SubidfromCourse } })

  }
  const handleBack = () => {
    navigate("/home-course-detail", { state: { data: courseData } });
  };
  return (
    <>
      <MSINav />
      <div className='container'>
        <div className='flex flex-col gap-10 duration-100'>
          {/* Video Section */}
          <div className='flex flex-col gap-10 md:gap-32 pt-5 md:pt-20 md:flex-row'>
            <div className='flex w-full gap-2 md:w-[700px] lg:w-[780px] xl:w-[800px] 2xl:w-[900px] '>
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
                {!showVideoList[0] ? (
                  <div className='flex flex-col  pt-[40px] w-full gap-2 md:w-[900px]'>
                    <div className='flex justify-center'>
                      <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
                    </div>

                    <span className='text-[20px] font-bold text-center'>Please Wait !</span>
                  </div>

                ) : (

                  showVideoList[0] ? (
                    showVideoList.map((video) => (
                      <div key={video}>
                        <iframe
                          src={
                            "https://www.youtube.com/embed/" +
                            video.links?.split("/")[3]
                          }
                          //   title={assignList.name}
                          allowFullScreen
                          className='border w-[375px] h-[136px] sm:w-[600px] sm:h-[250px] md:w-[711px] md:h-[306px] lg:w-[670px] xl:w-[700px]'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        // style={{ width:'1400px',height:'500px' }}
                        ></iframe>
                      </div>
                    ))
                  ) : (
                    <iframe
                      src='https://www.youtube.com/embed/AJhplp3dct8'
                      allowfullscreen=''
                      //   width='911'
                      //   height='306'
                      className='border w-[375px] h-[136px] md:w-[911px] md:h-[306px]'
                    ></iframe>
                  )
                )}


              </div>
            </div>
            <div className=''>
              <div
                style={{
                  border: "1px solid red",
                  borderRadius: "12px",
                }}
                className='flex justify-center sm:justify-start sm:items-center mx-4 md:mx-0 pr-[20px] md:pr-[24px] w-[345px] h-[134px] sm:w-[560px] sm:h-[200px] md:w-[275px] md:h-[306px]'
              >
                <div className='flex flex-col gap-2 sm:gap-5 p-2 sm:p-5 justify-center'>
                  <h1 style={{ fontSize: "20px", fontWeight: "700" }}>
                    This Subject Include
                  </h1>
                  <div className='grid grid-cols-3 gap-4 align-middle md:grid-cols-1 text-[14px] font-normal md:text-[18px]
'>
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
          {/* Detail Section */}
          <div className='h-auto'>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-5 gap-10 mx-4 '>
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
                className='flex flex-col w-[260px] h-[119px] md:w-[325px] md:h-[177px] lg:w-[220px] xl:w-[280px]  md:p-[24px 120px 50px 120px] justify-center'
              >
                <Image
                  src={Time}
                  className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Duration
                </span>
                <span
                  style={{
                    // fontSize: "24px",
                    // fontWeight: "700",
                    // paddingLeft: "40px",
                    // width: "298px",
                    // height: "29px",
                  }}
                  className='flex justify-center text-[14px] w-[200px]  h-[24px] md:text-[24px] font-medium md:w-[208px] md:h-[29px]'
                >
                  {teacherName?.course?.durationType === 'month' ? `${parseInt((teacherName?.course?.durationValue))} Months` : teacherName?.course?.durationType === 'weeks' ? `${parseInt((teacherName?.course?.durationValue))} Weeks` : `${parseInt((teacherName?.course?.durationValue))} Days`}

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
                className='flex flex-col w-[260px] h-[119px] md:w-[305px] md:h-[177px] lg:w-[220px] xl:w-[280px] md:p-[24px 120px 50px 120px] justify-center'
              >
                <Image
                  src={Person}
                  className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Instructor
                </span>
                <span className='text-[16px] pl-4 md:pl-0 md:text-[24px] font-bold w-[198px] h-[29px]'>
                  {teacherName.instructors && teacherName.instructors.map((tlist) => (
                    <div className='flex justify-center' key={tlist._id}>Tr.{tlist?.name}</div>
                  ))}
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
                className='flex flex-col w-[260px] h-[119px] md:w-[305px] md:h-[177px] lg:w-[220px] xl:w-[280px] md:p-[24px 120px 50px 120px] justify-center'
              >
                <Image
                  src={Book}
                  className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'
                />
                <span className='text-[16px] md:text-[20px] font-medium'>
                  Batch 10
                </span>
                <span className='flex justify-center text-[16px] pl-8 md:pl-0 md:text-[24px] font-bold w-[158px] h-[29px]'>
                  {teacherName?.course?.noOfEnrolledStudent ? teacherName?.course?.noOfEnrolledStudent : 0} Students
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
                className='flex flex-col w-[260px] h-[119px] md:w-[305px] md:h-[177px] lg:w-[220px] xl:w-[280px] md:p-[24px 120px 50px 120px] justify-center'
              >
                <Image
                  src={Date}
                  className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'
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
          <div className='flex xl:gap-10 justify-start md:justify-between w-[375px] h-auto sm:w-full container sm:h-[272px]'>
            <div>
              <Image src={Roadmap} className='transform-x-[-1] w-[370px] h-[250px] md:flex hidden' />
            </div>
            <div className=''>
              <span className='text-[25px] font-semibold md:text-[40px]'>
                Not sure where to start?
              </span>

              <div className='flex flex-col gap-5'>
                <p className='text-[12px] font-medium w-[330px] h-[36px] sm:w-[466px] sm:h-[72px] sm:text-[16px]'>
                  No problem, we are here to help! Just answer a couple of
                  questions related to your interests and goals, and we will
                  help set you on the right path on your learning journey.{" "}
                </p>
                <Button className='text-[#fff] bg-[#215887] text-[12px] sm:text-[16px] rounded-[4px] sm:rounded-[8px] mt-5 sm:mt-10 sm:hover:-translate-x-1 sm:hover:scale-110 duration-700 w-[67px] h-[26px] sm:w-[150px] sm:h-[40px] lg:w-[200px] lg:h-[40px]' onClick={() => handleFunQuizPage(funQuizData?.funQuizzes[0], funQuizData)}>
                  {funQuizData?.funQuizzes ? (
                    <span className=''>Take Quiz</span>
                  ) : (
                    <Button color='light'>
                      Take Quiz <Spinner size='sm' color="default" />
                    </Button>
                  )}


                </Button>
              </div>

            </div>
          </div>
          {/* About Section */}
          <div className='flex '>
            <div className='w-full sm:pt-[14px] md:pt-0 md:w-[946px] md:p-[24px] mx-4 md:mx-0'>
              <div className='flex flex-col gap-10'>
                <span className='text-[20px] md:text-[40px] font-bold '>
                  About This Subject
                </span>
                <p className='text-[14px] sm:text-[16px] pt-0 md:text-[18px] font-medium h-auto'>
                  {teacherName?.description}
                </p>
              </div>
            </div>
            <div className='hidden md:flex md:w-[565px] md:h-[565px] xl:w-[400px] xl:h-[350px] 2xl:w-[450px] 2xl:h-[400px]  p-[66.79 4.442 81.946 3.637]'>
              <Image src={ReadBook} className='w-[200px] xl:w-[300px] xl:h-[200px]' />
            </div>
          </div>
          {/* Meet Teacher */}
          <div className=''>
            <div className='flex flex-col gap-10   w-[355px]  sm:pb-[200px]  md:w-[693px] mx-4 md:mx-0 '>

              <span
                //   style={{ fontSize: "40px", fontWeight: "700" }}
                className='text-[20px] md:text-[40px] font-bold'
              >
                Meet Your Teacher
              </span>
              <div className='flex flex-col gap-0 md:gap-5 md:flex-row xl:w-[1200px] xl:h-[100px]'>
                {teacherName.instructors && teacherName.instructors.map((tlist) => (
                  <div className='flex md:flex-row flex-col gap-2 '>

                    <Image
                      //   style={{ width: "565px", height: "565px" }}
                      // alt={teacherName.instructor.image?.originalname}
                      className='w-[335px] h-[100px] sm:w-[300px] sm:h-[250px] md:w-[325px] md:h-[365px] lg:w-[350px] xl:w-[380px]'
                      src={getFile({ payload: tlist.image })}
                    />

                    <div
                      style={{
                        padding: "30px 10px 40px 20px",
                      }}
                      className='w-full h-[130px] md:w-[718px] md:h-[365px]'
                    >
                      {/* Info */}
                      <div className='flex flex-col gap-2'>
                        <span className='text-[16px] md:text-[30px] lg:text-[35px] 2xl:text-[40px] font-bold'>
                          Tr.{tlist.name ? tlist.name : 'Hein'}
                        </span>
                        <span className='text-[16px] md:text-[24px] font-medium'>
                          {teacherName?.title} Teacher
                        </span>
                      </div>

                      {/* Description */}
                      <div
                        style={{
                          // width: "718px",
                          // height: "auto",

                        }}
                        className='flex flex-col gap-4 w-full md:w-[700px]  '
                      >
                        <p
                          // style={{
                          //   fontSize: "24px",
                          //   fontWeight: "500",
                          // }}
                          onClick={() => handleMore(tlist._id)}
                          className='text-[12px] sm:text-[14px] md:text-[20px] w-full  font-medium'
                        >

                          <span>{tlist?.introduction}</span>
                        </p>
                        {/* Email & Phone */}
                        <div className=''>
                          <span
                            style={{
                              color: "#FFF",
                            }}
                            className='text-[8px] md:p-[8px] md:text-[14px] font-medium bg-[#215887] rounded-[12px] w-[35px] h-[16px] md:w-[73px] md:h-[33px] p-1'
                          >
                            Email : {tlist?.email}
                          </span>{" "}
                          &nbsp;
                          <span
                            style={{
                              color: "#FFF",
                            }}
                            className='text-[8px] md:p-[8px] md:text-[14px] font-medium bg-[#215887] rounded-[12px] w-[35px] h-[16px] md:w-[73px] md:h-[33px] p-1'
                          >
                            Phone : {tlist?.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Course Curriculum Section */}
          <div className='w-full '>
            <div className=' flex flex-col w-[345px] pb-[24px]  gap-5 md:w-[100%] md:p-[24px] md:pt-[150px] mx-4 md:mx-0'>
              <span className='text-[20px] md:text-[40px] font-bold'>
                Course Curriculum
              </span>
              <div className='flex flex-col gap-10'>
                {subjectDetailData.map((item, index) => (
                  <div
                    style={{
                      //   width: "auto",
                      //   height: "220px",
                      backgroundColor: "#215887",
                      borderLeft: "5px solid #F00",
                      //   padding: "40px",
                      alignItems: "center",
                    }}
                    className='w-[335px] h-[110px] p-[16px] md:w-[auto] md:h-[auto] md:p-[40px] lg:h-[300px]'
                  >
                    <div className='flex gap-5 md:gap-32 justify-center'>
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
                          className='text-[14px] text-white md:text-[24px] font-semibold'
                        >
                          Module
                        </span>
                        <span className='text-[24px] text-white md:text-[64px] font-semibold'>
                          {index + 1}
                        </span>
                      </div>
                      {/* Center */}
                      <div className='flex flex-col gap-0 md:gap-6'>
                        <span className='hidden md:flex  text-white text-[32px] font-medium w-[158px]'>
                          {teacherName?.title}
                        </span>
                        <div className='flex flex-row gap-1 md:hidden'>
                          <span className='text-[16px] text-white md:text-[32px] font-medium w-[158px]'>
                            {teacherName?.title}
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
                          {item?.description}
                        </p>
                        <div className='hidden sm:grid grid-cols-4 2xl:grid-cols-6 gap-4'>
                          {item.learningMaterials.slice(0, 12).map((lm, ind) => (
                            <span className=' w-full underline text-[#fff]'>{lm?.title.substring(0, 20)}...</span>
                          ))}
                        </div>
                        <div className='grid sm:hidden grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-1'>
                          {item.learningMaterials.slice(0, 4).map((lm, ind) => (
                            <span className=' w-full underline text-[#fff] text-[10px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]'>{lm?.title.substring(0, 20)}...</span>
                          ))}
                        </div>
                      </div>
                      {/* Mins */}

                    </div>
                  </div>
                ))}


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
