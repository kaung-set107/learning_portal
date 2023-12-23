import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import SubjectInputForm from "../../components/Subject/subjectInput";
import { Link } from "react-router-dom";
import Footer from "../../components/Navbar/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default function PositionRegsiter() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='py-3 flex-grow'>
        <div className='body  py-1'>
          <Card className='rounded-sm shadow-md py-3 min-h-[890px]'>
            <CardHeader className='justify-between'>
              <div className='rounded-none px-4 py-0 text-left'>
                <Link to='/subject' className='mr-5'>
                  <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
              </div>
              <div className='font-semibold text-3xl'>Subject Register</div>
              <div></div>
            </CardHeader>

            <CardBody>
              <SubjectInputForm />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
