import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import MSINav from "./msinav";
import { MsiAchievements } from "./home_components/MsiAchievements";
import { StudentAchievements } from "./home_components/StudentAchievements";
import Team1 from "../../assets/img/team1.png";
import Team2 from "../../assets/img/team2.png";
import Team3 from "../../assets/img/team3.png";
import Rec1 from "../../assets/img/rec1.png";
import Wave from '../../assets/img/wave.svg'
import Sli1 from '../../assets/Slider/Sli1.jpg'
import Sli2 from '../../assets/Slider/Sli2.jpg'
import Sli3 from '../../assets/Slider/Sli3.jpg'
import Sli4 from '../../assets/Slider/Sli4.jpg'
import Sli5 from '../../assets/Slider/Sli5.jpg'
import Sli6 from '../../assets/Slider/Sli6.jpg'
import Footer from "./footer";
import apiInstance from "../../util/api";
import { getFile } from "../../util";
import { Fade } from "react-awesome-reveal";
// import Footer from '../../frontend/home/footer';
const About = () => {

  const [teams, setTeams] = useState([
    {
      pic: Team1,
      name: "U Tin Aung Soe",
      role: "President",
    },
    {
      pic: Team2,
      name: "U Thet Win Naing",
      role: "Vice-President",
    },
    {
      pic: Team3,
      name: "Daw Su Su Hlaing",
      role: "Managing Director",
    },
  ]);

  return (
    <div className=''>
      <MSINav />
      {/* Intro MSI */}
      <div className='flex items-center justify-around gap-48 flex-wrap md:my-[100px] h-[435px] container'>
        <div className='flex'>
          {/* First */}
          <div className='flex flex-col h-[456px]'>
            <div className='flex justify-start'>
              <img
                src={Sli1}
                className='w-[174px] h-[173px]'
                alt=''
                style={{ borderRadius: '79.509px 0px 0px 0px' }}
              />
            </div>

            <div className='flex justify-end pt-[45px]'>
              <img
                src={Sli2}
                className='w-[90px] h-[90px]'
                alt=''
                style={{ borderRadius: '0px 0px 0px 39.755px' }}
              />
            </div>
            <div className='flex justify-start pt-[45px]'>
              <img
                src={Sli3}
                className='w-[112px] h-[112px]'
                alt=''
                style={{ borderRadius: '0px 0px 0px 71.559px' }}
              />
            </div>

          </div>
          {/* Second */}
          <div className='flex flex-col h-[456px] pl-[27px]'>
            <div className='flex justify-start pt-[35px]'>
              <img
                src={Sli3}
                className='w-[60px] h-[60px] '
                alt=''
                style={{ borderRadius: '19px' }}
              />

            </div>

            <div className='flex justify-end pt-[45px]'>
              <img
                src={Sli4}
                className='w-[144px] h-[143px]'
                alt=''
                style={{ borderRadius: '0px 79.509px 0px 0px' }}
              />
            </div>
            <div className='flex justify-start pt-[45px]'>
              <img
                src={Sli5}
                className='w-[103px] h-[102px]'
                alt=''
                style={{ borderRadius: ' 0px 0px 47.706px 0px' }}
              />
            </div>

          </div>
          {/* Third */}
          <div className='flex flex-col h-[456px] pl-[27px]'>
            <div className='flex justify-start pt-[35px] overflow-hidden'>
              <img
                src={Sli5}
                className='w-[84px] h-[83px] absolute left-[430px]'
                alt=''
                style={{ borderRadius: ' 0px 39.755px 0px 0px' }}
              />

            </div>

            <div className='flex justify-end pt-[45px]'>

            </div>
            <div className='flex justify-end pt-[45px] overflow-hidden'>
              <img
                src={Sli1}
                className='w-[131px] h-[131px] absolute top-[480px] left-[490px]'
                alt=''
                style={{ borderRadius: ' 0px 0px 71.559px 0px' }}
              />
            </div>

          </div>
        </div>
        <div className='w-[639px]'>
          <h1 className='text-[60px] md:text-[70px] leading-[60px] font-semibold'>
            {/* <small className='text-[#224362]'>About </small> <br />
            <small className='text-[#BC1F40]'>MSI Academy</small> */}
            <span className='gradient text-[40px] font-medium font-[Poppins]'>MSI Academy</span>
          </h1>
          <p className=' font-normal text-[16px] my-5 w-[605px]'>
            MSI Academy was founded in 2018 and located in the calming
            environment and heart of Sanchaung, Yangon. The academy has GED
            foundation, GED preparation, IELTS courses, Duolingo, General
            English 4 skills, 2 skills, and university preparation courses. As
            of pandemic reason, the academy provides both online and in person
            classes.
          </p>
          <div className=' bg-slate-400 w-[639px] h-[1px]'></div>
          <div className='flex flex-col gap-1 text-[18px] font-medium mt-5'>
            <span>Have any questons?.</span>
            <span>Contact us !</span>
            <span className='mt-4'>+959 422 557 884</span>
          </div>
          {/* <p className='font-[regular] text-xl'>
            Experienced and Skillful lecturers are providing the fruitful
            lectures with real world knowledges for the students.The academy has
            conducted foreign education in Southeast Asian countries and
            European countries and consulted many students with the dreams of
            international education.
          </p> */}
        </div>
        {/* <div className='my-10 relative'>

          <iframe
            className='w-[350px] h-[200px] md:w-[500px] md:h-[300px] lg:w-[600px] lg:h-[400px]'
            src='https://www.youtube.com/embed/Z8fIWXY4Q9g'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
          <img
            src={Elli}
            className='absolute top-[-80px] right-[-60px] z-10 w-[0px] md:w-[150px]'
            alt=''
          />
        </div> */}
      </div>
      {/* About MSI */}
      <div className=' absolute pl-[150px] pr-[150px] top-[520px] mt-20'>
        <div className='flex items-center justify-center gap-10 flex-wrap md:my-[100px] pl-[78px] pr-[75px] bg-white h-[556px]'>
          <div className='w-[639px]'>
            <h1 className='text-[60px] md:text-[70px] leading-[60px] font-semibold flex flex-col gap-0'>
              {/* <small className='text-[#224362]'>About </small> <br />
            // <small className='text-[#BC1F40]'>MSI Academy</small> */}
              <span className='text-[#000] text-[14px] font-medium font-[Gilroy] uppercase leading-[30px]'>Who we are</span>
              <span className='text-[#0B2743] text-[40px] font-medium font-[Poppins]'>About us</span>
            </h1>
            <p className=' font-normal text-[16px] my-5 w-[559px]'>
              MSI Academy was founded in 2018 and located in the calming
              environment and heart of Sanchaung, Yangon. The academy has GED
              foundation, GED preparation, IELTS courses, Duolingo, General
              English 4 skills, 2 skills, and university preparation courses. As
              of pandemic reason, the academy provides both online and in person
              classes.

              Experienced and Skillful lecturers are providing the fruitful
              lectures with real world knowledges for the students.The academy has
              conducted foreign education in Southeast Asian countries and
              European countries and consulted many students with the dreams of
              international education.
            </p>
          </div>
          <div className='my-10 relative'>

            <iframe
              className='w-[350px] h-[200px] md:w-[400px] md:h-[300px] lg:w-[430px] lg:h-[328px]'
              src='https://www.youtube.com/embed/Z8fIWXY4Q9g'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
            {/* <img
            src={Elli}
            className='absolute top-[-80px] right-[-60px] z-10 w-[0px] md:w-[150px]'
            alt=''
          /> */}
          </div>
        </div>
      </div>
      {/* Background Color */}
      <div className='overflow-hidden pt-[90px]'>

        <div className='w-full md:w-[1980px] h-[527px] bg-[#0B2743] overflow-hidden'>


        </div>
        <div className='w-[298px] h-[298px] bg-[#0B2743] rounded-[50%] -left-[150px] top-[1100px] absolute'></div>
      </div>
      {/* Founder */}
      <div className='w-[946px] h-[420px] flex flex-col gap-10 justify-center pt-[290px] container'>
        <h1 className='text-[40px] text-[#1C4064] font-[semibold] text-center '>
          Founders of MSI Academy
        </h1>
        <div className='flex gap-2'>
          <div
            className='rounded-[20px]  mt-10'

          >
            <Image
              width={325}
              className='w-[273px] h-[292px]'
              style={{ borderRadius: '0px 157.68px' }}

              src={Team1}
            />
            <p className='font-[semibold] my-1 text-[20px] tracking-[0.02em] text-[#000] text-center'>
              President
            </p>
            <p className='font-[light] text-[20px] tracking-[0.02em] text-[#000] text-center'>
              U Tin Aung Soe
            </p>
          </div>
          <div
            className=' rounded-[20px]  mt-10'

          >
            <Image

              className='w-[273px] h-[292px]'
              style={{ borderRadius: '147.68px 147.68px 0px 0px' }}

              src={Team2}
            />
            <p className='font-[semibold] my-1 text-[20px] tracking-[0.02em] text-[#000] text-center'>
              Vice - President
            </p>
            <p className='font-[light] text-[20px] tracking-[0.02em] text-[#000] text-center'>
              U Thet Win Naing
            </p>
          </div>
          <div
            className='bg-white rounded-[20px] ml-5 mt-10'

          >
            <Image

              className='w-[273px] h-[292px]'
              style={{ borderRadius: '147.68px 0px' }}

              src={Team3}
            />
            <p className='font-[semibold] my-1 text-[20px] tracking-[0.02em] text-[#000] text-center'>
              Managing Director
            </p>
            <p className='font-[light] text-[20px] tracking-[0.02em] text-[#000] text-center'>
              Daw Su Su Hlaing
            </p>
          </div>
        </div>

      </div>

      {/* <div className='bg-[#26496a] py-10 md:py-[100px] px-10'>
        <h1 className='text-[40px] text-white font-[semibold] '>
          Founders of MSI Academy
        </h1>
        <div className='flex items-center justify-center lg:justify-between flex-wrap'>
          {teams.map((t, index) => {
            return (
              <div
                className='bg-white rounded-[20px] mx-5 p-5 mt-10'
                key={index}
              >
                <Image
                  width={325}
                  className='rounded-[20px]'
                  height={360}
                  src={t.pic}
                ></Image>
                <p className='font-[semibold] my-1 text-[20px] tracking-[0.02em] text-primary text-center'>
                  {t.role}
                </p>
                <p className='font-[light] text-[20px] tracking-[0.02em] text-primary text-center'>
                  {t.name}
                </p>
              </div>
            );
          })}
        </div>
      </div> */}

      <div className='pt-[200px]'></div>
      <StudentAchievements />
      <div className='' style={{
        backgroundImage: `url(${Wave})`,
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
        backgroundRepeat: "no-repeat",
        padding: "64px 0px -180px 0px",
      }} >
        <MsiAchievements />
      </div>

      <div className='pt-[40px]'></div>
      <Footer />
    </div>
  );
};

export default About;
