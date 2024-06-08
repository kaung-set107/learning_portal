import React, { useState, useEffect, } from 'react'
import apiInstance from '../../util/api'
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
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
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function Contact() {
    const Items = [
        {
            id: 1,
            name: "Online"
        }, {
            id: 2,
            name: "Friends"
        }, {
            id: 3,
            name: "Website"
        }
    ]
    const defaultProps = {
        center: {
            lat: 16.80074855425139,
            lng: 96.12812930265584
        },
        zoom: 11
    };

    const location = useLocation()
    const EventID = location.pathname.split('/')[2]
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        window.scroll(0, 0)
        const getEvent = async () => {
            await apiInstance.get(`events/${EventID}`).then((res) => {
                setEventList(res.data.data);
                console.log(res.data.data, 'list')
            });
        };

        getEvent();
    }, [])
    return (
        <div className='contact'>
            <MSINav />
            <div className='bg-[#0B2743]'>
                <div className='bg-[#fff] h-[900px] w-[1000px] overflow-visible '>
                    <div className='w-[545px] h-[480px] p-24 absolute left-[20px]'>
                        <div className='flex w-[356px] h-[68px] font-[Montserrat-Bold] gap-4'>
                            <span className='text-[50px] text-[#0B2743] font-bold'>Get </span>
                            <span className='text-[50px] text-[#0B2743] font-bold'>in</span>
                            <span className='text-[#BC1F40] text-[50px] font-bold'>Touch</span>
                        </div>
                        <span className='text-[14px] font-semibold w-[844px] h-[24px]'>Contact MSI Academy & start your journey with us!</span>
                        <div className='flex flex-col gap-4 pt-16 w-[545px]'>
                            <Input variant='bordered' type='text' placeholder='Name' />
                            <Input variant='bordered' type='email' placeholder='Email' />
                            <Input variant='bordered' type='phone' placeholder='Phone Number' />
                            <Select
                                label="How did you find us!"
                                className=""
                            >
                                {Items.map((item) => (
                                    <SelectItem key={item.id} value={item.name}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Button className='w-[545px] h-[50px] bg-[#0B2743] text-[16px] font-bold text-[#fff] font-[Montserrat-Bold]'>Send</Button>
                            <div className='flex gap-20 pt-10'>
                                <div className='flex gap-5'>
                                    <FontAwesomeIcon icon={faPhone} size='lg' className='text-[#000] ' />
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-[#0B2743] text-[16px] font-semibold uppercase font-[Montserrat-Bold]'>Phone</span>
                                        <span className='text-[16px] font-medium text-[#BC1F40] w-[150px] '>09422557884</span>
                                        <span className='text-[16px] font-medium text-[#BC1F40] w-[150px] '>09781447554 </span>
                                    </div>

                                </div>
                                <div className='flex gap-5'>
                                    <FontAwesomeIcon icon={faEnvelope} size='lg' className='text-[#000] ' />
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-[#0B2743] text-[16px] font-semibold uppercase font-[Montserrat-Bold]'>Email</span>
                                        <span className='text-[16px] font-medium text-[#BC1F40]  '>info@msiacademy.edu.mm</span>
                                        <span className='text-[16px] font-medium text-[#BC1F40]  '>academicdept@msiacademy.edu.mm</span>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className=' h-[700px] w-[545px]  top-[200px] absolute right-[30px]' >
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            <AnyReactComponent
                                lat={16.80074855425139}
                                lng={96.12812930265584}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div>
                </div>

                {/* <div className='bg-[#DD5471] h-[700px] w-[545px] absolute top-[200px] left-[1000px] '>
                </div> */}


            </div>
            <div className=''>
                <Footer />
            </div>

        </div>



    )
}
