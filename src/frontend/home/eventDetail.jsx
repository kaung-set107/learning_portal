import React, { useState, useEffect, } from 'react'
import apiInstance from '../../util/api'
import { Card, Image, Button, Divider, Input, Textarea } from '@nextui-org/react'
import MSINav from '../home/msinav'
import Footer from "./footer";
import { Link, useLocation } from 'react-router-dom'
import CVBanner from "../../assets/img/about.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar, faPhone,
    faLocationDot,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { getFile } from '../../util';
export default function EventDetail() {
    const location = useLocation()
    const EventID = location.pathname.split('/')[2]
    const [eventList, setEventList] = useState([])
    const [imgFile, setImgFile] = useState('')


    useEffect(() => {
        const getEvent = async () => {
            await apiInstance.get(`events/${EventID}`).then((res) => {
                setEventList(res.data.data);
                console.log(res.data.data, 'list')
                const img = res.data.data.thumbnail ? getFile({ payload: res.data.data.thumbnail[0] }) : ''
                setImgFile(img)
            });
        };

        getEvent();
    }, [])
    return (
        <div className=''>
            <MSINav />

            <div className=' flex flex-col gap-10 my-10 '>
                <div className='flex gap-32 lg:h-[55vh] xl:h-[60vh] 2xl:h-[70vh] ' style={{ backgroundImage: `url(${imgFile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    {/* <Image
                        src={`data:image/jpeg;base64,${eventList?.image}`}
                        className=' w-[420px] h-[411px]  rounded-[24px]'

                    /> */}


                </div>
                <div className='flex flex-col gap-4 container'>
                    <span className='text-[32px] font-semibold text-[#003BB3]'>{eventList?.title} ( {eventList?.subTitle} )</span>
                    <span className='xl:text-[16px] 2xl:text-[18px] font-semibold text-[#003BB3]'></span>
                    <div className='flex flex-col gap-8'>
                        <div className='text-[20px] flex gap-10'>
                            <span className='w-[240px]'>Event Date</span>
                            <b className='text-[blue]'>-</b>
                            <span>From <b className='text-[#003BB3]'>{eventList.startDate?.split('T')[0]}</b> To <b className='text-[#003BB3]'>{eventList.endDate?.split('T')[0]}</b></span>
                        </div>

                        <div className='text-[20px] flex gap-10'>
                            <span className='w-[240px]'>Event Time</span>
                            <b className='text-[blue]'>-</b>
                            <span>{eventList.startTime} To {eventList.endTime}</span>
                        </div>
                        <div className='text-[20px] flex gap-10'>
                            <span className='w-[240px]'>Event Location</span>
                            <b className='text-[blue]'>-</b>
                            <span>{eventList?.location}</span>
                        </div>
                    </div>
                </div>
                {/* About */}
                <div className='container'>
                    <span className='text-[32px] font-semibold text-[#003BB3]'>About Event</span>
                    <p className='text-[20px] font-normal pt-10'>
                        {eventList?.description}



                    </p>
                </div>

                {/* Speaker */}

                <div className='bg-[#0B2743]  h-[667px] pl-[242px] pt-[98px] pr-[673px] pb-[86px] relative overflow-hidden'>
                    <div className='bg-[#fff] w-[100px] h-[100px] opacity-[0.1] rounded-[100%] left-[39px] -top-9 absolute '></div>
                    <div className=' w-[525px] xl:w-[530px] h-[482px] flex flex-col gap-10'>
                        <span className='text-[28px] font-light uppercase text-[#fff]'>Speaker</span>
                        <p className='text-[20px] font-normal text-[#fff] h-[200px]'>
                            {eventList.speaker ? eventList.speaker.introduction : ''}
                        </p>
                        <div className='text-[#fff] flex gap-2'>
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <FontAwesomeIcon icon={faStar} size='2xl' />
                            <div className='text-[#fff] flex flex-col gap-1 pl-[640px] xl:pl-[370px] 2xl:pl-[550px]'>
                                <span className='text-[40px] font-extrabold flex justify-end items-end'>{eventList.speaker ? eventList.speaker.name : ''}</span>
                                <span className='pl-20 w-[300px] xl:w-[400px] 2xl:w-[450px] text-[20px] font-bold flex justify-end items-end'>{eventList.speaker ? eventList.speaker.specialty : ''}</span>
                            </div>
                        </div>

                        <div className=' w-[440px] xl:w-[400px] xl:h-[350px] h-[440px] absolute -right-[20px] top-0' style={{ borderRadius: '157.68px 0px', backgroundColor: 'white' }}>

                            <Image src={eventList.speaker ? getFile({ payload: eventList.speaker.image[0] }) : ''} className=' w-[416px] h-[416px] xl:w-[360px] xl:h-[330px] left-[13px] top-[10px] bottom-[10px]' style={{ borderRadius: '157.68px 0px' }} />


                        </div>

                        {/* <div className='-right-[60px]  top-[14px] absolute '>
                          
                        </div> */}


                        <div className='bg-[#fff] w-[389px] h-[389px] opacity-[0.1] rounded-[100%] -left-[230px]  -bottom-[240px] absolute '></div>
                        <div className='bg-[#fff] w-[1177px] h-[1177px] opacity-[0.1] rounded-[100%] -right-[430px]  -bottom-[640px] absolute '></div>
                    </div>

                </div>


                {/* Register */}
                <div className='xl:h-[515px] mx-20 flex flex-col gap-10'>
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
                    <div className='lg:w-[900px] xl:h-[667px] flex gap-0 pb-20 '>
                        <div className=' '>
                            <div className='relative lg:overflow-hidden xl:overflow-hidden lg:w-[300px] lg:h-[617px] bg-[#0B2743] p-10  xl:w-[350px] xl:h-[617px] flex flex-col xl:gap-10 lg:gap-9' >
                                <div className='flex flex-col '>
                                    <span className='text-[20px] lg:text-[25px] xl:text-[28px] font-semibold text-[#fff]'>Register Event</span>
                                    <span className='text-[15px] lg:text-[16px] xl:text-[18px] font-normal text-[#C9C9C9]'>Register & Join the event together!</span>
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
                                <div className=' lg:pt-[30px] xl:pt-[40px] '>
                                    <div className='bg-[#FF486F] w-[269px] h-[269px] rounded-[269px] -right-[100px] -bottom-20 absolute '></div>
                                    <div className='bg-[#BC1F40] w-[138px] h-[138px] rounded-[269px] right-[80px] lg:bottom-[50px] absolute '></div>

                                </div>


                            </div>
                        </div>
                        <div className='lg:p-10 xl:p-20 2xl:p-32 flex flex-col gap-10'>
                            <div className='flex xl:gap-10 lg:gap-5'>
                                <div className='flex flex-col'>
                                    <label>Email</label>
                                    <Input type='email' variant='underlined' className='w-[210px] lg:w-[258px] xl:w-[278px]' placeholder='Enter your email address' />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Phone</label>
                                    <Input type='phone' variant='underlined' className='w-[210px] lg:w-[258px] xl:w-[278px]' placeholder='Enter your phone number' />
                                </div>


                            </div>
                            <div className='flex flex-col '>
                                <label>Student ID/Student Number</label>
                                <Input type='text' variant='underlined' className='w-full' placeholder='enter your student ID' />
                            </div>
                            <div className='flex flex-col'>
                                <label>Message</label>
                                <Textarea type='text' variant='underlined' className='w-full' placeholder='tell us your thoughts' />
                            </div>
                            <div className='flex justify-end'>
                                <Button className='bg-[#0B2743] text-[#fff]'>Submit</Button>
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
