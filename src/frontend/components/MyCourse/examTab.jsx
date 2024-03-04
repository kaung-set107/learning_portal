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
  faCircleCheck,
  faAngleRight,
  faLock,
  faAngleLeft,
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
  console.log(subjectData, "sub data");
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
        <div className='h-[408px] w-full flex flex-col gap-5 pl-16'>

          <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
              <span className='text-[40px] font-bold'>Mid-Term Exam</span>
              <Button className='flex justify-center w-10' onClick={handleBack}>Back</Button>
            </div>

            <div className='pl-5'>
              <ul className='text-[24px] font-semibold flex flex-col gap-2'>
                <li>Must be able to answer the Project Management (Week-4) Quiz.</li>
                <li>Must have passed (90%).</li>
                <li>There is no number of times, but the opportunity to answer</li>
                <li className='w-[1315px]'>In answering, if you take the quiz for the first (2) times and want to take it again for the (3rd) time, you can answer it immediately, and you can take the quiz for the (3rd) time only after 5 (5) hours have passed.</li>
              </ul>
            </div>
          </div>
          <div>
            <span className='text-[#ED1D25] text-[24px] font-bold'> Note. . After taking the first (2) exams, you will be able to retake the exam only after 5 (5) hours have passed.</span>
          </div>
          <div className='flex justify-center p-5'>
            <Button color='primary' className='flex justify-center w-40 disabled:opacity-75  items-center' onClick={handleBack}>Start</Button>

          </div>
        </div >
      )
      }

      {
        showFinal && (
          <div className='h-[408px] w-full flex flex-col gap-5 pl-16'>

            <div className='flex flex-col gap-5'>
              <div className='flex justify-between'>
                <span className='text-[40px] font-bold'>Final Exam</span>
                <Button className='flex justify-center w-10' onClick={handleBack}>Back</Button>
              </div>
              <div className='pl-5'>
                <ul className='text-[24px] font-semibold flex flex-col gap-2'>
                  <li>Must be able to answer the Project Management (Week-4) Quiz.</li>
                  <li>Must have passed (90%).</li>
                  <li>There is no number of times, but the opportunity to answer</li>
                  <li className='w-[1315px]'>In answering, if you take the quiz for the first (2) times and want to take it again for the (3rd) time, you can answer it immediately, and you can take the quiz for the (3rd) time only after 5 (5) hours have passed.</li>
                </ul>
              </div>
            </div>
            <div>
              <span className='text-[#ED1D25] text-[24px] font-bold'> Note. . After taking the first (2) exams, you will be able to retake the exam only after 5 (5) hours have passed.</span>
            </div>
            <div className='flex justify-center p-5' disabled>
              <Button color='primary' className={value.showToStudent === true ? 'flex justify-center w-40 items-center' : 'flex justify-center w-40 items-center opacity-60 cursor-not-allowed'} onClick={handleBack}>Start</Button>

            </div>
          </div>
        )
      }

    </>
  );
}

// Author:Kaung Set Hein
