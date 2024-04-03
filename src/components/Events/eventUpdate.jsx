import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import FileBase64 from 'react-file-base64';
export default function Eventupdate() {
    const uselocation = useLocation()
    const eventId = uselocation.pathname?.split('/')[2]
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
    const [oldImage, setOldImage] = useState('')

    const create = () => {
        const data = {
            title: title,
            description: description,
            image: listData ? listData.selectedFile?.split('base64,')[1] : oldImage,
            subTitle: subTitle,
            location: location,
            venue: venue,
            remark: remark,
            startDate: startDate,
            endDate: endDate
        }


        apiInstance
            .put(`events/${eventId}`, data)
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Event Update Successful",
                    text: "",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                });
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        const getCourses = async () => {
            await apiInstance
                .get(`events/${eventId}`)
                .then((res) => {
                    // setCourseList(res.data.data);
                    // console.log(res.data.data, 'att')
                    setTitle(res.data.data?.title)
                    setSubTitle(res.data.data?.subTitle)
                    setLocation(res.data.data?.location)
                    setDescription(res.data.data?.description)
                    setRemark(res.data.data?.remark)
                    setVenue(res.data.data?.venue)
                    setStartDate(res.data.data?.startDate?.split('T')[0])
                    setEndDate(res.data.data?.endDate?.split('T')[0])
                    setOldImage(res.data.data?.image)


                });
        };
        getCourses()
    }, [])
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Sub Title</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter your sub title'
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Location</label>
                    <Input
                        type='text'
                        variant='bordered'
                        value={location}
                        placeholder='Enter your location'
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 sm:gap-4'>
                    <label className='text-sm font-semibold'>Event Photo</label>
                    <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setListData({ ...listData, selectedFile: base64 })} />
                    <Image src={`data:image/jpeg;base64,${listData.selectedFile ? listData.selectedFile?.split('base64,')[1] : oldImage}`} className='w-[60px] h-[60px]' />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Start Date</label>
                    <Input
                        type='date'
                        variant='bordered'
                        // placeholder='Enter your category title'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>End Date</label>
                    <Input
                        type='date'
                        variant='bordered'
                        value={endDate}
                        // placeholder='Enter your category title'
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Venue</label>
                    <Input
                        type='text'
                        variant='bordered'
                        value={venue}
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
                        value={remark}
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
                        value={description}
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
