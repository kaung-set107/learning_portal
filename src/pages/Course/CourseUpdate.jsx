import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import AttendanceUpdateInput from "../../components/Course/courseUpdate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Nav from "../../components/Navbar/index";
import Footer from "../../components/Navbar/footer";
export default function Attendance() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-sm shadow-md py-3 min-h-[890px]'>
            <div className='flex justify-between'>
              <div className='font-semibold font-nunito text-2xl mt-10 px-2'>
                Course Update
              </div>
              <div>
                <Nav />
              </div>
            </div>
            <CardBody>
              <AttendanceUpdateInput />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
