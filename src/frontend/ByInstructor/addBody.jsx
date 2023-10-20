import { Card, CardBody, Button, CardHeader } from "@nextui-org/react";
// import { Link } from 'react-router-dom';

import Table from "./tablelist";
import AssignTable from "./assignTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function AddBody() {
  return (
    <div>
      {/* body */}
      <div>
        <>
          <Card className="mx-8">
            <CardHeader>
              <h2 className="font-semibold text-xl">Learning Material</h2>
            </CardHeader>
            <CardBody className="flex-grow">
              <div>
                <p className="text-left">Hello</p>
                <div className="flex gap-2 grid-cols-2 justify-end">
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-8"
                    size="sm">
                    <Link to="/lm" className="lg:text-md md:text-sm sm:text-sm">
                      Add
                    </Link>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  {/* <Button color="primary" variant="light" className="mt-5">
                    <span className="lg:text-lg md:text-md sm:text-sm">
                      Show List
                      
                    </span>
                  
                  </Button> */}
                </div>
              </div>
            </CardBody>
            <Table />
          </Card>
          <br />
        </>

        <>
          <Card className="mx-8">
            <CardHeader>
              <h2 className="font-semibold text-xl">Assignment</h2>
            </CardHeader>
            <CardBody className="flex-grow">
              <div>
                <p className="text-left">Hello</p>
                <div className="flex gap-2 grid-cols-2 justify-end">
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-8"
                    size="sm">
                    <Link
                      to="/assign"
                      className="lg:text-md md:text-sm sm:text-sm">
                      Add
                    </Link>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  {/* <Button color="primary" variant="light" className="mt-5">
                    <span className="lg:text-lg md:text-md sm:text-sm">
                      Show List
                      
                    </span>
                  
                  </Button> */}
                </div>
              </div>
            </CardBody>
            <AssignTable />
          </Card>
          <br />
        </>
        <>
          <Card className="mx-8">
            <CardHeader>
              <h2 className="font-semibold text-xl">Exam</h2>
            </CardHeader>
            <CardBody className="flex-grow">
              <div>
                <p className="text-left">Hello Exam</p>
                <div className="flex gap-2 grid-cols-2 justify-end">
                  <Button
                    color="primary"
                    variant="flat"
                    className="mt-8"
                    size="sm">
                    <Link
                      to="/exam"
                      className="lg:text-md md:text-sm sm:text-sm">
                      Add
                    </Link>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  {/* <Button color="primary" variant="light" className="mt-5">
                    <span className="lg:text-lg md:text-md sm:text-sm">
                      Show List
                      
                    </span>
                  
                  </Button> */}
                </div>
              </div>
            </CardBody>
            <Table />
          </Card>
          <br />
        </>
      </div>
    </div>
  );
}
