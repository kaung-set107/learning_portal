import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import MSINav from "../msinav";

import Footer from "../footer";
import apiInstance from "../../../util/api";
import { getFile } from "../../../util";
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
    <div className=''>
      <MSINav />

      <div className='p-5 md:p-10 relative'>
        <h1
          className='text-[40px] font-[semibold] py-5'
          style={{ color: "#BC1F40", fontWeight: "900" }}
        >
          Courses We Offer
        </h1>

        <div className='flex gap-2 items-center justify-center lg:gap-32 flex-wrap py-10'>
          {courseList.map((e) => (
            <div
              onClick={() => handleRoute(e)}
              style={{ height: "470px" }}
              className='w-full hover:-translate-y-1 hover:scale-110 hover:rotate-1 hover:duration-500 md:w-[390px] h-full md:h-[610px]'
            >
              <div>
                <Image
                  // style={{ width: "500px", height: "280px" }}
                  alt={e.image?.originalname}
                  src={getFile({ payload: e.image })}
                  className='w-full h-full md:w-[500px] md:h-[280px]'
                />
                <div className='flex p-5 flex-col justify-start flex-grow '>
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "600px",
                      fontSize: "24px",
                      letterSpacing: "-0.96px",
                    }}
                  >
                    {e.title}
                  </span>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "400px",
                      width: "400px",
                      height: "auto",
                    }}
                  >
                    {e?.description.substring(0, 50)}...
                  </div>
                  {/* card footer */}
                  <div
                    className='py-10'
                    style={{
                      width: "388px",
                      height: "19px",
                      fontSize: "14px",
                      fontWeight: "400px",
                    }}
                  >
                    Duration -{" "}
                    <span style={{ color: "#262FD9" }}>3 months</span>
                    <br></br>
                    Price - <span style={{ color: "#262FD9" }}>50000 MMK</span>
                  </div>

                  {/* rating state */}
                  {/* <div
                                style={{
                                  width: "388px",
                                  height: "19px",
                                  fontSize: "14px",
                                  fontWeight: "400px",
                                }}
                              >
                                <ReactStars {...firstExample} />
                              </div> */}
                </div>
              </div>
            </div>
          ))}

          {/* {item.subjects?.length > 3 && (
                      <div className='py-10'>
                        <button
                          style={{
                            padding: "16px",
                            width: "125px",
                            height: "43px",
                            alignItems: "center",
                            border: "1px solid #053CFF",
                            borderRadius: "8px",
                          }}
                          className='flex justify-start'
                        >
                          <span
                            style={{
                              color: "#053CFF",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontWeight: "500px",
                            }}
                          >
                            {console.log(item.subjects?.length - 3, "sub")}
                            Show {item.subjects?.length - 3} More
                          </span>
                        </button>
                      </div>
                    )} */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Body;
