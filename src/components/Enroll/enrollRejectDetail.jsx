import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import apiInstance from "../../util/api";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Reject from "../../assets/img/reject.svg";
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
import StickyBox from "react-sticky-box";
import { Image, Divider } from "@nextui-org/react";

export default function DepartmentUpdateInput() {

  const Id = useLocation().pathname.split("/")[2];
  const [student, setStudent] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const getOverAllStudentDetail = async () => {
      console.log(Id);
      await apiInstance
        .get(`overall-enrollments`, { params: { status: "reject" } })
        .then((res) => {

          setStudent(res.data.data.filter((el) => el._id === Id)[0]);
          const Img = getFile({
            payload: res.data.data.filter((el) => el._id === Id)[0]?.student
              ?.image,
          });

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
              {student?.student?.name}
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
                &nbsp; {student?.student?.email}
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
                &nbsp; {student?.student?.phone}
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
                &nbsp; {student?.student?.address}
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
                {new Date(student?.student?.birthDate).toLocaleDateString(
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
                Desired Course:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                {student?.subject?.title}
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Registeration Date:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                {new Date(student.student?.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Why Choose MSI:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                Lorem ipsum dolor sit amet consectetur. Lectus eros molestie id
                eget nisl leo. Tempor cursus diam venenatis maecenas
                scelerisque. Dui enim molestie accumsan et risus.
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Why choose this course :
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              // className='sm:ml-10 md:ml-5'
              >
                Lorem ipsum dolor sit amet consectetur. Lectus eros molestie id
                eget nisl leo. Tempor cursus diam venenatis maecenas
                scelerisque. Dui enim molestie accumsan et risus.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
