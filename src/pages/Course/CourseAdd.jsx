import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import AttendanceInput from "../../components/Course/courseInput";
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
          <Card className='rounded-sm shadow-md py-3 min-h-[700px]'>
            <div className='flex justify-between'>
              <div className='font-semibold font-nunito text-2xl mt-10 px-2'>
                Course Create
              </div>
              <div>
                <Nav />
              </div>
            </div>
            <Divider></Divider>
            <CardBody className='p-10'>
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
