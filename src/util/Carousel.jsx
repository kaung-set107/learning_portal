import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "@nextui-org/react";
import { getFile } from ".";
import { Link } from "react-router-dom";
import Globe from '../assets/img/msiglobe.png'
const CarouselView = ({ dataList }) => {
    console.log(dataList, 'dataList')
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
    return (
        <div className='container'>
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

                {dataList.slice(0, 4).map((e, index) => (
                    <Link to={'/activities-detail/' + e._id}

                    >

                        <Image
                            src={e.images ? getFile({ payload: e.images?.bannerImage[0] }) : ''}

                            className=' w-[200px] h-[170px] sm:w-[280px] sm:h-[230px] md:w-[320px] md:h-[250px] lg:w-[250px] lg:h-[220px] xl:w-[310px] xl:h-[290px] 2xl:w-[400px] 2xl:h-[350px] mb-10 sm:mb-0 sm:mt-2'

                            alt='testimonal participant'
                        />
                        <div className='flex p-5 flex-col justify-start flex-grow ' data-aos={'fade-up'}>

                            <Link to={'/activities-detail/' + e._id}

                                className='2xl:w-[344px] lg:h-[56px] sm:w-[200px] md:w-[300px] text-[#0B2743] text-[14px] sm:text-[16px] lg:text-[18px] 2xl:text-[24px] font-medium'
                            >
                                {e.title.substring(0, 40)}...
                            </Link>


                        </div>
                        <div className='flex justify-start items-start p-2'>
                            <div className='flex gap-2' data-aos={'fade-up'}>
                                <Image src={Globe} className='w-[25px] h-[35px] rounded-xl' />
                                <span className='flex justify-start items-start pt-1'>MSI ACADEMY</span>
                            </div>
                            <div>
                                {/* <span className='lg:text-[15px] 2xl:text-[16px] font-normal'>August 20, 2022</span> */}
                            </div>
                        </div>




                    </Link>
                ))}

            </Carousel>
        </div>
    )
}
export default CarouselView