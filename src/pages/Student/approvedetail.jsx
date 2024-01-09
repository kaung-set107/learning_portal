import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import StickyBox from "react-sticky-box";
import Sidebar from "../../components/Sidebar";
import ApproveDetail from "../../components/Student/approvedetail";
import Footer from "../../components/Navbar/footer";
import Nav from "../../components/Navbar/index";
export default function DepartmentUpdate() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className=' flex-grow'>
        <div className=''>
          <Card className='rounded-md shadow-md py-3 min-h-[600px]'>
            <div className='flex justify-between'>
              <div className='font-semibold text-2xl font-nunito mt-10 px-2'>
                Student Profile
              </div>
              <div>
                <Nav />
              </div>
            </div>
            <Divider></Divider>
            <CardBody>
              <ApproveDetail />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
