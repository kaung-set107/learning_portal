// import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

// import Table from '../../components/Table/table'
export default function Dashboard() {

    // window.location.reload()
    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="py-4">

                <div className="body  py-1">
                    <Card className="rounded-md shadow-md py-3 min-w-[1080px]">
                        <CardHeader className="font-semibold">
                            Dashboard
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>
                            {/* <Table/> */}
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