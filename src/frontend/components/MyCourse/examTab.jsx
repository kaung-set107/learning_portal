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
} from "@nextui-org/react";
import QuizPage from "../../ByUser/Quiz/quizpage";
import PP from '../../../assets/img/student.jpg'
import { getFile } from "../../../util";
import ExamRes from './examResultPage'
import ExamPage from './examPage'
import apiInstance from "../../../util/api";
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
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(5); // Timer set for 5 seconds
  const tabRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const subjectData = location.state.data;
  console.log(subjectData, "sub data");
  const courseData = location.state.courseData;
  // console.log(props.id, "id");
  const [showMid, setShowMid] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showOrigin, setShowOrigin] = useState(true);
  const [teacherName, setTeacherName] = useState([]);
  const [nestedExamVal, setNestedExamVal] = useState([]);
  const [showNestedOrigin, setShowNestedOrigin] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [showExamPage, setShowExamPage] = useState(false)
  const [value, setValue] = useState([])
  const [inAppExamList, setInAppExamList] = useState([])
  const [outsideExamList, setOutsideExamList] = useState([])
  const [examPageData, setExamPageData] = useState('')

  const handleExamPage = (val) => {
    setShowExamPage(true)
    setShowResult(false)
    setExamPageData(val)
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
    console.log(val)
  }

  useEffect(() => {

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


    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {

        const Filter = res.data.data.filter((el) => el._id === subjectData._id)[0];
        setTeacherName(Filter);

      });
    };
    const getExam = async () => {
      await apiInstance.get("exams").then((res) => {

        console.log(res.data.data.filter(el => el.examType === 'inapp'), 'in app')
        setInAppExamList(res.data.data.filter(el => el.examType === 'inapp'))
        setOutsideExamList(res.data.data.filter(el => el.examType !== 'inapp'))

      });
    };
    getExam()
    getSubjects();

    // getCourseDetail();
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [isLoading]);

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
        <div className='flex flex-col gap-5'>



          <div className={` h-[72px] rounded-[8px] p-20 flex items-center w-full ${twoColor}`} onClick={() => handleNestedExam(1)}>
            <span className='text-white text-[24px] font-semibold'>In App Exam</span>
          </div>

          <div className={` h-[72px] rounded-[8px] p-20 flex items-center w-full ${oneColor}`} onClick={() => handleNestedExam(2)}>
            <span className='text-white text-[24px] font-semibold'>Outside Exam</span>
          </div>
          <div className='flex flex-col gap-32'>
            <div className='h-[308px] w-full flex flex-col gap-5 pl-16'>
              <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                  <span className='text-[40px] font-bold'> Note For Exam</span>
                  {/* <Button className='flex justify-center w-10' onClick={handleBack}>Back</Button> */}
                </div>

                <div className='text-[24px] font-semibold flex flex-col gap-2 ml-[30px]'>
                  <div >
                    <li>Must be able to answer the Project Management (Week-4) Quiz.</li>
                    <li>Must have passed (90%).</li>
                    <li>There is no number of times, but the opportunity to answer</li>

                    <li className='w-[1315px]'>In answering, if you take the quiz for the first (2) times and want to take it again for the (3rd) time, you can answer it immediately, and you can take the quiz for the (3rd) time only after 5 (5) hours have passed.</li>


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
          {isLoading ? (
            <div className='flex justify-center pt-[40px]'>
              <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
              Please Wait {timer}s
            </div>) : (

            showResult ? (

              <div className='mx-10' >
                <ExamRes ResData={ResData} showResult={showResult} />
              </div>
            ) : showExamPage ? (
              <div className='mx-10'>
                <ExamPage ResData={examPageData} showResult={showExamPage} />
              </div>
            ) : (
              <div className="flex justify-center items-center w-full flex-col mb-20">
                <div className='relative'>
                  <Button className='flex justify-center w-10 absolute top-0 right-0 left-[650px]' onClick={handleSecondBack}>Back</Button>
                </div>

                {nestedExamVal === 1 ? (
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

          )}


        </>
      )}






      {/* {nestedExamVal && !showOrigin && (
        <>

          {showResult ? (
            <div className='mx-10'>
              <ExamRes ResData={ResData} showResult={showResult} />
            </div>
          ) : showExamPage ? (
            <div className='mx-10'>
              <ExamPage ResData={examPageData} showResult={showExamPage} />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full flex-col mb-20">
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
                  {subjectData.exams.filter(el => el.examType === 'inapp').map((item, index) => (
                    <div className='flex flex-col justify-start pt-10  pl-10 pb-8 pr-10' >
                      <div className='flex gap-48 bg-[#215887] p-12  border-4 border-l-red-500 w-[1560px] h-[250px] '>
                        <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                        <div className='flex flex-col gap-2 justify-start items-start w-[500px]'>
                          <span className='text-[32px] text-[#fff] font-semibold'>{item?.title}</span>
                          <div className='text-[16px] text-[#fff] font-medium flex gap-3'>
                            <span>Start Date : </span>
                            <span>{new Date(item?.examDate).toLocaleDateString('en-US', options)}</span>
                          </div>

                          <div className='text-[16px] text-[#fff] font-medium flex gap-3'>
                            <span>Start Time : </span>
                            <span>{item?.startTime}</span>
                          </div>
                        </div>

                        <div className='flex flex-col gap-4  justify-center items-end w-[400px]'>
                          <div><Button className='bg-[#4674ff] text-[#fff] w-[150px] ' onClick={() => handleExamPage(item)}>Take Exam</Button></div>
                          <div className='flex gap-2'>
                            <span className='text-[#fff]'>Reference link :</span>
                            <a href={JSON.parse(item.links)[0].links} className='text-[#fff]'> {JSON.parse(item.links)[0].links}</a>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}

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
                  <div className='flex flex-col justify-start pt-10  pl-10 pb-8 pr-10' >


                    <div className='flex gap-48 bg-[#215887] p-12  border-4 border-l-red-500 w-[1560px] h-[250px]  '>
                      <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                      <div className='flex flex-col gap-2 justify-start items-start w-[800px]'>
                        <span className='text-[32px] text-[#fff] font-semibold'>Introduction to IELTS</span>
                        <div className='flex gap-10'>
                          <div className='flex flex-col gap-5'>
                            <div className='text-[16px] text-[#fff] font-medium flex gap-3'>
                              <span>Start Date : </span>
                              <span>April 11, 2024</span>
                            </div>
                            <div className='text-[16px] text-[#fff] font-medium flex gap-3'>
                              <span>Start Time : </span>
                              <span>12:00 PM</span>
                            </div>

                          </div>
                          <div className='flex flex-col gap-5'>
                            <div className='text-[16px] text-[#fff] font-medium flex gap-3'>
                              <span>Completed Date : </span>
                              <span>April 11, 2024</span>
                            </div>
                            <div className='text-[16px] text-[#fff] font-medium flex gap-3'>
                              <span>Completed Time : </span>
                              <span>12:00 PM</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className='flex flex-col gap-4  justify-center items-end w-[400px]'>
                        <div><Button className='bg-[#4674ff] text-[#fff] w-[150px] '>View Answer</Button></div>
                        <div className='flex gap-2'>
                          <span className='text-[#fff]'>Reference link :</span>
                          <span className='text-[#fff]'> www.msi.com/basicielts</span>
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
                  <div className='flex flex-col justify-start pt-10  pl-10 pb-8 pr-10' >


                    <div className='flex justify-between bg-[#215887] w-[1560px] h-[250px]   p-12  border-4 border-l-red-500 '>
                      <div className='flex justify-start text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                      <div className='flex flex-col gap-2 justify-start items-start w-[800px]'>
                        <span className='text-[32px] text-[#fff] font-semibold'>Introduction to IELTS</span>
                        <div className='flex gap-2'>
                          <span className='text-[#fff]'>Reference link :</span>
                          <span className='text-[#fff]'> www.msi.com/basicielts</span>
                        </div>
                      </div>

                      <div className='flex flex-col gap-4  justify-center w-[167px] pt-[5px] pb-[5px] pl-[10px] pr-[10px]' >
                        <Button className='bg-[#ED1D25] text-[#fff] text-[16px] font-semibold' onClick={() => setShowResult(true)}>See Result</Button>
                      </div>
                    </div>

                  </div>
                </Tab>
              </Tabs>

            </div>
          )}
        </>

      )} */}



    </>
  );
}

// Author:Kaung Set Hein
