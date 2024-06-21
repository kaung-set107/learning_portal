import { Button, Input, Textarea, RadioGroup, Radio } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export default function DepartmentInputForm() {
  const variant = 'bordered';

  const [catList, setCatList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [installmentPercent, setInstallmentPercent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState('')
  const [inAllow, setInAllow] = useState("");
  const [inTime, setInTime] = useState("");
  const [durationType, setDurationType] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [videoLinks, setVideoLinks] = useState("");
  const [newVideoLink, setNewVideoLink] = useState([]);
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddVideo = (val) => {
    console.log(val, "val");
    const newData = {
      links: val,
    };
    setNewVideoLink([...newVideoLink, newData]);
    console.log([...newVideoLink, newData], "res");
  };

  const DeleteVideo = async (val) => {
    console.log(val, "val");
    setNewVideoLink(newVideoLink.filter((el) => el.links !== val));
  };
  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files, "file");
    }
  };

  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", desc);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("previewVideo", JSON.stringify(newVideoLink));
    formData.append("fee", price);
    formData.append("durationValue", duration);
    formData.append("durationType", durationType);
    formData.append("installmentAllow", inAllow);
    formData.append("installmentTime", inTime);
    formData.append("topic", topic);
    formData.append("installmentPercent", installmentPercent);


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
          showConfirmButton: false,
          timer: 2000,
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
          <div className='flex flex-col '>
            <label>Image</label>
            <input
              type='file'
              onChange={handleImage}

              placeholder=' '
              labelPlacement='outside'
              variant={variant}
              className='border-1 border-slate-300 rounded-md h-10'
            />
            {/* <Image src={courseList.image && getFile({ payload: courseList.image })} className='w-[60px] h-[60px]' /> */}
          </div>
          <div>
            <label className='text-sm '>Course Topic</label>
            <Input
              type='text'
              variant={variant}
              placeholder='Enter your topic'
              onChange={(e) => setTopic(e.target.value)}
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
              onChange={(e) => setDurationType(e.target.value)}
              className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden>Choose Type</option>

              <option value='day'>Days</option>
              <option value='week'>Weeks</option>
              <option value='month'>Months</option>

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
            <Input
              type='number'
              label='Installment Percent'
              placeholder='1 or 2 ?'
              value={installmentPercent !== null ? installmentPercent : 0}
              variant={variant}
              validationState={
                errors.installmentPercent &&
                  errors.installmentPercent.type === "required"
                  ? "invalid"
                  : "valid"
              }
              labelPlacement='outside'
              {...register("installmentPercent", {
                required: true,
                onChange: (e) => setInstallmentPercent(e.target.value),
              })}
            />
          </div>


        </div>

        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Video Links</label>
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
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
