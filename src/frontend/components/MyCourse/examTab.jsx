import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  Accordion,
  AccordionItem,
  Image,
  Progress,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  Textarea,
  Link,
  Input,
  Radio,
  RadioGroup,
  useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";

import ViewAnswer from "../MyCourse/examViewAnswer";
import PP from '../../../assets/img/student.jpg'
import { getFile } from "../../../util";
import ExamRes from './examResultPage'
import ExamPage from './examPage'
import apiInstance from "../../../util/api";
import ExamTestData from './examTestData'
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved, faStar, faCheck, faImage
} from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const colors = ["bg-[#ED1D25]", "bg-[#215887]"]
import Loading from '../../../assets/img/finalloading.gif'
const oneColor = colors[0]
const twoColor = colors[1]

export default function CourseDetail(props) {

  const ResData = {
    id: 1,
    image: PP,
    name: "Mya Saw Lon",
    studentID: "12345",

  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(5); // Timer set for 5 seconds
  const tabRef = useRef();
  const location = useLocation();
  const navigate = useNavigate()
  const studentID = localStorage.getItem('id')
  console.log(studentID, "sub data");

  // const exam = ResData._id

  const subjectData = location.state.data;
  const [size, setSize] = useState('')
  console.log(location.state.enroll_id, "sub data");
  const batchID = location.state.data.course.batch?._id;
  // const batchID = location.state.data.course.batch?._id;
  // console.log(location.state.data.exams.filter(el=>el.quiz), "cou id");
  const [showMid, setShowMid] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showOrigin, setShowOrigin] = useState(true);
  const [teacherName, setTeacherName] = useState([]);
  const [nestedExamVal, setNestedExamVal] = useState('');
  const [showNestedOrigin, setShowNestedOrigin] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [quizID, setQuizID] = useState('')
  const [value, setValue] = useState([])
  const [inAppExamList, setInAppExamList] = useState([])
  const [outsideExamList, setOutsideExamList] = useState([])
  const [disabledQuiz, setDisabledQuiz] = useState([])
  const [examList, setExamList] = useState([])
  const [examResult, setExamResult] = useState([])
  const [examValue, setExamValue] = useState('')

  // console.log(examValue, 'examValue')

  const handleExamPage = (val) => {
    console.log(val.quiz, 'hfjsakdsnjkj')
    navigate(`/exam-page/${val._id}`, { state: { examData: val.quiz, student: studentID, subID: subjectData._id, batchID: subjectData.course?.batch._id, enroll: location.state.enroll_id } })

  }

  const handleViewAnswer = (val, quizId) => {
    // console.log(val)
    setQuizID(quizId)
    setSize(val)
    onOpen()
  }
  const handleExam = (val) => {
    if (val.term === 'mid') {
      setShowMid(true)
      setShowFinal(false)
      setShowOrigin(false)
      setShowNestedOrigin(true)

    } else {
      setShowMid(false)
      setShowFinal(true)
      setShowOrigin(false)
      setShowNestedOrigin(true)
    }
    setValue(val)
  }

  const handleNestedExam = (val) => {
    setNestedExamVal(val)
    setShowOrigin(false)
    // console.log(val)
  }

  useEffect(() => {
    console.log(examValue, 'ex va')
    const getExamRes = async () => {
      await apiInstance.get(`exam-results`).then((res) => {
        console.log(res.data.data, 'res exam for')
        setExamList(res.data.data)
        // setExamResult(res.data.data.filter(el => el.exam._id === examValue._id && el.student === studentID && el.status === 'submitted'))
        console.log(res.data.data.filter(el => el.exam._id === examValue._id && el.student === studentID && el.status === 'submitted'), 'res check')
      })
    }

    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {

        const Filter = res.data.data.filter((el) => el._id === subjectData._id)[0];
        setTeacherName(Filter);

      });
    };

    const getExam = async () => {
      await apiInstance.get("exams").then((res) => {

        // console.log(res.data.data.filter(el => el.examType === 'inapp'), 'in app')
        setInAppExamList(res.data.data.filter(el => el.examType === 'inapp'))
        setOutsideExamList(res.data.data.filter(el => el.examType !== 'inapp'))

      });
    };
    const getQuizRes = async () => {
      await apiInstance.get(`quiz-results?student=${studentID}&batch=${batchID}&quiz=${quizID}`).then((res) => {
        console.log(res.data.data, 'quiz res List')
        setDisabledQuiz(res.data.data)

      });
    };
    getQuizRes();
    getExamRes()
    getExam()
    getSubjects();
    // If not loading, return early from the effect
    if (!isLoading) return;

    // Set an interval to update the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer && 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval); // Clear the interval when the timer reaches 0
          setIsLoading(false); // Set loading to false
          return 0;
        }
      });
    }, 1000);
    // getCourseDetail();
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [isLoading]);
  const handleResPage = (data) => {

    setExamResult(data)

  }
  const handleBack = () => {

    setShowOrigin(true)
    setShowNestedOrigin(false)
    setShowFinal(false)
    setShowMid(false)
    setNestedExamVal('')

  };

  const handleSecondBack = () => {

    setShowOrigin(true)
    setShowNestedOrigin(false)
    setShowFinal(false)
    setShowMid(false)
    setNestedExamVal('')

  }
  // Handle Tabs
  // const date = new Date(isoString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // return new Date(isoString).toLocaleDateString('en-US', options);

  return (
    <>

      {showOrigin && (
        <div className='flex flex-col gap-5 justify-center items-center'>



          <div className={` h-[72px] rounded-[8px] p-20 flex items-center w-[768px] lg:w-[1200px] xl:w-[1250px] 2xl:w-[1440px] ${twoColor}`} onClick={() => handleNestedExam(1)}>
            <span className='text-white text-[24px] font-semibold'>In App Exam</span>
          </div>

          <div className={` h-[72px] rounded-[8px] p-20 flex items-center w-[768px] lg:w-[1200px] xl:w-[1250px] 2xl:w-[1440px] ${oneColor}`} onClick={() => handleNestedExam(2)}>
            <span className='text-white text-[24px] font-semibold'>Outside Exam</span>
          </div>
          <div className='flex flex-col gap-32'>
            <div className='h-[308px] flex flex-col gap-5 pl-16'>
              <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                  <span className='text-[40px] font-bold'> Note For Exam</span>
                  {/* <Button className='flex justify-center w-10' onClick={handleBack}>Back</Button> */}
                </div>

                <div className='text-[24px] lg:text-[20px] font-semibold flex flex-col gap-2 ml-[30px] lg:w-[500px]'>
                  <div className='lg:w-[1020px]'>
                    <li>Must be able to answer the Project Management (Week-4) Quiz.</li>
                    <li>Must have passed (90%).</li>
                    <li>There is no number of times, but the opportunity to answer</li>

                    <li className=''>In answering, if you take the quiz for the first (2) times and want to take it again for the (3rd) time, you can answer it immediately, and you can take the quiz for the (3rd) time only after 5 (5) hours have passed.</li>


                  </div>
                </div>
              </div>
              <div>
                <span className='text-[#ED1D25] text-[24px] font-bold'> Note. . After taking the first (2) exams, you will be able to retake the exam only after 5 (5) hours have passed.</span>
              </div>
              {/* <div className='flex justify-center p-5'>
                  {
                    value.showToStudent === false ? (
                      <Button color='primary' disabled className='flex justify-center w-40 items-center cursor-not-allowed opacity-60' >Start</Button>

                    ) : (
                      <Button color='primary' className='flex justify-center w-40 items-center' onClick={handleBack}>Start</Button>

                    )
                  }
                </div> */}
            </div>

          </div>





        </div >
      )
      }



      {nestedExamVal && !showOrigin && (
        <>
          {
            // isLoading ? (
            // <div className='flex justify-center pt-[40px]'>
            //   <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
            //   Please Wait {timer}s
            // </div>) : (

            showResult ? (

              <div className='mx-10' >
                {console.log(examResult, 'examResult')}
                <ExamRes ResData={examResult} showResult={showResult} subjectData={subjectData} examFile={examValue} />
              </div>
            ) : (
              <div className="flex justify-center items-center w-full flex-col mb-20">
                <div className='relative'>
                  <Button className='flex justify-center lg:w-[100px] absolute top-0 right-0 lg:left-[450px]' onClick={handleSecondBack}>Back</Button>
                </div>

                {nestedExamVal === 1 ? (
                  <Tabs aria-label="Options" color="primary" variant="bordered" size='sm'>
                    <Tab
                      key="new"
                      title={
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faFireFlameCurved} size='xl' />
                          <span>New</span>
                        </div>
                      }
                    >
                      <div className='flex flex-col justify-start pt-10 w-[768px] lg:w-[1200px] xl:w-[1280px] 2xl:w-[1440px] h-[204px] pl-10 pb-8 pr-10' >
                        {subjectData.exams.filter(el => el.examType === 'inapp').map((item, index) => (
                          <div className='grid grid-cols-2 bg-[#215887] p-12  border-4 border-l-red-500 '>
                            <div className='w-[742px] flex gap-52'>
                              <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                              <div className='flex flex-col gap-5 justify-start'>
                                <span className='text-[32px] text-[#fff] font-semibold flex flex-col'>{item?.title}</span>
                                <div className='flex gap-20'>
                                  <div className='font-medium flex gap-2 w-[300px] text-[#fff]'>
                                    <span className='text-[16px] font-semibold'>Start Date </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>April 11, 2024</span>
                                  </div>
                                  {/* <div className=' font-medium flex gap-2 text-[#fff]  w-[300px]'>
                                      <span className='text-[16px]  font-semibold'>Completed Time </span>
                                      <span>:</span>
                                      <span className='text-[16px] font-medium'>12:00 AM</span>
                                    </div> */}
                                </div>

                                <div className='flex gap-20'>
                                  <div className='font-medium flex gap-2 w-[300px] text-[#fff]'>
                                    <span className='text-[16px] font-semibold'>Start Time </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>12:00 AM</span>
                                  </div>

                                </div>


                              </div>
                            </div>

                            <div className='flex flex-col items-end gap-2 justify-end'>

                              <Button color='primary' className='w-[163px] h-[44px]' onClick={() => handleExamPage(item)} >Take Exam</Button>


                              <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                <span>Refference Link : </span>
                                <a href='https:// www.google.com' className='underline' >
                                  www.google.com
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}


                      </div>
                    </Tab>
                    <Tab
                      key="complete"
                      title={
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faStar} size='xl' />
                          <span>Complete</span>
                        </div>
                      }
                    >
                      <div className='flex flex-col justify-start pt-10 w-[768px] lg:w-[1200px] xl:w-[1280px] 2xl:w-[1440px] h-[204px] pl-10 pb-8 pr-10' >

                        {examList.filter(el => el.type === 'inapp' && el.status === 'submitted').map((res) => (
                          <div className='grid grid-cols-2 bg-[#215887] p-12  border-4 border-l-red-500 '>
                            <div className='w-[742px] flex gap-52'>
                              <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                              <div className='flex flex-col gap-5 justify-start'>
                                <span className='text-[32px] text-[#fff] font-semibold flex flex-col'>Introduction to IELTS</span>

                                <div className='flex gap-20 lg:gap-5'>
                                  <div className='font-medium flex gap-2 w-[300px] lg:w-[250px] text-[#fff]'>
                                    <span className='text-[16px] font-semibold'>Start Date </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>April 11, 2024</span>
                                  </div>
                                  <div className=' font-medium flex gap-2 text-[#fff]  w-[300px] lg:w-[250px]'>
                                    <span className='text-[16px]  font-semibold'>Completed Time </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>12:00 AM</span>
                                  </div>
                                </div>

                                <div className='flex gap-20 lg:gap-5'>
                                  <div className='font-medium flex gap-2 w-[300px] lg:w-[250px] text-[#fff]'>
                                    <span className='text-[16px] font-semibold'>Start Time </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>12:00 AM</span>
                                  </div>
                                  <div className=' font-medium flex gap-2 text-[#fff] lg:w-[250px]  w-[300px]'>
                                    <span className='text-[16px]  font-semibold'>Completed Date </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>April 11, 2024</span>
                                  </div>
                                </div>
                                {/* <div className='flex flex-col'>
                              <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>

                            </div> */}

                              </div>
                            </div>

                            <div className='flex flex-col items-end gap-2 justify-end'>
                              <Button color='primary' className='w-[163px] lg:w-[120px] h-[44px] lg:text-[16px] text-[15px]' onPress={() => handleViewAnswer('5xl', res._id)}>View Answer</Button>
                              <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                <span>Refference Link : </span>
                                <a href='https:// www.google.com' className='underline' >
                                  www.google.com
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tab>
                    <Tab
                      key="result"
                      title={
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faCheck} size='xl' />
                          <span>Result</span>
                        </div>
                      }
                    >
                      <div className='flex flex-col justify-start pt-10 w-[768px] lg:w-[1200px] xl:w-[1280px] 2xl:w-[1440px] h-[204px] pl-10 pb-8 pr-10' >

                        {subjectData.exams.filter(el => el.examType === 'inapp').map((item, index) => (
                          <>
                            {/* {console.log(examList.filter(el => el.quizResult), 'result')} */}
                            {examList.filter(el => el.type === 'inapp' && el.status === 'published').map((res) => (
                              <div className='grid grid-cols-2 bg-[#215887] p-12  border-4 border-l-red-500 '>
                                <div className='w-[742px] h-[135px] flex gap-52'>
                                  <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                                  <div className='flex flex-col gap-5 justify-start'>
                                    <span className='text-[32px] text-[#fff] font-semibold flex flex-col'>Introduction to IELTS</span>

                                    <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                      <span>Refference Link : </span>
                                      <a href='https:// www.google.com' className='underline' >
                                        www.google.com
                                      </a>
                                    </div>




                                  </div>
                                </div>

                                <div className='flex flex-col items-end gap-2 justify-center'>
                                  <Button className='bg-[#ED1D25] text-[#fff] text-[16px] font-semibold' onClick={() => { setShowResult(true), handleResPage(res), setExamValue(item) }}>See Result</Button>
                                  {/* <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                    <span>Refference Link : </span>
                                    <a href='https:// www.google.com' className='underline' >
                                      www.google.com
                                    </a>
                                  </div> */}
                                </div>
                              </div>
                            ))}



                          </>

                        ))}


                      </div>
                    </Tab>
                  </Tabs>
                ) : (
                  <Tabs aria-label="Options" color="primary" variant="bordered">
                    <Tab
                      key="new"
                      title={
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faFireFlameCurved} size='xl' />
                          <span>New</span>
                        </div>
                      }
                    >
                      <div className='flex flex-col justify-start pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10' >
                        {subjectData.exams.filter(el => el.examType !== 'inapp').map((item, index) => (
                          <div className='grid grid-cols-2 bg-[#215887] p-12  border-4 border-l-red-500 '>
                            <div className='w-[742px] flex gap-52'>
                              <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                              <div className='flex flex-col gap-5 justify-start'>
                                <span className='text-[32px] text-[#fff] font-semibold flex flex-col'>{item?.title}</span>
                                <div className='flex gap-20'>
                                  <div className='font-medium flex gap-2 w-[300px] text-[#fff]'>
                                    <span className='text-[16px] font-semibold'>Start Date </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>April 11, 2024</span>
                                  </div>
                                  {/* <div className=' font-medium flex gap-2 text-[#fff]  w-[300px]'>
                                      <span className='text-[16px]  font-semibold'>Completed Time </span>
                                      <span>:</span>
                                      <span className='text-[16px] font-medium'>12:00 AM</span>
                                    </div> */}
                                </div>

                                <div className='flex gap-20'>
                                  <div className='font-medium flex gap-2 w-[300px] text-[#fff]'>
                                    <span className='text-[16px] font-semibold'>Start Time </span>
                                    <span>:</span>
                                    <span className='text-[16px] font-medium'>12:00 AM</span>
                                  </div>

                                </div>


                              </div>
                            </div>

                            <div className='flex flex-col items-end gap-2 justify-end'>
                              <Link href={`/exam-page/${item._id}`}>
                                <Button color='primary' className='w-[163px] h-[44px]'>Take Exam</Button>

                              </Link>
                              <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                <span>Refference Link : </span>
                                <a href='https:// www.google.com' className='underline' >
                                  www.google.com
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}


                      </div>
                    </Tab>
                    <Tab
                      key="complete"
                      title={
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faStar} size='xl' />
                          <span>Complete</span>
                        </div>
                      }
                    >
                      <div className='flex flex-col justify-start pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10' >


                        <div className='grid grid-cols-2 bg-[#215887] p-12  border-4 border-l-red-500 '>
                          <div className='w-[742px] flex gap-52'>
                            <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                            <div className='flex flex-col gap-5 justify-start'>
                              <span className='text-[32px] text-[#fff] font-semibold flex flex-col'>Introduction to IELTS</span>

                              <div className='flex gap-20'>
                                <div className='font-medium flex gap-2 w-[300px] text-[#fff]'>
                                  <span className='text-[16px] font-semibold'>Start Date </span>
                                  <span>:</span>
                                  <span className='text-[16px] font-medium'>April 11, 2024</span>
                                </div>
                                <div className=' font-medium flex gap-2 text-[#fff]  w-[300px]'>
                                  <span className='text-[16px]  font-semibold'>Completed Time </span>
                                  <span>:</span>
                                  <span className='text-[16px] font-medium'>12:00 AM</span>
                                </div>
                              </div>

                              <div className='flex gap-20'>
                                <div className='font-medium flex gap-2 w-[300px] text-[#fff]'>
                                  <span className='text-[16px] font-semibold'>Start Time </span>
                                  <span>:</span>
                                  <span className='text-[16px] font-medium'>12:00 AM</span>
                                </div>
                                <div className=' font-medium flex gap-2 text-[#fff]  w-[300px]'>
                                  <span className='text-[16px]  font-semibold'>Completed Date </span>
                                  <span>:</span>
                                  <span className='text-[16px] font-medium'>April 11, 2024</span>
                                </div>
                              </div>
                              {/* <div className='flex flex-col'>
                              <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>

                            </div> */}

                            </div>
                          </div>

                          <div className='flex flex-col items-end gap-2 justify-end'>
                            <Button color='primary' className='w-[163px] h-[44px]'>View Answer</Button>
                            <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                              <span>Refference Link : </span>
                              <a href='https:// www.google.com' className='underline' >
                                www.google.com
                              </a>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Tab>
                    <Tab
                      key="result"
                      title={
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faCheck} size='xl' />
                          <span>Result</span>
                        </div>
                      }
                    >
                      <div className='flex flex-col justify-start pt-10 w-[1560px] h-[204px] pl-10 pb-8 pr-10' >


                        <div className='grid grid-cols-2 bg-[#215887] p-12  border-4 border-l-red-500 '>
                          <div className='w-[742px] h-[135px] flex gap-52'>
                            <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                            <div className='flex flex-col gap-5 justify-start'>
                              <span className='text-[32px] text-[#fff] font-semibold flex flex-col'>Introduction to IELTS</span>

                              <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                <span>Refference Link : </span>
                                <a href='https:// www.google.com' className='underline' >
                                  www.google.com
                                </a>
                              </div>




                            </div>
                          </div>

                          <div className='flex flex-col items-end gap-2 justify-end'>
                            <Button className='bg-[#ED1D25] text-[#fff] text-[16px] font-semibold' onClick={() => setShowResult(true)}>See Result</Button>
                            {/* <div className="text-[16px] text-[#fff]  font-semibold px-3 ">
                                  <span>Refference Link : </span>
                                  <a href='https:// www.google.com' className='underline' >
                                    www.google.com
                                  </a>
                                </div> */}
                          </div>
                        </div>

                      </div>
                    </Tab>
                  </Tabs>
                )}


              </div>
            )

          }


        </>
      )}
      <div>
        <Modal
          size='5xl'
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior='inside'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-[30px] font-bold">Your Quiz Result</ModalHeader>
                <Divider></Divider>
                <ModalBody>
                  <ViewAnswer ViewData={disabledQuiz[0]} />
                  {/* {console.log(disabledQuiz[0], 'data')} */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="bordered" onPress={onClose}>
                    Close
                  </Button>

                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

// Author:Kaung Set Hein
