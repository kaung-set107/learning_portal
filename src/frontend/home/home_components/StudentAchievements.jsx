import Carousel from "react-multi-carousel";
// import cer1 from "../../../assets/StudentAchievements/1.png";
// import cer2 from "../../../assets/StudentAchievements/2.png";
// import cer3 from "../../../assets/StudentAchievements/3.png";
// import cer4 from "../../../assets/StudentAchievements/4.png";
// import cer5 from "../../../assets/StudentAchievements/5.png";
// import cer6 from "../../../assets/StudentAchievements/6.png";
import { Image } from "@nextui-org/react";
import React, { useState, useEffect } from 'react'
import { getFile } from "../../../util";
import apiInstance from "../../../util/api";
import EHalf from "../../../assets/img/EllipseHalf.png";
export const StudentAchievements = () => {
  const [achievementList, setAchievementList] = useState([])
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
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  useEffect(() => {
    const getNews = async () => {
      await apiInstance
        .get(`achievements`)
        .then((res) => {
          setAchievementList(res.data.data.filter(el => el.type === 'student'));
          // console.log(res.data.data, 'att')

        });
    };

    getNews();

  }, []);
  return (
    <div >


      <h2 className='bg-[#BC1F40] text-[#fff] text-center font-semibold text-4xl p-16 mr-9 mb-9 mt-12 w-full overflow-hidden'>
        <img
          src={EHalf}
          className="hidden absolute  right-0 w-[120px] md:flex  lg:top-[1980px] xl:top-[1800px] 2xl:top-[1980px]"
          alt=""
        />
        Students Achievements
      </h2>



      <Carousel
        autoPlay={true}
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={2000}
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

      >

        {achievementList.map((st, index) => (
          <div
            key={index}
            className='flex lg:gap-2 xl:gap-4 2xl:gap-6 gap-2 justify-center items-center'
          >
            <div className='flex flex-col lg:gap-2 xl:gap-4 2xl:gap-6 gap-2'>
              <Image
                src={getFile({ payload: st.image })}

                className=' w-[200px] h-[170px] sm:w-[177px] sm:h-[177px] md:w-[177px] md:h-[177px] lg:w-[250px] lg:h-[220px] xl:w-[300px] xl:h-[290px] 2xl:w-[360px] 2xl:h-[370px] mb-10 sm:mb-0 sm:mt-2'

                alt='testimonal participant'
              />
              <span className='text-[16px] md:text-[16px] lg:text-[18px] xl-[19px] 2xl:text0[20px] font-semibold'>{st.title}</span>
            </div>


          </div>
        ))}

      </Carousel>
    </div>
  );
};
