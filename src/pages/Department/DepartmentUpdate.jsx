import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import DepartmentUpdateInput from "../../components/Department/DepartmentUpdateInput";

export default function DepartmentUpdate() {
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className=" flex-grow">
                <div className="">
                    <Card className="rounded-md shadow-md py-3 min-h-[890px]">
                        <CardHeader className="flex justify-center">
                            <div className="font-semibold font-nunito">
                                Department List
                            </div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody >
                            <DepartmentUpdateInput></DepartmentUpdateInput>
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