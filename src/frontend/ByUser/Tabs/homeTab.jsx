import { Card, CardBody, Button, CardHeader, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import apiInstance from "../../../util/api";
import { getFile } from "../../../util";
import { Fade } from "react-awesome-reveal";
export default function Home() {
  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    const getAssign = async () => {
      await apiInstance.get(`courses`).then((res) => {
        console.log(res.data.data, "exam res");
        setCoursesList(res.data.data);
        // const count = res.data.data.filter((el) => el.subjects.length);
        // console.log(count, "count");
      });
    };

    getAssign();
  }, []);

  return (
    <div>
      <div className='block' id='home'>
        {coursesList.map((item, index) => (
          <Fade>
            <div className=''>
              <div style={{ padding: "32px 40px" }}>
                <div
                  style={{
                    color: "#000",
                    fontSize: "40px",
                    fontWeight: "600px",
                    wordSpacing: "-1.6px",
                  }}
                >
                  {item?.title} Courses
                </div>
                <div className='grid grid-cols-3 gap-2 py-10'>
                  {item.subjects?.map((e, index) => (
                    <div>
                      <Image
                        width={420}
                        height={280}
                        alt={e.image?.originalname}
                        src={getFile({ payload: e.image })}
                      />
                      <div className='flex p-5 flex-col justify-start'>
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
                          }}
                          className='flex flex-col justify-stretch'
                        >
                          {e?.description}
                        </div>
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
                          <span style={{ color: "#262FD9" }}>
                            {e.duration} months
                          </span>
                          <br></br>
                          Price -{" "}
                          <span style={{ color: "#262FD9" }}>{e.fee} MMK</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {item.subjects?.length > 3 && (
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
                  )}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
