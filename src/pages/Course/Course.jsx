import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import AttendanceTable from "../../components/Course/courseList";
import Footer from "../../components/Navbar/footer";
export default function Attendance() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-sm shadow-md py-3 min-h-[800px]'>
            <CardHeader className='flex justify-center'>
              <label className='font-semibold font-nunito text-2xl'>
                Course List
              </label>
            </CardHeader>
            <CardBody>
              <AttendanceTable></AttendanceTable>
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
