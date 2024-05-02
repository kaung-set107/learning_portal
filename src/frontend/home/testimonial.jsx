
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

    const handleSeeMore = (id) => {
        console.log(id, 'id')
        if (testimonialList.filter((el, ind) => ind === id)[0]) {
            setShow(true)
        }

    }
    const handleSeeLess = (id) => {
        console.log(id, 'id')
        setShow(false)

    }
    return (
        <div>
            <MSINav />
            <div className='container'>
                <div className='w-[152px] h-[60px] p-24'>
                    <span className='text-[40px] font-bold text-[#0B2743] font-nunito pl-[300px] lg:pl-[340px] xl:pl-[550px]'>Testimonials</span>
                </div >
                {!testimonialList[0] ? (
                    <div className='flex justify-center pt-[40px]'>
                        <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />

                    </div>) : (<div className='flex flex-col gap-3 '>
                        {testimonialList.map((item, index) => (
                            <div>
                                {index % 2 !== 0 ? (
                                    <div className={index % 2 !== 0 ? ' h-[720px] flex justify-around gap-[106px]' : 'h-[720px] flex gap-[106px] '} key={index}  >

                                        <div className='w-[702px] h-[276px] flex justify-end '>
                                            <div className=' flex flex-col gap-7'>
                                                <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                <span className='text-[20px] lg:text-[25px] xl:text-[28px] 2xl:text-[30px] font-semibold text-[#0B2743] '>

                                                    {item?.description.substring(0, 500)} ......
                                                </span>
                                                <div className='flex justify-end items-end'>
                                                    <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                </div>

                                            </div>

                                        </div>
                                        <div className={index % 2 !== 0 ? 'w-[330px] md:w-[348px] h-[512px] lg:w-[360px] xl:w-[380px] bg-[#0B2743]' : 'w-[348px] h-[512px] bg-[#B7203F]'}>

                                            <div className='flex flex-col gap-5'>
                                                <div className='flex justify-center'>
                                                    <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[230px] md:w-[251px] h-[396px] lg:w-[260px] xl:w-[280px] pt-[69px] flex justify-center rounded-lg' />
                                                </div>
                                                <div className='flex justify-center'>
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
                                ) : (
                                    <div className={index % 2 !== 0 ? ' h-[720px] flex justify-around gap-[106px]' : 'h-[720px] flex gap-[106px] '} key={index}  >
                                        <div className={index % 2 !== 0 ? 'w-[348px] h-[512px] bg-[#0B2743]' : 'w-[348px] h-[512px] bg-[#B7203F]'}>

                                            <div className='flex flex-col gap-5'>
                                                <div className='flex justify-center'>
                                                    <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[230px] md:w-[251px] h-[396px] lg:w-[260px] xl:w-[280px] pt-[69px] flex justify-center rounded-lg' />
                                                </div>
                                                <div className='flex justify-center'>
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

                                        <div className='w-[702px] h-[276px] flex justify-end '>
                                            <div className=' flex flex-col gap-7'>
                                                <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                <span className='text-[20px] lg:text-[25px] xl:text-[28px] 2xl:text-[30px] font-semibold text-[#0B2743] '>
                                                    {item?.description.substring(0, 550)} ......
                                                </span>
                                                <div className='flex justify-end items-end'>
                                                    <img src={Quote} className='w-[25px] lg:w-[30px] xl:w-[40px] lg:h-[60px]' />
                                                </div>

                                            </div>

                                        </div>

                                    </div>
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
