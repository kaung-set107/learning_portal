import { Carousel } from "react-responsive-carousel";
import ms1 from "../../../assets/img/msic1.png";
import ms2 from "../../../assets/img/msic2.png";
import ms3 from "../../../assets/img/msic3.png";
import ms4 from "../../../assets/img/msic4.png";
import ms5 from "../../../assets/img/msic5.png";
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
    <div className="relative overflow-hidden pb-10 lg:pb-36 before:w-[15%] before:aspect-square before:rounded-full before:bg-[#26496a] before:content-[''] before:absolute before:top-0 before:left-0 before:-translate-x-2/4 before:-translate-y-2/4 ">
      <h2 className='text-end text-[#BC1F40] font-semibold text-4xl mr-9 mb-9 mt-12'>
        Our Achievements
      </h2>
      <VerticalTimeline>
        {images.map((ac, index) => (
          <>
            <VerticalTimelineElement
              key={index}
              className='vertical-timeline-element--work'
              contentStyle={{ background: "#224362", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  #224362" }}
              date='2011 - present'
              iconStyle={{ background: "#224362", color: "#fff" }}
              icon={<FontAwesomeIcon icon={faTrophy} />}
            >
              <div className='flex flex-col lg:flex-row items-center justify-around px-2'>
                <Image
                  src={ac.img}
                  alt='awards'
                  style={{ width: "100px", height: "80px" }}
                />
                <div className='flex justify-end w-3/4 lg:w-1/3 flex-col'>
                  <span className='font-[semibold] pt-10'>
                    <p className='text-xl text-left'>{ac.ac1.title}</p>
                    <p className='text-lg text-[#ffffff]  text-left'>
                      {ac.ac1.desc}
                    </p>
                  </span>
                </div>
              </div>
            </VerticalTimelineElement>
          </>
        ))}
      </VerticalTimeline>
    </div>
  );
};
