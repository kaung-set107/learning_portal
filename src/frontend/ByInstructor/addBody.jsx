import {
  Card,
  CardBody,
Button,
  CardHeader,

} from "@nextui-org/react";
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Table from './tablelist'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
export default function AddBody() {
  const List = [
    {
      title: "Learning Material",
      link: "/lm",
      text: "Step 1 — Building a Login Page. Create a login page for our application at this stage. Installing React Router and designing components to represent a comprehensive application are the first steps . The login page will then be rendered on any route, allowing our users to log in without being transferred to a new page.",
    },
    {
      title: "Assignment",
      link: "/assign",
      text: "Step 1 — Building a Login Page. Create a login page for our application at this stage. Installing React Router and designing components to represent a comprehensive application are the first steps . The login page will then be rendered on any route, allowing our users to log in without being transferred to a new page.",
    },
    {
      title: "Exam",
      link: "/exam",
      text: "Step 1 — Building a Login Page. Create a login page for our application at this stage. Installing React Router and designing components to represent a comprehensive application are the first steps . The login page will then be rendered on any route, allowing our users to log in without being transferred to a new page.",
    },
  ];
  return (
    <div>
      {/* body */}
      <div>
        {List.map((i) => (
          <>
            <Card className="mx-8">
              <CardHeader>
                <h2 className="font-semibold text-xl">{i.title}</h2>
              </CardHeader>
              <CardBody className="flex-grow">
                <div>
                  <p className='text-left'>{i.text}</p>
                  <div className='flex gap-2 grid-cols-2 justify-end'>
  <Button color="primary" variant="flat" className="mt-8" size='sm'>
                    <Link to={i.link} className="lg:text-md md:text-sm sm:text-sm">
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
           <Table/>
            </Card>
            <br />
          </>
        ))}
      
      </div>
    </div>
  );
}
