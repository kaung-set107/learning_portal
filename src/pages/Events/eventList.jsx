import Sidebar from "../../components/Sidebar";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import EventList from "../../components/Events/eventList";
import Nav from "../../components/Navbar/index";
import Footer from "../../components/Navbar/footer";
export default function Event() {
    return (
        <div className='flex'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='flex-grow'>
                <div className='body'>
                    <Card className='rounded-sm shadow-md py-3 min-h-[700px]'>
                        <div className='flex justify-items-center'>
                            <div className=' font-nunito font-semibold text-[16px] lg:text-[18px] 2xl:text-[20px] mt-10 px-2'>
                                Event List
                            </div>
                            <div>
                                <Nav />
                            </div>
                        </div>
                        <Divider></Divider>
                        <CardBody className='p-10'>
                            <EventList />
                        </CardBody>
                        <Divider></Divider>
                        <Footer />
                    </Card>
                </div>
            </div>
        </div>
    );
}
