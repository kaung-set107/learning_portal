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
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
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


  useEffect(() => {
    window.scroll(0, 0)
    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        // console.log(res.data.data, "course res");
        // console.log(catList, "cat");
        setCourseList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    getAssign();
  }, []);
  return (
    <>
      <MSINav />

      <ScrollAnimation animateIn='fadeIn'
        animateOut='fadeOut'
        scrollableParentSelector='#cou'>
        < div className='flex flex-col p-5 md:p-5  relative container' id='cou' >

          <h1
            className=' p-5 md:p-10  flex justify-center text-[30px] sm:text-[40px] font-[semibold] py-5'
            style={{ color: "#BC1F40", fontWeight: "900" }}
          >
            Courses We Offer
          </h1>

          <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 xl:gap-5 gap-2 sm:gap-4 md:gap-12 lg:gap-5 2xl:gap-10  items-center justify-center md:justify-start md:items-start sm:py-10 2xl:py-20'>
            {courseList?.map((e) => (
              <div
                onClick={() => handleRoute(e)}

                className='w-[310px] sm:w-[280px]  md:w-[260px] lg:w-[320px] xl:w-[300px] xl:h-[470px] 2xl:w-[400px] md:h-[480px] h-[470px]'
              >
                <div >
                  <Image
                    // style={{ width: "500px", height: "280px" }}
                    alt={e.image?.originalname}
                    src={getFile({ payload: e.image })}
                    className='w-[310px] h-full md:w-[250px] md:h-[180px] lg:w-[320px] lg:h-[270px] xl:w-[320px] xl:h-[270px]  2xl:w-[370px] sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                  />
                  <div className='flex p-5 flex-col justify-start flex-grow '>
                    <span className='md:w-[230px] lg:w-[280px] text-[14px] font-semibold text-[#B72041] flex'>MSI Academy
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter",
                        fontWeight: "600px",
                        fontSize: "20px",
                        letterSpacing: "-0.96px",
                      }}
                      className='sm:w-full md:w-[240px] md:h-[50px] lg:w-[290px] lg:h-[60px]'
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
                      className='md:w-[230px] md:h-[35px] lg:w-[280px] lg:h-[40px]'
                    >
                      {e?.description.substring(0, 50)}...
                    </div>
                    {/* card footer */}
                    <div
                      className='py-5 flex sm:flex-col lg:flex-row justify-center gap-2 md:w-[240px] lg:w-[260px] w-[290px]'

                    >
                      <div className='h-[24px] w-full sm:w-[150px] md:w-[200px] lg:w-[250px]  text-start bg-[#ECEFFF] rounded-2xl md:text-[12px] text-[13px] font-medium'>
                        <span>Duration -</span>
                        <span style={{ color: "#262FD9" }}>{e.durationValue ? e.durationValue : 0} {e.durationType ? e.durationType : 'months'}</span>
                      </div>

                      <div className='h-[24px] w-full sm:w-[150px] md:w-[200px] lg:w-[250px]  text-start bg-[#FFF3F6] rounded-2xl md:text-[12px] text-[13px] font-medium'>
                        Price - <span style={{ color: "#262FD9" }}>{e.fee ? e.fee : 0} MMK</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div >
      </ScrollAnimation >

      <Footer />
    </>
  );
};

export default Body;
