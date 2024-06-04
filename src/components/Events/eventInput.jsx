import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";
export default function Event() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [remark, setRemark] = useState('')
    const [location, setLocation] = useState('')
    const [venue, setVenue] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [listData, setListData] = useState({})
    const [thumbnail, setThumbnail] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [speakerName, setSpeakerName] = useState('')
    const [speakerImage, setSpeakerImage] = useState('')
    const [speakerSpecialty, setSpeakerSpecialty] = useState('')
    const [speakerIntroduction, setSpeakerIntroduction] = useState('')

    const handleThuminalImage = (e) => {
        if (e.target.files) {
            setThumbnail(e.target.files[0]);
            // console.log(e.target.files, "file");
        }
    };

    const handleSpeakerImage = (e) => {
        if (e.target.files) {
            setSpeakerImage(e.target.files[0]);
            // console.log(e.target.files, "file");
        }
    };
    const create = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", listData.selectedFile?.split('base64,')[1]);
        formData.append("subTitle", subTitle);
        formData.append("location", location);
        formData.append("venue", venue);
        formData.append("remark", remark);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("thumbnail", thumbnail);
        formData.append("speakerImage", speakerImage);
        formData.append("speakerName", speakerName);
        formData.append("speakerSpecialty", speakerSpecialty);
        formData.append("speakerIntroduction", speakerIntroduction);
        // const data = {
        //     title: title,
        //     description: description,
        //     image: listData.selectedFile?.split('base64,')[1],
        //     subTitle: subTitle,
        //     location: location,
        //     venue: venue,
        //     remark: remark,
        //     startDate: startDate,
        //     endDate: endDate
        // }
        apiInstance
            .post("events", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Event Created ",
                    text: "Successful",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                alert(error);
            });
    };


    return (
        <div className='gap-3 '>
            <div className='rounded-none py-3 text-left'>
                <Link to='/event' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>
            <form
                onSubmit={handleSubmit(create)}

            >
                <div className='flex flex-col mx-8 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <div className='flex gap-5'>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className={title ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Title</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder='Enter your  title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className={subTitle ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Sub Title</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder='Enter your sub title'
                                onChange={(e) => setSubTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>Location</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder='Enter your location'
                                className='mt-2'
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 sm:gap-4'>
                            <label className='text-sm font-semibold'>Event Photo</label>
                            <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setListData({ ...listData, selectedFile: base64 })} className='border-1 border-slate-300 rounded-lg' />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className={startDate ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Start Date</label>
                            <Input
                                type='date'
                                variant='bordered'
                                // placeholder='Enter your category title'
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className={endDate ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>End Date</label>
                            <Input
                                type='date'
                                variant='bordered'
                                // placeholder='Enter your category title'
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>Venue</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder='Enter your venue'
                                onChange={(e) => setVenue(e.target.value)}
                            />
                        </div>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>Remark</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder='Enter your remark'
                                onChange={(e) => setRemark(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>Event Banner Photo</label>
                            <input
                                type='file'
                                onChange={handleThuminalImage}
                                variant='bordered'
                                placeholder='Enter your venue'
                                className='border-1 border-slate-300 h-10 rounded-md'
                            // onChange={(e) => setThumbnail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>Speaker Photo</label>
                            <input
                                type='file'
                                variant='bordered'
                                onChange={handleSpeakerImage}
                                className='border-1 border-slate-300 h-10 rounded-md'
                            // onChange={(e) => setSpeakerImage(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className='flex gap-5'>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className={speakerName ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Speaker Name</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder='Enter speaker name'
                                onChange={(e) => setSpeakerName(e.target.value)}
                            />
                        </div>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>Speaker Specialty</label>
                            <Input
                                type='text'
                                variant='bordered'
                                placeholder="Enter speaker's qualify"
                                onChange={(e) => setSpeakerSpecialty(e.target.value)}
                            />
                        </div>

                    </div>
                </div>
                <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className={startTime ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Event Start Time</label>
                        <Input
                            variant='bordered'
                            type='time'

                            placeholder=".."
                            onChange={(e) => setStartTime(e.target.value)}
                            className={startTime ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}

                        />
                    </div>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className={endTime ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Event End Time</label>
                        <Input
                            variant='bordered'
                            type='time'

                            className={endTime ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}
                            placeholder=".."
                            onChange={(e) => setEndTime(e.target.value)}

                        />
                    </div>
                </div>
                <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <Textarea
                            variant='bordered'
                            type='text'
                            label='Speaker Introduction'
                            placeholder='Write intro ...'
                            onChange={(e) => setSpeakerIntroduction(e.target.value)}
                            labelPlacement='outside'
                        />
                    </div>
                </div>
                <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className={description ? 'text-sm font-semibold' : 'text-red-600 font-semibold'}>Description</label>
                        <Textarea
                            variant='bordered'
                            type='text'


                            placeholder='description'
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                </div>


                <div className='flex justify-center gap-10 py-4'>
                    <Button color='danger'>
                        <Link to='/category'>Cancel</Link>
                    </Button>
                    <Button color='primary' type='submit'>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}
