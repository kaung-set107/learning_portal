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
import Nav from "../../components/Navbar/index";
export default function Attendance() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow '>
        <div className='body '>
          <Card
            className='rounded-sm shadow-md py-3 min-h-[600px] '
            // style={{ overflowY: "scroll" }}
          >
            <div className=''>
              <div className='flex justify-between'>
                <div className='font-semibold font-nunito text-2xl mt-10 px-2'>
                  Course List
                </div>
                <div>
                  <Nav />
                </div>
              </div>
              <Divider></Divider>
              <CardBody>
                <div className='overflow-y-auto'>
                  <AttendanceTable></AttendanceTable>
                </div>
              </CardBody>
              <Divider></Divider>
              <Footer />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
