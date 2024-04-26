import { Carousel } from "react-responsive-carousel";
import ms1 from "../../../assets/img/msic1.png";
import ms2 from "../../../assets/img/msic2.png";
import ms3 from "../../../assets/img/msic3.png";
import ms4 from "../../../assets/img/msic4.png";
import ms5 from "../../../assets/img/msic5.png";
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
      img: ms1,
      ac1: {
        title: "Best Performing Partner 2017",
        desc: "Taylors' University (Malaysia)",
      },
      ac2: {
        title: "In Appreciation of Our Partnership 2019",
        desc: "Asia Pacific University (Singapore)",
      },
      ac3: {
        title: "The Best Performing Partner in 2021",
        desc: "James Cook University (Australia, Singapore Campus)",
      },
    },
    {
      img: ms2,
      ac1: {
        title: "Best Supportive Business Partner 2018",
        desc: "MDIS University (Singapore)",
      },
      ac2: {
        title: "Appreciation Award 2018",
        desc: "PSB Academy (Singapore)",
      },
      ac3: {
        title: "Best Partnership 2019",
        desc: "James Cook University (Australia, Singapore Campus)",
      },
    },
    {
      img: ms3,
      ac1: {
        title: "Best Agency in ASEAN Award 2016",
        desc: "Webster University (Thailand)",
      },
      ac2: {
        title: "Appreciation Award 2019",
        desc: "B.H.M.S (Switzerland)",
      },
      ac3: {
        title: "The Excellence Award 2018",
        desc: "SIM (Singapore)",
      },
    },
    {
      img: ms4,
      ac1: {
        title: "Partner Appreciation Award 2020/2021",
        desc: "INTI International University Colleges (Malaysia)",
      },
      ac2: {
        title: "Rising Star Award 2017/2018",
        desc: "B.H.M.S University (Switzerland)",
      },
      ac3: {
        title: "The Most Outstanding Agent Award 2015",
        desc: "Webster University (U.S.A, Thailand Campus)",
      },
    },
    {
      img: ms5,
      ac1: {
        title: "The Most Outstanding Agent Award 2015",
        desc: "KDU University (Malaysia)",
      },
      ac2: {
        title: "Singapore Education Specialist Certificate 2017",
        desc: "TMC Acamedy (Singapore)",
      },
      ac3: {
        title: "The Most Outstanding Agent Award 2016",
        desc: "PSB Academy (Singapore)",
      },
    },
  ];

  return (
    <div className=" pb-10 lg:pb-36 before:w-[15%] before:aspect-square before:rounded-full before:content-[''] before:absolute before:top-0 before:left-0 before:-translate-x-2/4 before:-translate-y-2/4 " >
      <h2 className='text-center text-[#0B2743] font-semibold text-[40px] font-[Poppins] mr-9 mb-9 mt-12'>
        Our Achievements
      </h2>
      <Carousel
        interval={3000}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        transitionTime={1000}
        showStatus={false}
        showThumbs={false}
      >

        <div
          className=' grid grid-cols-4 md:py-10 px-5'
        >
          <div className='p-5'>
            <Image
              src={ms1}
              style={{ width: "370px", height: "300px" }}
              className='object-cover rounded-xl'
              alt='testimonal participant'
            />
          </div>
          <div className='p-5'>
            <Image
              src={ms2}
              style={{ width: "370px", height: "300px" }}
              className='object-cover rounded-xl'
              alt='testimonal participant'
            />
          </div>

          <div className='p-5'>
            <Image
              src={ms3}
              style={{ width: "370px", height: "300px" }}
              className='object-cover rounded-xl'
              alt='testimonal participant'
            />
          </div>
          <div className='p-5'>
            <Image
              src={ms4}
              style={{ width: "370px", height: "300px" }}
              className='object-cover rounded-xl'
              alt='testimonal participant'
            />
          </div>

          {/* <div className='p-5 hidden md:block'>
              <Image
                src={st.img2}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
            </div> */}
        </div>
        <div className=' grid grid-cols-4 md:py-10 px-5'>
          <div className='p-5'>
            <Image
              src={ms5}
              style={{ width: "370px", height: "300px" }}
              className='object-cover rounded-xl'
              alt='testimonal participant'
            />
          </div>
        </div>

      </Carousel>
    </div>
  );
};
