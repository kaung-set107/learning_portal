import { Button, Input, RadioGroup, Radio } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFile } from '../../util/index';
import { AnchorIcon } from '../../assets/Icons/AnchorIcon'
import {Link} from '@nextui-org/react'
export default function PositionInputForm() {
  const variant = "faded";

  const Id =useLocation().pathname.split('/')[2]
  const [instructorList, setInstructorList] = useState([]);
  const [subjectsList, setSubjectsList] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [fee, setFee] = useState("");
  const [duration, setDuration] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [instructor, setInstructor] = useState("");
  const [studentAllow, setStudentAllow] = useState("");
  const [currentStudent, setCurrentStudent] = useState("");
  const [inAllow, setInAllow] = useState("");
  const [inTime, setInTime] = useState("");
  const [inPercent, setInPercent] = useState("");
  const [profileAnchor,setProfileAnchor]=useState('')
  const [subId,setSubId]=useState('')
  const [inId,setInId]=useState('')

  const {
    handleSubmit,
  } = useForm();

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    // formData.append("subject", subject);
    formData.append("fee", fee);
    formData.append("description", desc);
    formData.append("image", image);
    // formData.append("instructor", instructor);
    formData.append("duration", duration);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("noOfStudentAllow", studentAllow);
    formData.append("installmentAllow", inAllow);
    formData.append("noOfEnrolledStudent", currentStudent);
    formData.append("installmentTime", inTime);
    formData.append("installmentPercent", inPercent);

    if(subId){
       formData.append("subject", subId);
    }else{
           formData.append("subject", subject);
    }

    if(inId){
   formData.append("instructor", inId);
    }else{
           formData.append("instructor", instructor);
    }
    apiInstance
      .put(`subject-sales/${Id}`, formData, {
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
    const getInstructorList = async () => {
      await apiInstance
        .get("instructors")
        .then((res) => setInstructorList(res.data.data));
    };
    const getSubjectList = async () => {
      await apiInstance
        .get("subjects")
        .then((res) => setSubjectsList(res.data.data));
    };
       const getSubjectSaleList = async () => {
      await apiInstance
        .get(`subject-sales/${Id}`)
        .then((res) => 
        {
// setSubjectsList(res.data.data)
console.log(res.data.data,'res')
const List=res.data.data
setTitle(List?.title)
setDesc(List?.description)
setDuration(List?.duration)
setFee(List?.fee)
setFromDate(List?.fromDate?.split('T')[0])
setToDate(List?.toDate?.split('T')[0])
setSubject(List?.subject?.title)
setInstructor(List?.instructor?.name)
setSubId(List?.subject?._id)
setInId(List?.instructor?._id)
setStudentAllow(List?.noOfStudentAllow)
setCurrentStudent(List?.noOfEnrolledStudent)
setInAllow(List?.installmentAllow)
setInTime(List?.installmentTime)
setInPercent(List?.installmentPercent)

             setProfileAnchor(
            res.data.data.image
              ? getFile({payload: res.data.data.image})
              : ''
          )
        
        }
        
        
        );
    };
    getSubjectSaleList()
    getInstructorList();
    getSubjectList();
  }, []);

  return (
    <div className="gap-4">
      <form onSubmit={handleSubmit(create)}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="text"
            label="Title"
            placeholder="Title"
            variant={variant}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            labelPlacement="outside"
          />
          <Input
            type="text"
            label="Description"
            placeholder="Description"
            variant={variant}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            labelPlacement="outside"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
            <label
              className=''>
              Subject
            </label>
            <select
             
                onChange={(e) => {setSubject(e.target.value)
                setSubId(e.target.value)}}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
              <option hidden value={subId}>{subject}</option>
              {subjectsList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
              {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}
            </select>
          </div>
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
            <label
              className=''>
              Instructor
            </label>
            <select
              
                onChange= {(e) => {setInstructor(e.target.value)
                setInId(e.target.value)}
              }
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
              <option hidden value={inId}>{instructor}</option>
              {instructorList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
              {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}
            </select>
          </div>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="text"
            label="Student Allowed"
            placeholder="..."
            variant={variant}
            value={studentAllow}
         
            labelPlacement="outside"
          
              onChange={(e) => setStudentAllow(e.target.value)}
          />
          <Input
            type="text"
            label="Current Student"
            placeholder="..."
            value={currentStudent}
           
            variant={variant}
            labelPlacement="outside"
          
              onChange={(e) => setCurrentStudent(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-8">
            <label>Installment Allowed</label>
            <RadioGroup
            
              value={inAllow ? 'yes' : 'no'}
              orientation="horizontal"
        
                onChange={(e) => setInAllow(e.target.value)}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroup>
          </div>
          <Input
            type="number"
            label="Installment Times"
            placeholder="1 or 2 ?"
            value={inTime}
            variant={variant}
           
            labelPlacement="outside"
         
              onChange={(e) => setInTime(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="number"
            label="Installment %"
            placeholder="1% or 2%"
            value={inPercent}
           
            variant={variant}
            labelPlacement="outside"
        
              onChange={(e) => setInPercent(e.target.value)}
          />
          <Input
            type="Number"
            label="Price"
            value={fee}
            placeholder="$.."
            
            variant={variant}
            labelPlacement="outside"
         
              onChange={(e) => setFee(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="file"
            label="Photo"
            placeholder="$.."
            variant={variant}
            labelPlacement="outside"
            onChange={handleImage}
              endContent={
            profileAnchor ? (
              <Link
                isExternal
                showAnchorIcon
                href={profileAnchor}
                anchorIcon={<AnchorIcon/>}
              ></Link>
            ) : (
              ''
            )
          }
          />
          <Input
            type="text"
            value={duration}
            label="Duration"
            placeholder="Duration"
            variant={variant}
            onChange={(e) => setDuration(e.target.value)}
            labelPlacement="outside"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="date"
            label="Start Date"
            placeholder="Date"
            value={fromDate}
            variant={variant}
            labelPlacement="outside"
            onChange={(e) => setFromDate(e.target.value)}
          />
          <Input
            type="date"
            label="End Date"
            value={toDate}
            placeholder="Date"
            variant={variant}
            onChange={(e) => setToDate(e.target.value)}
            labelPlacement="outside"
          />
        </div>

        <div className="flex justify-center gap-10 py-4">
          <Button color="danger">
            <Link to="/position">Cancel</Link>
          </Button>
          <Button color="primary" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
