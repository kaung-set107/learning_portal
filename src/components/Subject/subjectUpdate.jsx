import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFile } from '../../util/index';
import { AnchorIcon } from '../../assets/Icons/AnchorIcon'
import { Link } from '@nextui-org/react'
import { SelectItem, Select } from "@nextui-org/select";
export default function SubjectInputForm() {
  const variant = "bordered";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Id = useLocation().pathname.split('/')[2]
  const [profileAnchor, setProfileAnchor] = useState('')
  const [videoLinks, setVideoLinks] = useState("");
  const [newVideoLink, setNewVideoLink] = useState([]);
  const [instructorList, setInstructorList] = useState([]);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [courseList, setCourseList] = useState([])
  const [course, setCourse] = useState("");
  const [subList, setSubList] = useState([])
  const [courseId, setCourseId] = useState('')
  const [image, setImage] = useState('')
  const [fee, setFee] = useState(0)

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };

  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("course", courseId)
    formData.append("fee", fee);
    formData.append("description", desc);
    formData.append("image", image);

    apiInstance
      .put(`subjects/${Id}`, formData, {
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
    const getCourseList = async () => {
      await apiInstance.get('courses')
        .then(res => {
          setCourseList(res.data.data)
          // console.log(res.data.data,'res')
        })
    }
    const getSubjectList = async () => {
      await apiInstance.get(`subjects/${Id}`)
        .then(res => {
          setSubList(res.data.data)
          setTitle(res.data.data?.title)
          setFee(res.data.data?.fee)
          setDesc(res.data.data?.description)
          setCourse(res.data.data.course?.title)
          setCourseId(res.data.data.course?._id)
          setInstructorList(res.data.data.instructors)

          setProfileAnchor(
            res.data.data.image
              ? getFile({ payload: res.data.data.image })
              : ''
          )

          console.log(res.data.data, 'res')


        })
    }
    getSubjectList()
    getCourseList()
  }, [])
  return (
    <div className="gap-3">
      <form onSubmit={handleSubmit(create)}>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2'>
            <label className='text-sm font-semibold'>Subject Name</label>
            <Input
              type='text'

              placeholder='Title'
              variant={variant}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              labelPlacement='outside'
            />
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2'>
            <label
              className='text-sm font-semibold'

            >
              About Subject
            </label>
            <Input
              type='text'
              placeholder='About this subject'
              value={desc}
              variant={variant}
              {...register("description", {
                required: true,
                onChange: (e) => setDesc(e.target.value),
              })}
            />
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2'>
            <label
              className='text-sm font-semibold'
            >
              Course
            </label>
            <select
              {...register("course", {
                required: true,
                onChange: (e) => setCourse(e.target.value),
              })}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden>{course}</option>
              {courseList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
              {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}
            </select>
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2'>
            <label
              className='text-sm font-semibold'
            >
              Instructor
            </label>
            <Select
              label="Select Instructor"
              // placeholder="Select Instructor"
              selectionMode="multiple"
              className="w-full"

              {...register("instructor", {
                required: true,
                onChange: (e) => setInstructors(e.target.value),
              })}
            >

              {instructorList.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>

          </div>
        </div>


        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Subject Photo</label>
            <Input
              type='file'

              placeholder='$..'
              variant={variant}
              labelPlacement='outside'
              onChange={handleImage}
            />
          </div>

          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Preview Video Links</label>
            <Input
              type='text'
              variant={variant}
              onChange={(e) => setVideoLinks(e.target.value)}
              endContent={
                <Button
                  color='light'
                  className='rounded-none text-sky-600'
                  onClick={() => AddVideo(videoLinks)}
                >
                  Add
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              }
            />
            {newVideoLink.map((i) => (
              <div key={i} className='mt-3'>
                <Input
                  type='text'
                  variant={variant}
                  value={i.links}
                  onChange={(e) => videoLinks(e.target.value)}
                  endContent={
                    <Button
                      color='light'
                      className='rounded-none text-red-700'
                      onClick={() => DeleteVideo(i.links)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </Button>
                  }
                />
              </div>
            ))}
          </div>

        </div>
        <div className='grid grid-cols-2 mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='date'
            label='Start Date'
            placeholder='Date'
            variant={variant}
            labelPlacement='outside'
            onChange={(e) => setFromDate(e.target.value)}
          />
          <Input
            type='date'
            label='End Date'
            placeholder='Date'
            variant={variant}
            onChange={(e) => setToDate(e.target.value)}
            labelPlacement='outside'
          />
          <div></div>
        </div>

        <div className='flex justify-center gap-10 py-4'>
          <Button color='danger'>
            <Link to='/position'>Cancel</Link>
          </Button>
          <Button color='primary' type='submit'>
            Register
          </Button>
        </div>
      </form >
    </div>
  );
}
