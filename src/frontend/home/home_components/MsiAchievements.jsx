import { Carousel } from "react-responsive-carousel";
import ms1 from "../../../assets/MSIAchievement/1.jpg";
import ms2 from "../../../assets/MSIAchievement/2.png";
import ms3 from "../../../assets/MSIAchievement/3.png";
import ms4 from "../../../assets/MSIAchievement/4.png";
import ms5 from "../../../assets/MSIAchievement/5.png";
import ms6 from "../../../assets/MSIAchievement/6.png";
import ms7 from "../../../assets/MSIAchievement/7.png";
import ms8 from "../../../assets/MSIAchievement/8.png";
import ms9 from "../../../assets/MSIAchievement/9.png";
import ms10 from "../../../assets/MSIAchievement/10.png";
import ms11 from "../../../assets/MSIAchievement/11.png";
import ms12 from "../../../assets/MSIAchievement/12.png";
import ms13 from "../../../assets/MSIAchievement/13.png";
import ms14 from "../../../assets/MSIAchievement/14.png";
import ms15 from "../../../assets/MSIAchievement/15.png";
import ms16 from "../../../assets/MSIAchievement/16.png";
import ms17 from "../../../assets/MSIAchievement/17.png";
import ms18 from "../../../assets/MSIAchievement/18.png";
import ms19 from "../../../assets/MSIAchievement/19.png";
import ms20 from "../../../assets/MSIAchievement/20.png";
import ms21 from "../../../assets/MSIAchievement/21.png";
import ms22 from "../../../assets/MSIAchievement/22.jpg";
import ms23 from "../../../assets/MSIAchievement/23.png";

import Wave from "../../../assets/img/wave.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faTrophy } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image } from "@nextui-org/react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
export const MsiAchievements = () => {
  const images = [
    {
      img1: ms1,
      desc1: '2020 Partner Appreciation Award',
      img2: ms2,
      desc2: 'Appreciation Award',
      img3: ms3,
      desc3: 'Appreciation Award',
      img4: ms4,
      desc4: 'Best Agency in ASEAN Award',
    },

    {
      img1: ms5,
      desc1: 'Best New Agent Award 2017',
      img2: ms6,
      desc2: 'Best Partnership2019',
      img3: ms7,
      desc3: 'Best Performance Recruitment Partner Award',
      img4: ms8,
      desc4: 'Best Performing Partner',
    },
    {
      img1: ms9,
      desc1: 'Best Supportive Business Partner',
      img2: ms10,
      desc2: 'Best Uprising Partnership Award 2023',
      img3: ms11,
      desc3: 'Excellent Performing Award',
      img4: ms12,
      desc4: 'Excellent Performing Award1',
    },

    {
      img1: ms13,
      desc1: 'In Appreciation of Our Partnership',
      img2: ms14,
      desc2: 'Kaplan Singapore 10 Years Friendship Award 2021',
      img3: ms15,
      desc3: 'Outstanding International Student Recruitment Partner Award',
      img4: ms16,
      desc4: 'Rising Star Award',

    },
    {

      img1: ms17,
      desc1: 'Space Egg Activity',
      img2: ms18,
      desc2: 'Strategic Planning for Business Success',
      img3: ms19,
      desc3: 'The Best Performing Partner in 2021',
      img4: ms20,
      desc4: 'The Excellence Award',
    },
    {
      img1: ms21,
      desc1: 'The Most Outstanding Agent Award',
      img2: ms22,
      desc2: 'TMC',
      img3: ms23,
      desc3: 'Top Agent Awardy',
    },


  ];

  return (
    <div className=" pb-10 lg:pb-36 before:w-[15%] before:aspect-square before:rounded-full before:content-[''] before:absolute before:top-0 before:left-0 before:-translate-x-2/4 before:-translate-y-2/4 " >
      <h2 className='text-center text-[#0B2743] font-semibold text-[40px] font-[Poppins] mr-9 mb-9 mt-12'>
        Our Achievements
      </h2>

      <Carousel
        interval={3000}
        // showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        transitionTime={1000}
        showStatus={false}
        showThumbs={false}

      >

        {images.map((st, index) => (
          <div
            key={index}
            className='bg-[#fff] grid grid-cols-1 lg:grid-cols-4 md:py-10 lg:py-12 2xl:py-14 px-5'
          >
            <div className='p-5'>
              <Image
                src={st.img1}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
              <span className='text-[16px] md:text-[16px] lg:text-[18px] xl-[19px] 2xl:text0[20px] font-semibold'>{st.desc1}</span>
            </div>
            <div className='p-5'>
              <Image
                src={st.img2}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
              <span className='text-[16px] md:text-[16px] lg:text-[18px] xl-[19px] 2xl:text0[20px] font-semibold'>{st.desc2}</span>
            </div>

            <div className='p-5'>
              <Image
                src={st.img3}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
              <span className='text-[16px] md:text-[16px] lg:text-[18px] xl-[19px] 2xl:text0[20px] font-semibold'>{st.desc3}</span>
            </div>
            <div className='p-5'>
              <Image
                src={st.img4}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
              <span className='text-[16px] md:text-[16px] lg:text-[18px] xl-[19px] 2xl:text0[20px] font-semibold'>{st.desc4}</span>
            </div>

          </div>
        ))}

      </Carousel>
    </div>
  );
};
