import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFile } from "../../util/index";
import { AnchorIcon } from "../../assets/Icons/AnchorIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default function DepartmentInputForm() {
  const Id = useLocation().pathname.split("/")[2];

  const variant = "faded";

  const { handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [field, setField] = useState("");
  const [image, setImage] = useState("");
  const [profileAnchor, setProfileAnchor] = useState("");

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };

  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("field", field);
    formData.append("description", desc);
    formData.append("image", image);

    apiInstance
      .put(`courses/${Id}`, formData, {
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
    const getCourses = async () => {
      await apiInstance.get(`courses/${Id}`).then((res) => {
        setTitle(res.data.data?.title);
        setField(res.data.data?.field);
        setDesc(res.data.data?.description);

        setProfileAnchor(
          res.data.data.image ? getFile({ payload: res.data.data.image }) : ""
        );

        console.log(res.data.data.image, "att");
      });
    };

    getCourses();
  }, []);
  return (
    <div className='gap-3'>
      <div className='rounded-none px-4 py-0 text-left'>
        <Link to='/course' className='mr-5'>
          <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
        </Link>
      </div>
      <form onSubmit={handleSubmit(create)}>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Course Title</label>
            <Input
              type='text'
              variant={variant}
              placeholder='Enter your course'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <label className='text-sm font-semibold'>Field</label>
          <select
            onChange={(e) => setField(e.target.value)}
            className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
          >
            <option hidden value={field}>
              {field}
            </option>

            <option value='ielts'>IELTs</option>
            <option value='tofel'>Tofel</option>
          </select>
        </div>
        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
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
                ""
              )
            }
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='text'
              label='Description'
              placeholder='description'
              variant={variant}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              labelPlacement='outside'
            />
          </div>
        </div>

        <div className='flex justify-center gap-10 py-4'>
          <Link href='/course' className='text-white'>
            <Button color='danger'>Cancel </Button>
          </Link>

          <Button color='primary' type='submit'>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
