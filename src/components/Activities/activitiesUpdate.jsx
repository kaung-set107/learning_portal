
import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FileUploader } from 'react-drag-drop-files'
import Swal from "sweetalert2";
import { getFile } from "../../util";
const fileTypes = ['JPG', 'PNG', 'GIF']
export default function ActivitiesInput() {
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [previewImg, setPreviewImg] = useState([])
    const [imageList1, setImageList1] = useState([])
    const [imageList2, setImageList2] = useState([])
    const [imageList3, setImageList3] = useState([])
    const location = useLocation()
    const ID = location.pathname.split('/')[2]
    const [newsList, setNewsList] = useState([])
    const [description1, setDescription1] = useState('')
    const [description2, setDescription2] = useState('')
    const [description3, setDescription3] = useState('')
    const [oldPrev1, setOldPrev1] = useState('')
    const [oldPrev2, setOldPrev2] = useState('')
    const [oldPrev3, setOldPrev3] = useState('')
    const [oldPrev4, setOldPrev4] = useState('')
    const Prev1 = URL.createObjectURL(new Blob([previewImg[0]]));
    const bSize = { "width": "full", "height": "full" }
    // console.log(
    //     JSON.stringify({ description1: description1, description2: description2, description3: description3 }), 'desc'
    // )
    useEffect(() => {
        const getNews = async () => {
            await apiInstance
                .get(`news-and-activities/${ID}`)
                .then((res) => {
                    setNewsList(res.data.data);
                    setTitle(res.data.data?.title)
                    setDescription1(res.data.data?.descriptionList?.description1)
                    setDescription2(res.data.data?.descriptionList?.description2)
                    setDescription3(res.data.data?.descriptionList?.description3)

                    if (res.data.data?.images) {
                        const prev = getFile({ payload: res.data.data?.images?.bannerImage[0] })
                        const img1 = getFile({ payload: res.data.data?.images?.section1[0] })
                        const img2 = getFile({ payload: res.data.data?.images?.section2[0] })
                        const img3 = getFile({ payload: res.data.data?.images?.section3[0] })

                        setOldPrev1(prev)
                        setOldPrev2(img1)
                        setOldPrev3(img2)
                        setOldPrev4(img3)

                    }


                });
        };

        getNews();
    }, [])
    const handlePreviewImg = e => {
        let array = []
        for (const item of e) {
            array.push(item)
        }
        setPreviewImg(array)

    }
    const handleChange1 = e => {
        let array = []
        for (const item of e) {
            array.push(item)
        }
        setImageList1(array)
    }
    const handleChange2 = e => {
        let array = []
        for (const item of e) {
            array.push(item)
        }
        setImageList2(array)
    }
    const handleChange3 = e => {
        let array = []
        for (const item of e) {
            array.push(item)
        }
        setImageList3(array)
    }
    const create = () => {
        const formData = new FormData();
        // formData.append("bannerSize", bSize);
        formData.append('title', title);
        formData.append('descriptionList', JSON.stringify({ description1: description1, description2: description2, description3: description3 }));
        previewImg ? previewImg.forEach(item => {
            formData.append('bannerImage', item) // Assuming 'item' is a File object
        }) : oldPrev1
        imageList1 ? imageList1.forEach(item => {
            formData.append('section1', item) // Assuming 'item' is a File object
        }) : oldPrev2
        imageList2 ? imageList2.forEach(item => {
            formData.append('section2', item) // Assuming 'item' is a File object
        }) : oldPrev3
        imageList3 ? imageList3.forEach(item => {
            formData.append('section3', item) // Assuming 'item' is a File object
        }) : oldPrev4

        apiInstance
            .put(`news-and-activities/${ID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Activities Updated Successful",
                    text: "",
                    showConfirmButton: false,
                    timer: 3000

                });
            })
            .catch((error) => {
                alert(error);
            });
    };


    return (
        <div className='gap-3 '>
            <div className='rounded-none py-3 text-left'>
                <Link to='/activities-list' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>

            <div className='flex flex-col mx-8 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Title</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter title ...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>


            </div>


            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mt-3'>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                    <label className='text-sm font-semibold'>Preview Image</label>

                    <FileUploader
                        multiple={true}
                        handleChange={handlePreviewImg}
                        name='file'
                        types={fileTypes}
                        className='w-full'
                    />
                    <Image src={!previewImg ? Prev1 : oldPrev1} className='w-[928px] h-[336px]' />

                </div>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mt-3'>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                    <label className='text-sm font-semibold'>Section 1 Image</label>

                    <FileUploader
                        multiple={true}
                        handleChange={handleChange1}
                        name='file'
                        types={fileTypes}
                        className='w-full'
                    />
                    <Image src={oldPrev2} className='w-[500px] h-[336px]' />
                </div>

            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mt-3 mx-8 '>

                <Textarea
                    className='text-sm font-semibold'
                    variant='bordered'
                    type='text'
                    label='Description 1'
                    value={description1}
                    placeholder='description....'
                    onChange={(e) => setDescription1(e.target.value)}
                    labelPlacement='outside'
                />

            </div>
            <div className=' flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                    <label className='text-sm font-semibold'>Section 2 Image</label>

                    <FileUploader
                        multiple={true}
                        handleChange={handleChange2}
                        name='file'
                        types={fileTypes}
                        className='w-full'
                    />
                    <Image src={oldPrev3} className='w-[500px] h-[336px]' />
                </div>

            </div>
            <div className='mx-4 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 '>

                    <Textarea
                        className='text-sm font-semibold'
                        variant='bordered'
                        type='text'
                        label='Description 2'
                        value={description2}
                        placeholder='description....'
                        onChange={(e) => setDescription2(e.target.value)}
                        labelPlacement='outside'
                    />

                </div>

            </div>

            <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                <label className='text-sm font-semibold'>Section 3 Image</label>

                <FileUploader
                    multiple={true}
                    handleChange={handleChange3}
                    name='file'
                    types={fileTypes}
                    className='w-full'
                />
                <Image src={oldPrev4} className='w-[500px] h-[336px]' />
            </div>
            <div className='mx-4 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 '>

                    <Textarea
                        className='text-sm font-semibold'
                        variant='bordered'
                        type='text'
                        value={description3}
                        label='Description 3'
                        placeholder='description.....'
                        onChange={(e) => setDescription3(e.target.value)}
                        labelPlacement='outside'
                    />

                </div>

            </div>

            <div className='flex justify-center gap-10 py-4'>
                <Button color='danger'>
                    <Link to='/category'>Cancel</Link>
                </Button>
                <Button color='primary' onClick={create}>
                    Create
                </Button>
            </div>
        </div>
    );
}
