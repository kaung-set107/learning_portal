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
export default function Banner() {
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [imageList, setImageList] = useState([])
    const Last = imageList.map((i) => {
        return {
            lastModified: i.lastModified,
            lastModifiedDate: i.lastModifiedDate,
            name: i.name,
            size: i.size,
            type: i.type,
            webkitRelativePath: i.webkitRelativePath
        }
    })
    console.log(Last, 'iii')
    const [view, setView] = useState('')
    const [description, setDescription] = useState('')
    const bSize = { "width": "full", "height": "full" }
    // console.log(
    //     listData.selectedFile?.split('base64,')[1]
    // )
    const handleChange = e => {
        let array = []
        for (const item of e) {
            array.push(item)
        }
        setImageList(array)
    }
    const create = () => {
        const formData = new FormData();
        // formData.append("bannerSize", bSize);
        formData.append("images", Last);
        formData.append("view", view);
        formData.append("section", 'hello');

        apiInstance
            .post("banners", formData, {
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
                <Link to='/testimonial' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>

            <div className='flex flex-col mx-8 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Uploaded Date</label>
                    <Input
                        type='date'
                        variant='bordered'
                        placeholder='Enter name ...'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>View</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='eg: home '
                        onChange={(e) => setView(e.target.value)}
                    />
                </div>



            </div>

            <div className='mx-8 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 '>
                    <Textarea
                        className='text-sm font-semibold'
                        variant='bordered'
                        type='text'
                        label='Description'
                        placeholder='description'
                        onChange={(e) => setDescription(e.target.value)}
                        labelPlacement='outside'
                    />
                </div>
            </div>
            <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                <label className='text-sm font-semibold'>Photo</label>

                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name='file'
                    types={fileTypes}
                    className='w-full'
                />

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
