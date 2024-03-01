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

  const [value, setValue] = useState(0)
  const handleExam = (val) => {
    setValue(val)
  }
  useEffect(() => {

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


  return (
    <>
      {value === 0 && (

        <div className='flex flex-col gap-5'>
          <div className=' bg-[#215887] h-[72px] rounded-[8px] p-20 flex items-center w-full ' onClick={() => handleExam(1)}>
            <span className='text-white text-[24px] font-semibold'>Mid - Term Exam </span>
          </div>
          <div className=' bg-[#ED1D25] h-[72px] rounded-[8px] p-20 flex items-center w-full ' onClick={() => handleExam(2)} >
            <span className='text-white text-[24px] font-semibold'>Final Exam </span>
          </div>

        </div >
      )}


      {value === 1 && (
        <div className='h-[408px] w-full flex flex-col gap-5 pl-16'>
          <Button className='flex justify-start w-10' onClick={() => handleExam(0)}>Back</Button>
          <div className='flex flex-col gap-5'>
            <span className='text-[40px] font-bold'>Mid-Term Exam</span>
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

        </div>
      )}
      {value === 2 && (
        <div className='h-[408px] w-full flex flex-col gap-5 pl-16'>
          <Button className='flex justify-start w-10' onClick={() => handleExam(0)}>Back</Button>
          <div className='flex flex-col gap-5'>
            <span className='text-[40px] font-bold'>Final Exam</span>
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

        </div>
      )}

    </>
  );
}

// Author:Kaung Set Hein
