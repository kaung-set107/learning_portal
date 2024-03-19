import React, { useState, useEffect } from "react";
import apiInstance from "../../util/api";
import { useLocation } from "react-router-dom";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
export default function BatchUpdate() {
    const location = useLocation()
    const batchId = location.pathname.split('/')[2]
    const [title, setTitle] = useState("");
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [studentAllow, setStudentAllow] = useState(0)
    const [enrollStudent, setEnrollStudent] = useState(0)
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState('')
    const [courseId, setCourseId] = useState('')
    const [courseList, setCourseList] = useState([])
    const [courseName, setCourseName] = useState('')
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const getCourses = async () => {
            await apiInstance
                .get(`courses`)
                .then((res) => {
                    setCourseList(res.data.data);
                    // console.log(res.data.data, 'att')

                });
        };
        const getBatch = async () => {
            await apiInstance
                .get('batches/' + batchId,)
                .then((res) => {
                    // setBatchList(res.data.data);
                    setTitle(res.data.data?.name)
                    setStudentAllow(res.data.data?.noOfStudentAllow)
                    setEnrollStudent(res.data.data?.noOfEnrolledStudent)
                    setFrom(res.data.data.fromDate?.split('T')[0])
                    setTo(res.data.data.toDate?.split('T')[0])
                    setDescription(res.data.data?.description)
                    setCourseId(res.data.data?.course._id)
                    setCourseName(res.data.data?.course.title)
                    setIsSelected(res.data.data?.active)
                    console.log(res.data.data, 'att')

                });
        };

        getBatch();
        getCourses();
    }, [])
    const create = () => {
        const data = {

            name: title,
            fromDate: from,
            toDate: to,
            course: course ? course : courseId,
            noOfStudentAllow: studentAllow,
            noOfEnrolledStudent: enrollStudent,
            description: description,
            active: isSelected
        };
        apiInstance
            .put(`batches/${batchId}`, data)
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Batch Update Successful",
                    text: "Nice!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Something Wrong!",
                    text: "Try again",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                });
            });
    };

    return (
        <div className='gap-3 '>
            <div className='rounded-none py-3 text-left'>
                <Link to='/batch' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>

            <div className='flex flex-col mx-8 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Batch Name</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter your category title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Course</label>
                    <Select
                        size="sm"
                        label={course ? 'Select Course' : courseName}
                        className=''
                        onChange={(e) => setCourse(e.target.value)}
                    >

                        {courseList.map((animal) => (
                            <SelectItem key={animal._id} value={animal._id}>
                                {animal.title}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Student Allow</label>
                    <Input
                        type='number'
                        variant='bordered'
                        placeholder='Enter your category title'
                        value={studentAllow}
                        onChange={(e) => setStudentAllow(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Enroll Student</label>
                    <Input
                        type='number'
                        variant='bordered'
                        placeholder='Enter your category title'
                        value={enrollStudent}
                        onChange={(e) => setEnrollStudent(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>From</label>
                    <Input
                        type='date'
                        variant='bordered'
                        // placeholder='Enter your category title'
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>To</label>
                    <Input
                        type='date'
                        variant='bordered'
                        value={to}
                        // placeholder='Enter your category title'
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
            </div>

            <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Textarea
                        variant='bordered'
                        type='text'
                        label='Description'
                        placeholder='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        labelPlacement='outside'
                    />
                </div>
            </div>
            <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-5'>

                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                    Current Branch ?
                </Checkbox>
            </div>


            <div className='flex justify-center gap-10 py-4'>
                <Button color='danger'>
                    <Link to='/category'>Cancel</Link>
                </Button>
                <Button color='primary' onClick={create}>
                    Register
                </Button>
            </div>
        </div>
    );
}
