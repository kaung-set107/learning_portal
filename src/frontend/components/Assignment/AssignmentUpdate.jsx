import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../../util/api.js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link,useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DepartmentInputForm() {
    const Id = useLocation().pathname.split('/')[2]
  const variant = "faded";
    const {

    handleSubmit,
  
  } = useForm();
  const [subjectList,setSubjectList]=useState([])
const [title,setTitle]=useState('')
const [desc,setDesc]=useState('')
const [image,setImage]=useState('')
const [subject,setSubject]=useState('')
const [links,setLinks]=useState('')
const [newLink,setNewLink]=useState([])

const Add=(val)=>{
  console.log(val,'val')
const newData={
  links:val
}
setNewLink([...newLink,newData])
console.log([...newLink,newData],'res')
}
  const handleImage=(e)=>{
    if(e.target.files){
      setImage(e.target.files[0])
    }
  }
const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("description", desc);
    formData.append("question", image);
     formData.append("links", JSON.stringify(newLink));

    apiInstance
      .put("assignments/"+Id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };


  useEffect(() => {
    // const getDepartmentList = async () => {
    //   await apiInstance
    //     .get("departments")
    //     .then((res) => setDepartmentList(res.data.data));
    // };

    const getAssignList = async () => {
      await apiInstance.get("assignments/"+Id).then((res) => {
     console.log(res.data.data,'res')
    });
    };
    getAssignList();
    // getDepartmentList();
  }, []);

  return (
    <div className="gap-3 mx-8">
    <form onSubmit={handleSubmit(create)}>
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
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <label className="text-sm font-semibold">Question</label>
          <Input
            type="file"
            variant={variant}
            onChange={handleImage}
            
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
        <Input
          type="text"
          label="Description"
          placeholder="description"
          variant={variant}
          onChange={(e) => setDesc(e.target.value)}
          labelPlacement="outside"
        />
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Subjects</label>
          <select
            onChange={(e) => setSubject(e.target.value)}
            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden>Choose Subject</option>
{subjectList.map((i)=>(
 <option key={i._id} value={i._id}>{i.title}</option>
))}
           
   
          </select>
        </div>
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Links</label>
          <Input
            type="text"
            variant={variant}
            onChange={(e) => setLinks(e.target.value)}
            endContent={(
              <Button color='light' className='rounded-none text-sky-600' onClick={()=>Add(links)}>Add<FontAwesomeIcon icon={faPlus} /></Button>
            )}
          />
          {newLink.map((i)=>(
            (<div key={i} className='mt-3'>
  <Input
            type="text"
            variant={variant}
            value={i.links}
            onChange={(e) => setLinks(e.target.value)}
           
          />
            </div>)
          ))}
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          {/* <Button color='primary' className='mt-6'>Add</Button> */}
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-8">
        <Button color="danger">
          <Link to="/attendance">Cancel</Link>
        </Button>
        <Button color="primary" type='submit'>
       Update
        </Button>
      </div>
      </form>
    </div>
  );
}
