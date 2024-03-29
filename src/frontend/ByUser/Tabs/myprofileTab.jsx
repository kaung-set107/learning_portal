import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Progress, ModalFooter, Button, useDisclosure, Image, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhoneVolume,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import apiInstance from "../../../util/api";
import { getFile } from "../../../util";
import HoverCarousel from "hover-carousel";
import Edu from "../../../assets/img/edu.jpg";
import EduRes from "../../../assets/img/edures.jpg";
import Course from "../../../assets/img/course.jpg";
import { Fade } from "react-awesome-reveal";
import EntranceTestPage from "../Quiz/entranceTest";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../../../assets/img/finalloading.gif'
import Success from '../../../assets/img/success.gif'
import Swal from "sweetalert2";
export default function MyprofileTab() {
  const variant = 'bordered'
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };


  const navigate = useNavigate()
  const StudentId = localStorage.getItem("id");
  // console.log(StudentId, "stu id");
  const [student, setStudent] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [img, setImg] = useState("");
  const [firstDefaultCourseId, setFirstDefaultCourseId] = useState("");
  const [myCourseList, setMyCourseList] = useState([]);
  const [filterId, setFilterId] = useState([]);
  const [placeactiveTab, setPlaceActiveTab] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [batchId, setBatchId] = useState([])
  const [showGif, setShowGif] = useState(true);
  const [image, setImage] = useState('')
  const [transactionNo, setTransactionNo] = useState('')
  // const [enrollId, setEnrollId] = useState(false)
  const [showError, setShowError] = useState(false)
  const [entranceTestResDataCheck, setEntranceTestResDataCheck] = useState([])
  const [enrollment, setEnrollment] = useState([])
  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };
  // const enr_id = myCourseList[0]?._id
  // console.log(filterId, 'my')

  const filterSubList = filterId.filter(
    (el) => el.course._id === (courseId ? courseId : firstDefaultCourseId)

  );
  // console.log(filterSubList[0]?.course?.subjects, 'fil list for ent')
  // const SubCount = count <= filterSubList[0]?.subjects?.length && count + 1
  // if (count <= filterSubList[0]?.subjects?.length) {

  // }

  const handlePlaceTabClick = (ind, enroll_Id, courseid) => {
    setCourseId(courseid);

    // console.log(enroll_Id, 'enr')
  };
  useEffect(() => {

    const Map1 = async () => {
      const list = {
        student: StudentId,
        entranceTest: filterSubList[0]?.course?.subjects.map((i) => (
          i.entranceTests[0]?._id
        ))
      }

      await apiInstance.get('entrance-test-results', list).then((res) => {
        console.log(
          res.data.data.filter(el => el.student._id === StudentId)[0],
          "stu map1"
        );
        setEntranceTestResDataCheck(res.data.data.filter(el => el.student._id === StudentId))

        // if (res.data.data.length === filterSubList[0]?.subjects?.length) {
        //   setShowEnroll(true)
        // }

      });
    }
    Map1()



    const getAssign = async () => {
      await apiInstance.get(`students`).then((res) => {
        // console.log(
        //   res.data.data.filter((el) => el._id === StudentId),
        //   "stu"
        // );
        setStudent(res.data.data.filter((el) => el._id === StudentId)[0]);
        const Img = getFile({
          payload: res.data.data.filter((el) => el._id === StudentId)[0]?.image,
        });
        // console.log(Img, "ii");
        setImg(Img);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };
    const getEnrollmentWait = async () => {
      const Stu = {
        student: StudentId
      }
      await apiInstance.get(`enrollment-waiting-lists?student=${StudentId}`).then((res) => {
        console.log(res.data.data, "first id");
        setBatchId(res.data.data.filter(el => el.batch))

        setFirstDefaultCourseId(
          res.data.data[0].course._id
        );
        setMyCourseList(res.data.data);
        setFilterId(
          res.data.data.filter((el) => el.course)
        );
        // const count = res.data.data.filter((el) => el.subjects.length);

      });
    };
    const getEntranceTestRes = async () => {

      await apiInstance.get(`entrance-test-results`).then((res) => {
        // console.log(res.data.data, "e res");

        // const count = res.data.data.filter((el) => el.subjects.length);

      });
    };
    const getEnrollment = async () => {
      await apiInstance.get(`enrollments?student=${StudentId}`).then((res) => {
        console.log(res.data.data, "enro list");


        setEnrollment(res.data.data);

        // const count = res.data.data.filter((el) => el.subjects.length);

      });
    };
    getEnrollment();
    getEntranceTestRes();
    getEnrollmentWait();
    getAssign();
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 5000); // Change time duration as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []);


  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    // console.log(file, 'audio')
  };

  const handleDownload = () => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = audioFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEntrance = (e) => {
    navigate("/entranceTest-page", { state: { entranceID: e, batchID: batchId[0].batch } });
  }
  // const dataToPass = { entranceID: entranceID, enrollID: enrollId, batchID: batchId };

  const handleError = () => {
    setShowError(true)
    setTimeout(() => {
      setShowError(false);
    }, 5000); // 10 seconds in milliseconds

    Swal.fire({
      icon: "error",
      title: "Sorry!",
      text: "You must choose Payment Image!",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //Payment
  const handlePayment = () => {
    const EnrWaitId = filterSubList[0]._id

    const formData = new FormData();
    formData.append("paymentImage", image);
    formData.append("course", myCourseList[0].course._id);
    formData.append("student", StudentId);
    formData.append("paymentTransaction", transactionNo);


    apiInstance
      .put(`enrollment-waiting-lists/${EnrWaitId}/payment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Enroll Payment Successful",
          text: "",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div>
      <Fade>
        {/* Profile Facts */}
        <div className='flex gap-20 py-32'>
          <div>
            <Image
              radius='sm'
              style={{
                borderRadius: "200px",
                width: "268px",
                height: "268px",
              }}
              className='w-full h-full'
              src={img}
            />
          </div>
          <div className='px-10' style={{ width: "760px", height: "268px" }}>
            <div
              className='header'
              style={{
                fontWeight: "600",
                fontSize: "48px",
                lineHeight: "40px",
              }}
            >
              {student?.name}
            </div>
            <div className='px-1 py-5'>
              <div className='flex py-4'>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                  className='flex gap-8'
                >
                  <FontAwesomeIcon icon={faEnvelope} size='xl' />
                  &nbsp;
                  {student?.email}
                </span>
              </div>
              <div className='py-4'>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                  className='flex gap-8'
                >
                  <FontAwesomeIcon icon={faPhoneVolume} size='xl' />
                  &nbsp; {student?.phone}
                </span>
              </div>
              <div className='py-4'>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                  className='flex gap-8'
                >
                  <FontAwesomeIcon icon={faClock} size='xl' />
                  &nbsp;
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className='py-4 mb-10'>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                  className='flex gap-8'
                >
                  <FontAwesomeIcon icon={faUser} size='xl' />
                  &nbsp;{student?.code}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Three Tabs */}
        <div>
          <div className='flex flex-col gap-10'>
            <div className='justify-center grid grid-cols-4'>
              <div>
                <Button
                  className={
                    activeTab === 1
                      ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center  duration-500"
                      : "w-52 text-center"
                  }
                  color='primary'
                  variant='bordered'
                  onClick={() => handleTabClick(1)}
                >
                  Placement Test (Pending)
                </Button>
                &nbsp;
                {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
              </div>
              <div>
                <Button
                  className={
                    activeTab === 2
                      ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center  duration-500"
                      : "text-center w-52"
                  }
                  color='primary'
                  variant='bordered'
                  // style={{ fontWeight: "400px", fontSize: "16px" }}
                  onClick={() => handleTabClick(2)}
                >
                  Placement Test (Completed)
                </Button>{" "}
                &nbsp;
                {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
              </div>
              <div>
                <Button
                  className={
                    activeTab === 3
                      ? "  bg-blue-200 py-3 border-indigo-500/75 w-52 text-center duration-500"
                      : "w-52 text-center"
                  }
                  color='primary'
                  variant='bordered'
                  onClick={() => handleTabClick(3)}
                >
                  My Course
                </Button>{" "}
                {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
              </div>
            </div>
            {myCourseList[0] || enrollment ? (
              <>
                {activeTab === 1 && (
                  <div className=''>
                    {/* My Course at Home Header */}

                    <>
                      <div className='flex flex-col gap-4'>
                        <h1 style={{ fontSize: "40px", fontWeight: "600" }}>
                          My Courses
                        </h1>
                        <div className='flex flex-row gap-4'>
                          {myCourseList.map((item, index) => (

                            <div key={item._id}>
                              <div
                                className={
                                  placeactiveTab === index
                                    ? "  bg-blue-100 py-3  w-52 text-center  duration-500 border-b-2 border-indigo-500"
                                    : "w-52 bg-blue-100 py-3 text-center"
                                }

                                onClick={() => handlePlaceTabClick(index, item._id, item.course)}
                              >
                                {item.course?.title}
                              </div>
                            </div>

                          ))}
                        </div>
                        <div>
                          {entranceTestResDataCheck.length !== filterSubList[0]?.course?.subjects?.length ? (
                            filterSubList && (
                              <div className='grid grid-cols-2 gap-20 rounded-md pt-16 w-full'>
                                {filterSubList[0]?.course?.subjects.map((e, ind) => (
                                  <div
                                    className='flex gap-1 bg-[#e1ddec] rounded-[12px]'
                                    onClick={() => handleSubjectDetail(e, enrollId)}
                                    key={e._id}
                                  >

                                    <div>
                                      <Image
                                        src={getFile({ payload: e.image })}

                                        className='w-[350px] h-[300px] '
                                      />
                                    </div>

                                    <div className='flex flex-col gap-5 '>
                                      <div className='flex flex-col gap-10 p-7'>
                                        <div className='flex flex-col gap-4'>
                                          <h1
                                            style={{
                                              fontSize: "20px",
                                              fontWeight: "600",
                                            }}
                                          >
                                            {e.title}
                                          </h1>
                                          <div>
                                            Placement test duration:{" "}
                                            <span className='font-semibold'> 1hr 30 mins</span>
                                          </div>
                                          <div>
                                            Placement test version:{" "}
                                            <span className='font-semibold'> 1.1.1</span>
                                          </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                          <div
                                            style={{
                                              fontSize: "16px",
                                              fontWeight: "500",
                                              color: "#05F",
                                              width: "120px",
                                              height: "19px",
                                            }}
                                            className='ml-24'
                                          >

                                          </div>
                                          <div className='flex gap-5 justify-end'>
                                            <div className='flex gap-5 justify-end hover:-translate-y-1  hover:scale-110 duration-500'>
                                              <Button color='default' onPress={onOpen} variant='solid'>
                                                Cancel
                                              </Button>
                                            </div>

                                            <div className='flex gap-5 justify-end hover:-translate-y-1  hover:scale-110 duration-500'>

                                              {!(entranceTestResDataCheck.filter(el => el.entranceTest === e?.entranceTests[0]?._id)[0]?.entranceTest === e?.entranceTests[0]?._id) ? (

                                                <Button color='primary' onClick={() => handleEntrance(e)} variant='solid'>
                                                  Take Test

                                                </Button>
                                              ) : (
                                                <Button className='bg-primary-300 text-white' variant='solid'>
                                                  Take Test

                                                </Button>
                                              )}

                                            </div>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          ) : (
                            <div className='shadow-lg p-20 flex flex-col gap-5 w-[900px]' style={{ backgroundImage: showGif && `url(${Success})`, backgroundRepeat: 'no-repeat', }}>
                              <span className='text-[20px] font-medium'>You can Enroll Now!</span>
                              <div className='flex justify-end'>
                                <Button className='w-[30px]' onClick={() => setActiveTab(2)}>Go</Button>

                              </div>

                            </div>
                          )}

                        </div>
                      </div>

                    </>



                  </div>
                )
                }
                {
                  activeTab === 2 && (
                    <>
                      {entranceTestResDataCheck.length !== filterSubList[0]?.course?.subjects?.length ? (
                        <div>You cann't Enroll because you must answer for placement test.</div>
                      ) : (
                        <>
                          <div className='flex rounded-md'>

                            <div>

                              <Image
                                src={getFile({ payload: filterSubList[0]?.course?.image })}
                                style={{
                                  width: "325px",
                                  height: "243px",
                                }}
                              />
                            </div>

                            <div className='flex flex-col gap-5 p-14 '>
                              <h1 className='text-xl font-semibold'>
                                {filterSubList[0]?.course?.title}
                              </h1>
                              <div>
                                Completed date :{" "}
                                <span className='font-semibold'>7 Dec 2023 at 2:00 PM</span>
                              </div>
                              <div>
                                You have :{" "}
                                <span className='font-semibold'>70 / 100 marks</span>
                              </div>
                              <div>
                                You got :{" "}
                                <span className='font-semibold'>IELTS Advance Level</span>
                              </div>
                              {myCourseList[0]?.paymentImage ? (
                                <div className='flex gap-5 justify-end'>
                                  <Button className='bg-gray-300 cursor-not-allowed' variant='solid'>
                                    Enroll Now!
                                  </Button>
                                </div>
                              ) : (
                                <div className='flex gap-5 justify-end'>
                                  <Button color='primary' onPress={onOpen} variant='solid'>
                                    Enroll Now!
                                  </Button>
                                </div>
                              )}



                            </div>
                          </div>

                          <Modal
                            backdrop="opaque"
                            isOpen={isOpen}
                            className='p-4'
                            size='3xl'
                            onOpenChange={onOpenChange}
                            motionProps={{
                              variants: {
                                enter: {
                                  y: 0,
                                  opacity: 1,
                                  transition: {
                                    duration: 0.3,
                                    ease: "easeOut",
                                  },
                                },
                                exit: {
                                  y: -20,
                                  opacity: 0,
                                  transition: {
                                    duration: 0.2,
                                    ease: "easeIn",
                                  },
                                },
                              }
                            }}
                          >
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <div className="flex flex-col gap-1 pl-6 "><span className='text-[30px]'>Payment Form</span><span className='text-[16px] text-gray-400'>Complete the following form and our staff will contact you.</span></div>

                                  <ModalBody>
                                    <form className='flex flex-col gap-4 pt-3'>

                                      <div>
                                        <label>Student Name</label>
                                        <Input type='text' variant={variant} value={student?.name} />
                                      </div>
                                      <div>
                                        <label>Phone Number</label>
                                        <Input type='text' variant={variant} value={student?.phone} />
                                      </div>
                                      <div>
                                        <label>Course</label>
                                        <Input type='text' value={myCourseList[0].course?.title} variant={variant} />
                                      </div>

                                      <div>
                                        <label>Transaction Number</label>
                                        <Input type='number' variant={variant} onChange={(e) => setTransactionNo(e.target.value)} />
                                      </div>
                                      <div>  <Input type='file' onChange={handleImage} className={showError ? 'border-1 border-red-400 rounded-xl' : ''} label="" variant={variant} /></div>



                                    </form>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                      Close
                                    </Button>
                                    {image ? (
                                      <Button color="primary" onClick={handlePayment}>
                                        Confirm
                                      </Button>
                                    ) : (
                                      <Button color="primary" onClick={handleError}>
                                        Confirm
                                      </Button>
                                    )}

                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                          {audioFile && (
                            <div>
                              <p>Selected Audio: {audioFile.name}</p>
                              {/* You can also add an audio player to preview the selected audio file */}
                              <audio controls>
                                <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                          <button onClick={handleDownload}>Download Audio</button>
                        </>
                      )}

                    </>


                  )
                }
                {
                  activeTab === 3 && (
                    <div className='grid grid-cols-2 '>
                      {
                        enrollment.map((item) => (
                          <div className='flex rounded-md'>
                            <div>
                              <Image
                                src={getFile({ payload: item?.course?.image })}
                                style={{
                                  width: "325px",
                                  height: "243px",
                                }}
                              />

                            </div>

                            <div className='flex flex-col gap-5 p-14 '>
                              <h1 className='text-xl font-semibold'>
                                {item?.course?.title}
                              </h1>
                              <div>
                                Total Lessons: <span className='font-semibold'>35</span>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>


                  )
                }
              </>

            ) :
              (<div className='flex flex-col gap-10 items-center pt-[40px]'>
                <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
                <span className='text-[20px] font-semibold'>
                  Please wait ... !
                </span>
              </div>)
            }

          </div >
        </div >
      </Fade >
    </div >
  );
}
