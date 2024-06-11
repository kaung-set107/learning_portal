
import apiInstance from "../../util/api";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhoneVolume,
  faLocationDot,
  faCalendar,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { getFile } from "../../util";
import { Image, Divider } from "@nextui-org/react";

export default function DepartmentUpdateInput() {

  const Id = useLocation().pathname.split("/")[2];
  const [student, setStudent] = useState("");
  const [img, setImg] = useState("");


  useEffect(() => {
    const getOverAllStudentDetail = async () => {
      // console.log(Id);
      await apiInstance.get(`overall-enrollments`).then((res) => {
        // console.log(res.data.data.filter((el) => el._id === Id)[0], "overall");
        setStudent(res.data.data.filter((el) => el._id === Id)[0]);
        const Img = res.data.data.filter((el) => el._id === Id)[0]?.student
          .image ? getFile({
            payload: res.data.data.filter((el) => el._id === Id)[0]?.student
              ?.image,
          }) : '';
        // console.log(Img, "ii");
        setImg(Img);
      });
    };

    getOverAllStudentDetail();
  }, [setImg]);



  return (
    <div className='mx-8 '>
      <div>
        <Link to='/enroll-list'>
          <FontAwesomeIcon icon={faArrowLeft} size='xl' /> &nbsp; Back
        </Link>
      </div>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <div className='flex gap-20 py-10'>
          <div>
            <Image
              radius='sm'
              style={{
                borderRadius: "200px",
              }}
              className='w-full h-full'
              src={img}
            />
          </div>
          <div className='px-10' style={{ width: "768px", height: "728px" }}>
            <div
              className='header'
              style={{
                fontWeight: "600",
                fontSize: "48px",
                lineHeight: "60px",
              }}
            >
              {student.student?.name}
            </div>
            <div className='flex py-4'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faEnvelope} size='xl' />
                &nbsp; {student.student?.email}
              </span>
            </div>
            <div className='py-4'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faPhoneVolume} size='xl' />
                &nbsp; {student.student?.phone}
              </span>
            </div>
            <div className='py-4'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faLocationDot} size='xl' />
                &nbsp; {student.student?.address}
              </span>
            </div>
            <div className='py-4 mb-10'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faCalendar} size='xl' />
                &nbsp;{" "}
                {new Date(student.student?.birthDate).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
            <Divider></Divider>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Enroll Code:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                {student.code}
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Transaction No:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                {student?.paymentTransaction}
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Course :
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                {student.course?.title}
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Transaction Image :
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'

              >

                <div className=''>
                  {/* To view fullscreen for image */}
                  <PhotoProvider>
                    <PhotoView key={student._id} src={student.paymentImage && getFile({ payload: student.paymentImage })}>
                      <abbr title='Click View' className={student.paymentImage ? 'text-blue' : ''}>
                        <img src={student.paymentImage && getFile({ payload: student.paymentImage })} style={{ width: '100px', height: '100px' }} />
                      </abbr>
                    </PhotoView>
                  </PhotoProvider >

                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
