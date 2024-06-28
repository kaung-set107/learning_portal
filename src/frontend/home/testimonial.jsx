
import Img1 from '../../assets/img/imageTesti.png'
import Quote from '../../assets/img/quote.svg'
import { Image } from '@nextui-org/react'
import MSINav from "./msinav";
import Footer from './footer'
import React, { useEffect, useState } from 'react'
import apiInstance from '../../util/api';
import { getFile } from '../../util';
import Loading from '../../assets/img/finalloading.gif'
export default function Testimonial() {
    const [testimonialList, setTestimonialList] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        window.scroll(0, 0)
        const getTestimonial = async () => {
            await apiInstance
                .get(`testimonials`)
                .then((res) => {
                    setTestimonialList(res.data.data);
                    // console.log(res.data.data, 'att')
                    // setPages(res.data._metadata.page_count);
                });
        };

        getTestimonial();
    }, [])


    return (
        <div>
            <MSINav />
            <div className='container'>
                <div className='w-[152px] h-[60px] p-24'>
                    <span className='text-[30px] font-bold text-[#0B2743] font-nunito pl-1 sm:pl-[160px] md:pl-[240px] lg:pl-[340px] xl:pl-[500px]'>Testimonials</span>
                </div >
                {!testimonialList[0] ? (
                    <div className='flex justify-center pt-[40px]'>
                        <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />

                    </div>) : (<div className='flex flex-col gap-[20px] sm:gap-[40px] md:gap-10 lg:gap-[60px] 2xl:gap-[80px] 2xl:container '>
                        {testimonialList.map((item, index) => (
                            <div>
                                {index % 2 !== 0 ? (
                                    <>
                                        <div className={index % 2 !== 0 ? ' h-auto hidden sm:flex justify-around sm:gap-3 xl:gap-[106px] 2xl:gap-[200px]' : 'h-auto hidden sm:flex sm:gap-3 gap-10  '} key={index}  >

                                            <div className='w-[702px] h-auto 2xl:w-[1000px] flex justify-end '>
                                                <div className=' flex flex-col gap-7'>
                                                    <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    <span className='text-[20px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] font-semibold text-[#0B2743] '>

                                                        {item?.description}
                                                    </span>
                                                    <div className='flex justify-end items-end'>
                                                        <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    </div>

                                                </div>

                                            </div>
                                            <div className={index % 2 !== 0 ? 'w-[330px] md:w-[348px] h-[512px] lg:w-[360px] xl:w-[380px] bg-[#0B2743]' : 'w-[348px] h-[512px] bg-[#B7203F]'}>

                                                <div className='flex flex-col gap-5'>
                                                    <div className='flex justify-center'>
                                                        <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[230px] md:w-[251px] h-[396px] lg:w-[260px] xl:w-[280px] pt-[69px] 2xl:w-[300px] flex justify-center rounded-lg' />
                                                    </div>
                                                    <div className='flex justify-center p-3'>
                                                        <div className='flex flex-col gap-1 w-[251px] h-[396px] '>
                                                            <span className='text-[20px] font-extrabold text-[#FAFAFA] w-[300px]  '>
                                                                {item?.title}
                                                            </span>
                                                            <span className='text-[16px] font-normal text-[#FAFAFA] w-[291px] h-[22px] '>
                                                                MSI Academy Student
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* For Mobile */}
                                        <div className={index % 2 !== 0 ? ' h-auto sm:hidden flex flex-col justify-around gap-5' : 'h-auto sm:hidden flex flex-col gap-5 '} key={index}  >
                                            <div className={index % 2 !== 0 ? 'w-[330px] md:w-[348px] h-[512px] lg:w-[360px] xl:w-[380px] bg-[#0B2743]' : 'w-[348px] h-[512px] bg-[#B7203F]'}>

                                                <div className='flex flex-col gap-5'>
                                                    <div className='flex justify-center'>
                                                        <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[230px] md:w-[251px] h-[396px] lg:w-[260px] xl:w-[280px] pt-[69px] flex justify-center rounded-lg' />
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <div className='flex flex-col gap-1 w-[251px] h-[100px] '>
                                                            <span className='text-[20px] font-extrabold text-[#FAFAFA] w-[300px]  '>
                                                                {item?.title}
                                                            </span>
                                                            <span className='text-[16px] font-normal text-[#FAFAFA] w-[291px] h-[22px] '>
                                                                MSI Academy Student
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className='w-[350px] h-auto flex  '>
                                                <div className=' flex flex-col gap-7'>
                                                    <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    <span className='text-[14px] lg:text-[25px] xl:text-[28px] 2xl:text-[30px] font-semibold text-[#0B2743] '>

                                                        {item?.description}
                                                    </span>
                                                    <div className='flex justify-end items-end'>
                                                        <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </>

                                ) : (
                                    <>
                                        <div className={index % 2 !== 0 ? ' h-auto hidden sm:flex sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 justify-around gap-2' : 'h-auto hidden sm:flex sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 gap-2 '} key={index}  >
                                            <div className={index % 2 !== 0 ? 'w-[348px] h-[512px] bg-[#0B2743]' : 'w-[348px] h-[512px] bg-[#B7203F]'}>

                                                <div className='flex flex-col gap-5'>
                                                    <div className='flex justify-center'>
                                                        <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[230px] md:w-[251px] h-[396px] lg:w-[260px] xl:w-[280px] pt-[69px] flex justify-center rounded-lg' />
                                                    </div>
                                                    <div className='flex justify-center p-3'>
                                                        <div className='flex flex-col gap-1 w-[251px] h-[396px] '>
                                                            <span className='text-[20px] font-extrabold text-[#FAFAFA] w-[300px]  '>
                                                                {item?.title}
                                                            </span>
                                                            <span className='text-[16px] font-normal text-[#FAFAFA] w-[291px] h-[22px] '>
                                                                MSI Academy Student
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className='w-[702px] h-auto flex justify-end '>
                                                <div className=' flex flex-col gap-7'>
                                                    <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    <span className='text-[20px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[25px] 2xl:text-[30px] font-semibold text-[#0B2743] '>
                                                        {item?.description}
                                                    </span>
                                                    <div className='flex justify-end items-end'>
                                                        <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* For Mobile */}
                                        <div className={index % 2 !== 0 ? ' h-auto flex flex-col sm:hidden justify-around gap-2' : 'h-auto  flex flex-col sm:hidden gap-2 '} key={index}  >
                                            <div className={index % 2 !== 0 ? 'w-[348px] h-[512px] bg-[#0B2743]' : 'w-[348px] h-[512px] bg-[#B7203F]'}>

                                                <div className='flex flex-col gap-5'>
                                                    <div className='flex justify-center'>
                                                        <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[230px] md:w-[251px] h-[396px] lg:w-[260px] xl:w-[280px] pt-[69px] flex justify-center rounded-lg' />
                                                    </div>
                                                    <div className='flex justify-center'>
                                                        <div className='flex flex-col gap-1 w-[251px] h-[100px] '>
                                                            <span className='text-[20px] font-extrabold text-[#FAFAFA] w-[300px]  '>
                                                                {item?.title}
                                                            </span>
                                                            <span className='text-[16px] font-normal text-[#FAFAFA] w-[291px] h-[22px] '>
                                                                MSI Academy Student
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className='w-[350px] h-auto  flex justify-end '>
                                                <div className=' flex flex-col gap-7 '>
                                                    <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    <span className='text-[14px] lg:text-[25px] xl:text-[28px] 2xl:text-[30px] font-semibold text-[#0B2743] '>
                                                        {item?.description}
                                                    </span>
                                                    <div className='flex justify-end items-end'>
                                                        <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </>


                                )}
                            </div>

                        ))}
                    </div>)}




            </div >
            <div className='md:pt-[10px] lg:pt-[20px] xl:pt-[30px]'>
                <Footer />
            </div>

        </div>

    )
}
