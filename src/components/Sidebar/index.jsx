// import { Accordion} from '@nextui-org/react'
import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const { arr } = props;
  console.log(arr, "arr");
  const [isInc, setInc] = useState(false);
  const [isCou, setCou] = useState(false);

  // const itemClasses = {
  //   base: ' px-2 w-full',
  //   title: 'font-normal text-medium text-left',
  //   trigger: 'data-[hover=true]:bg-default-100 round',
  //   indicator: 'text-medium px-1 py-1',
  //   content: 'text-small px-2 text-left'
  // }
  return (
    <>
      <div className='sidebar w-full px-1'>
        <div className='nav-bar flex-grow'>
          <Card className='w-[270px] max-h rounded-sm '>
            <CardBody className='px-5 py-1 m-0 h-[680px] text-md'>
              <Accordion>
                <AccordionItem
                  key='1'
                  aria-label='Accordion 1'
                  title='Dashboard'
                  startContent={<FontAwesomeIcon icon={faDesktop} size='xl' />}
                >
                  <Divider></Divider>
                  <Link to='/instru'>
                    <div
                      onClick={() => setInc(true)}
                      className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                    >
                      {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Something</span>
                    </div>
                  </Link>
                </AccordionItem>
              </Accordion>
              <Divider></Divider>
              <Accordion>
                <AccordionItem
                  key='1'
                  aria-label='Accordion 1'
                  title='Student'
                  className='cil-line-spacing'
                  startContent={
                    <FontAwesomeIcon icon={faUserGraduate} size='xl' />
                  }
                >
                  <Divider></Divider>
                  <Link to='/register-list'>
                    <div
                      onClick={() => setInc(true)}
                      className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                    >
                      {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>
                        Registration List
                      </span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/instru'>
                    <div
                      onClick={() => setInc(true)}
                      className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                    >
                      {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Enrollment List</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/email-recovery'>
                    <div
                      onClick={() => setInc(true)}
                      className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                    >
                      {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Email Recovery</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/placement'>
                    <div
                      onClick={() => setInc(true)}
                      className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                    >
                      {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Placement Test</span>
                    </div>
                  </Link>
                </AccordionItem>
              </Accordion>
              <Divider></Divider>
              <Accordion>
                <AccordionItem
                  key='1'
                  aria-label='Accordion 1'
                  title='Teacher'
                  startContent={
                    <FontAwesomeIcon icon={faUserGroup} size='xl' />
                  }
                >
                  <Divider></Divider>
                  <Link to='/instru'>
                    <div
                      onClick={() => setInc(true)}
                      className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                    >
                      {/* <FontAwesomeIcon icon={faCircleQuestion} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Instructor</span>
                    </div>
                  </Link>
                </AccordionItem>
              </Accordion>
              <Divider></Divider>
              <Accordion>
                <AccordionItem
                  key='1'
                  aria-label='Accordion 1'
                  title='Master'
                  startContent={<FontAwesomeIcon icon={faUserGear} size='xl' />}
                >
                  <Divider></Divider>
                  <Link to='/course' onClick={() => setCou(true)}>
                    <div className='hover:bg-blue-100 px-4 py-3 m-auto text-sm'>
                      {/* <FontAwesomeIcon icon={faLaptopFile} size='xl' /> */}
                      &nbsp;
                      <span className='ml-4 font-medium '>Courses</span>
                    </div>
                    <Divider></Divider>
                  </Link>
                  <Link to='/subject'>
                    <div className='hover:bg-blue-100 px-4 py-3 m-auto text-sm'>
                      {/* <FontAwesomeIcon icon={faBook} size='xl' /> */}
                      &nbsp;&nbsp;
                      <span className='ml-4 font-medium'>Subjects</span>
                    </div>
                  </Link>
                </AccordionItem>
              </Accordion>
              <Divider></Divider>
              {/* <Link to='/instru'>
                <div
                  onClick={() => setInc(true)}
                  className='hover:bg-blue-100 px-4 py-3 m-auto text-sm '
                >
                  <FontAwesomeIcon icon={faUsers} size='xl' />
                  &nbsp;&nbsp;
                  <span className='ml-3 font-medium'>Instructor</span>
                </div>
              </Link>
              <Divider></Divider> */}

              {/* <Link to='/subject-sale'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faWallet} size='xl'/>
                      &nbsp;&nbsp;
                      <span className='ml-4 font-medium'>Subjects Sale</span>
                    </div>
                  </Link>
                  <Divider></Divider> */}
              {/* <Link to='/subject-section'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                   <FontAwesomeIcon icon={faSection} size='xl' />
                      &nbsp;&nbsp;
                      <span className='font-medium' style={{ marginLeft:'1em' }}>Subjects Section</span>
                    </div>
                  </Link>
                  <Divider></Divider> */}
              {/* <Link to='/department'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faBuildingUser} size='xl' />
                      &nbsp;&nbsp;
                      <span className='ml-2 font-medium'>Department</span>
                    </div>
                  </Link>

                  <Divider></Divider>
                  <Link to='/leave'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faCalendarXmark} size='xl' />

                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Leave</span>
                    </div>
                  </Link>

                  <Divider></Divider> */}
              {/* <Link to='/payroll'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faMoneyCheckDollar} size='xl' />

                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Pay Roll</span>
                    </div>
                  </Link>
                         <Divider></Divider>
                   <Link to='/att-detail'>
                    <div className='hover:bg-default-100 px-4 py-2'>
                    <FontAwesomeIcon icon={faHandHoldingDollar} size='xl' />
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Payroll Detail</span>
                    </div>
                  </Link> */}
              {/* </AccordionItem> */}

              {/* </Accordion> */}
            </CardBody>

            <CardFooter>
              {/* <User
                name='Alice'
                description='Product Designer'
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                }}
              /> */}
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
