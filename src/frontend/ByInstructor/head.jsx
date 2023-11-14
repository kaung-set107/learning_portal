
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import sub from './images/sub.jpg'
import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react';
import apiInstance from '../../util/api';
import { getFile } from "../../util/index.js";
export default function App() {
  // const list = [
  //   {
  //     title: "English",
  //     img: sub,
  //     price: "$5.50",
  //   },
  //   {
  //     title: "Korea",
  //     img: sub,
  //     price: "$3.00",
  //   },
  //   {
  //     title: "Japan",
  //     img: sub,
  //     price: "$10.00",
  //   },
  // ];

  const [list,setList]=useState([])

useEffect(()=>{
  const getAssign = async () => {
      await apiInstance
        .get(`subjects`)
        .then((res) => {
          console.log(res.data.data, "sub")
          setList(res.data.data)
  
        });
    };
    getAssign();
},[])

  return (
    <div className=''>
    {/* three card */}
<div className="flex gap-6 grid-cols-4 sm:grid-cols-4 justify-center py-5">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible ">
          <Link to='/instructor' state={{ title:item.title,id:item._id }}>
            <Image
              shadow="sm"
              radius="sm"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[120px] md:h-[150px] sm:h-[240px] "
              src={item.image ? getFile({ payload: item.image }) : ''}
            
            
            />
            </Link>
          </CardBody>
          <CardFooter className="text-small justify-between invisible sm:visible">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>


    </div>
    
  );
}
