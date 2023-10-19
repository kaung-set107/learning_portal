import Sidebar from '../../components/Sidebar'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from '@nextui-org/react'
import AttendanceUpdateInput from '../../components/Course/courseUpdate'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'
export default function Attendance () {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-sm shadow-md py-3 min-h-[890px]'>
            <CardHeader className='flex justify-between'>
             <div
               
                className="rounded-none px-4 py-0 text-left">
                <Link to="/course" className='mr-5'><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" /></Link>
              </div>
              <div><label className='font-nunito font-bold'>Course Update</label></div>
              <div></div>
            </CardHeader>
            <CardBody>
              <AttendanceUpdateInput />
            </CardBody>
            <Divider></Divider>
            <CardFooter>
              Copyright © 2023-2024{' '}
              <b className='text-cyan-600'>K-win Technology</b> .All rights
              reserved.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
