import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import DepartmentInputForm from "../../components/Department/DepartmentInput";

export default function DepartmentRegister() {
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-3 flex-grow">
                <div className="body  py-1">
                    <Card className="rounded-md shadow-md py-3 ">
                        <CardHeader className="flex justify-center">
                            <div className="font-semibold text-medium">
                                Department Register
                            </div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody >
                            <DepartmentInputForm />
                        </CardBody>
                        <Divider></Divider>
                        <CardFooter>
                            Copyright © 2023-2024 <b className='text-cyan-600'>K-win Technology</b> .All rights reserved.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}