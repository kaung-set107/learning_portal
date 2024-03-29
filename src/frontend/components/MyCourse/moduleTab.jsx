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
import Loading from '../../../assets/img/finalloading.gif'
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
import CSV from '../../../assets/img/csv.png';
import PPTX from '../../../assets/img/pptx.png';
import DOCX from '../../../assets/img/docx.png';
const CourseDetail = (props) => {
  // const time = new Date().toLocaleTimeString()

  // const [ctime, setTime] = useState(time)
  // const UpdateTime = () => {
  //   time = new Date().toLocaleTimeString()
  //   setTime(time)
  // }
  // setInterval(UpdateTime)
  const StudentId = localStorage.getItem("id")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const tabRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const examData = location.state.data;
  const enrollID = location.state.enroll_id;
  // console.log(enrollID, "enrollID");
  // console.log(examData, "sub ii");
  const courseData = location.state.courseData;

  const [showVideo, setShowVideo] = useState(false);
  const [teacherName, setTeacherName] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [showVideoList, setShowVideoList] = useState([]);
  const [showDocumentList, setShowDocumentList] = useState([])
  const [LMDataList, setLMDataList] = useState([]);
  const [QuizID, setQuizID] = useState("");
  const [arr, setArr] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [batchID, setBatchID] = useState('')
  const [studentAnswerList, setStudentAnswerList] = useState([]);
  const [responses, setResponses] = useState({});
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
    const file = getFile({ payload: i });

    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.originalname;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  };
  const downloadPDF = (val) => {
    // Replace 'your-pdf-file.pdf' with the actual file path or URL
    const pdfUrl = getFile({ payload: val });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfUrl);
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
        // console.log(
        //   res.data.data.filter((el) => el._id === examData._id)[0],
        //   "c subject"
        // );
        const Filter = res.data.data.filter((el) => el._id === examData._id)[0];
        setTeacherName(Filter);


      });
    };
    const getEnrol = async () => {
      await apiInstance.get("enrollments").then((res) => {
        // console.log(
        //   res.data.data.filter((el) => el._id === enrollID)[0].batch,
        //   "c subject"
        // );
        setBatchID(res.data.data.filter((el) => el._id === enrollID)[0].batch)

      });
    };
    getEnrol();
    getSubjects();
    // getCourseDetail();
  }, []);

  const handleBack = () => {
    navigate("/course-detail", { state: { data: courseData } });
  };

  // Handle Tabs




  const handleVideo = (data) => {

    console.log(data, "heee");
    setQuizID(data.quiz);

    setShowVideoList(JSON.parse(data.video));
    setShowDocumentList(data.assets);
    // console.log(data.assets, "document");
    setLMDataList(data);
    setSurveyData(data.survey)
    console.log(data, 'lm da')
    setShowVideo(true);
  };

  const handleResult = () => {

    console.log(studentAnswerList, 'studentAnswerList');

    // console.log(studentAnswerList.filter(el => quizList.questions.find(i => i._id === el.id)), 'studentAnswerList')
    //Quiz-Result Create


    const data = {

      survey: surveyData._id,
      student: StudentId,

      answerDate: Date.now(),
      updatedQuestions: surveyData.questions.map((i) => {
        return {
          question: i.question,
          type: i.type,

          options: i.options,
          answerType: i.answerType,

          studentAnswer: i.type === 'trueFalse' ? responses[i._id] : studentAnswerList.filter((el) => el.id === i._id)[0]?.studentAnswer.slice(-(i.correctAnswer.length)),
        };
      }),

    };
    // alert(JSON.stringify(data));
    apiInstance
      .post("survey-results", data)
      .then(function () {

        // navigate("/quiz-result");
      })
      .catch((error) => {
        console.log(error);
      });




  };


  const handleAns = (item, data) => {

    setResponses({
      ...responses,
      [item._id]: data
    });

    // console.log({
    //   ...responses,
    //   [item._id]: data
    // }, 'final else radio')
  };

  const handleClear = () => {
    setResponses({
      ...responses,
      [item._id]: ''
    });
  }

  return (
    <>
      <div className='flex '>
        <div className=' border-2 w-[426px] h-[1168px] border-[#ffffff] border-r-[#d2d2ca] '>
          {examData.subjectSections[0] ? (
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
          ) : (<div className='flex flex-col gap-10 items-center pt-[40px]'>
            <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
            <span className='text-[20px] font-semibold'>
              Please wait ... !
            </span>
          </div>)}

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
                      defaultSelectedKey='sum'
                      variant='light'
                      color='primary'
                      radius='full'
                      aria-label='Options'
                    >
                      <Tab title='Summary' key='sum'>
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
                                        : download
                                    }>
                                    <Image
                                      radius="sm"
                                      alt={i.title}
                                      className="object-cover w-[40px] h-[40px]"
                                      src={
                                        i.originalname?.split(".")[1] === "pdf"
                                        && PdfPhoto ||
                                        (i.originalname?.split(".")[1] === "xlsx")
                                        && ExcelPhoto || (i.originalname?.split(".")[1] === "csv")
                                        && CSV || (i.originalname?.split(".")[1] === "pptx")
                                        && PPTX || (i.originalname?.split(".")[1] === "docx")
                                        && DOCX ||
                                        (i.originalname?.split(".")[1] === "png" || "jpg" || "jpeg") && getFile({ payload: i })
                                      }
                                    />
                                  </a>
                                  {/* <b className="mt-3">{i.originalname?.split(".")[1] === "pdf" && "Download.pdf" || i.originalname?.split(".")[1] === "xlsx" && "Download.xlsx" || i.originalname?.split(".")[1] === "jpg" && "Download.jpg"}</b> */}
                                  <b className="mt-3">{i?.originalname?.split('.')[0]}</b>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className='pt-5 flex flex-col gap-10'>
                            <div>
                              <span className='text-[#000] text-[20px] font-semibold'>Class Note</span>
                              <p className='flex justify-start text-[#000] text-[16px] font-semibold w-[842px] pt-2'>
                                {LMDataList?.summaryNote}
                              </p>
                            </div>
                            <div className='flex gap-10 w-full'>
                              <div className='flex flex-col gap-2 items-center'>
                                <span className=' text-[#000] text-[20px] font-semibold mt-5 w-full'>Files  </span>
                                <p className=' text-[#000] text-[16px] font-semibold w-[842px] pt-2'>
                                  {LMDataList.summaryFile && LMDataList.summaryFile.map((i, index) => (
                                    <div className="sm:flex justify-start gap-5" key={i._id}>
                                      <a
                                        href={getFile({ payload: i })}
                                        onClick={
                                          i.originalname?.split(".")[1] === "pdf"
                                            ? () => downloadPDF(i)
                                            : download
                                        }>
                                        <Image
                                          radius="sm"
                                          alt={i.title}
                                          className="object-cover w-[40px] h-[40px]"
                                          src={
                                            i.originalname?.split(".")[1] === "pdf"
                                            && PdfPhoto ||
                                            (i.originalname?.split(".")[1] === "xlsx")
                                            && ExcelPhoto || (i.originalname?.split(".")[1] === "csv")
                                            && CSV || (i.originalname?.split(".")[1] === "pptx")
                                            && PPTX || (i.originalname?.split(".")[1] === "docx")
                                            && DOCX ||
                                            (i.originalname?.split(".")[1] === "png" || "jpg" || "jpeg") && getFile({ payload: i })
                                          }
                                        />
                                      </a>
                                      {/* <b className="mt-3">{i.originalname?.split(".")[1] === "pdf" && "Download.pdf" || i.originalname?.split(".")[1] === "xlsx" && "Download.xlsx" || i.originalname?.split(".")[1] === "jpg" && "Download.jpg"}</b> */}
                                      <b className="mt-3">{i?.originalname?.split('.')[0]}</b>
                                    </div>
                                  ))}

                                </p>
                              </div>
                              <div className='flex flex-col gap-2 items-center mt-5'>
                                <span className='text-[#000] text-[20px] font-semibold'>Description</span>
                                <span>{LMDataList?.description}</span>
                              </div>
                            </div>


                          </div>
                        </div>

                      </Tab>
                      <Tab title='Survey' key='suv'>

                        <div className='flex flex-col gap-10'>
                          <div className='flex flex-col gap-2 pt-5'>
                            <span className='text-[35px] font-semibold'>{surveyData?.title}</span>
                            <span className='text-[16px] font-semibold text-[#0025A9]'>
                              {surveyData?.description}
                            </span>
                          </div>

                          {surveyData?.questions.map((item, index) => (
                            <div className='bg-[#EBF0FF] rounded-lg w-full h-[auto] p-[16px]'>

                              <p className=''>
                                {/* To show question */}
                                <span className='text-[16px] font-semibold text-[#0025A9]'>
                                  {item?.question}
                                </span>


                                <>
                                  {item.type === 'trueFalse' ? (
                                    < div
                                      key={item._id}
                                      className='text-lg font-semibold ml-10'

                                    >

                                      <div className='flex flex-col gap-2'>
                                        {/* True False Quiz */}
                                        {item.options.map((ans) => (

                                          <label className='flex gap-2'>
                                            <input
                                              type="radio"
                                              name={item._id}
                                              value={ans.answer}
                                              onChange={() => handleAns(item, ans.answer)}
                                              checked={responses[item._id] === ans.answer}
                                            />
                                            {ans.answer}
                                          </label>
                                        ))}
                                        {/* <label className='flex gap-2'>
                                          <input
                                            type="radio"
                                            name={item._id}
                                            value='No'
                                            onChange={() => handleAns(item, 'No')}
                                          />
                                          No
                                        </label> */}


                                        &nbsp;
                                        {/* 
                                          {ans.answer} */}

                                      </div>

                                    </div>
                                  ) : (
                                    < div
                                      key={ind}
                                      className='text-lg font-semibold ml-10'
                                      onChange={() =>
                                        handleAns(
                                          i,
                                          e,
                                          item,

                                        )
                                      }
                                    >

                                      <div>

                                        {/* Multiple Choice Quiz */}
                                        <input
                                          type='checkbox'
                                          name='answer_group'
                                          value={ans.answer}
                                          // checked={multiAns.map((i, ind) => (selectedItem.map((e, ine) => (ine === ind))))}
                                          // disabled={
                                          //   number >= quizList.questions[counter].correctAnswer?.length ? true : ''


                                          // }
                                          className='w-[15px] h-[15px]'
                                        // onClick={(event) =>
                                        //   handleCheckboxSelect(event,

                                        //     i,
                                        //     e,
                                        //     quizList.questions[counter].correctAnswer,
                                        //     counter,
                                        //     quizList.questions[counter].mark,
                                        //     quizList.questions[counter]._id
                                        //   )
                                        // }
                                        />

                                        &nbsp;

                                        {ans.answer}

                                      </div>

                                    </div>)}


                                </>


                                {/* To show answer radio */}
                              </p>
                            </div>
                          ))}


                        </div>
                        <div className='flex justify-end gap-2 mt-5'>
                          {/* <Button color='primary' variant='bordered' onClick={handleClear}>
                            Cancel
                          </Button> */}
                          <Button color='primary' onClick={handleResult}>Submit</Button>
                        </div>


                      </Tab>
                      <Tab title='Review and Feedback' key='r&f'>
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
                      <Tab title='Quiz' key='quiz'>
                        {/* Quiz Page */}

                        <QuizPage QuizID={QuizID} enrollID={enrollID} batchID={batchID} />
                      </Tab>
                      <Tab title='Class' key='class'>

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
                              <div className='flex justify-center items-center' style={{
                                backgroundImage: `url(${ZoomPic})`,
                                backgroundPosition: "right",
                                backgroundSize: "cover",
                                backgroundAttachment: "scroll",
                                backgroundRepeat: "no-repeat",
                                padding: "64px 0px 160px 0px",
                              }}><span className='text-[45px] text-[#fff]'></span></div>

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

export default CourseDetail
// Author:Kaung Set Hein
