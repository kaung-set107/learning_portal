
import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FileUploader } from 'react-drag-drop-files'
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
import FileBase64 from 'react-file-base64';
const fileTypes = ['JPG', 'PNG', 'GIF']

export default function ActivitiesInput() {
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [previewImg, setPreviewImg] = useState([])
    const [imageList1, setImageList1] = useState([])
    const [imageList2, setImageList2] = useState([])
    const [imageList3, setImageList3] = useState([])
    // const Last = imageList.map((i) => {
    //     return {
    //         lastModified: i.lastModified,
    //         lastModifiedDate: i.lastModifiedDate,
    //         name: i.name,
    //         size: i.size,
    //         type: i.type,
    //         webkitRelativePath: i.webkitRelativePath
    //     }
    // })
    // console.log(Last, 'iii')
    const [view, setView] = useState('')
    const [description1, setDescription1] = useState('')
    const [description2, setDescription2] = useState('')
    const [description3, setDescription3] = useState('')
    const bSize = { "width": "full", "height": "full" }
    // console.log(
    //     JSON.stringify({ description1: description1, description2: description2, description3: description3 }), 'desc'
    // )
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
        previewImg.forEach(item => {
            formData.append('bannerImage', item) // Assuming 'item' is a File object
        })
        imageList1.forEach(item => {
            formData.append('section1', item) // Assuming 'item' is a File object
        })
        imageList2.forEach(item => {
            formData.append('section2', item) // Assuming 'item' is a File object
        })
        imageList3.forEach(item => {
            formData.append('section3', item) // Assuming 'item' is a File object
        })

        apiInstance
            .post("news-and-activities", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Banner Create Successful",
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

                </div>
                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                    <label className='text-sm font-semibold'>Section 1 Image</label>

                    <FileUploader
                        multiple={true}
                        handleChange={handleChange1}
                        name='file'
                        types={fileTypes}
                        className='w-full'
                    />

                </div>
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

                </div>
            </div>
            <div className='mx-4 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-5'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 '>

                    <Textarea
                        className='text-sm font-semibold'
                        variant='bordered'
                        type='text'
                        label='Description 1'
                        placeholder='description....'
                        onChange={(e) => setDescription1(e.target.value)}
                        labelPlacement='outside'
                    />

                    {/* <CKEditor data="<p>Hello from CKEditor 5!</p>" /> */}

                </div>
            </div>
            <div className='mx-4 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 '>

                    <Textarea
                        className='text-sm font-semibold'
                        variant='bordered'
                        type='text'
                        label='Description 2'
                        placeholder='description....'
                        onChange={(e) => setDescription2(e.target.value)}
                        labelPlacement='outside'
                    />

                </div>

            </div>
            <div className='mx-4 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 '>

                    <Textarea
                        className='text-sm font-semibold'
                        variant='bordered'
                        type='text'
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
