import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import SubjectInputForm from "../../components/SubjectSale/SubjectInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function PositionRegsiter() {    
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3 flex-grow">

                <div className="body  py-1">
                    <Card className="rounded-sm shadow-md py-3 min-h-[890px]">
                        <CardHeader className="justify-between">
                        <div
               
                className="rounded-none px-4 py-0 text-left">
                <Link to="/subject-sale" className='mr-5'><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" /></Link>
              </div>
                            <div className='font-semibold text-2xl'>Subject Sale Register</div>
                            <div></div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                            <SubjectInputForm />
                        </CardBody>
                        <Divider></Divider>
                        <CardFooter>
                            Copyright © 2023-2024 <b className='text-cyan-600'>K-win Technology</b> .All rights reserved.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div >
    )
}