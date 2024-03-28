import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
export default function Testimonial() {
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const handleImage = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            console.log(e.target.files, "file");
        }
    };
    const create = () => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);


        apiInstance
            .post("testimonials", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
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
                    <label className='text-sm font-semibold'>Event Photo</label>
                    <Input
                        type='file'
                        onChange={handleImage}
                        multiple
                        placeholder=' '
                        labelPlacement='outside'
                        variant={variant}
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
