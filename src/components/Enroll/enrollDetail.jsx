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
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
export default function DepartmentUpdateInput() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isRejOpen,
    onOpen: onRejOpen,
    onOpenChange: onRejOpenChange,
    onClose: onRejClose,
  } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("outside");
  const Id = useLocation().pathname.split("/")[2];
  const [student, setStudent] = useState("");
  const [studentAppr, setStudentAppr] = useState("");
  const [studentRej, setStudentRej] = useState("");
  const [img, setImg] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getOverAllStudentDetail = async () => {
      // console.log(Id);
      await apiInstance
        .get(`overall-enrollments`, { params: { status: "waiting" } })
        .then((res) => {
          console.log(
            res.data.data.filter((el) => el._id === Id)[0],
            "overall"
          );
          setStudent(res.data.data.filter((el) => el._id === Id)[0]);
          const Img = getFile({
            payload: res.data.data.filter((el) => el._id === Id)[0]?.student
              .image,
          });
          console.log(Img, "ii");
          setImg(Img);
        });
    };

    getOverAllStudentDetail();
  }, [setImg]);

  const handleSend = async () => {
    const data = {
      username: userName,
      password: password,
      description: description,
    };

    await apiInstance
      .post(`overall-enrollments/${Id}/approve`, data)
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Nice!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: "Something Wrong!",
          text: "Please,Try again!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      });
  };

  const handleRejectSend = async () => {
    const data = {
      userName: userName,
      password: password,
      description: description,
    };
    await apiInstance
      .post(`overall-enrollments/${Id}/reject`, data)
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Rejection Email Sent",
          text: "",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
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

      <div className='flex justify-end py-3'>
        <Button
          className='bg-red-600 text-white hover:bg-red-700'
          onPress={onRejOpen}
        >
          Reject
        </Button>
        &nbsp;
        <Button
          className='bg-blue-600 text-white hover:bg-blue-700'
          onPress={onOpen}
        >
          Approve
        </Button>
      </div>

      <Modal
        size='xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex mt-5'>
                {" "}
                <div style={{ fontWeight: "700px", fontSize: "24px" }}>
                  Enrollments Approved
                </div>{" "}
                &nbsp;
                <div className='text-green-500' style={{ marginTop: "0.1em" }}>
                  <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                </div>
              </ModalHeader>
              <ModalBody>
                <div style={{ fontWeight: "500px", fontSize: "16px" }}>
                  Approve this student !
                </div>

                <div className='py-1'>
                  <Textarea
                    variant='bordered'
                    placeholder='Message'
                    disableAnimation
                    disableAutosize
                    onChange={(e) => setDescription(e.target.value)}
                    endContent={<div className='text-red-500'>*</div>}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={onClose}
                  onClick={() => handleSend()}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size='xl'
        isOpen={isRejOpen}
        onOpenChange={onRejOpenChange}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onRejClose) => (
            <>
              <ModalHeader className='flex mt-5'>
                {" "}
                <div
                  style={{
                    fontWeight: "700px",
                    fontSize: "24px",
                    marginTop: "0.2em",
                  }}
                >
                  Enrollments Rejected
                </div>{" "}
                &nbsp;
                <div className='text-green-500'>
                  <img src={Reject} style={{ width: "35px" }} />
                </div>
              </ModalHeader>
              <ModalBody>
                <div style={{ fontWeight: "500px", fontSize: "16px" }}>
                  <p>
                    Thank you for your interest in MSI Academy. After careful
                    review, we regret to inform you that your recent
                    registration has not been approved at this time.
                  </p>
                </div>
                <div className='py-5'>
                  <div className='py-1'>
                    <Textarea
                      variant='bordered'
                      placeholder='Reason for Rejection:'
                      disableAnimation
                      disableAutosize
                      classNames={{
                        base: "form-control",
                        input: "resize-y min-h-[40px]",
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onRejClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={onRejClose}
                  onClick={() => handleRejectSend()}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
