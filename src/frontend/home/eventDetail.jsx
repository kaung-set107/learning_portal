import React, { useState, useEffect, } from 'react'
import apiInstance from '../../util/api'
import { Card, Image, Button, Divider, Input, Textarea } from '@nextui-org/react'
import MSINav from '../home/msinav'
import Footer from "./footer";
import { Link, useLocation } from 'react-router-dom'
import CVBanner from "../../assets/img/cvbanner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar, faPhone,
    faLocationDot,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
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
        <div className=''>
            <MSINav />

            <div className='container flex flex-col gap-10 my-10 '>
                <div className='flex gap-32' style={{ backgroundImage: `url(${CVBanner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '50vh' }}>
                    {/* <Image
                        src={`data:image/jpeg;base64,${eventList?.image}`}
                        className=' w-[420px] h-[411px]  rounded-[24px]'

                    /> */}


                </div>
                <div className='flex flex-col gap-4 '>
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
                            <span className='w-[240px]'>Event Location</span>
                            <b className='text-[blue]'>-</b>
                            <span>Room 303, Third Floor, Khattar Street, Grand Khattar Residence, Sanchaung Township, Yangon, Myanmar.</span>
                        </div>
                    </div>
                </div>
                {/* About */}
                <div>
                    <span className='text-[32px] font-semibold text-[#003BB3]'>About Event</span>
                    <p className='text-[20px] font-normal pt-10'>
                        A graduation ceremony is a significant event that celebrates academic achievements. During this memorable occasion, graduates don their caps and gowns, symbolizing the culmination of years of hard work and dedication. As they walk across the stage, they receive their well-earned diplomas, a tangible representation of their knowledge and perseverance. Inspirational speeches resonate through the hall, encouraging graduates to embrace their futures with enthusiasm. Families and friends cheer, capturing the joyous moments on camera. Tassels are turned, signifying the transition from student to graduate. Amid laughter and tears, the air fills with anticipation—a promise of new beginnings. 🌟🎓<br></br><br></br>
                        A graduation ceremony is a significant event that celebrates academic achievements. During this memorable occasion, graduates don their caps and gowns, symbolizing the culmination of years of hard work and dedication. As they walk across the stage, they receive their well-earned diplomas, a tangible representation of their knowledge and perseverance. Inspirational speeches resonate through the hall, encouraging graduates to embrace their futures with enthusiasm. Families and friends cheer, capturing the joyous moments on camera. Tassels are turned, signifying the transition from student to graduate. Amid laughter and tears, the air fills with anticipation—a promise of new beginnings. 🌟🎓




                    </p>
                </div>

                {/* Speaker */}
                <div className='bg-[#0B2743] h-[667px] pl-[242px] pt-[98px] pr-[673px] pb-[86px] relative overflow-hidden'>
                    <div className='bg-[#fff] w-[100px] h-[100px] opacity-[0.1] rounded-[100%] left-[39px] -top-9 absolute '></div>
                    <div className=' w-[525px] h-[482px] flex flex-col gap-10'>
                        <span className='text-[28px] font-light uppercase text-[#fff]'>Speaker</span>
                        <p className='text-[20px] font-normal text-[#fff]'>
                            Ma Phoo Phoo is an experienced IELTS coach dedicated to helping students succeed in the IELTS exam. With [number of years] years of experience in language teaching, they specialize in personalized coaching tailored to each student's needs. Known for their interactive approach and proven results, [Name of Coach] has helped numerous students achieve their desired scores and advance their academic and professional goals.
                            <div className='bg-[#fff] w-[80px] h-[80px] opacity-[0.1] rounded-[100%] left-[590px] top-[470px] absolute '></div>
                        </p>
                        <div className='text-[#fff] flex gap-2'>
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <div className='text-[#fff] flex flex-col gap-1 pl-[640px]'>
                                <span className='text-[40px] font-extrabold flex justify-end items-end'>Ma Phoo Phoo</span>
                                <span className='pl-20 w-[300px] text-[20px] font-bold flex justify-end items-end'>IELTS Coach</span>
                            </div>
                        </div>

                        <div className='bg-[#fff] w-[470px] h-[450px]  rounded-[100%] -right-[140px]  -top-[40px] absolute '>

                            <Image src={`data:image/jpeg;base64,${eventList?.image}`} className='rounded-[100%] w-[416px] h-[416px] top-[14px] bottom-[10px] -right-[30px]' />


                        </div>

                        {/* <div className='-right-[60px]  top-[14px] absolute '>
                          
                        </div> */}


                        <div className='bg-[#fff] w-[389px] h-[389px] opacity-[0.1] rounded-[100%] -left-[230px]  -bottom-[240px] absolute '></div>
                        <div className='bg-[#fff] w-[1177px] h-[1177px] opacity-[0.1] rounded-[100%] -right-[430px]  -bottom-[640px] absolute '></div>
                    </div>

                </div>
                {/* Register */}
                <div className='h-[515px] mx-20 flex flex-col gap-10'>
                    {/* About Reg */}
                    <div className='flex flex-col gap-10'>
                        <span className='text-[32px] font-semibold'>How To Register</span>
                        <div className='list-decimal text-[20px] font-normal leading-10 pt-6'>
                            <li> fill out the required information.</li>
                            <li>Click on the "Submit" button.</li>
                            <li>Upon completing the registration form, you will receive a confirmation email with a unique link to join the webinar on Zoom.</li>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-[20px] flex gap-10'>
                                <span className='w-[240px]'>Registration Deadline</span>
                                <b className='text-[blue]'>:</b>
                                <span>30.4.2024</span>
                            </div>
                            <div className='text-[20px] flex gap-10'>
                                <span className='w-[240px]'>Registration Fees</span>
                                <b className='text-[blue]'>:</b>
                                <span>Free</span>
                            </div>
                        </div>
                        <p className='text-[20px] font-semibold leading-[30px]'>
                            Note: Space is limited, so early registration is recommended to secure your spot. Registrants will receive instructions on how to join the webinar via Zoom closer to the event date.
                        </p>
                    </div>
                    {/* Reg Form */}
                    <div className='h-[667px] flex gap-0 pb-20'>
                        <div className='w-[491px] h-[647px] bg-[#0B2743] p-20 flex flex-col gap-10 relative overflow-hidden'>
                            <div className='flex flex-col'>
                                <span className='text-[28px] font-semibold text-[#fff]'>Register Event</span>
                                <span className='text-[18px] font-normal text-[#C9C9C9]'>Register & Join the event together!</span>
                            </div>

                            <div className='text-[#fff] flex gap-10'>
                                <FontAwesomeIcon icon={faPhone} size='lg' />
                                <span className='text-[16px] font-normal '>+1012 3456 789</span>
                            </div>
                            <div className='text-[#fff] flex gap-10'>
                                <FontAwesomeIcon icon={faEnvelope} size='lg' />
                                <span className='text-[16px] font-normal '>demo@gmail.com</span>
                            </div>
                            <div className='text-[#fff] flex gap-10'>
                                <FontAwesomeIcon icon={faLocationDot} size='lg' />
                                <span className='text-[16px] font-normal '>132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
                            </div>

                            <div className='bg-[#FF486F] w-[269px] h-[269px] rounded-[269px] -right-[100px] -bottom-20 absolute '></div>
                            <div className='bg-[#BC1F40] w-[138px] h-[138px] rounded-[269px] right-[80px] bottom-14 absolute '></div>
                        </div>
                        <div className='p-32 flex flex-col gap-10'>
                            <div className='flex gap-20'>
                                <div className='flex flex-col'>
                                    <label>Email</label>
                                    <Input type='email' variant='underlined' className='w-[278px]' placeholder='Enter your email address' />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Phone</label>
                                    <Input type='phone' variant='underlined' className='w-[278px]' placeholder='Enter your phone number' />
                                </div>


                            </div>
                            <div className='flex flex-col'>
                                <label>Student ID/Student Number</label>
                                <Input type='text' variant='underlined' className='w-full' placeholder='enter your student ID' />
                            </div>
                            <div className='flex flex-col'>
                                <label>Message</label>
                                <Textarea type='text' variant='underlined' className='w-full' placeholder='tell us your thoughts' />
                            </div>
                            <div className='flex justify-end'>
                                <Button color='primary'>Submit</Button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='pt-[600px]'>
                    <Footer />
                </div>

            </div>


        </div>

    )
}
