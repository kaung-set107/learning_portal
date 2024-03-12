import { Button, Input, Textarea, RadioGroup, Radio } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default function DepartmentInputForm() {
  const variant = "faded";

  const [catList, setCatList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [field, setField] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [studentAllow, setStudentAllow] = useState("");
  const [currentStudent, setCurrentStudent] = useState("");
  const [inAllow, setInAllow] = useState("");
  const [inTime, setInTime] = useState("");
  const [categoryType, setCategoryType] = useState('')
  const [price, setPrice] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    formData.append("category", category);

    apiInstance
      .post("courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Course Create Successful",
          text: "",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const getCat = async () => {
      await apiInstance.get(`categories`).then((res) => {
        // console.log(res.data.data, "cat res");
        setCatList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };
    getCat();
  }, []);
  return (
    <div className=' gap-3'>
      <div className='rounded-none py-3 text-left'>
        <Link to='/course' className=''>
          <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(create)}
        className='py-5 flex flex-col justify-center gap-5'
      >
        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div>
            <label className='text-sm '>Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden>Choose Category</option>
              {catList.map((item) => (
                <option value={item._id}>{item.title}</option>
              ))}
            </select></div>
          <div>
            <label className='text-sm '>Course Title</label>
            <Input
              type='text'
              variant={variant}
              placeholder='Enter your course'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

        </div>
        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div>
            <Input
              type='file'
              onChange={handleImage}
              label='Image'
              placeholder=' '
              labelPlacement='outside'
              variant={variant}
            />
          </div>
          <div>
            <label className='text-sm '>Course Topic</label>
            <Input
              type='text'
              variant={variant}
              placeholder='Enter your topic'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div>
            <Input
              type='text'
              label='Student Allowed'
              value='0'
              placeholder='...'
              variant={variant}
              validationState={
                errors.noOfStudentAllow &&
                  errors.noOfStudentAllow.type === "required"
                  ? "invalid"
                  : "valid"
              }
              labelPlacement='outside'
              {...register("noOfStudentAllow", {
                required: true,
                onChange: (e) => setStudentAllow(e.target.value),
              })}
            />

          </div>
          <div>
            <Input
              type='text'
              label='Current Student'
              value='0'
              placeholder='...'
              validationState={
                errors.noOfEnrolledStudent &&
                  errors.noOfEnrolledStudent.type === "required"
                  ? "invalid"
                  : "valid"
              }
              variant={variant}
              labelPlacement='outside'
              {...register("noOfEnrolledStudent", {
                required: true,
                onChange: (e) => setCurrentStudent(e.target.value),
              })}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div className='pt-5'>
            <label>Installment Allowed</label>
            <RadioGroup
              validationState={
                errors.installmentAllow &&
                  errors.installmentAllow.type === "required"
                  ? "invalid"
                  : "valid"
              }
              orientation='horizontal'
              {...register("installmentAllow", {
                required: true,
                onChange: (e) => setInAllow(e.target.value),
              })}
            >
              <Radio value='yes'>Yes</Radio>
              <Radio value='no'>No</Radio>
            </RadioGroup>
          </div>
          <div>
            <Input
              type='number'
              label='Installment Times'
              placeholder='1 or 2 ?'
              value={inAllow === 'no' ? 0 : inTime}
              variant={variant}
              validationState={
                errors.installmentTime &&
                  errors.installmentTime.type === "required"
                  ? "invalid"
                  : "valid"
              }
              labelPlacement='outside'
              {...register("installmentTime", {
                required: true,
                onChange: (e) => setInTime(e.target.value),
              })}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div>
            <label className='text-sm '>Duration Types</label>
            <select
              onChange={(e) => setCategoryType(e.target.value)}
              className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden>Choose Category</option>

              <option value='days'>Days</option>
              <option value='weeks'>Weeks</option>
              <option value='months'>Months</option>

            </select>
          </div>
          <div>
            <Input
              type='text'
              label='Duration'
              placeholder='Duration'
              variant={variant}
              onChange={(e) => setDuration(e.target.value)}
              labelPlacement='outside'
            />
          </div>
        </div>
        {/* <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <label className='text-sm font-semibold'>Field</label>
          <select
            onChange={(e) => setField(e.target.value)}
            className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
          >
            <option hidden>Choose Field</option>

            <option value='ielts'>IELTs</option>
            <option value='tofel'>Tofel</option>
          </select>
        </div> */}
        {/* <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>

        </div> */}
        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div>
            <Input
              type='number'
              label='Price'
              placeholder='Price'
              variant={variant}
              onChange={(e) => setPrice(e.target.value)}
              labelPlacement='outside'
            />
          </div>
          <div>
            <Textarea
              type='text'
              label='Description'
              placeholder='description'
              variant={variant}
              onChange={(e) => setDesc(e.target.value)}
              labelPlacement='outside'
            />
          </div>
        </div>

        <div className='flex justify-center gap-10 py-4'>
          <Button color='danger'>
            <Link to='/attendance'>Cancel</Link>
          </Button>
          <Button color='primary' type='submit'>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
