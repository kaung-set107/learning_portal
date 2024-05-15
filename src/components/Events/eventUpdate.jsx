import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";
import { getFile } from "../../util";
export default function Eventupdate() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
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
    const [bannerOldImage, setBannerOldImage] = useState('')
    const [speakerOldImage, setSpeakerOldImage] = useState('')
    const [showBannerImg, setShowBannerImg] = useState('')
    const [showSpeakerImg, setShowSpeakerImg] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [speakerName, setSpeakerName] = useState('')
    const [speakerImage, setSpeakerImage] = useState('')
    const [speakerSpecialty, setSpeakerSpecialty] = useState('')
    const [speakerIntroduction, setSpeakerIntroduction] = useState('')

    const handleThuminalImage = (e) => {

        const file = e.target.files[0];
        setThumbnail(e.target.files[0]);
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setShowBannerImg(url);

        }
    };

    const handleSpeakerImage = (e) => {
        const file = e.target.files[0];
        setSpeakerImage(e.target.files[0]);
        console.log(e.target.files[0], 'lll')
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setShowSpeakerImg(url);

        }
    };
    const create = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", listData.selectedFile ? listData.selectedFile?.split('base64,')[1] : oldImage);
        formData.append("subTitle", subTitle);
        formData.append("location", location);
        formData.append("venue", venue);
        formData.append("remark", remark);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("thumbnail", thumbnail ? thumbnail : bannerOldImage);
        formData.append("speakerImage", speakerImage ? speakerImage : speakerOldImage);
        formData.append("speakerName", speakerName);
        formData.append("speakerSpecialty", speakerSpecialty);
        formData.append("speakerIntroduction", speakerIntroduction);

        apiInstance
            .put(`events/${eventId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Event Updated",
                    text: "Successful",
                    showConfirmButton: false,
                    timer: 2000

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
                    const speaker = res.data.data.speaker ? res.data.data.speaker : ''
                    setSpeakerName(speaker.name)
                    setSpeakerSpecialty(speaker.specialty)
                    setSpeakerIntroduction(speaker.introduction)
                    setStartTime(res.data.data.startTime)
                    setEndTime(res.data.data.endTime)
                    setSpeakerOldImage(res.data.data.speaker.image ? getFile({ payload: res.data.data.speaker.image[0] }) : '')
                    setBannerOldImage(res.data.data.thumbnail ? getFile({ payload: res.data.data.thumbnail[0] }) : '')



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
                <div className='flex gap-4'>
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
                </div>
                <div className='flex gap-4'>
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
                </div>

                <div className='flex gap-4'>
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
                </div>
                <div className='flex gap-4'>
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

                <div className='flex gap-5'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className='text-sm font-semibold'>Event Banner Photo</label>
                        <Input
                            accept="image/*"
                            type='file'
                            onChange={handleThuminalImage}
                            variant='bordered'
                            placeholder='Enter your venue'
                        // onChange={(e) => setThumbnail(e.target.value)}
                        />
                        {/* <img src={thumbnail} /> */}
                        <Image src={showBannerImg ? showBannerImg : bannerOldImage} className='w-[150px] h-[70px]' />
                    </div>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className='text-sm font-semibold'>Speaker Photo</label>
                        <Input
                            type='file'
                            accept="image/*"
                            variant='bordered'
                            onChange={handleSpeakerImage}
                        // onChange={(e) => setSpeakerImage(e.target.value)}
                        />
                        <Image src={showSpeakerImg ? showSpeakerImg : speakerOldImage} className='w-[70px] h-[70px]' />
                    </div>

                </div>
                <div className='flex gap-5'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className='text-sm font-semibold'>Speaker Name</label>
                        <Input
                            type='text'
                            variant='bordered'
                            value={speakerName}
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
                            value={speakerSpecialty}
                            onChange={(e) => setSpeakerSpecialty(e.target.value)}
                        />
                    </div>

                </div>

            </div>
            <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Input
                        variant='bordered'
                        type='time'
                        label='Event Start Time'
                        placeholder=".."
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        labelPlacement='outside'
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Input
                        variant='bordered'
                        type='time'
                        label='Event End Time'
                        placeholder=".."
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        labelPlacement='outside'
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
                        value={speakerIntroduction}
                        onChange={(e) => setSpeakerIntroduction(e.target.value)}
                        labelPlacement='outside'
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
