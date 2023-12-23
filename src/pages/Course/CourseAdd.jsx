import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import AttendanceInput from "../../components/Course/courseInput";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Navbar/footer";
export default function Attendance() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-sm shadow-md py-3 min-h-[700px]'>
            <CardHeader className='justify-between'>
              <div className='rounded-none px-4 py-0 text-left'>
                <Link to='/course' className='mr-5'>
                  <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
              </div>
              <div className='flex justify-center'>
                <label className='text-2xl font-semibold'>Course Create</label>
              </div>
              <div></div>
            </CardHeader>
            <CardBody>
              <AttendanceInput />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
