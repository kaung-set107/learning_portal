import React, { useEffect, useState } from 'react'
import { Button, Checkbox, DatePicker, Input, TimeInput } from "@nextui-org/react";
import { Link, useLocation } from 'react-router-dom';
import apiInstance from '../../util/api';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
export default function CounsellorInput() {

    const [name, setName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [checkVal, setCheckVal] = useState(false)
    const [addSection, setAddSection] = useState([])
    const [showNextSection, setShowNextSection] = useState(false)
    // const DateFormat = `${date.day}-${date.month}-${date.year}`


    const AddSection = () => {

        setAddSection([
            ...addSection,
            {

                startTime: startTime,
                endTime: endTime
            }
        ])

        // console.log(proMedName, 'pro med')

        setShowNextSection(true)
        setStartTime('')
        setEndTime('')
    }

    const create = () => {
        const data = {
            name: name,
            available: checkVal,
            schedule: addSection.map((i) => {
                return {
                    startTime: `${i.startTime.hour > 12 ? i.startTime.hour - 12 : i.startTime.hour}:${i.startTime.minute} ${i.startTime.hour > 12 ? 'PM' : 'AM'}`,
                    endTime: `${i.endTime.hour > 12 ? i.endTime.hour - 12 : i.endTime.hour}:${i.endTime.minute} ${i.endTime.hour > 12 ? 'PM' : 'AM'}`,

                }
            })
        }

        apiInstance
            .post("counsellors", data,)
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Counsellor Created Successful",
                    text: "",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                alert(error);
            });
    }


    return (
        <div className='flex flex-col gap-5'>
            <div className='rounded-none py-3 text-left'>
                <Link to='/counsellors' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>
            <div className='flex flex-col gap-4 text-[16px] font-medium'>
                <div>
                    <label className=' font-bold'>Counsellor Name</label>
                    <Input type='text' id='tn' placeholder='Enter Name' className='form-control' onChange={(e) => setName(e.target.value)} />
                </div>

                <h3 className='text-decoration-underline font-bold'>Time </h3>
                <div className='flex gap-5  rounded-1 p-3 mt-2'>


                    <TimeInput label="Start Time" isRequired onChange={(e) => setStartTime(e)} />


                    <TimeInput label="End Time" isRequired onChange={(e) => setEndTime(e)} />


                    <div>
                        <Button className='bg-blue-950 text-[#fff] rounded-2' onClick={AddSection}>+ Add Time</Button>
                    </div>



                </div>
                {showNextSection ? (
                    <>

                        {addSection.map((item, index) => (
                            <div className='flex gap-5  rounded-1 p-3 mt-2'>



                                <TimeInput label="Start Time" value={item.startTime} isRequired onChange={(e) => setStartTime(e)} />


                                <TimeInput label="End Time" isRequired value={item.endTime} onChange={(e) => setEndTime(e)} />

                                <div className='w-64'></div>
                            </div>
                        ))}
                    </>
                ) : (
                    // <h3 className='text-decoration-underline'>Time </h3>
                    ''
                )}

                <div className='flex gap-2'>

                    <span className='font-bold'>Available</span>
                    <Checkbox onChange={() => setCheckVal(!checkVal)} />

                </div>
            </div>
            {/* Footer Button */}
            <div className='mt-10 '>
                <Link to='/counsellors' className=' rounded-2 text-red-600 bg-slate-200 p-3 rounded-xl ' >Cancel</Link>
                <Button className=' rounded-2 ml-2 text-[#fff] bg-blue-950 ' onClick={create}>Create</Button>
            </div>
        </div>
    )
}
