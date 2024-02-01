import React, { useState, useEffect } from "react";
import { Divider, Accordion, AccordionItem } from "@nextui-org/react";
import { getFile } from "../../../util";

import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function CourseDetail(props) {
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

  const handleVideo = (data) => {
    console.log(JSON.parse(data.video), "handleVideo");
    setShowVideoList(JSON.parse(data.video));
    setShowVideo(true);
  };
  return (
    <>
      {/* <Nav /> */}
      <div className='pt-[64px]'>
        {/* <Head /> */}

        <div className='flex flex-row'>
          <div className='col-4 border-2 w-[426px] h-[1168px] border-[#ffffff] border-r-[#d2d2ca] '>
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
                        <div onClick={() => handleVideo(e)} className='py-2'>
                          <div
                            // onClick={() => setInc(true)}
                            className='flex gap-2 justify-between px-4 py-3 align-[center] m-auto text-sm w-[362px] h-[60px] bg-[#EBF0FF] rounded-[8px]'
                          >
                            <div className='flex'>
                              <span className='flex gap-6  ml-3 mt-[3px]  p-[4px] text-[#0025A9] text-[14px] font-semibold'>
                                {e.duration} mins
                              </span>
                              <span className='flex gap-6 p-[4px]  ml-3 text-[#0025A9] text-[20px] font-semibold  border-3 h-[32px] border-[#EBF0FF] border-l-[#0025A9]'>
                                {e.title}
                              </span>
                            </div>
                            {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}

                            <span className='flex gap-6 p-[4px] text-[#8aee58]'>
                              <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                            </span>
                          </div>
                        </div>
                      ))}
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
          <div className='col-6 flex gap-10'>
            <div></div>
            <div className=''>
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
                      className='aspect-square w-[950px] h-[442px]'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      // style={{ width:'1400px',height:'500px' }}
                    ></iframe>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
