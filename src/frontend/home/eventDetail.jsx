import React, { useState, useEffect, } from 'react'
import apiInstance from '../../util/api'
import { Card, Image, Button, Divider } from '@nextui-org/react'
import MSINav from '../home/msinav'
import { Link, useLocation } from 'react-router-dom'
export default function EventDetail() {
    const location = useLocation()
    const EventID = location.pathname.split('/')[2]
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        const getEvent = async () => {
            await apiInstance.get(`events/${EventID}`).then((res) => {
                setEventList(res.data.data);
                console.log(res.data.data, 'list')
            });
        };

        getEvent();
    }, [])
    return (
        <div className=' '>
            <MSINav />
            <div className='container flex flex-col gap-10 my-10'>
                <div className='flex gap-32'>
                    <Image
                        src={`data:image/jpeg;base64,${eventList?.image}`}
                        className=' w-[420px] h-[411px]  rounded-[24px]'

                    />
                    <div className='flex flex-col gap-4 p-10'>
                        <span className='text-[32px] font-semibold text-[#003BB3]'>MSI Academy Education Graduration Ceremony</span>
                        <div className='flex flex-col gap-8'>
                            <div className='text-[20px] flex gap-10'>
                                <span className='w-[240px]'>Event Date</span>
                                <b className='text-[blue]'>-</b>
                                <span>4.9.2024</span>
                            </div>

                            <div className='text-[20px] flex gap-10'>
                                <span className='w-[240px]'>Event Time</span>
                                <b className='text-[blue]'>-</b>
                                <span>9:00 A.M To 12:00 P.M</span>
                            </div>
                            <div className='text-[20px] flex gap-10'>
                                <span className='w-[335px]'>Event Location</span>
                                <b className='text-[blue]'>-</b>
                                <span>Room 303, Third Floor, Khattar Street, Grand Khattar Residence, Sanchaung Township, Yangon, Myanmar.</span>
                            </div>
                        </div>
                    </div>

                </div>
                {/* About */}
                <div>
                    <span className='text-[32px] font-semibold text-[#003BB3]'>About Event</span>
                    <p className='text-[20px] font-normal pt-10'>
                        A graduation ceremony is a significant event that celebrates academic achievements. During this memorable occasion, graduates don their caps and gowns, symbolizing the culmination of years of hard work and dedication. As they walk across the stage, they receive their well-earned diplomas, a tangible representation of their knowledge and perseverance. Inspirational speeches resonate through the hall, encouraging graduates to embrace their futures with enthusiasm. Families and friends cheer, capturing the joyous moments on camera. Tassels are turned, signifying the transition from student to graduate. Amid laughter and tears, the air fills with anticipation—a promise of new beginnings. 🌟🎓<br></br>
                        A graduation ceremony is a significant event that celebrates academic achievements. During this memorable occasion, graduates don their caps and gowns, symbolizing the culmination of years of hard work and dedication. As they walk across the stage, they receive their well-earned diplomas, a tangible representation of their knowledge and perseverance. Inspirational speeches resonate through the hall, encouraging graduates to embrace their futures with enthusiasm. Families and friends cheer, capturing the joyous moments on camera. Tassels are turned, signifying the transition from student to graduate. Amid laughter and tears, the air fills with anticipation—a promise of new beginnings. 🌟🎓




                    </p>
                </div>

                {/* Speaker */}
                <div className='bg-[#0B2743] h-[667px] pl-[242px] pt-[98px] pr-[673px] pb-[86px] '>
                    <div className=' w-[525px] h-[482px] flex flex-col gap-10'>
                        <span className='text-[28px] font-light uppercase text-[#fff]'>Speaker</span>
                        <p className='text-[20px] font-normal text-[#fff]'>
                            Ma Phoo Phoo is an experienced IELTS coach dedicated to helping students succeed in the IELTS exam. With [number of years] years of experience in language teaching, they specialize in personalized coaching tailored to each student's needs. Known for their interactive approach and proven results, [Name of Coach] has helped numerous students achieve their desired scores and advance their academic and professional goals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
