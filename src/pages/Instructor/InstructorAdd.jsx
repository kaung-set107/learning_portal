import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Footer from "../../components/Navbar/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import {Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Input from "../../components/Instructor/instructorInput";
export default function InstructorAdd() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-md'>
            <CardHeader className='justify-between'>
              <div className='rounded-none px-4 py-0 text-left'>
                <Link to='/instru' className='mr-5'>
                  <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
              </div>
              <div className='font-semibold text-2xl'>Instructor Register</div>
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
