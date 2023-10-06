import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons'
// import {Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Input from "../../components/Employee/employeeInput";
export default function employeeAdd() {
  return (
    <div className="flex">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <div className="body">
          <Card className="rounded-md">
            <CardHeader className="justify-between">
              <div
               
                className="rounded-none px-4 py-0 text-left">
                <Link to="/emp" className='mr-5'><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" /></Link>
              </div>
              <div className="font-semibold text-2xl">Employee List</div>
              <div></div>
            </CardHeader>
            <CardBody>
              <Input />
            </CardBody>
            <Divider></Divider>
            <CardFooter>
              Copyright © 2023-2024{" "}
              <b className="text-cyan-600">K-win Technology</b> .All rights
              reserved.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
