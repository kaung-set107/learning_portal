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
    const testimonialId = uselocation.pathname?.split('/')[2]
    const variant = 'bordered';
    const [listData, setListData] = useState({})
    const [title, setTitle] = useState("");
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [oldImage, setOldImage] = useState('')

    const handleImage = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            // console.log(e.target.files, "file");
        }
    };
    const create = () => {
        const data = {
            title: title,
            image: listData ? listData.selectedFile?.split('base64,')[1] : oldImage, //image to base64
            description: description
        }

        apiInstance
            .put(`testimonials/${testimonialId}`, data)
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Testimonial Update Successful",
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
                .get(`testimonials/${testimonialId}`)
                .then((res) => {
                    // setCourseList(res.data.data);
                    // console.log(res.data.data, 'att')
                    setTitle(res.data.data?.title)
                    setDescription(res.data.data?.description)
                    setOldImage(res.data.data?.image)



                });
        };
        getCourses()
    }, [])
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2'>
                    <label className='text-sm font-semibold'>Event Photo</label>
                    <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setListData({ ...listData, selectedFile: base64 })} />
                    <Image src={`data:image/jpeg;base64,${listData.selectedFile ? listData.selectedFile?.split('base64,')[1] : oldImage}`} className='w-[60px] h-[60px]' />
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
                    Update
                </Button>
            </div>
        </div>
    );
}
