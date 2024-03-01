import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Image,
  Input,
  Progress,
} from "@nextui-org/react";
import { getFile } from "../../../util";
import Module from "../../../assets/img/modules.svg";
import Chapter from "../../../assets/img/chapter.svg";
import Download from "../../../assets/img/download.svg";
import TV from "../../../assets/img/tv.svg";
import ReadBook from "../../../assets/img/readbook.gif";
import Book from "../../../assets/img/book.svg";
import Date from "../../../assets/img/date.svg";
import Person from "../../../assets/img/person.svg";
import Time from "../../../assets/img/time.svg";
import WhiteTime from "../../../assets/img/whitetime.svg";
import Certi from "../../../assets/img/certi.svg";
import Nav from "../../home/header";
import Head from "./sub-detail-head";
import apiInstance from "../../../util/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
export default function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const assignData = location.state?.data;
  console.log(assignData, "sub assign");
  //   const courseData = location.state.courseData;
  // console.log(props.id, "id");
  const [subjectList, setSubjectList] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
  const [teacherImage, setTeacherImage] = useState([]);
  //   useEffect(() => {
  //     const getCourseDetail = async () => {
  //       await apiInstance.get("courses/" + props.id).then((res) => {
  //         // console.log(res.data.data.subjects, "c detail");
  //         setSubjectList(res.data.data.subjects);
  //       });
  //     };
  //     const getSubjects = async () => {
  //       await apiInstance.get("subjects").then((res) => {
  //         console.log(
  //           res.data.data.filter((el) => el._id === SubData._id)[0],
  //           "c subject"
  //         );
  //         const Filter = res.data.data.filter((el) => el._id === SubData._id)[0];
  //         setTeacherName(Filter);
  //         const Img = getFile({
  //           payload: Filter.instructor.image,
  //         });
  //         setTeacherImage(Img);
  //       });
  //     };
  //     getSubjects();
  //     getCourseDetail();
  //   }, []);

  return (
    <>


      <div className='flex flex-col flex-grow gap-10 duration-100'>HI</div>

    </>
  );
}
