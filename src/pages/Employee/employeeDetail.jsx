import Sidebar from "../../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Back from '../../assets/img/ba.svg'

import { Button } from "@nextui-org/react";
// import {Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Input from "../../components/Employee/employeeUpdateInput";
export default function employeeAdd() {
  return (
    <div className="flex">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className=" flex-grow">
        <div className="body ">
          <Card className="rounded-md shadow-md ml-20">
            <CardHeader className="justify-between">
              <Button
                variant="light"
                className="rounded-none px-4 py-0 text-left">
                <Link to="/emp" className='text-cyan-600'><img src={Back} width='20px' height='20px'/></Link>
              </Button>
              <div className="font-semibold">Employee Update & Detail</div>
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
