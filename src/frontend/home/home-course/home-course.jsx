import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import MSINav from "../msinav";

import Footer from "../footer";
import apiInstance from "../../../util/api";
import Loading from '../../../assets/img/finalloading.gif'
import { getFile } from "../../../util";
import ImgUn from '../../../assets/img/imgun.png'
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router";
// import Footer from '../../frontend/home/footer';
const Body = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  //handle progress value
  const handleRoute = (data) => {
    setId(id);
    setValue(value);
    navigate("/home-course-detail", { state: { data: data } });
  };
  const [courseList, setCourseList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [events, setEvents] = useState([
    {
      _id: "1",
      title: "MSI Academy Education Center - Graduration Ceremony",
      createdAt: "November 12, 2022",
      shortDescription: "GRADUATION CEREMONY",
    },
  ]);

  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        console.log(res.data.data, "course res");
        console.log(catList, "cat");
        setCourseList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };
    const getCat = async () => {
      await apiInstance.get(`categories`).then((res) => {
        console.log(res.data.data, "cat res");
        setCatList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    getCat();

    getAssign();
  }, []);
  return (
    <>
      <MSINav />

      <div className='md:p-[24 20 100 40] p-5'>
        <h1
          className='text-[40px] font-[semibold] py-5 text-center '
          style={{ color: "#BC1F40", fontWeight: "900" }}
        >
          Courses We Offer
        </h1>
        {!courseList[0] ? (
          <div className='flex justify-center pt-[40px]'>
            <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />

          </div>) : (
          <div className='grid grid-cols-4 gap-0 items-center justify-between md:flex-row flex-wrap py-10'>

            {courseList.map((e) => (
              <div
                onClick={() => handleRoute(e)}

                className='w-[300px]  md:w-[350px] h-full md:h-[610px]'
              >
                <div>
                  <Image
                    // style={{ width: "500px", height: "280px" }}
                    alt={e.image?.originalname}
                    src={e.image ? getFile({ payload: e.image }) : ImgUn}
                    className='w-full h-full sm:w-[350px] sm:h-[240px] hover:-translate-y-2 hover:scale-105 duration-500'
                  />
                  <div className='flex p-5 flex-col justify-start flex-grow '>
                    <span className='w-[332px] text-[14px] font-semibold text-[#B72041] flex'>MSI Academy &nbsp;<li>
                      {e?.fromDate?.split('T')[0]}

                    </li></span>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "600px",
                        fontSize: "24px",
                        letterSpacing: "-0.96px",
                      }}
                      className='w-[340px]'
                    >
                      {e.title}
                    </span>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "400px",
                        // width: "400px",
                        // height: "auto",
                      }}
                      className='w-full md:w-[340px] md:h-[auto]'
                    >
                      {e?.description.substring(0, 50)}...
                    </div>
                    {/* card footer */}
                    <div
                      className='py-10'
                      style={{
                        width: "300px",
                        height: "19px",
                        fontSize: "14px",
                        fontWeight: "400px",
                      }}
                    >
                      Duration -{" "}
                      <span style={{ color: "#262FD9" }}>{e.durationValue ? e.durationValue : 0} {e.durationType ? e.durationType : 'months'}</span>
                      <br></br>
                      Price - <span style={{ color: "#262FD9" }}>{e.fee ? e.fee : 0} MMK</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Body;
