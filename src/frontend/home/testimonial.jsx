
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
    return (
        <div>
            <MSINav />
            <div className='container '>
                <div className='w-[252px] h-[60px] pl-[754px] pr-[754px] p-24'>

                    <span className='text-[40px] font-bold text-[#0B2743] font-nunito'>Testimonials</span>


                </div >
                {!testimonialList[0] ? (
                    <div className='flex justify-center pt-[40px]'>
                        <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />

                    </div>) : (<div className='flex flex-col gap-20 '>
                        {testimonialList.map((item, index) => (
                            <div>
                                {index % 2 !== 0 ? (
                                    <div className={index % 2 !== 0 ? ' h-[720px] flex justify-around gap-[106px]' : 'h-[720px] flex gap-[106px] '} key={index}  >

                                        <div className='w-[702px] h-[276px] flex justify-end '>
                                            <div className='pl-[120px] pt-[69px] pr-[52px] pb-[151px] flex flex-col gap-10'>
                                                <img src={Quote} className='w-[60px] h-[60px]' />
                                                <span className='text-[28px] font-semibold text-[#0B2743] '>

                                                    Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim. Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim.
                                                </span>
                                                <div className='flex justify-end items-end'>
                                                    <img src={Quote} className='w-[60px] h-[60px]' />
                                                </div>

                                            </div>

                                        </div>
                                        <div className={index % 2 !== 0 ? 'w-[400px] h-[720px] bg-[#0B2743]' : 'w-[400px] h-[720px] bg-[#B7203F]'}>

                                            <div className='w-[318px] h-[512px] '>
                                                <div className='overflow-hidden'>
                                                    <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[318px] h-[500px] left-[999px] pt-[69px] absolute' />
                                                </div>
                                                <div className='overflow-hidden'>
                                                    <div className='flex flex-col gap-1'>
                                                        <span className='text-[28px] font-extrabold text-[#FAFAFA] w-[300px] pl-[52px] pt-[560px] absolute '>
                                                            {item?.title.substring(0, 12)}...
                                                        </span>
                                                        <span className='text-[16px] font-normal text-[#FAFAFA] w-[291px] h-[22px] pl-[52px] pt-[599px] absolute '>
                                                            MSI Academy Student
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <div className={index % 2 !== 0 ? ' h-[720px] flex justify-around gap-[106px]' : 'h-[720px] flex gap-[106px] '} key={index}  >
                                        <div className={index % 2 !== 0 ? 'w-[400px] h-[720px] bg-[#0B2743]' : 'w-[400px] h-[720px] bg-[#B7203F]'}>

                                            <div className='w-[318px] h-[512px]'>
                                                <div className='pl-[134px] pt-[69px] pr-[52px] pb-[151px] overflow-hidden'>
                                                    <img src={`data:image/jpeg;base64,${item?.image}`} className='w-[318px] h-[500px] absolute' />
                                                </div>
                                                <div className='pl-[134px] pt-[360px] pr-[75px] pb-[99px] overflow-hidden  '>
                                                    <div className='flex flex-col gap-1'>
                                                        <span className='text-[28px] font-extrabold text-[#FAFAFA] w-[200px] '>
                                                            {item?.title.substring(0, 12)}...
                                                        </span>
                                                        <span className='text-[16px] font-normal text-[#FAFAFA] w-[191px] h-[22px] '>
                                                            MSI Academy Student
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='w-[702px] h-[276px] flex justify-end '>
                                            <div className='pl-[120px] pt-[69px] pr-[52px] pb-[151px] flex flex-col gap-10'>
                                                <img src={Quote} className='w-[60px] h-[60px]' />
                                                <span className='text-[28px] font-semibold text-[#0B2743] '>

                                                    Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim. Error voluptate adipisci. Quas a delectus optio ut. Non consequatur voluptatem quia rerum cum similique enim.
                                                </span>
                                                <div className='flex justify-end items-end'>
                                                    <img src={Quote} className='w-[60px] h-[60px]' />
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )}
                            </div>

                        ))}
                    </div>)}




            </div >
            <div className='pt-[194px]'>
                <Footer />
            </div>

        </div>

    )
}
