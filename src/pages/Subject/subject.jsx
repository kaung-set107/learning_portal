import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import SubjectTable from "../../components/Subject/subjectTable";
import Footer from "../../components/Navbar/footer";
export default function Position() {
  return (
    <div className='flex'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='flex-grow'>
        <div className='body'>
          <Card className='rounded-sm shadow-md py-3 min-h-[890px]'>
            <CardHeader className='flex justify-center'>
              <label className='font-semibold font-nunito text-2xl'>
                Subject List
              </label>
            </CardHeader>
            <CardBody>
              <SubjectTable />
            </CardBody>
            <Divider></Divider>
            <Footer />
          </Card>
        </div>
      </div>
    </div>
  );
}
