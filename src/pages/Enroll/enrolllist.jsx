import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import Enroll from "../../components/Enroll/enrollList";
import Footer from "../../components/Navbar/footer";
import Nav from "../../components/Navbar/index";
export default function Registration() {
  return (
    <div className='flex'>
      <div className='sidebar '>
        <Sidebar />
      </div>
      <div className=' flex-grow'>
        <div className=''>
          <Card className='rounded-md shadow-md py-3 min-h-[700px]'>
            <div className='flex justify-between'>
              <div className='font-semibold font-nunito text-2xl mt-10 px-2'>
                Enrollment Registeration List
              </div>
              <div>
                <Nav />
              </div>
            </div>
            <Divider></Divider>
            <CardBody>
              <Enroll />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
