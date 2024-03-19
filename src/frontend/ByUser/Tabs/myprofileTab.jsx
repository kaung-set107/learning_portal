import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Input } from "@nextui-org/react";
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
export default function MyprofileTab() {
  const variant = 'bordered'
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const StudentId = localStorage.getItem("id");
  console.log(StudentId, "stu id");
  const [student, setStudent] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [img, setImg] = useState("");
  useEffect(() => {
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

            {activeTab === 1 && (
              <div className='flex rounded-md'>
                <div>
                  <Image
                    src={Edu}
                    style={{
                      width: "325px",
                      height: "243px",
                    }}
                  />
                </div>

                <div className='flex flex-col gap-5 p-14 '>
                  <h1 className='text-xl font-semibold'>
                    IELTs (Placement Test)
                  </h1>
                  <div>
                    Placement test duration :{" "}
                    <span className='font-semibold'>1hr 30 mins</span>
                  </div>
                  <div>
                    Registration Date :{" "}
                    <span className='font-semibold'>6 Dec 2023 at 5:00 PM</span>
                  </div>
                  <div className='flex gap-5 justify-end'>
                    <Button variant='flat'>Cancel</Button>
                    <Button color='primary' variant='solid'>
                      Take Test
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 2 && (
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


            )}
            {activeTab === 3 && (
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
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
}
