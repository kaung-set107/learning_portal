import { Card, CardHeader, CardBody, CardFooter, Divider, Tooltip } from "@nextui-org/react";
import Sidebar from "../../components/Sidebar";
import { Tree, TreeNode } from 'react-organizational-chart';
import { useEffect, useState } from "react";
import apiInstance from '../../util/api';
import { BsFillBuildingFill } from 'react-icons/bs';

export default function DepartmentChart() {

    const [orgHierarchy, setOrgHierarchy] = useState(null);

    useEffect(() => {
        const getOrgData = async () => {
            await apiInstance.get('departments/org-chart').then((res) => {
                setOrgHierarchy(res.data)
                console.log(res.data,'chart data')
            })
        }
        getOrgData()
        //setOrgHierarchy(orgData);
    }, []);

    const renderTreeNodes = (node) => {
        if (!node) {
            return null;
        }

        const renderedChildren = node.children?.map(childNode => renderTreeNodes(childNode));

        return (
            <TreeNode label={
                <div className="mx-auto max-w-[200px] items-center border rounded-xl border-white backdrop-blur-md ">
                    <Card isBlurred shadow="md" className="max-h-[100px]">
                        <CardBody className="overflow-hidden m-0">
                            <Tooltip placement="bottom" offset={30} content={
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold">Assistant Manager</div>
                                    <div className="text-tiny">{node.assistantManager}</div>
                                    <div className="text-small font-bold">Direct Manager</div>
                                    <div className="text-tiny">{node.directManager}</div>
                                </div>
                            }>
                                <div className="flex flex-row">
                                    <BsFillBuildingFill className="w-[20px] h-10" />
                                    <p className="text-center mx-auto my-auto text-sm font-semibold flex">
                                        {node.label}
                                    </p>
                                </div>

                            </Tooltip>
                        </CardBody>
                    </Card>
                </div>
            }>
                {renderedChildren}
            </TreeNode>
        );
    };


    return (
        <div className='flex'>
            <div className="sidebar"><Sidebar /></div>
            <div className="flex-grow">
                <div className="">
                    <Card className="rounded-md shadow-md py-3 min-h-[860px]">
                        <CardHeader className="flex justify-center">
                            <div className="font-semibold text-medium">
                                Department Chart
                            </div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody className="overflow-scroll scrollbar-hide flex flex-growl">
                            {orgHierarchy && (
                                <Tree
                                    lineWidth={'2px'}
                                    lineColor={'#0070f0'}
                                    lineBorderRadius={'10px'}
                                    label={
                                        <div className="mx-auto max-w-[200px] items-center border rounded-xl border-white backdrop-blur-md ">
                                            <Card isBlurred shadow="md" className="max-h-[100px]">
                                                <CardBody className="overflow-hidden m-0">
                                                    <Tooltip offset={30} placement="bottom" content={
                                                        <div className="px-1 py-2">
                                                            <div className="text-small font-bold">Assistant Manager</div>
                                                            <div className="text-tiny">{orgHierarchy.assistantManager}</div>
                                                            <div className="text-small font-bold">Direct Manager</div>
                                                            <div className="text-tiny">{orgHierarchy.directManager}</div>
                                                        </div>
                                                    }>
                                                        <div className="flex flex-row">
                                                            <BsFillBuildingFill className="w-[20px] h-10" />
                                                            <p className="text-center mx-auto my-auto text-sm font-semibold flex">
                                                                {orgHierarchy.label}
                                                            </p>
                                                        </div>

                                                    </Tooltip>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    }
                                >
                                    {orgHierarchy.children.map(childNode => renderTreeNodes(childNode))}
                                </Tree>
                            )}
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

