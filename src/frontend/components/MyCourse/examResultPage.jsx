import {
    Card,
    CardBody,
    Button,
    CardHeader,
    Image,
    Divider,
    Textarea,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
// import {useEffect,useState} from 'react'

import { faEye, faClock, faCalendarDays, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import apiInstance from "../../util/api";
import Exam from "./examTab";
import Assignment from "./assignTab";
import Module from "./moduleTab";
import TabValueComponent from "./sub-detail-head";
import Nav from "../../home/header";
import PF from '../../../assets/img/pf.png'
import QP from '../../../assets/img/qp.png'
const ExamResult = ({ ResData, showResult }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [effectValue, setEffectValue] = useState("");
    const handleTabClick = (tabNumber, effect) => {
        setActiveTab(tabNumber);
    };
    const location = useLocation();
    // console.log(location.state?.data, "body");

    const SubData = location.state;
    // console.log(ResData, "dat");

    return (
        <div>
            {/* body */}



            <div>
                <div className='flex flex-col gap-20 w-full h-[1500px] mt-5'>
                    {/* First Section */}
                    <div className='flex justify-between'>
                        <div className='flex gap-5'>
                            <div>
                                <FontAwesomeIcon icon={faArrowLeft} size='2xl' className='mt-[0.7rem] text-[blue]' />
                            </div>

                            <span className='text-[32px] font-semibold'>In App Exam Result Details</span>
                        </div>

                        <div className='flex justify-center items-center p-6 w-[500px] h-[43px] bg-[#ECF2FF]  rounded-lg'>
                            <span className='text-[16px] font-semibold  text-[#3D70F5] w-[391px] h-[19px]'>Result Declared on 12:30 AM | 22 September 2023</span>
                        </div>
                    </div>

                    {/* Second Section */}
                    <div className='flex gap-10'>
                        <div>
                            <Image src={ResData.image} className='rounded-[50%] w-[105px] h-[100px]' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[24px] font-semibold'>{ResData.name}</span>
                            <span className='text-[16px] font-semibold'>Student ID : {ResData.studentID}</span>
                            <span className='text-[16px] font-medium text-[#2C62EE]'><FontAwesomeIcon icon={faEye} size='sm' /> &nbsp;View Profile</span>
                        </div>
                    </div>

                    {/* Third Section */}

                    <div className='flex flex-col gap-10'>
                        <span className='text-[24px] font-semibold'>GED Social Studies mid semester Exam.</span>
                        <div className='flex gap-2 '>
                            <div className='bg-[#BB1E3F] rounded-lg p-4 w-[226px]'>
                                <span className='text-[16px] font-medium text-[#fff]'>Batch 3CO - JVY</span>
                            </div>
                            <div className='bg-[#BB1E3F] rounded-lg p-4 w-[226px]'>
                                <span className='text-[16px] font-medium text-[#fff]'><FontAwesomeIcon icon={faClock} size='sm' /> &nbsp;12:40 PM - 5:00 PM</span>
                            </div>
                            <div className='bg-[#BB1E3F] rounded-lg p-4 w-[236px]'>
                                <span className='text-[16px] font-medium text-[#fff]'><FontAwesomeIcon icon={faCalendarDays} /> &nbsp;Start Date-02-12-2023</span>
                            </div>
                            <div className='bg-[#BB1E3F] rounded-lg p-4 w-[226px]'>
                                <span className='text-[16px] font-medium text-[#fff]'><FontAwesomeIcon icon={faCalendarDays} /> &nbsp;End Date-02-12-2023</span>
                            </div>
                            <div className='bg-[#C1FFD6] rounded-lg p-4 w-[226px]'>
                                <span className='text-[16px] font-medium text-[#00825B]'>Status : Pass</span>
                            </div>
                        </div>

                    </div>

                    {/* Fourth Section */}
                    <div className='flex flex-col gap-3'>
                        <span className='text-[20px] font-normal'>Course : GED</span>
                        <span className='text-[20px] font-normal'>Subject : Social Studies</span>
                        <span className='text-[20px] font-normal'>Total Questions : 100</span>
                        <span className='text-[20px] font-normal'>Distinction Marks : 80</span>
                        <span className='text-[20px] font-normal'>Total Marks : 82</span>
                        <span className='text-[20px] font-normal'>Passing Persentage : 85%</span>
                    </div>

                    {/* Fifth Section */}
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col gap-5'>
                            <span className='text-[16px] font-semibold'>Question Paper</span>
                            <div className='flex gap-4 items-center'>
                                <span><Image src={QP} /></span>
                                <span className='text-[16px] font-normal'>GED Social Studies.pdf</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <span className='text-[16px] font-semibold'>Answer Paper</span>
                            <div className='flex gap-4 items-center'>
                                <span><Image src={QP} /></span>
                                <span className='text-[16px] font-normal'>GED Social Studies.pdf</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <span className='text-[16px] font-semibold'>Your Score</span>
                            <div className='flex flex-col gap-4 '>
                                <span className='border-1 rounded-lg border-green-500 w-[80px] text-center p-2 text-[green]'>82/100</span>
                                <span className='text-[16px] font-normal'>Your Percentage: <b className='text-[green]'>64%</b></span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='flex flex-col gap-3'>
                        <span className='text-[16px] font-semibold'>Description</span>
                        <div className='text-[#0025A9] w-[1200px] h-[125px] rounded-lg p-10 bg-[#EBF0FF] text-[20px] font-semibold'>Great Job! Keep Trying.</div>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default ExamResult;
