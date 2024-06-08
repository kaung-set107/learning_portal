import React, { useState, useEffect } from 'react'
import apiInstance from '../../util/api'
import { Link, Image } from '@nextui-org/react'
import MSINav from "./msinav";
import Loading from '../../assets/img/finalloading.gif'
import Footer from "./footer";
import moment from "moment-timezone";
export default function EventPage() {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        window.scroll(0, 0)
        const getEvent = async () => {
            await apiInstance.get(`events`).then((res) => {
                setEventList(res.data.data);
            });
        };

        getEvent();
    }, [])
    // const dateTime = moment(quizResult?.answerDate).locale("en").tz("Asia/Yangon");
    // const formattedDateTime = dateTime.format("LLLL");
    return (
        <div>
            <MSINav />
            {/* Event */}
            < div style={{ background: "var(--blue-pale, #F4FAFF)", }} className='flex flex-col gap-10 sm:gap-24' >
                <div className='flex flex-col justify-center items-center gap-4 pt-[44px]'>
                    <span className='text-[#1F4164] text-[30px] sm:text-[48px] font-semibold w-full  sm:w-[679px] h-[55px] text-center'>Our Events</span>
                    {/* <p className='text-[#1F4164] text-[16px] sm:text-[18px] font-normal w-full  sm:w-[639px] h-[54px] text-center'>
                        Clarity gives you the blocks & components you need to create a truly professional website, landing page or admin panel for your SaaS.
                    </p> */}
                </div>
                {!eventList[0] ? (
                    <div className='flex justify-center pt-[40px]'>
                        <Image src={Loading} className='transform-x-[-1] w-[350px] h-[250px]' />

                    </div>) : (
                    <>
                        {/* Web */}
                        {/* Web */}
                        < div className='hidden sm:grid grid-cols-4 lg:gap-5 items-center justify-around  pl-[130px] pr-[33px] w-full h-full' >
                            {eventList?.map((b, index) => (
                                <Link href={`/events/${b._id}`} key={index}>
                                    <div className='relative cursor-pointer hover:translate-y-1 hover:scale-105 duration-500'>
                                        <Image
                                            src={`data:image/jpeg;base64,${b?.image}`}
                                            className=' md:w-[320px] md:h-[511px] lg:w-[390px] lg:h-[450px]  rounded-[24px]'
                                        // width={620}
                                        // height={354}
                                        />
                                        <div
                                            className='h-[200px] flex flex-col pt-20  justify-start absolute bottom-0 w-full p-4 z-50 rounded-[20px]'
                                            style={{
                                                background:
                                                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                                            }}
                                        >
                                            <h3 className=' text-[20px]  text-white font-semibold '>
                                                {b.title}
                                            </h3>
                                            <p className='font-[light] text-[15px] text-white'>
                                                {b.startDate?.split('T')[0]}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )



                            )}
                        </div >
                        {/* Mobile */}
                        < div className='grid sm:hidden grid-cols-1 gap-10 items-center justify-around flex-wrap pl-[40px] pr-[33px]' >
                            {
                                eventList?.map((b, index) => (
                                    <Link href={`/events/${b._id}`} key={index}>
                                        <div className='relative cursor-pointer'>
                                            <Image
                                                src={`data:image/jpeg;base64,${b?.image}`}
                                                className=' w-[300px] h-[411px]  rounded-[24px]'
                                            // width={620}
                                            // height={354}
                                            />
                                            <div
                                                className='h-[200px] flex flex-col items-start justify-start sm:items-center sm:justify-center absolute bottom-0 w-[200px] sm:w-[300px] p-2 z-50 rounded-[20px]'
                                                style={{
                                                    background:
                                                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 125.65%)",
                                                }}
                                            >
                                                <h3 className='text-[16px] w-[200px] sm:w-full sm:text-[20px]  text-white font-semibold '>
                                                    {b.title}
                                                </h3>
                                                <p className='font-[light] text-[15px] text-white'>
                                                    {b.startDate?.split('T')[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )

                                )
                            }
                        </div >
                    </>
                )}



            </div >

            <div className='md:mt-[80px] lg:mt-[100px] xl:mt-[120px] 2xl:mt-[140px]'>
                <Footer />
            </div>
        </div>
    )
}
