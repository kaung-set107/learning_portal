import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  Accordion,
  AccordionItem,
  Progress,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  Textarea,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import QuizPage from "../../ByUser/Quiz/quizpage";
import { getFile } from "../../../util";

import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faAngleRight,
  faLock,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
export default function CourseDetail(props) {
  const tabRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const examData = location.state.data;
  console.log(examData, "sub ii");
  const courseData = location.state.courseData;
  // console.log(props.id, "id");
  const [showVideo, setShowVideo] = useState(false);
  const [teacherName, setTeacherName] = useState([]);
  const [teacherImage, setTeacherImage] = useState([]);
  const [showVideoList, setShowVideoList] = useState([]);
  const [LMDataList, setLMDataList] = useState([]);

  useEffect(() => {
    // const getCourseDetail = async () => {
    //   await apiInstance.get("courses/" + props.id).then((res) => {
    //     // console.log(res.data.data.subjects, "c detail");
    //     setSubjectList(res.data.data.subjects);
    //   });
    // };
    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {
        console.log(
          res.data.data.filter((el) => el._id === examData._id)[0],
          "c subject"
        );
        const Filter = res.data.data.filter((el) => el._id === examData._id)[0];
        setTeacherName(Filter);
        const Img = getFile({
          payload: Filter.instructor.image,
        });
        setTeacherImage(Img);
      });
    };
    getSubjects();
    // getCourseDetail();
  }, []);

  const handleBack = () => {
    navigate("/course-detail", { state: { data: courseData } });
  };

  // Handle Tabs

  const handleTab = (val) => {
    const activeTab = tabRef.current?.value;
    // setActiveTab(activeTab);
    console.log(val, "val");
  };

  const handleVideo = (data) => {
    console.log(data, "handleVideo");
    setShowVideoList(JSON.parse(data.video));
    setLMDataList(data);
    setShowVideo(true);
  };

  return (
    <>
      <div className='flex '>
        <div className=' border-2 w-[426px] h-[1168px] border-[#ffffff] border-r-[#d2d2ca] '>
          <div>
            {examData.subjectSections.map((item, index) => (
              <div>
                <Accordion
                  motionProps={{
                    variants: {
                      enter: {
                        y: 0,
                        opacity: 1,
                        height: "auto",
                        transition: {
                          height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            duration: 1,
                          },
                          opacity: {
                            easings: "ease",
                            duration: 1,
                          },
                        },
                      },
                      exit: {
                        y: -10,
                        opacity: 0,
                        height: 0,
                        transition: {
                          height: {
                            easings: "ease",
                            duration: 0.25,
                          },
                          opacity: {
                            easings: "ease",
                            duration: 0.3,
                          },
                        },
                      },
                    },
                  }}
                >
                  <AccordionItem
                    key='1'
                    aria-label='Accordion 1'
                    title={
                      <span className='text-[20px] font-bold text-[#0025A9]'>
                        Module {index + 1} ({item.title})
                      </span>
                    }
                    //   startContent={
                    //     <FontAwesomeIcon icon={faDesktop} size='xl' />
                    //   }
                  >
                    {item.learningMaterials.map((e) => (
                      <>
                        {/* Lock or Default Check */}
                        {e.showToStudent ? (
                          <div
                            onClick={() => handleVideo(e)}
                            className='py-2 hover:cursor-pointer'
                          >
                            <div className='flex gap-2 justify-between px-4 py-3 align-[center] m-auto text-sm w-[362px] h-[60px] bg-[#EBF0FF] rounded-[8px]'>
                              <div className='flex'>
                                <span className='flex gap-6  ml-3 mt-[3px]  p-[4px] text-[#0025A9] text-[14px] font-semibold'>
                                  {e.duration} mins
                                </span>
                                <span className='flex gap-6 p-[4px]  ml-3 text-[#0025A9] text-[20px] font-semibold  border-3 h-[32px] border-[#EBF0FF] border-l-[#0025A9]'>
                                  {e.title}
                                </span>
                              </div>
                              <span className='flex gap-6 p-[4px] text-[#8aee58]'></span>
                            </div>
                          </div>
                        ) : (
                          <div className='py-2  hover:cursor-not-allowed'>
                            <div
                              // onClick={() => setInc(true)}
                              className='flex gap-2 justify-between px-4 py-3 align-[center] m-auto text-sm w-[362px] h-[60px] bg-[#EBF0FF] rounded-[8px]'
                            >
                              <div className='flex'>
                                <span className='flex gap-6  ml-3 mt-[3px]  p-[4px] text-[#A9A9A9] text-[14px] font-normal'>
                                  {e.duration} mins
                                </span>
                                <span className='flex gap-6 p-[4px]  ml-3 text-[#A9A9A9] text-[20px] font-normal  border-3 h-[32px] border-[#EBF0FF] border-l-[#A9A9A9]'>
                                  {e.title}
                                </span>
                              </div>
                              <span className='flex gap-6 p-[4px] text-[#A9A9A9] '>
                                <FontAwesomeIcon icon={faLock} size='xl' />
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-10 pl-[20px] w-full pr-[32px]'>
          <div>
            {/* Right Header */}
            {showVideo && (
              <div className='flex justify-between gap-20'>
                <div className='w-[710px] h-[60px] flex flex-col'>
                  <span className='text-[20px] text-[#0025A9] font-semibold'>
                    {LMDataList.title}
                  </span>
                  <Progress
                    label=' '
                    size='md'
                    value={65}
                    color='primary'
                    showValueLabel={true}
                    className='w-[710px]'
                  />
                </div>
                <div className='flex gap-5 pt-[32px]'>
                  <Button
                    className='w-[44px] h-[44px]'
                    color='primary'
                    variant='bordered'
                  >
                    <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                  </Button>
                  <Button color='primary' className='w-[44px] h-[44px]'>
                    <FontAwesomeIcon icon={faAngleRight} size='xl' />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className=''>
            {/* Right Video Section */}
            {showVideo &&
              showVideoList.map((video) => (
                <div key={video} className='text-blue-700 gap-5 '>
                  <iframe
                    src={
                      "https://www.youtube.com/embed/" +
                      video.links?.split("/")[3]
                    }
                    //   title={assignList.name}
                    allowFullScreen
                    className=' w-full h-[442px]'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    // style={{ width:'1400px',height:'500px' }}
                  ></iframe>
                  <div className='flex justify-between pt-[20px]'>
                    <span className='w-[311px] h-[16px] text-[32px] text-[#0025A9] font-semibold'>
                      {LMDataList.title}
                    </span>
                    <Button
                      color='primary'
                      className='w-[178px] h-[44px] text-[16px] font-normal'
                    >
                      Complete
                    </Button>
                  </div>
                  <div className='flex w-full flex-col pt-[20px]'>
                    <Tabs
                      variant='light'
                      color='primary'
                      radius='full'
                      aria-label='Options'
                    >
                      <Tab title='Summary'>
                        <div className='bg-[#EBF0FF] text-[#001769] rounded-lg w-full h-[auto] p-[20px] flex flex-col gap-2'>
                          <span className='w-[902px] h-[24px] text-[20px] font-semibold'>
                            Description: This chapter is all about the basics of
                            IELTS
                          </span>
                          <span className='w-[902px] h-[24px] text-[20px] font-semibold'>
                            Reference link: &nbsp;
                            <a
                              href='www.msi.com/basicofielts'
                              className='text-[#3454FF]'
                            >
                              www.msi.com/basicofielts
                            </a>
                          </span>
                          <span className='w-[902px] h-[24px] text-[20px] font-semibold'>
                            PDF File link: &nbsp;
                            <a
                              href='www.msi.com/basicofielts'
                              className='text-[#3454FF]'
                            >
                              www.msi.com/basicofielts
                            </a>
                          </span>
                        </div>
                      </Tab>
                      <Tab title='Survey'>
                        <div className='flex flex-col gap-10'>
                          <div className='bg-[#EBF0FF] rounded-lg w-full h-[auto] p-[16px]'>
                            <p className=''>
                              {/* To show question */}
                              <span className='text-[16px] font-semibold text-[#0025A9]'>
                                Do you think this chapter is effective for you?
                              </span>
                              <RadioGroup className='pt-[20px]'>
                                <Radio value='yes'>Yes</Radio>
                                <Radio value='no'>No</Radio>
                              </RadioGroup>
                              {/* To show answer radio */}
                            </p>
                          </div>
                          <div className='bg-[#EBF0FF] rounded-lg w-full h-[auto] p-[16px]'>
                            <p className=''>
                              {/* To show question */}
                              <span className='text-[16px] font-semibold text-[#0025A9]'>
                                Do you think this chapter is effective for you?
                              </span>
                              <RadioGroup className='pt-[20px]'>
                                <Radio value='yes'>Yes</Radio>
                                <Radio value='no'>No</Radio>
                              </RadioGroup>
                              {/* To show answer radio */}
                            </p>
                          </div>
                          <div className='bg-[#EBF0FF] rounded-lg w-full h-[auto] p-[16px]'>
                            <p className=''>
                              {/* To show question */}
                              <span className='text-[16px] font-semibold text-[#0025A9]'>
                                Do you think this chapter is effective for you?
                              </span>
                              <RadioGroup className='pt-[20px]'>
                                <Radio value='yes'>Yes</Radio>
                                <Radio value='no'>No</Radio>
                              </RadioGroup>
                              {/* To show answer radio */}
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-end gap-2 mt-5'>
                          <Button color='primary' variant='bordered'>
                            Cancel
                          </Button>
                          <Button color='primary'>Submit</Button>
                        </div>
                      </Tab>
                      <Tab title='Review and Feedback'>
                        <div className='pt-[24px]'>
                          <label className='text-[24px] font-bold text-[#0025A9]'>
                            Title
                          </label>
                          <Textarea
                            type='text'
                            placeholder='Description...'
                            className='form-control'
                          />
                          <div className='flex justify-end gap-2 mt-5'>
                            <Button color='primary' variant='bordered'>
                              Cancel
                            </Button>
                            <Button color='primary'>Submit</Button>
                          </div>
                        </div>
                      </Tab>
                      <Tab title='Quiz'>
                        <div className='bg-[#EBF0FF] rounded-lg w-full h-[auto] p-[20px] flex flex-col gap-20'>
                          <span className='w-[902px] h-[24px] text-[20px] font-semibold'>
                            This quiz will test your basic knowledge on IELTS
                          </span>
                          <div className='flex justify-end gap-2'>
                            <Button color='primary' variant='bordered'>
                              Cancel
                            </Button>
                            <Link to={"/quiz-page/" + LMDataList._id}>
                              {" "}
                              <Button color='primary'>Start Quiz</Button>
                            </Link>
                          </div>
                          {/* <QuizPage /> */}
                        </div>
                      </Tab>
                      <Tab title='Articles' value={4} />
                    </Tabs>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Author:Kaung Set Hein
