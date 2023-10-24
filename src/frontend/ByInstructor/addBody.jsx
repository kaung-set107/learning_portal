import { Card, CardBody, Button, CardHeader } from "@nextui-org/react";
import { Link,useLocation} from 'react-router-dom';

import Table from "./Table/learningTable";
import AssignTable from "./Table/assignTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddBody() {
const Val=useLocation().state
  return (
    <div>
      {/* body */}
      <div>
        <>
          <Card className="mx-8">
            <CardHeader>
              <h2 className="font-semibold text-xl">{Val} Learning Material</h2>
            </CardHeader>
            <CardBody className="flex-grow">
      
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
         
            </CardBody>
            <Table />
          </Card>
          <br />
        </>

        <>
          <Card className="mx-8">
            <CardHeader>
              
            </CardHeader>
            <CardBody className="flex-grow">
           <h2 className="font-semibold text-xl  px-6">{Val} Assignment</h2>
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
         
            </CardBody>
            <AssignTable/>
          </Card>
          <br />
        </>
        <>
          <Card className="mx-8">
            <CardHeader>
              <h2 className="font-semibold text-xl">{Val} Exam</h2>
            </CardHeader>
            <CardBody className="flex-grow">
            
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
            
            </CardBody>
            <Table />
          </Card>
          <br />
        </>
      </div>
    </div>
  );
}
