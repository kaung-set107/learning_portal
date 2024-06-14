import React, { useState } from 'react'
import { Button, DatePicker, Input, TimeInput } from "@nextui-org/react";
import { Link } from 'react-router-dom';
export default function CounsellorInput() {
    const [name, setName] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [date, setDate] = useState('')
    const [addSection, setAddSection] = useState([])
    const [showNextSection, setShowNextSection] = useState(false)
    const DateFormat = `${date.day}-${date.month}-${date.year}`


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
            date: DateFormat,
            time: addSection.map((i) => {
                return {
                    startTime: `${i.startTime.hour > 12 ? i.startTime.hour - 12 : i.startTime.hour}:${i.startTime.minute}`,
                    endTime: `${i.endTime.hour > 12 ? i.endTime.hour - 12 : i.endTime.hour}:${i.endTime.minute}`,

                }
            })
        }
        console.log(data, 'data')
    }
    return (
        <div>
            <div className='flex flex-col gap-4 text-[16px] font-medium'>
                <div>
                    <label className=''>Counsellor Name</label>
                    <Input type='text' id='tn' placeholder='Enter Name' className='form-control' onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <DatePicker
                        label={"Date"}
                        className=""
                        description=""
                        labelPlacement="outside"
                        onChange={(e) => setDate(e)}
                    />
                </div>
                <h3 className='text-decoration-underline'>Time </h3>
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


            </div>
            {/* Footer Button */}
            <div className='mt-10 '>
                <Link to='/counsellors' className=' rounded-2 text-red-600 bg-slate-200 p-3 rounded-xl ' >Cancel</Link>
                <Button className=' rounded-2 ml-2 text-[#fff] bg-blue-950 ' onClick={create}>Create</Button>
            </div>
        </div>
    )
}
