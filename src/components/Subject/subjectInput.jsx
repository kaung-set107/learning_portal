import { Button, Input, RadioGroup, Radio } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function PositionInputForm() {
  const variant = "faded";

  const [instructorList, setInstructorList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const create = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("course", course);
    formData.append("fee", fee);
    formData.append("description", desc);
    formData.append("image", image);
    formData.append("instructor", instructor);
    formData.append("duration", duration);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("noOfStudentAllow", studentAllow);
    formData.append("installmentAllow", inAllow);
    formData.append("noOfEnrolledStudent", currentStudent);
    formData.append("installmentTime", inTime);
    formData.append("installmentPercent", inPercent);

    apiInstance
      .post("subjects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Created Successful",
          text: "Nice!",
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
        .get("courses")
        .then((res) => setCourseList(res.data.data));
    };
    getInstructorList();
    getSubjectList();
  }, []);

  return (
    <div className='gap-4'>
      <form onSubmit={handleSubmit(create)}>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'
            label='Title'
            placeholder='Title'
            variant={variant}
            onChange={(e) => setTitle(e.target.value)}
            labelPlacement='outside'
          />
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2'>
            <label
              className={`text-sm font-semibold ${errors.description && errors.description.type === "required"
                ? "text-[#f31260]"
                : ""
                }`}
            >
              Description
            </label>
            <Input
              type='text'
              placeholder='Description'
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
              className={`text-sm font-semibold ${errors.subject && errors.subject.type === "required"
                ? "text-[#f31260]"
                : ""
                }`}
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
              <option hidden>Choose Course</option>
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
              className={`text-sm font-semibold ${errors.instructor && errors.instructor.type === "required"
                ? "text-[#f31260]"
                : ""
                }`}
            >
              Instructor
            </label>
            <select
              {...register("instructor", {
                required: true,
                onChange: (e) => setInstructor(e.target.value),
              })}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden>Choose Instructor</option>
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

        {/* <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'
            label='Student Allowed'
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
          <Input
            type='text'
            label='Current Student'
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
        </div> */}
        {/* <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-8'>
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
          <Input
            type='number'
            label='Installment Times'
            placeholder='1 or 2 ?'
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
        </div> */}

        {/* <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='number'
            label='Installment %'
            placeholder='1% or 2%'
            validationState={
              errors.installmentPercent &&
              errors.installmentPercent.type === "required"
                ? "invalid"
                : "valid"
            }
            variant={variant}
            labelPlacement='outside'
            {...register("installmentPercent", {
              required: true,
              onChange: (e) => setInPercent(e.target.value),
            })}
          />
          <Input
            type='Number'
            label='Price'
            placeholder='$..'
            validationState={
              errors.fee && errors.fee.type === "required" ? "invalid" : "valid"
            }
            variant={variant}
            labelPlacement='outside'
            {...register("fee", {
              required: true,
              onChange: (e) => setFee(e.target.value),
            })}
          />
        </div> */}
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='file'
            label='Photo'
            placeholder='$..'
            variant={variant}
            labelPlacement='outside'
            onChange={handleImage}
          />
          {/* <Input
            type='text'
            label='Duration'
            placeholder='Duration'
            variant={variant}
            onChange={(e) => setDuration(e.target.value)}
            labelPlacement='outside'
          /> */}
          <Input
            type='date'
            label='Start Date'
            placeholder='Date'
            variant={variant}
            labelPlacement='outside'
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-2 mb-6 md:mb-0 gap-4 mt-1'>

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
      </form>
    </div>
  );
}
