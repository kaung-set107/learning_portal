import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card, ButtonGroup } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import MSINav from "./msinav";
import { MsiAchievements } from "./home_components/MsiAchievements";
import { StudentAchievements } from "./home_components/StudentAchievements";
import Team1 from "../../assets/img/3.png";
import Team2 from "../../assets/img/2.png";
import Team3 from "../../assets/img/1.png";
import HeadImg from "../../assets/img/about.jpg";
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
      <div className='flex 2xl:hidden items-center justify-around gap-48 flex-wrap md:w-[768px] lg:w-[1024px] lg:h-[615px] xl:w-[1280px] xl:h-[615px]   md:h-[555px] ' style={{ backgroundImage: `url(${HeadImg})`, backgroundRepeat: 'no-repeat', }}>
        <div className='flex flex-col gap-32 overflow-hidden'>
          <div className='flex flex-col justify-center md:left-[50px] md:top-[385px] md:right-[50px] lg:top-[190px] lg:left-[90px] lg:right:-[90px] xl:top-[200px] xl:left-[150px] xl:right-[150px] absolute md:w-[600px] lg:w-[900px] '>
            <span className='text-[30px] md:text-[30px] lg:text-[40px] 2xl:[48px] font-medium text-[#fff] flex justify-center'>"Explore Limitless Opportunities:</span>
            <span className='text-[30px] md:text-[30px] lg:text-[40px] 2xl:[48px] font-medium text-[#fff] flex justify-center'>Your Gateway to Overseas MSI Education"</span>

          </div>
          <Link href='/booking' className='md:mt-[190px] lg:mt-[150px] xl:mt-[160px] 2xl:mt-[170px] flex justify-center'>
            <Button className='w-[150px] md:w-[140px] lg:w-[190px] 2xl:w-[229px] h-[55px] md:h-[45px] lg:h-[60px] 2xL:h-[66px] bg-[#0B2743] text-[#fff] text-[16px] md:text-[16px] lg:text-[20px] 2xl:text-[24px] font-medium'>Book Now</Button>
          </Link>
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

      {/* For BackImage */}
      <div className='hidden 2xl:flex items-center justify-around gap-48 flex-wrap h-[615px] ' style={{ backgroundImage: `url(${HeadImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className='flex flex-col gap-32 overflow-hidden'>
          <div className='flex flex-col justify-center '>
            <span className='text-[30px] md:text-[30px] lg:text-[40px] 2xl:[48px] font-medium text-[#fff] flex justify-center'>"Explore Limitless Opportunities:</span>
            <span className='text-[30px] md:text-[30px] lg:text-[40px] 2xl:[48px] font-medium text-[#fff] flex justify-center'>Your Gateway to Overseas MSI Education"</span>

          </div>
          <Link href='/booking' className='md:mt-[190px] lg:mt-[150px] xl:mt-[160px] 2xl:mt-[170px] flex justify-center'>
            <Button className='w-[150px] md:w-[140px] lg:w-[190px] 2xl:w-[229px] h-[55px] md:h-[45px] lg:h-[60px] 2xL:h-[66px] bg-[#0B2743] text-[#fff] text-[16px] md:text-[16px] lg:text-[20px] 2xl:text-[24px] font-medium'>Book Now</Button>
          </Link>
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
      <div className=' absolute pl-[150px] md:pl-[45px] lg:pl-[35px] xl:pl-[36px] 2xl:pl-[150px] pr-[50px] md:top-[650px] lg:top-[560px] xl:top-[570px] 2xl:top-[740px] lg:mt-[120px]'>
        <div className='flex md:flex-col lg:flex-col  xl:flex-row xl:gap-32 gap-10 md:gap-10 lg:gap-0 pl-[78px] md:pt-[20px] lg:pt-[50px] lg:pl-[40px] pr-[75px] bg-white md:w-[680px] lg:w-[950px] xl:w-[1200px] xl:h-[450px] h-[556px] md:h-[800px] lg:h-[730px] 2xl:w-[1200px] 2xl:h-[500px]'>
          <div className='w-[480px]'>
            <h1 className='text-[60px] md:text-[70px] leading-[60px] font-semibold flex flex-col gap-0'>
              {/* <small className='text-[#224362]'>About </small> <br />
            // <small className='text-[#BC1F40]'>MSI Academy</small> */}
              <span className='text-[#000] text-[14px] font-medium font-[Gilroy] uppercase leading-[30px]'>Who we are</span>
              <span className='text-[#0B2743] text-[40px] font-medium font-[Poppins]'>About us</span>
            </h1>
            <p className='font-normal text-[16px] my-5 md:w-[559px] lg:w-[900px] xl:w-[550px]'>
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
              className='w-[350px] md:w-[550px] h-[200px]  md:h-[300px] lg:w-[850px] xl:w-[450px] xl:h-[300px] lg:h-[300px]'
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
      <div className='overflow-hidden md:pt-[0px] 2xl:pt-[150px] pt-[90px]'>

        <div className='w-full md:w-[1980px] lg:w-[2000px]  md:h-[850px] lg:h-[700px] xl:h-[460px] bg-[#0B2743] overflow-hidden'>
        </div>
        <div className='hidden xl:flex w-[238px] h-[238px] bg-[#0B2743] rounded-[50%] -left-[150px] md:top-[1220px] lg:top-[1200px] xl:top-[1150px] 2xl:top-[1360px] absolute'></div>
      </div>
      {/* Founder */}
      <div className='w-[946px] h-[420px] flex flex-col gap-10 justify-center pt-[290px] container'>
        <h1 className='text-[40px] text-[#1C4064] font-[semibold] text-center '>
          Founders of MSI Academy
        </h1>
        <div className='flex gap-2'>

          <div
            className=' rounded-[20px]  mt-10'

          >
            <Image

              className='w-[273px] h-[292px]'
              style={{ borderRadius: '0px 157.68px' }}

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
            className='rounded-[20px]  mt-10'

          >
            <Image
              width={325}
              className='w-[273px] h-[292px]'
              style={{ borderRadius: '147.68px 147.68px 0px 0px' }}


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
            className='bg-white rounded-[20px]  mt-10'

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
