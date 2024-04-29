import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cer1 from "../../../assets/img/cer1.jpg";
import cer2 from "../../../assets/img/cer2.jpg";
import cer3 from "../../../assets/img/cer3.jpg";
import cer4 from "../../../assets/img/cer4.jpg";
import cer5 from "../../../assets/img/cer5.jpg";
import cer6 from "../../../assets/img/cer6.jpg";
import { Image } from "@nextui-org/react";
import EHalf from "../../../assets/img/EllipseHalf.png";
export const StudentAchievements = () => {
  const images = [
    {
      img1: cer1,
      img2: cer2,
      img3: cer3,
      img4: cer4,
    },
    {
      img1: cer5,
      img2: cer6,
    },
  ];
  return (
    <div >


      <h2 className='bg-[#BC1F40] text-[#fff] text-center font-semibold text-4xl p-16 mr-9 mb-9 mt-12 w-full overflow-hidden'>
        <img
          src={EHalf}
          className="absolute  right-0 w-[120px]  top-[1940px]"
          alt=""
        />
        Students Achievements
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
        {images.map((st, index) => (
          <div
            key={index}
            className='bg-[#fff] grid grid-cols-4 md:py-10 px-5'
          >
            <div className='p-5'>
              <Image
                src={st.img1}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
            </div>
            <div className='p-5'>
              <Image
                src={st.img2}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
            </div>

            <div className='p-5'>
              <Image
                src={st.img3}
                style={{ width: "370px", height: "300px" }}
                className='object-cover rounded-xl'
                alt='testimonal participant'
              />
            </div>
            <div className='p-5'>
              <Image
                src={st.img4}
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
        ))}
      </Carousel>
    </div>
  );
};
