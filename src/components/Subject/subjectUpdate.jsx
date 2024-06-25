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
  const [instructors, setInstructors] = useState('');
  const [instructorIDList, setInstructorIDList] = useState([])
  const [oldVideoLink, setOldVideoLink] = useState([])
  const [subImage, setSubImage] = useState('')
  const AddVideo = (val) => {
    console.log(val, "val");
    const newData = {
      links: val,
    };
    setNewVideoLink([...newVideoLink, newData]);
    console.log([...newVideoLink, newData], "res");
  };

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };
  const DeleteVideo = async (val) => {
    // console.log(val, "val");
    setNewVideoLink(newVideoLink.filter((el) => el.links !== val));
  };
  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("course", course);
    formData.append("description", desc);
    formData.append("image", image ? image : subImage);
    formData.append("instructors", instructors ? JSON.stringify({ data: instructors?.split(',') }) : JSON.stringify({ data: instructorIDList }));
    // formData.append("fromDate", fromDate);
    // formData.append("toDate", toDate);

    formData.append("previewVideo", JSON.stringify(newVideoLink));
    apiInstance
      .put(`subjects/${Id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Created Successful",
          text: "Nice!",
          showConfirmButton: false,
          timer: 2000

        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something Wrong",
          text: "Please try again!!",
          showConfirmButton: false,
          timer: 2000

        });
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
          setInstructorIDList(res.data.data.instructors.map((i) => (i._id)))
          setOldVideoLink(res.data.data?.previewVideo)
          setNewVideoLink(JSON.parse(res.data.data?.previewVideo))
          setProfileAnchor(
            res.data.data.image
              ? getFile({ payload: res.data.data.image })
              : ''
          )
          setSubImage(
            res.data.data.image
              ? getFile({ payload: res.data.data.image })
              : ''
          )
          console.log(res.data.data.instructors, 'res')


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

              onChange={(e) => setDesc(e.target.value)}

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

              onChange={(e) => setCourse(e.target.value)}

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
              label={instructorList.map((i) => (i.name))}
              // placeholder="Select Instructor"
              selectionMode="multiple"
              className="w-full"


              onChange={(e) => setInstructors(e.target.value)}

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
          <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1'>
            <label className='text-sm font-semibold'>Subject Photo</label>
            <input
              type='file'

              placeholder='$..'
              variant={variant}
              labelPlacement='outside'
              onChange={handleImage}
              className='border-1 border-slate-300 rounded-md h-10'
            />
            <div className='flex flex-col gap-0'>
              <img src={subImage} className='w-[120px] h-[120px] rounded-md' />
              <div className='flex justify-center overflow-hidden'>
                {/* <span className='text-[29px] font-extrabold text-[red] items-center justify-center w-[30px] cursor-pointer' onClick={() => handleDelete(ind)}><FontAwesomeIcon icon={faCircleXmark} /></span> */}
              </div>
            </div>
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
            {newVideoLink && newVideoLink.map((i) => (
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
        {/* <div className='grid grid-cols-2 mb-6 md:mb-0 gap-4 mt-1'>
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
        </div> */}

        <div className='flex justify-center gap-10 py-4'>
          <Button color='danger'>
            <Link to='/position'>Cancel</Link>
          </Button>
          <Button color='primary' type='submit'>
            Update
          </Button>
        </div>
      </form >
    </div>
  );
}
