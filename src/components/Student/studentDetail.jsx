import { Button, Input, LinkIcon } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhoneVolume,
  faLocationDot,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { getFile } from "../../util";
import StickyBox from "react-sticky-box";
import { Image, Divider } from "@nextui-org/react";
export default function DepartmentUpdateInput() {
  const variant = "faded";
  const Id = useLocation().pathname.split("/")[2];
  const [student, setStudent] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [img, setImg] = useState("");
  useEffect(() => {
    const getEmployeeList = async () => {
      await apiInstance
        .get("users")
        .then((res) => setEmployeeList(res.data.data));
    };
    const getDepartmentList = async () => {
      await apiInstance.get("departments").then((res) => {
        console.log(res.data);
        setDepartmentList(res.data.data);
      });
    };

    const getDepartmentByID = async () => {
      console.log(Id);
      await apiInstance
        .get(`overall-students`, { params: { status: "waiting" } })
        .then((res) => {
          console.log(
            res.data.data.filter((el) => el._id === Id)[0],
            "overall"
          );
          setStudent(res.data.data.filter((el) => el._id === Id)[0]);
          const Img = getFile({
            payload: res.data.data.filter((el) => el._id === Id)[0].image,
          });
          console.log(Img, "ii");
          setImg(Img);
        });
    };
    getDepartmentByID();
    getDepartmentList();
    getEmployeeList();
  }, [setImg]);

  const handleInputChange = (fieldName, value) => {
    setDepartment((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleUpdate = async () => {
    let data = department;
    data.id = id;
    await apiInstance
      .put("department", data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Successfully Edited",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='mx-8 '>
      <div>
        <Link to='/register-list'>
          <FontAwesomeIcon icon={faArrowLeft} size='xl' /> &nbsp; Back
        </Link>
      </div>
      <div style={{ height: "800px", overflowY: "scroll" }}>
        <div className='flex gap-20 py-10'>
          <div>
            <Image
              radius='sm'
              style={{
                width: "320px",
                height: "320px",
                borderRadius: "200px",
              }}
              src={img}
            />
          </div>
          <div className='px-10' style={{ width: "768px", height: "728px" }}>
            <div
              className='header'
              style={{
                fontWeight: "600",
                fontSize: "48px",
                lineHeight: "60px",
              }}
            >
              {student?.name}
            </div>
            <div className='flex py-4'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faEnvelope} size='xl' />
                &nbsp; {student?.email}
              </span>
            </div>
            <div className='py-4'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faPhoneVolume} size='xl' />
                &nbsp; {student?.phone}
              </span>
            </div>
            <div className='py-4'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faLocationDot} size='xl' />
                &nbsp; {student?.address}
              </span>
            </div>
            <div className='py-4 mb-10'>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                className=''
              >
                <FontAwesomeIcon icon={faCalendar} size='xl' />
                &nbsp;{" "}
                {new Date(student.birthDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <Divider></Divider>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Desired Course:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                // className='sm:ml-10 md:ml-5'
              >
                IELTs
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Registeration Date:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                // className='sm:ml-10 md:ml-5'
              >
                28 December 2023 at 5:15 PM
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Why Choose MSI:
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                // className='sm:ml-10 md:ml-5'
              >
                Lorem ipsum dolor sit amet consectetur. Lectus eros molestie id
                eget nisl leo. Tempor cursus diam venenatis maecenas
                scelerisque. Dui enim molestie accumsan et risus.
              </span>
            </div>
            <div className='py-1 mt-10 grid grid-cols-2 gap-2'>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                Why choose this course :
              </span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "18px",
                }}
                // className='sm:ml-10 md:ml-5'
              >
                Lorem ipsum dolor sit amet consectetur. Lectus eros molestie id
                eget nisl leo. Tempor cursus diam venenatis maecenas
                scelerisque. Dui enim molestie accumsan et risus.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end py-3'>
        <Button className='bg-red-600 text-white hover:bg-red-700'>
          Reject
        </Button>
        &nbsp;
        <Button className='bg-blue-600 text-white hover:bg-blue-700'>
          Approve
        </Button>
      </div>
    </div>
  );
}
