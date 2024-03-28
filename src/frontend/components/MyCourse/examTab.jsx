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
import BBAudio from "../../../assets/audio/bb.mp3";
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
  const [teacherImage, setTeacherImage] = useState([]);

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
    setShowOrigin(true)
    setShowMid(false)
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
            ></Tab>
            <Tab
              key="result"
              title={
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCheck} size='xl' />
                  <span>Result</span>
                </div>
              }
            ></Tab>
          </Tabs>
        </div>
      )
      }

      {
        showFinal && (

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
                      <span className='text-[40px] font-bold'>Final Exam</span>
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
              ></Tab>
              <Tab
                key="result"
                title={
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faCheck} size='xl' />
                    <span>Result</span>
                  </div>
                }
              ></Tab>
            </Tabs>
          </div>
        )
      }

    </>
  );
}

// Author:Kaung Set Hein
