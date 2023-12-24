import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import DepartmentTable from "../../components/Student/registerList";
import Footer from "../../components/Navbar/footer";

export default function Registration() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className=' flex-grow'>
        <div className=''>
          <Card className='rounded-md shadow-md py-3 min-h-[700px]'>
            <CardHeader className='flex'>
              <div className='font-semibold font-nunito text-2xl'>
                Registration List
              </div>
            </CardHeader>
            <Divider></Divider>
            <CardBody>
              <DepartmentTable />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
