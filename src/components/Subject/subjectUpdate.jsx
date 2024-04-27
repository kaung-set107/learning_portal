import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFile } from '../../util/index';
import { AnchorIcon } from '../../assets/Icons/AnchorIcon'
import { Link } from '@nextui-org/react'
export default function SubjectInputForm() {
  const variant = "bordered";
  const {

    handleSubmit,

  } = useForm();

  const Id = useLocation().pathname.split('/')[2]
  const [profileAnchor, setProfileAnchor] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [courseList, setCourseList] = useState([])
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
          setCourseId(res.data.data.course?._id)

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
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <label className="text-sm font-semibold">Subject Title</label>
            <Input
              type="text"
              variant={variant}
              placeholder="Enter your subject"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>


        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <label className="text-sm font-semibold">Course</label>
          <select
            onChange={(e) => setCourseId(e.target.value)}
            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
            <option hidden value={courseId}>{subList.course?.title}</option>

            {courseList.map((i) => (
              <option key={i._id} value={i._id}>{i.title}</option>
            ))}

          </select>
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">

          <Input
            type='file'
            onChange={handleImage}
            label='Profile'
            placeholder=' '
            labelPlacement='outside'
            variant={variant}
            endContent={
              profileAnchor ? (
                <Link
                  isExternal
                  showAnchorIcon
                  href={profileAnchor}
                  anchorIcon={<AnchorIcon />}
                ></Link>
              ) : (
                ''
              )
            }
          />
        </div>
        <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">

          <Input
            type="number"
            onChange={(e) => setFee(e.target.value)}
            label="Fee"
            placeholder="... "
            value={fee}
            labelPlacement="outside"
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">

          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              label="About Subject"
              placeholder="About this subject"
              variant={variant}
              value={desc}
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

            type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
