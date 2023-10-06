import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Payslip from "../../components/PayRoll/payslip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function PaySlip() {

    return (
        <div className='flex'>
            <div className="sidebar  w-full md:w-32 lg:w-48"><Sidebar /></div>
            <div className="flex-grow  w-full md:w-32 lg:w-48">
                <div className="body ml-16">
                    <Card className="rounded-sm shadow-md py-3 min-h-[490px]" >
                     <CardHeader className="justify-between">
              <div
             
                className="rounded-none px-4 py-0 text-left">
                <Link to="/payroll" className='mr-5'><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" /></Link>
              </div>
              <div className="font-semibold"></div>
              <div></div>
            </CardHeader>
                        <CardBody>
                            < Payslip />
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