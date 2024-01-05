import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import StudentDetail from "../../components/Student/studentDetail";
import Footer from "../../components/Navbar/footer";
export default function DepartmentUpdate() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className=' flex-grow'>
        <div className=''>
          <Card className='rounded-md shadow-md py-3 min-h-[890px]'>
            <CardHeader className='flex text-2xl'>
              <div className='font-semibold font-nunito'>Student Profile</div>
            </CardHeader>
            <Divider></Divider>
            <CardBody>
              <StudentDetail />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
