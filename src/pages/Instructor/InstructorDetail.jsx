import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Navbar/footer";
// import {Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Input from "../../components/Instructor/instructorUpdateInput";
export default function InstructorDetail() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body '>
          <Card className='rounded-md shadow-md'>
            <CardHeader className='justify-between'>
              <div className='rounded-none px-4 py-0 text-left'>
                <Link to='/instru' className='mr-5'>
                  <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
              </div>
              <div className='font-semibold text-2xl'>Instructor Update</div>
              <div></div>
            </CardHeader>
            <CardBody>
              <Input />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
