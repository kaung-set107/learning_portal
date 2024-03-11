import React, { useState, useEffect, useRef } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Image,
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
import BBAudio from "../../../assets/audio/bb.mp3";
import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExcelPhoto from "../../ByInstructor/images/excel.png";
import PdfPhoto from "../../ByInstructor/images/pdf.png";
import ZoomPic from '../../../assets/img/pic.jpg'
import {
  faSquarePlus,
  faCalendarDays,
  faVideo,
  faAngleRight,
  faLock,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MeetingModal from './newmeetingmodal'
export default function CourseDetail(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const [showDocumentList, setShowDocumentList] = useState([])
  const [LMDataList, setLMDataList] = useState([]);
  const [LMID, setLMID] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const upcomingMeeting = [{
    title: 'IELTs',
    date: '20-03-2024',
    time: '7:00PM',
  },
  {
    title: 'IELTs',
    date: '20-03-2024',
    time: '7:00PM',
  }, {
    title: 'IELTs',
    date: '20-03-2024',
    time: '7:00PM',
  }]

  const prevMeeting = [{
    title: 'IELTs Basic',
    date: '20-03-2024',
    time: '7:00PM',
  },
  {
    title: 'IELTs Basic',
    date: '20-03-2024',
    time: '7:00PM',
  }, {
    title: 'IELTs Basic',
    date: '20-03-2024',
    time: '7:00PM',
  }]

  const handleModal = () => {
    setShowModal(true)
  }
  const download = () => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg",
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  const downloadPDF = (val) => {
    // Replace 'your-pdf-file.pdf' with the actual file path or URL
    const pdfUrl = getFile({ payload: val });

    // Create a link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "downloaded-file.pdf";

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };
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


  const handleQuiz = (val) => {
    // navigate(`/quiz-page/${LMID}`);
    setShowQuiz(true);
  };

  const handleVideo = (data) => {
    console.log(data, "heee");
    setLMID(data._id);

    setShowVideoList(JSON.parse(data.video));
    setShowDocumentList(data.assets);
    console.log(data.assets, "document");
    setLMDataList(data);
    console.log(data, 'lm da')
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
                    {console.log(item.learningMaterials, 'lm data two')}
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

                          <span className='w-[902px] h-[24px] text-[12px] sm:text-[16px] font-semibold'>
                            This video is all about giving you the insights of IELTS with the best explanation.
                          </span>


                          <span className='w-[902px] h-[24px] pt-5 text-[20px] font-semibold'>
                            Document Files
                          </span>
                          <div className='grid grid-cols-2 justify-start gap-5 pt-10'>
                            {showVideo && showDocumentList.map((i) => (
                              <div >

                                <div className="sm:flex justify-start gap-5" key={i._id}>
                                  <a
                                    href={getFile({ payload: i })}
                                    onClick={
                                      i.originalname?.split(".")[1] === "pdf"
                                        ? () => downloadPDF(i)
                                        : () => download()
                                    }>
                                    <Image
                                      radius="sm"
                                      alt={i.title}
                                      className="object-cover w-[40px] h-[40px]"
                                      src={
                                        i.originalname?.split(".")[1] === "pdf"
                                        && PdfPhoto ||
                                        (i.originalname?.split(".")[1] === "xlsx")
                                        && ExcelPhoto ||
                                        (i.originalname?.split(".")[1] === "png" || "jpg" || "jpeg") && getFile({ payload: i })
                                      }
                                    />
                                  </a>
                                  {/* <b className="mt-3">{i.originalname?.split(".")[1] === "pdf" && "Download.pdf" || i.originalname?.split(".")[1] === "xlsx" && "Download.xlsx" || i.originalname?.split(".")[1] === "jpg" && "Download.jpg"}</b> */}
                                  <b className="mt-3">{i?.originalname}</b>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className='pt-5'>
                            <span className='text-[#000] text-[20px] font-semibold'>Class Note</span>
                            <p className='flex justify-start text-[#000] text-[16px] font-semibold w-[842px] pt-2'>
                              Lorem ipsum dolor sit amet consectetur. Pulvinar venenatis lobortis dignissim velit massa sit.
                              Massa at gravida pulvinar sem. Vel nibh sed feugiat turpis sapien. Tempus donec et semper condimentum est congue.
                              Lorem ipsum dolor sit amet consectetur. Pulvinar venenatis lobortis dignissim velit massa sit.
                              Massa at gravida pulvinar sem. Vel nibh sed feugiat turpis sapien. Tempus donec et semper condimentum est congue.
                            </p>
                          </div>
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
                        {/* Quiz Page */}

                        <QuizPage LMID={LMID} />
                      </Tab>
                      <Tab title='Class'>

                        <div className='flex flex-col gap-10'>

                          <div className='grid grid-cols-2 pt-10 w-full'>

                            <div className='grid grid-cols-2 justify-center pt-32 items-center w-[300px] h-[400px]'>

                              <div className='flex flex-col justify-center items-center gap-2'>
                                <Button className='bg-orange-500 p-10 rounded-[20%] text-[#fff] w-[80px]' onPress={onOpen}><FontAwesomeIcon icon={faVideo} size='2xl' /></Button>
                                <span className='text-[#000] text-[16px]' >New Meeting</span>
                              </div>
                              <div className='flex flex-col justify-center items-center gap-2'>
                                <Button className='bg-blue-500 p-10 rounded-[20%] text-[#fff] w-[80px]'><FontAwesomeIcon icon={faSquarePlus} size='2xl' /></Button>
                                <span className='text-[#000] text-[16px] '>Join</span>
                              </div>
                              <div className='flex flex-col justify-center items-center gap-2'>
                                <div className='bg-blue-500 p-6 rounded-[20%] text-[#fff]'><FontAwesomeIcon icon={faCalendarDays} size='2xl' /></div>
                                <span className='text-[#000] text-[16px] '>Schedule</span>
                              </div>

                            </div>

                            <div className='flex flex-col gap-4 justify-end'>
                              <div><Image src={ZoomPic} className='w-full h-30' /></div>
                              <div className='flex flex-col gap-4'>
                                <span className='text-[20px] font-semibold text-[#0025A9]'>Upcoming Meeting</span>
                                <div>
                                  {upcomingMeeting.map((item, index) => (
                                    <div key={item} className='grid grid-cols-3 text-[#000] p-1 text-[18px] '>
                                      <div>{item.title}</div>
                                      <div>{item.date}</div>
                                      <div>{item.time}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className='flex flex-col gap-4'>
                                <span className='text-[20px] font-semibold text-[#0025A9] '>Previous Meeting</span>
                                <div>
                                  {prevMeeting.map((item, index) => (
                                    <div key={item} className='grid grid-cols-3 text-[#000] p-1 text-[18px] '>
                                      <div>{item.title}</div>
                                      <div>{item.date}</div>
                                      <div>{item.time}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div>
                          <Modal
                            backdrop="opaque"
                            size='2xl'
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}

                            motionProps={{
                              variants: {
                                enter: {
                                  y: 0,
                                  opacity: 1,
                                  transition: {
                                    duration: 0.3,
                                    ease: "easeOut",
                                  },
                                },
                                exit: {
                                  y: -20,
                                  opacity: 0,
                                  transition: {
                                    duration: 0.2,
                                    ease: "easeIn",
                                  },
                                },
                              }
                            }}
                          >
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1 text-[24px]">New Meeting Create</ModalHeader>
                                  <ModalBody>
                                    <form className='flex flex-col gap-4'>
                                      <Input type='text' label='Name' variant='bordered' />
                                      <Input type='date' label='Date' className='text-transparent' variant='bordered' />
                                      <Input type='time' label='Time' variant='bordered' />
                                      <Input type='password' label='Password' variant='bordered' />
                                    </form>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                      Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                      Create
                                    </Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>

                      </Tab>
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
