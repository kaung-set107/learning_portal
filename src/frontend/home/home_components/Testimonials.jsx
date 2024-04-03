import { Carousel } from "react-responsive-carousel";
import st1 from "../../../assets/img/st1.jpeg";
import st2 from "../../../assets/img/st2.jpeg";
import st3 from "../../../assets/img/st3.jpg";
import { Image } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from 'react'
import Swiper from "react-id-swiper";
import apiInstance from "../../../util/api";
export const Testimonials = () => {
  const [testimonialList, setTestimonialList] = useState([])
  const images = [
    {
      img: st1,
      name: "Htet Aung Lin Naing",
      rev: "I have finished GED from MSI. Teachers are patient,skilled, and lovely. MS behaves as not only education center but also family. Every person from MS are good and kind to students. I would say that MSI is one of the best education center.",
    },
    {
      img: st2,
      name: "Nay Wun Lei",
      rev: "We can learn everything about studying abroad at MSI. which is a fantastic institution. I went to GED batch 7. You are welcome to ask whatever questions you have, and the teachers are excellent at their jobs.                                                                       ",
    },
    {
      img: st3,
      name: "Ruby Lin",
      rev: "I attended GED at MSI Academy for 4 months and it is one of the best choice I've ever made.Teachers are not only excellent at teaching but also very patience. Plus, the staff members are also very kind they often check on students to see if they need anything.So i big recommend MSI.",
    },
  ];

  useEffect(() => {
    const getTestimonial = async () => {
      await apiInstance
        .get(`testimonials`)
        .then((res) => {
          setTestimonialList(res.data.data);
          // console.log(res.data.data, 'att')
          // setPages(res.data._metadata.page_count);
        });
    };

    getTestimonial();
  }, [])
  const params = {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  };
  return (
    <div className='md:text-[#26496a] text-white md:bg-white p-0 lg:p-20 bg-[#26496a]'>
      <h2
        className='flex text-4xl font-semibold py-5 justify-center'
        style={{ fontWeight: "900" }}
      >
        Testimonials
      </h2>
      <Carousel
        interval={3000}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={false}
        transitionTime={1000}
        showStatus={false}
        showThumbs={false}
      >
        {testimonialList.map((st, index) => (
          <div
            key={index}
            className=' w-[300px] h-[500px] md:w-full md:h-full flex flex-col gap-2 sm:gap-10 lg:flex-row justify-center md:py-10 px-5 bg-[#26496a]'
          >
            <div className='mt-5 flex flex-col justify-start sm:justify-center w-[300px] h-[400px] sm:w-full lg:w-2/4 sm:px-10  sm:py-10 text-white text-start'>
              <h2 className='font-semibold text-[25px] sm:text-[35px] my-3'>{st.title}</h2>
              <span className='font-regular text-[18px] sm:text-[25px]'>{st.description}</span>
            </div>
            <Image
              src={`data:image/jpeg;base64,${st?.image}`}

              className=' w-full h-[250px] sm:w-[300px] sm:h-[400px] md:w-[300px] md:h-[400px] mb-10 sm:mb-0 sm:mt-2'
              alt='testimonal participant'
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
