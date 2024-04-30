// import { Accordion} from '@nextui-org/react'
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLaptopFile,
  faUsers,
  faDesktop,
  faCircleQuestion,
  faUserGraduate,
  faUserGroup,
  faUserGear,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Accordion,
  AccordionItem,
  Button,
  Image,
} from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MSI from "../../assets/img/MSI.svg";
import { getCurrentUser } from "../../util/Util";
export default function Sidebar(props) {
  const { arr } = props;
  const navigate = useNavigate();
  console.log(arr, "arr");
  const [isInc, setInc] = useState(false);
  const [isCou, setCou] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "See You!",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/");
  };
  const location = useLocation();
  // const itemClasses = {
  //   base: ' px-2 w-full',
  //   title: 'font-normal text-medium text-left',
  //   trigger: 'data-[hover=true]:bg-default-100 round',
  //   indicator: 'text-medium px-1 py-1',
  //   content: 'text-small px-2 text-left'
  // }
  return (
    <>
      <div className="sidebar w-full px-1">
        <div className="nav-bar flex-grow">
          <Card className="w-[270px] rounded-sm ">
            <CardHeader>
              <Image src={MSI} width={200} height={60} />
            </CardHeader>
            <CardBody
              className="px-5 py-1 m-0 min-h-[200px] text-md"
              style={{ height: "800px", overflowY: "scroll" }}
            >
              {getCurrentUser().roles.includes("admin") && (
                <>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Dashboard"
                      startContent={
                        <FontAwesomeIcon icon={faDesktop} size="xl" />
                      }
                    >
                      <Divider></Divider>
                      <Link to="/instru">
                        <div
                          onClick={() => setInc(true)}
                          className="hover:bg-blue-100 px-4 py-3 m-auto text-sm "
                        >
                          {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">Something</span>
                        </div>
                      </Link>
                    </AccordionItem>
                  </Accordion>
                  <Divider></Divider>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Student"
                      className="cil-line-spacing"
                      startContent={
                        <FontAwesomeIcon icon={faUserGraduate} size="xl" />
                      }
                    >
                      <Divider></Divider>
                      <Link to="/register-list">
                        <div
                          onClick={() => setInc(true)}
                          className="hover:bg-blue-100 px-4 py-3 m-auto text-sm "
                        >
                          {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">
                            Registration List
                          </span>
                        </div>
                      </Link>
                      <Divider></Divider>
                      <Link to="/enroll-list">
                        <div
                          onClick={() => setInc(true)}
                          className="hover:bg-blue-100 px-4 py-3 m-auto text-sm "
                        >
                          {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">
                            Enrollment List
                          </span>
                        </div>
                      </Link>
                      <Divider></Divider>
                      <Link to="/email-recovery">
                        <div
                          onClick={() => setInc(true)}
                          className="hover:bg-blue-100 px-4 py-3 m-auto text-sm "
                        >
                          {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">
                            Email Recovery
                          </span>
                        </div>
                      </Link>
                      <Divider></Divider>
                      <Link to="/placement">
                        <div
                          onClick={() => setInc(true)}
                          className="hover:bg-blue-100 px-4 py-3 m-auto text-sm "
                        >
                          {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">
                            Placement Test
                          </span>
                        </div>
                      </Link>
                    </AccordionItem>
                  </Accordion>
                  <Divider></Divider>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Teacher"
                      startContent={
                        <FontAwesomeIcon icon={faUserGroup} size="xl" />
                      }
                    >
                      <Divider></Divider>

                      <Link to="/category">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                          &nbsp;
                          <span className="ml-4 font-medium ">Category</span>
                        </div>
                        <Divider></Divider>
                      </Link>

                      <Link to="/course">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                          &nbsp;
                          <span className="ml-4 font-medium ">Courses</span>
                        </div>
                        <Divider></Divider>
                      </Link>
                      <Link to="/subject">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faBook} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">Subjects</span>
                        </div>
                      </Link>
                      <Divider></Divider>
                      <Link to="/batch">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faBook} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">Batch</span>
                        </div>
                      </Link>
                    </AccordionItem>
                  </Accordion>
                  <Divider></Divider>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Master"
                      startContent={
                        <FontAwesomeIcon icon={faUserGear} size="xl" />
                      }
                    >
                      <Divider></Divider>
                      <Link to="/instru">
                        <div
                          onClick={() => setInc(true)}
                          className="hover:bg-blue-100 px-4 py-3 m-auto text-sm "
                        >
                          {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                          &nbsp;&nbsp;
                          <span className="ml-3 font-medium">Instructor</span>
                        </div>
                      </Link>

                      <Divider></Divider>
                      <Link to="/event">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                          &nbsp;
                          <span className="ml-4 font-medium ">Event</span>
                        </div>
                        <Divider></Divider>
                      </Link>

                      <Link to="/testimonial">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                          &nbsp;
                          <span className="ml-4 font-medium ">Testimonial</span>
                        </div>
                      </Link>
                      <Link to="/banner-list">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                          &nbsp;
                          <span className="ml-4 font-medium ">Banner</span>
                        </div>
                      </Link>
                    </AccordionItem>
                  </Accordion>
                  <Divider></Divider>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="System Setting"
                      startContent={<FontAwesomeIcon icon={faGear} size="xl" />}
                    >
                      <Divider></Divider>
                      <Link to="/some" onClick={() => setCou(true)}>
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                          &nbsp;
                          <span className="ml-4 font-medium ">Something</span>
                        </div>
                        {/* <Divider></Divider> */}
                      </Link>
                    </AccordionItem>
                  </Accordion>
                  <Divider></Divider>
                </>
              )}

              {/* instructor sidebar */}
              {getCurrentUser().roles.includes("instructor") && (
                <>
                  <h3 className="my-3 text-xl font-bold">Instructor</h3>
                  <Accordion>
                    <AccordionItem
                      key="by-instructor"
                      aria-label="by instructor"
                      title="By Instructor"
                      startContent={<FontAwesomeIcon icon={faGear} size="xl" />}
                    >
                      <Divider></Divider>
                      <Link to="/by-instructor/subjects">
                        <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                          &nbsp;
                          <span className="ml-4 font-medium ">Subjects</span>
                        </div>
                      </Link>
                      {/* <Link
                      to="/by-instructor/quizzes"
                    >
                      <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                        &nbsp;
                        <span className="ml-4 font-medium ">Quizzes</span>
                      </div>
                    </Link> */}
                      {/* <Link
                      to="/by-instructor/assignment-results"
                    >
                      <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                        &nbsp;
                        <span className="ml-4 font-medium ">
                          Assignment Results
                        </span>
                      </div>
                    </Link>
                    <Link
                      to="/by-instructor/exam-results"
                    >
                      <div className="hover:bg-blue-100 px-4 py-3 m-auto text-sm">
                        &nbsp;
                        <span className="ml-4 font-medium ">
                          Exam Results
                        </span>
                      </div>
                    </Link> */}
                      {/* <Link to='/by-instructor/learning-materials' onClick={() => setCou(true)}>
                    <div className='hover:bg-blue-100 px-4 py-3 m-auto text-sm'>
                      &nbsp;
                      <span className='ml-4 font-medium '>Learning Materials</span>
                    </div>
                  </Link> */}
                    </AccordionItem>
                  </Accordion>
                </>
              )}

              <Divider></Divider>
            </CardBody>

            <CardFooter>
              <Button
                color="light"
                onClick={logOut}
                className="ml-3 rounded-lg hover:bg-red-600 hover:text-white"
                style={{
                  marginTop: "10px",
                  border: "1px solid",
                  padding: "16px",
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} size="xl" /> &nbsp;
                Log Out
                {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  arr: PropTypes.string,
};
