import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { Link,useLocation} from "react-router-dom";
import SubSection from './subjectsectiontable'


export default function SubjectInputForm() {

  const Id=useLocation().pathname.split('/')[2]


  const variant = "faded";
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
const [subject,setSubject]=useState([])
const [subName,setSubName]=useState('')


  const create =async () => {
  const data={
    title:title,
    subject:Id,
    description:desc

  }

   await apiInstance
      .post("subject-sections", data)
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });

     
window.location.reload()
      })
      await apiInstance.get("subjects",data).then(function(){})
      .catch((error) => {
        alert(error);
      });
  };
    useEffect(() => {
        const getCourseList = async () => {
            await apiInstance.get('subjects')
                .then(res => {
                    // setCourseList(res.data.data)
                    const filter=res.data.data.filter(el=>el._id === Id)
                    setSubject(filter)
                    setSubName(filter[0].title)
                console.log(filter,'res')
                })
        }
        getCourseList()
    }, [])
  return (
    <div className="gap-3">

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Title</label>
          <Input
            type="text"
            variant={variant}
            placeholder="Enter your course"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
           
       
      </div>
      
        
           <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
    
            <Input
              type="text"
        
              label="Subject"
              placeholder="... "
              value={subName}
              labelPlacement="outside"
              variant={variant}
            />
        </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
  
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
          type="text"
          label="Description"
          placeholder="description"
          variant={variant}
          onChange={(e) => setDesc(e.target.value)}
          labelPlacement="outside"
        />
        </div>
      </div>


       
      
    
      <div className="flex justify-center gap-10 py-4">
        <Button color="danger">
          <Link to="/subject">Cancel</Link>
        </Button>
          <Button
            
              color="primary"
           
              onClick={create}>
              Register
            </Button>
      </div>
      <SubSection Id={Id} subject={subName}/>
   
    </div>
  );
}
