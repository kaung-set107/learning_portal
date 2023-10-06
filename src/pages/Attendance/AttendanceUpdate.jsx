import Sidebar from '../../components/Sidebar'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from '@nextui-org/react'
import AttendanceUpdateInput from '../../components/Attendance/AttendanceUpdateInput'

export default function Attendance () {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-sm shadow-md py-3 min-h-[890px]'>
            <CardHeader className='flex justify-center'>
              <label className='font-nunito font-bold'>Attendance Update</label>
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
