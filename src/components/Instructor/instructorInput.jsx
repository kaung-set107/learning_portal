import { Checkbox, Input } from "@nextui-org/react";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import apiInstance from "../../util/api.js";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function EmployeeInput() {
  const variant = ["bordered"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nrc, setNrc] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [intro, setIntro] = useState("");
  const [quali, setQuali] = useState("");
  const [role, setRole] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [gender, setGender] = useState("");
  const [isSelectedCRM, setIsSelectedCRM] = useState(false);

  const [profile, setProfile] = useState(null);

  const handleProfile = (e) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);

    }
  };

  const create = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("nrc", nrc);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("experience", workExp);
    formData.append("image", profile);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("introduction", intro);
    formData.append("qualification", quali);
    formData.append("createUser", isSelectedCRM);
    if (isSelectedCRM) {
      formData.append("username", username);
      formData.append("password", password);
    }

    apiInstance
      .post("instructors", formData, {
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
          timer: 3000,
        });
      })
      .catch((error) => {

        Swal.fire({
          icon: "error",
          title: "Something Wrong",
          text: "Try again!",
          showConfirmButton: false,
          timer: 3000,
        });
        console.log(error)
      });
  };
  return (
    <div className="gap-6">
      <form onSubmit={handleSubmit(create)}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="text"
            validationState={
              errors.name && errors.name.type === "required"
                ? "invalid"
                : "valid"
            }
            label="Name"
            placeholder="Name"
            variant={variant}
            labelPlacement="outside"
            {...register("name", {
              required: true,
              onChange: (e) => setName(e.target.value),
            })}
          />
          <Input
            type="number"
            label="Phone No"
            placeholder="Phone Number"
            variant={variant}
            onChange={(e) => setPhone(e.target.value)}
            labelPlacement="outside"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="text"
            variant={variant}
            label="Qualification"
            placeholder=".."
            labelPlacement="outside"
            onChange={(e) => setQuali(e.target.value)}
          />
          <Input
            type="text"
            variant={variant}
            label="NRC"
            placeholder="NRC.."
            labelPlacement="outside"
            onChange={(e) => setNrc(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <Input
            type="email"
            variant={variant}
            validationState={
              errors.email && errors.email.type === "required"
                ? "invalid"
                : "valid"
            }
            label="Personal Email"
            placeholder="example@gmail.com"
            labelPlacement="outside"
            {...register("email", {
              required: true,
              onChange: (e) => setEmail(e.target.value),
            })}
          />
          <Input
            type="text"
            onChange={(e) => setWorkExp(e.target.value)}
            label="Work Experience"
            placeholder=".."
            labelPlacement="outside"
            variant={variant}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              type="text"
              label="Address"
              placeholder="Address.."
              labelPlacement="outside"
              onChange={(e) => setAddress(e.target.value)}
              variant={variant}
            />
          </div>
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-1">
            <label className='text-sm font-semibold'>Profile</label>
            <input
              type="file"
              onChange={handleProfile}
              className='border-1 border-slate-300 rounded-md h-10'
              placeholder=" "
              labelPlacement="outside"
              variant={variant}
            />
          </div>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <label
              className={`text-sm font-semibold ${errors.position && errors.position.type === "required"
                ? "text-[#f31260]"
                : ""
                }`}>
              Role
            </label>
            <select
              id="countries"
              {...register("role", { required: true })}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
              <option value="" hidden>
                Choose Role
              </option>
              <option value="instructor">Instructor</option>
              <option value="instructorSupervisor">
                Supervisor Instructor
              </option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              {/* {positionList.map(option => (
                <option key={option} value={option._id}>
                  {option.name}
                </option>
              ))} */}
            </select>
          </div>
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <label
              className={`text-sm font-semibold ${errors.gender && errors.gender.type === "required"
                ? "text-[#f31260]"
                : ""
                }`}>
              Gender
            </label>
            <select
              id="countries"
              {...register("gender", {
                required: true,
                onChange: (e) => setGender(e.target.value),
              })}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
              <option hidden value="">
                Choose Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex-nowrap mb-6 md:mb-0 gap-4 mt-4">
          <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
              label="Introduction"
              labelPlacement="outside"
              placeholder="Enter your info"
              onChange={(e) => setIntro(e.target.value)}
            />
          </div>
          <Checkbox
            className="mt-3"
            isSelected={isSelectedCRM}
            onValueChange={setIsSelectedCRM}>
            User Account
          </Checkbox>
          &nbsp;
        </div>
        {isSelectedCRM && (
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
            <Input
              type="text"
              label="User Name"
              placeholder="user name.."
              labelPlacement="outside"
              onChange={(e) => setUserName(e.target.value)}
              variant={variant}
            />

            <Input
              validationState={
                errors.password && errors.password.type === "required"
                  ? "invalid"
                  : "valid"
              }
              type="password"
              label="Password"
              variant={variant}
              placeholder="Password.."
              labelPlacement="outside"
              {...register("password", {
                required: true,
                onChange: (e) => setPassword(e.target.value),
              })}
            />
          </div>
        )}

        <div className="block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-7">
          <div className="flex justify-center w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3">
            <Button
              size="sm"
              color="danger"
              variant="shadow"
              className="rounded-xl px-4 py-0 text-left">
              <Link to="/emp">Cancel</Link>
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="shadow"
              className="rounded-xl px-4 py-0 text-left"
              type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
