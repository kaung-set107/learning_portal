// import { Accordion} from '@nextui-org/react'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLaptopFile, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardBody,
  CardFooter,
  Divider,

} from '@nextui-org/react'
import { Link } from 'react-router-dom'



export default function Sidebar(props) {
  const { arr } = props
  console.log(arr, 'arr')
  const [isInc, setInc] = useState(false)
  const [isCou, setCou] = useState(false)


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
          <Card className='w-[250px] max-h rounded-sm'>

            <CardBody className='px-1 py-1 m-0'>
              {/* <Accordion
                isCompact={true}
                selectionMode='multiple'
                variant='splited'
                itemClasses={itemClasses}
                defaultExpandedKeys={['1', '2', '3', '4', '5', '6']}
              > */}
              {/* Employee */}
              {/* <AccordionItem key='1' title='Master'> */}
              <Link to='/instru' >

                <div onClick={() => setInc(true)} className={isInc ? ' bg-red-200 px-4 py-3 m-auto' : 'hover:bg-default-100 px-4 py-3 m-auto'}>
                  <FontAwesomeIcon icon={faUsers} size='xl' />
                  &nbsp;&nbsp;
                  <span className='ml-3 font-medium'>Instructor</span>
                </div>
              </Link>
              <Divider></Divider>
              <Link to='/course' onClick={() => setCou(true)} >

                <div onClick={() => setCou(true)} className={isCou ? ' bg-red-200 px-4 py-3 m-auto' : 'hover:bg-default-100 px-4 py-3 m-auto'}>
                  <FontAwesomeIcon icon={faLaptopFile} size='xl' />

                  &nbsp;
                  <span className='ml-4 font-medium '>Courses</span>
                </div>
                <Divider></Divider>

              </Link>
              <Link to='/subject'>
                <div className='hover:bg-default-100 px-4 py-3'>
                  <FontAwesomeIcon icon={faBook} size='xl' />
                  &nbsp;&nbsp;
                  <span className='ml-5 font-medium'>Subjects</span>
                </div>
              </Link>
              <Divider></Divider>
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
  )
}

Sidebar.propTypes = {
  arr: PropTypes.string,

};

