import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
import FileBase64 from 'react-file-base64';
export default function Testimonial() {
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [image, setImage] = useState('')
    const [listData, setListData] = useState({})
    const [description, setDescription] = useState('')
    // console.log(
    //     listData.selectedFile?.split('base64,')[1]
    // )
    const create = () => {
        const data = {
            title: title,
            image: listData.selectedFile?.split('base64,')[1], //image to base64
            description: description
        }

        apiInstance
            .post("testimonials", data)

            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Testimonial Create Successful",
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
                <Link to='/testimonial' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>

            <div className='flex flex-col mx-8 w-auto flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Name</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter name ...'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2'>
                    <label className='text-sm font-semibold'>Photo</label>
                    <div className='border-1 border-slate-300 rounded-md h-10'>
                        <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setListData({ ...listData, selectedFile: base64 })} />
                    </div>


                </div>

            </div>

            <div className='mx-8 flex w-auto flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
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
