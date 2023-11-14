import { Card, CardBody, Button, CardHeader } from "@nextui-org/react";
import { Link,useLocation} from 'react-router-dom';
// import {useEffect,useState} from 'react'
import Table from "./Table/learningTable";
import AssignTable from "./Table/assignTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect,useState } from "react";
import apiInstance from "../../util/api";
export default function AddBody() {
const location=useLocation()
const {state}=useLocation()
const [list,setList]=useState([])
// console.log(useLocation().state.rol,'lllll')

     const Val=location.state ? location.state.title :'English'
  //    const [dataValue,setDataValue]=useState('English')
  //      useEffect(() => {
  //   if(location.pathname === '/instructor'){
  //     setDataValue(Val)
  //   }
  // },[])


  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`subjects`).then((res) => {
        console.log(res.data.data.filter(el=>el._id === state.val), "sub");
        setList(res.data.data.filter(el=>el._id === state.val));
      });
    };

    getAssign();
  }, [state.val]);
  return (
    <div>
      {/* body */}
      <div>
        <>
          <Card className="mx-8">
            <CardHeader>
             
            </CardHeader>
            <CardBody className="flex-grow">
       <h2 className="font-semibold text-xl px-6">{list[0]?.title} Learning Material</h2>
                <div className="flex gap-2 grid-cols-2 justify-end">
             
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
           <h2 className="font-semibold text-xl  px-6">{list[0]?.title} Assignment</h2>
                <div className="flex gap-2 grid-cols-2 justify-end">
             
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
            
            </CardHeader>
            <CardBody className="flex-grow">
              <h2 className="font-semibold text-xl px-6">{Val} Exam</h2>
                <div className="flex gap-2 grid-cols-2 justify-end">
            
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
