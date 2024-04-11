import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import MSINav from "./msinav";
import { MsiAchievements } from "./home_components/MsiAchievements";
import { StudentAchievements } from "./home_components/StudentAchievements";
import Team1 from "../../assets/img/team1.png";
import Team2 from "../../assets/img/team2.png";
import Team3 from "../../assets/img/team3.png";
import Elli from "../../assets/img/Ellipse.png";
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
      <div className='flex items-center justify-around flex-wrap md:my-[100px]'>
        <div className='w-[350px] md:w-[500px]'>
          <h1 className='text-[60px] md:text-[70px] leading-[60px] font-semibold'>
            <small className='text-[#224362]'>About </small> <br />
            <small className='text-[#BC1F40]'>MSI Academy</small>
          </h1>
          <p className='font-[regular] text-xl my-5'>
            MSI Academy was founded in 2018 and located in the calming
            environment and heart of Sanchaung, Yangon. The academy has GED
            foundation, GED preparation, IELTS courses, Duolingo, General
            English 4 skills, 2 skills, and university preparation courses. As
            of pandemic reason, the academy provides both online and in person
            classes.
          </p>
          <p className='font-[regular] text-xl'>
            Experienced and Skillful lecturers are providing the fruitful
            lectures with real world knowledges for the students.The academy has
            conducted foreign education in Southeast Asian countries and
            European countries and consulted many students with the dreams of
            international education.
          </p>
        </div>
        <div className='my-10 relative'>

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
        </div>
      </div>
      <MsiAchievements />
      <div className='bg-[#26496a] py-10 md:py-[100px] px-10'>
        <h1 className='text-[40px] text-white font-[semibold]'>
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
      </div>
      <StudentAchievements />

      <Footer />
    </div>
  );
};

export default About;
