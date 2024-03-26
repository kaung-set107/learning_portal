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
export default function MyprofileTab() {
  const variant = 'bordered'
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };


  const navigate = useNavigate()
  const StudentId = localStorage.getItem("id");
  console.log(StudentId, "stu id");
  const [student, setStudent] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [img, setImg] = useState("");
  const [firstDefaultCourseId, setFirstDefaultCourseId] = useState("");
  const [myCourseList, setMyCourseList] = useState([]);
  const [filterId, setFilterId] = useState([]);
  const [placeactiveTab, setPlaceActiveTab] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [batchId, setBatchId] = useState('')
  const [showEnroll, setShowEnroll] = useState(false)
  const [count, setCount] = useState(0)
  const [entranceTestResDataCheck, setEntranceTestResDataCheck] = useState([])
  // const enr_id = myCourseList[0]?._id
  // console.log(enr_id, 'my')
  const [enrollId, setEnrollId] = useState('')
  const filterSubList = filterId.filter(
    (el) => el._id === (courseId ? courseId : firstDefaultCourseId)

  );
  const SubCount = count <= filterSubList[0]?.subjects?.length && count + 1
  if (count <= filterSubList[0]?.subjects?.length) {
    console.log(filterSubList[0]?.subjects, 'fil list for ent')
  }

  const handlePlaceTabClick = (ind, enroll_Id, courseid) => {
    setCourseId(courseid);
    setPlaceActiveTab(ind);
    setEnrollId(enroll_Id)
    // console.log(enroll_Id, 'enr')
  };
  useEffect(() => {

    const Map1 = async () => {
      const list = {
        student: StudentId,
        entranceTest: filterSubList[0]?.subjects.map((i) => (
          i.entranceTests[0]?._id
        ))
      }

      await apiInstance.get('entrance-test-results', list).then((res) => {
        console.log(
          res.data.data,
          "stu map1"
        );
        setEntranceTestResDataCheck(res.data.data)
        if (res.data.data.length === filterSubList[0]?.subjects?.length) {
          setShowEnroll(true)
        }

      });
    }
    Map1()



    const getAssign = async () => {
      await apiInstance.get(`students`).then((res) => {
        console.log(
          res.data.data.filter((el) => el._id === StudentId),
          "stu"
        );
        setStudent(res.data.data.filter((el) => el._id === StudentId)[0]);
        const Img = getFile({
          payload: res.data.data.filter((el) => el._id === StudentId)[0]?.image,
        });
        console.log(Img, "ii");
        setImg(Img);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };
    const getEnrollment = async () => {
      await apiInstance.get(`enrollments`).then((res) => {
        console.log(res.data.data, "first id");
        setBatchId(res.data.data.filter((el) => el.student === StudentId)[0].batch)
        setEnrollId(res.data.data.filter((el) => el.student === StudentId)[0]._id)
        setFirstDefaultCourseId(
          res.data.data.filter((el) => el.student === StudentId)[0].course._id
        );
        setMyCourseList(res.data.data.filter((el) => el.student === StudentId));
        setFilterId(
          res.data.data
            .filter((el) => el.student === StudentId)
            .map((i) => i.course)
        );
        // const count = res.data.data.filter((el) => el.subjects.length);

      });
    };
    const getEntranceTestRes = async () => {

      await apiInstance.get(`entrance-test-results`).then((res) => {
        console.log(res.data.data, "e res");

        // const count = res.data.data.filter((el) => el.subjects.length);

      });
    };
    getEntranceTestRes();
    getEnrollment();
    getAssign();

  }, []);


  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    console.log(file, 'audio')
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
    navigate("/entranceTest-page", { state: { entranceID: e, enrollID: enrollId, batchID: batchId } });
  }
  // const dataToPass = { entranceID: entranceID, enrollID: enrollId, batchID: batchId };

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
            {myCourseList[0] ? (
              <>
                {activeTab === 1 && (
                  <div className=''>
                    {/* My Course at Home Header */}
                    {showEnroll ? (<div>Hi</div>) : (
                      <>
                        <div className='flex flex-col gap-4'>
                          <h1 style={{ fontSize: "40px", fontWeight: "600" }}>
                            My Courses
                          </h1>
                          <div className='flex flex-row gap-4'>
                            {myCourseList.map((item, index) => (
                              <>
                                <div key={item._id}>
                                  <div
                                    className={
                                      placeactiveTab === index
                                        ? "  bg-blue-100 py-3  w-52 text-center  duration-500 border-b-2 border-indigo-500"
                                        : "w-52 bg-blue-100 py-3 text-center"
                                    }

                                    onClick={() => handlePlaceTabClick(index, item._id, item.course._id)}
                                  >
                                    {item.course?.title}
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                          <div>
                            {filterSubList && (
                              <div className='grid grid-cols-2 gap-20 rounded-md pt-16 w-full'>
                                {filterSubList[0]?.subjects.map((e, ind) => (
                                  <div
                                    className='flex gap-1 bg-[#e1ddec] rounded-[12px]'
                                    onClick={() => handleSubjectDetail(e, enrollId)}
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
                                              {(e?.entranceTests[0]?._id) ? (
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
                            )}
                          </div>
                        </div>

                      </>
                    )}

                  </div>
                )
                }
                {
                  activeTab === 2 && (
                    <>
                      <div className='flex rounded-md'>
                        <div>
                          <Image
                            src={EduRes}
                            style={{
                              width: "325px",
                              height: "243px",
                            }}
                          />
                        </div>

                        <div className='flex flex-col gap-5 p-14 '>
                          <h1 className='text-xl font-semibold'>
                            IELTs (Placement Test Result)
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
                          <div className='flex gap-5 justify-end'>
                            <Button color='primary' onPress={onOpen} variant='solid'>
                              Enroll Now!
                            </Button>
                          </div>
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
                                  <div className='flex gap-4'>
                                    <Input type='text' label="First Name" variant={variant} />
                                    <Input type='text' label="Last Name" variant={variant} />
                                  </div>
                                  <div>  <Input type='text' label="Class" variant={variant} /></div>
                                  <div>  <Input type='phone' label="Phone Number" variant={variant} /></div>
                                  <div>  <Input type='number' label="Transaction Number" variant={variant} /></div>
                                  <div>  <Input type='file' accept="audio/*" onChange={handleAudioChange} label="" variant={variant} /></div>
                                </form>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                  Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                  Confirm
                                </Button>
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


                  )
                }
                {
                  activeTab === 3 && (
                    <div className='flex rounded-md'>
                      <div>
                        <Image
                          src={Course}
                          style={{
                            width: "325px",
                            height: "243px",
                          }}
                        />
                      </div>

                      <div className='flex flex-col gap-5 p-14 '>
                        <h1 className='text-xl font-semibold'>
                          IELTs (Advance Level)
                        </h1>
                        <div>
                          Total Lessons: <span className='font-semibold'>35</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              </>

            ) : (
              <div className='flex flex-col gap-10 items-center pt-[40px]'>
                <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />
                <span className='text-[20px] font-semibold'>
                  Please wait ... !
                </span>
              </div>
            )}

          </div >
        </div >
      </Fade >
    </div >
  );
}
