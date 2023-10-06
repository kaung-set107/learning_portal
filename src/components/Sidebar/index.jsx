// import { Accordion} from '@nextui-org/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faBuildingUser, faCalendarDays, faCalendarXmark, faHandHoldingDollar, faMoneyCheckDollar, faUsers } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardBody,
  CardFooter,
  Divider,

} from '@nextui-org/react'
import { Link } from 'react-router-dom'



export default function Sidebar () {
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
                  <Link to='/emp'>
                    <div className='hover:bg-default-100 px-4 py-3 m-auto'>
                      <FontAwesomeIcon icon={faUsers} size='xl' />
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Student</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/attendance'>

                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faCalendarDays} size='xl' />

                      &nbsp;&nbsp;
                      <span className='ml-4 font-medium'>Attendance</span>
                    </div>
                  </Link>

                  <Divider></Divider>
                  <Link to='/position'>
                    <div className='hover:bg-default-100 px-4 py-3'>
                      <FontAwesomeIcon icon={faBriefcase} size='xl' />
                      &nbsp;&nbsp;
                      <span className='ml-3 font-medium'>Position</span>
                    </div>
                  </Link>
                  <Divider></Divider>
                  <Link to='/department'>
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

                  <Divider></Divider>
                  <Link to='/payroll'>
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
                  </Link>
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
