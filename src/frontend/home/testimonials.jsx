import { Carousel } from "react-responsive-carousel";
import st1 from "../../assets/img/st1.jpeg";
import st2 from "../../assets/img/st2.jpeg";
import st3 from "../../assets/img/st3.jpg";
import { Image } from "@nextui-org/react";
import Swiper from "react-id-swiper";
export const Testimonials = () => {
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
        className='text-4xl font-semibold ml-9 py-5'
        style={{ fontWeight: "900" }}
      >
        Testimonials
      </h2>
      <div>
        {images.map((st, index) => (
          <div
            key={index}
            className='bg-primary flex flex-col gap-10 lg:flex-row justify-center md:py-10 px-5 bg-[#26496a]'
          >
            <div className='flex flex-col justify-center w-full lg:w-2/4 px-10  py-10 text-white text-start'>
              <h2 className='font-semibold text-4xl my-3'>{st.name}</h2>
              <span className='font-regular'>{st.rev}</span>
            </div>
            <Image
              src={st.img}
              width='370'
              height='470'
              className='object-cover'
              alt='testimonal participant'
            />
            <div className='border-b-1'></div>
          </div>
        ))}
      </div>
    </div>
  );
};
