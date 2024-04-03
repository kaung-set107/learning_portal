import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
import FileBase64 from 'react-file-base64';
export default function Event() {
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


    const create = () => {
        const data = {
            title: title,
            description: description,
            image: listData.selectedFile?.split('base64,')[1],
            subTitle: subTitle,
            location: location,
            venue: venue,
            remark: remark,
            startDate: startDate,
            endDate: endDate
        }
        apiInstance
            .post("events", data)
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Event Create Successful",
                    text: "",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
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

            <div className='flex flex-col mx-8 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Title</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter your  title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Sub Title</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter your sub title'
                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Location</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter your location'
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 sm:gap-4'>
                    <label className='text-sm font-semibold'>Event Photo</label>
                    <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setListData({ ...listData, selectedFile: base64 })} />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Start Date</label>
                    <Input
                        type='date'
                        variant='bordered'
                        // placeholder='Enter your category title'
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>End Date</label>
                    <Input
                        type='date'
                        variant='bordered'
                        // placeholder='Enter your category title'
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
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

            <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Textarea
                        variant='bordered'
                        type='text'
                        label='Description'
                        placeholder='description'
                        onChange={(e) => setDescription(e.target.value)}
                        labelPlacement='outside'
                    />
                </div>
            </div>


            <div className='flex justify-center gap-10 py-4'>
                <Button color='danger'>
                    <Link to='/category'>Cancel</Link>
                </Button>
                <Button color='primary' onClick={create}>
                    Register
                </Button>
            </div>
        </div>
    );
}
