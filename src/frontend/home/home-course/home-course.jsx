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
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-10 2xl:gap-10 sm:gap-0 items-center justify-center sm:py-10 2xl:py-20'>

            {courseList.map((e) => (
              <div
                onClick={() => handleRoute(e)}

                className='w-[280px] md:w-[260px] lg:w-[300px] xl:w-[310px] 2xl:w-[400px] md:h-[480px] h-[420px]'
              >
                <div >
                  <Image
                    // style={{ width: "500px", height: "280px" }}
                    alt={e.image?.originalname}
                    src={getFile({ payload: e.image })}
                    className='w-[200px] h-full md:w-[240px] md:h-[80px] lg:w-[300px] lg:h-[270px] xl:w-[310px] xl:h-[270px] 2xl:w-[390px] sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                  />
                  <div className='flex p-5 flex-col justify-start flex-grow '>
                    <span className='w-[280px] text-[14px] font-semibold text-[#B72041] flex'>MSI Academy
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "600px",
                        fontSize: "20px",
                        letterSpacing: "-0.96px",
                      }}
                      className='w-[290px] h-[60px]'
                    >
                      {e.title}
                    </span>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "400px",
                        // width: "400px",
                        // height: "auto",
                      }}
                      className='w-[280px] h-[40px]'
                    >
                      {e?.description.substring(0, 50)}...
                    </div>
                    {/* card footer */}
                    <div
                      className='py-5 flex justify-center gap-2 w-[290px]'

                    >
                      <div className='h-[24px] w-full  text-start bg-[#ECEFFF] rounded-2xl text-[13px] font-medium'>
                        <span>Duration -</span>
                        <span style={{ color: "#262FD9" }}>{e.durationValue ? e.durationValue : 0} {e.durationType ? e.durationType : 'months'}</span>
                      </div>

                      <div className='h-[24px] w-full  text-start bg-[#FFF3F6] rounded-2xl text-[13px] font-medium'>
                        Price - <span style={{ color: "#262FD9" }}>{e.fee ? e.fee : 0} MMK</span>
                      </div>

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
