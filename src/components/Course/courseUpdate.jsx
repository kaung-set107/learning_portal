import { Button, Input, Textarea, RadioGroup, Radio } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Image } from '@nextui-org/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { getFile } from "../../util";
export default function DepartmentInputForm() {
  const location = useLocation()
  const CourseID = location.pathname.split('/')[2]
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
  const [fromDate, setFromDate] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [courseList, setCourseList] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddVideo = (val) => {
    // console.log(val, "val");
    const newData = {
      links: val,
    };
    setNewVideoLink([...newVideoLink, newData]);
    // console.log([...newVideoLink, newData], "res");
  };

  const DeleteVideo = async (val) => {
    console.log(val, "val");
    setNewVideoLink(newVideoLink.filter((el, ind) => ind !== val));
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
      .put(`courses/${CourseID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Course Update Successful",
          text: "",
          showConfirmButton: false,
          timer: 3000

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
    const getCourse = async () => {
      await apiInstance.get(`courses/${CourseID}`).then((res) => {
        // console.log(res.data.data, "cou res");
        setCourseList(res.data.data)

        setCategory(res.data.data?.category?._id)
        setCategoryName(res.data.data?.category?.title)
        setTitle(res.data.data?.title)
        setTopic(res.data.data?.topic)
        setInAllow(res.data.data?.installmentAllow)
        setInTime(res.data.data?.installmentTime)
        setInstallmentPercent(res.data.data?.installmentPercent)
        setDurationType(res.data.data?.durationType)
        setDuration(res.data.data?.durationValue)
        setPrice(res.data.data?.fee)
        setNewVideoLink(JSON.parse(res.data.data?.previewVideo))
        setDesc(res.data.data?.description)

        // setCatList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(JSON.parse(res.data.data?.previewVideo)[0].links, "count");
      });
    };
    getCourse()
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
              <option hidden>{categoryName}</option>
              {catList.map((item) => (
                <option value={item._id}>{item.title}</option>
              ))}
            </select></div>
          <div>
            <label className='text-sm '>Course Title</label>
            <Input
              type='text'
              variant={variant}
              value={title}
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
            {/* <Image src={courseList.image && getFile({ payload: courseList.image })} className='w-[60px] h-[60px]' /> */}
          </div>
          <div>
            <label className='text-sm '>Course Topic</label>
            <Input
              type='text'
              variant={variant}
              value={topic}
              placeholder='Enter your topic'
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>


        <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
          <div className='pt-5'>
            <label>Installment Allowed</label>

            <RadioGroup
              defaultValue={inAllow === true ? 'yes' : 'no'}

              onChange={(e) => setInAllow(e.target.value)}
            >
              <Radio value='yes' >Yes</Radio>
              <Radio value='no'>No</Radio>
            </RadioGroup>
          </div>
          <div>
            <Input
              type='number'
              label='Installment Times'
              placeholder='1 or 2 ?'
              value={inAllow === 'no' ? 0 : inTime}

              labelPlacement='outside'

              onChange={(e) => setInTime(e.target.value)}
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
              <option hidden>{durationType}</option>

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
              value={duration}
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
              value={price}
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

              labelPlacement='outside'

              onChange={(e) => setInstallmentPercent(e.target.value)}
            />
          </div>


        </div>
        {/* <div className='grid grid-cols-2 w-full mb-6 md:mb-0 gap-4'>
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
            {newVideoLink && newVideoLink.map((i, ind) => (
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
                      onClick={() => DeleteVideo(ind)}
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
              value={desc}
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
