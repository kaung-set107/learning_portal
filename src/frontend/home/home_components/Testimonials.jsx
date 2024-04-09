
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import st1 from "../../../assets/img/st1.jpeg";
import st2 from "../../../assets/img/st2.jpeg";
import st3 from "../../../assets/img/st3.jpg";
import { Image } from "@nextui-org/react";

import React, { useEffect, useState } from 'react'
import Swiper from "react-id-swiper";
import apiInstance from "../../../util/api";
export const Testimonials = () => {
  const [testimonialList, setTestimonialList] = useState([])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
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
    <div className='md:text-[#26496a] text-white md:bg-[#0B2743] p-0 lg:p-10  bg-[#26496a] container'>
      <h2
        className='flex text-[48px] font-semibold py-5 justify-center text-[#fff]'

      >
        Testimonials
      </h2>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        responsive={responsive}
        className='p-1 '
      >

        {testimonialList.map((st, index) => (
          <div
            key={index}
            className='flex gap-2 justify-start p-3 sm:p-0 '
          >
            <div className=' w-[300px] h-[600px] sm:h-[500px] md:w-[360px] md:h-[537px] p-10 rounded-md ' style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <div className='flex flex-col  justify-center items-center'>
                <Image
                  src={`data:image/jpeg;base64,${st?.image}`}

                  className=' w-[177px] h-[177px] sm:w-[177px] sm:h-[177px] md:w-[177px] md:h-[177px] mb-10 sm:mb-0 sm:mt-2 rounded-[50%]'
                  alt='testimonal participant'
                />
                <span className='font-semibold text-[18px] sm:text-[18px] my-3 text-[#fff]'>{st?.title}</span>
              </div>
              <div className=' flex justify-center'>
                <span className=' text-center font-normal text-[16px] sm:text-[16px]  w-[300px] h-[204px] text-[#fff]'>{st.description}</span>

              </div>
            </div>

          </div>
        ))}




      </Carousel>
    </div>
  );
};
