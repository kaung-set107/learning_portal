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
import PP from '../../../assets/img/student.jpg'
import { getFile } from "../../../util";
import ExamRes from './examResultPage'
import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved, faStar, faCheck, faImage
} from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const colors = ["bg-[#ED1D25]", "bg-[#215887]"]
const oneColor = colors[0]
const twoColor = colors[1]

export default function CourseDetail(props) {

  const ResData = {
    id: 1,
    image: PP,
    name: "Mya Saw Lon",
    studentID: "12345",
  }
  const tabRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const subjectData = location.state.data;
  // console.log(subjectData, "sub data");
  const courseData = location.state.courseData;
  // console.log(props.id, "id");
  const [showMid, setShowMid] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showOrigin, setShowOrigin] = useState(true);
  const [teacherName, setTeacherName] = useState([]);
  const [nestedExamVal, setNestedExamVal] = useState([]);
  const [showNestedOrigin, setShowNestedOrigin] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [value, setValue] = useState([])
  const handleExam = (val) => {
    if (val.term === 'mid') {
      setShowMid(true)
      setShowFinal(false)
      setShowOrigin(false)
    } else {
      setShowMid(false)
      setShowFinal(true)
      setShowOrigin(false)
    }
    setValue(val)
  }

  const handleNestedExam = (val) => {
    setNestedExamVal(val)
    setShowNestedOrigin(false)
    console.log(val)
  }

  useEffect(() => {

    const getSubjects = async () => {
      await apiInstance.get("subjects").then((res) => {

        const Filter = res.data.data.filter((el) => el._id === subjectData._id)[0];
        setTeacherName(Filter);
        // const Img = getFile({
        //   payload: Filter.instructor.image,
        // });
        // setTeacherImage(Img);
      });
    };
    getSubjects();
    // getCourseDetail();
  }, []);

  const handleBack = () => {
    setShowNestedOrigin(true)
    setShowMid(true)
    setNestedExamVal('')
    setShowFinal(false)
  };

  // Handle Tabs


  return (
    <>

      {showOrigin && (
        <div className='flex flex-col gap-5'>
          {subjectData.exams.map((item, index) => (
            <div className={` h-[72px] rounded-[8px] p-20 flex items-center w-full ${index === 0 ? twoColor : oneColor}`} onClick={() => handleExam(item)}>
              <span className='text-white text-[24px] font-semibold'>{item?.term === 'mid' ? 'Mid - Term Exam' : 'Final Exam'}</span>
            </div>

          ))}
        </div >
      )}

      {showMid && (
        <>
          {showNestedOrigin && (<div className='flex flex-col gap-12'>
            <div className='bg-[#215887] w-[1360px] p-12 rounded-lg text-[24px] font-semibold text-[#fff]' onClick={() => handleNestedExam(1)}>In App Exam</div>
            <div className='bg-[#ED1D25] w-[1360px] p-12 rounded-lg text-[24px] font-semibold text-[#fff]' onClick={() => handleNestedExam(2)} >Outside App Exam</div>
            <div className='bg-[#FFB700] w-[1360px] p-12 rounded-lg text-[24px] font-semibold text-[#fff]' onClick={() => handleNestedExam(3)} >Openbook Exam</div>
          </div>)}

          {nestedExamVal && !showNestedOrigin && (
            <>

              {showResult ? (
                <div className='mx-10'>
                  <ExamRes ResData={ResData} showResult={showResult} />
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
                      <div className='h-[308px] w-full flex flex-col gap-5 pl-16'>
                        <div className='flex flex-col gap-5'>
                          <div className='flex justify-between'>
                            <span className='text-[40px] font-bold'>Mid-Term Exam</span>
                            <Button className='flex justify-center w-10' onClick={handleBack}>Back</Button>
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
                        <div className='flex justify-center p-5'>
                          {
                            value.showToStudent === false ? (
                              <Button color='primary' disabled className='flex justify-center w-40 items-center cursor-not-allowed opacity-60' >Start</Button>

                            ) : (
                              <Button color='primary' className='flex justify-center w-40 items-center' onClick={handleBack}>Start</Button>

                            )
                          }
                        </div>
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


                        <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 '>
                          <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                          <div className='flex flex-col gap-2 justify-start'>
                            <span className='text-[32px] text-[#fff] font-semibold'>Title</span>
                            <div className='text-[16px] text-[#fff] font-medium'>Description</div>
                            <div className='flex flex-col  gap-1'>
                              <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                              <div className='grid grid-cols-3'>



                                <div className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                                  <a target="_blank" rel='noreferrer' href='#'>
                                    Links
                                  </a>
                                </div>


                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>

                            </div>

                          </div>




                          <div className='flex flex-col gap-4  justify-center'>

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


                        <div className='flex justify-between bg-[#215887]   p-12  border-4 border-l-red-500 '>
                          <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Exam</div>

                          <div className='flex flex-col gap-2 justify-start w-[400px]'>
                            <span className='text-[32px] text-[#fff] font-semibold'>Title</span>
                            <div className='text-[16px] text-[#fff] font-medium'>Description</div>
                            <div className='flex flex-col  gap-1'>
                              <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                              <div className='grid grid-cols-3'>



                                <div className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                                  <a target="_blank" rel='noreferrer' href='#'>
                                    Links
                                  </a>
                                </div>


                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>

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



          )}

        </>

      )
      }

      {
        showFinal && (
          <>
            {showNestedOrigin && (<div className='flex flex-col gap-12'>
              <div className='bg-[#215887] w-[1360px] p-12 rounded-lg text-[24px] font-semibold text-[#fff]' onClick={() => handleNestedExam(1)}>In App Exam</div>
              <div className='bg-[#ED1D25] w-[1360px] p-12 rounded-lg text-[24px] font-semibold text-[#fff]' onClick={() => handleNestedExam(2)} >Outside App Exam</div>
              <div className='bg-[#FFB700] w-[1360px] p-12 rounded-lg text-[24px] font-semibold text-[#fff]' onClick={() => handleNestedExam(3)} >Openbook Exam</div>
            </div>)}


            {nestedExamVal && !showNestedOrigin && (
              <>

                {showResult ? (
                  <div className='mx-10'>
                    <ExamRes ResData={ResData} showResult={showResult} />
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
                        <div className='h-[308px] w-full flex flex-col gap-5 pl-16'>
                          <div className='flex flex-col gap-5'>
                            <div className='flex justify-between'>
                              <span className='text-[40px] font-bold'>Mid-Term Exam</span>
                              <Button className='flex justify-center w-10' onClick={handleBack}>Back</Button>
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
                          <div className='flex justify-center p-5'>
                            {
                              value.showToStudent === false ? (
                                <Button color='primary' disabled className='flex justify-center w-40 items-center cursor-not-allowed opacity-60' >Start</Button>

                              ) : (
                                <Button color='primary' className='flex justify-center w-40 items-center' onClick={handleBack}>Start</Button>

                              )
                            }
                          </div>
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


                          <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 '>
                            <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Exam</div>
                            <div className='flex flex-col gap-2 justify-start'>
                              <span className='text-[32px] text-[#fff] font-semibold'>Title</span>
                              <div className='text-[16px] text-[#fff] font-medium'>Description</div>
                              <div className='flex flex-col  gap-1'>
                                <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                                <div className='grid grid-cols-3'>



                                  <div className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                                    <a target="_blank" rel='noreferrer' href='#'>
                                      Links
                                    </a>
                                  </div>


                                </div>
                              </div>
                              <div className='flex flex-col'>
                                <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>

                              </div>

                            </div>




                            <div className='flex flex-col gap-4  justify-center'>

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


                          <div className='flex justify-between bg-[#215887]   p-12  border-4 border-l-red-500 '>
                            <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Exam</div>

                            <div className='flex flex-col gap-2 justify-start w-[400px]'>
                              <span className='text-[32px] text-[#fff] font-semibold'>Title</span>
                              <div className='text-[16px] text-[#fff] font-medium'>Description</div>
                              <div className='flex flex-col  gap-1'>
                                <span className='text-[16px] text-[#fff] font-semibold'>Reference link </span>
                                <div className='grid grid-cols-3'>



                                  <div className="text-[16px] text-[#4b4eff] font-semibold px-3 ">
                                    <a target="_blank" rel='noreferrer' href='#'>
                                      Links
                                    </a>
                                  </div>


                                </div>
                              </div>
                              <div className='flex flex-col'>
                                <span className='text-[16px] text-[#fff] font-semibold'>Document File link </span>

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



            )}

          </>

        )
      }

    </>
  );
}

// Author:Kaung Set Hein
