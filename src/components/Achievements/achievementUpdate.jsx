import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox, Image } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FileUploader } from 'react-drag-drop-files'
import Swal from "sweetalert2";

import FileBase64 from 'react-file-base64';
import { getFile } from "../../util";
const fileTypes = ['JPG', 'PNG', 'GIF']
export default function Banner() {
    const location = useLocation()
    const ID = location.pathname.split('/')[2]
    const variant = 'bordered';
    const [achievementList, setAchievementList] = useState([])
    const [types, setTypes] = useState("")
    console.log(types, 'type')
    const [title, setTitle] = useState("");
    const [imageList, setImageList] = useState([])
    const typeList = [{ id: 1, title: "MSI Achievements", value: 'school' }, { id: 2, title: "Student Achievements", value: 'student' }]

    console.log(imageList, 'iii')
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

    useEffect(() => {
        const getNews = async () => {
            await apiInstance
                .get(`achievements/${ID}`,)
                .then((res) => {
                    setAchievementList(res.data.data);
                    setTitle(res.data.data.title)
                    setTypes(res.data.data.type)

                    console.log(res.data.data.image, 'att')

                });
        };

        getNews();

    }, []);


    const update = () => {
        const formData = new FormData();
        formData.append("type", types);
        imageList ? imageList.forEach(item => {
            formData.append('image', item) // Assuming 'item' is a File object
        }) : achievementList.image

        formData.append("title", title);


        apiInstance
            .put(`achievements/${ID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Achievement Updated",
                    text: "Successful",
                    showConfirmButton: false,
                    timer: 3000

                });
            })
            .catch((error) => {
                alert(error);
            });
    };


    return (
        <div className=''>
            <div className='rounded-none py-3 text-left'>
                <Link to='/achievement-list' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>

            <div className='pl-[100px] flex flex-col mx-8 w-[910px] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <label className='text-sm font-semibold'>Achievement Title</label>
                    <Input
                        type='text'
                        variant='bordered'
                        placeholder='Enter title ...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 '>
                    <label className='text-sm font-semibold'>Types</label>
                    <select placeholder="Choose achievement type ..." className='form-control h-[40px] border-1 border-slate-300 rounded-lg' onChange={(e) => setTypes(e.target.value)}>
                        <option hidden>{types}</option>
                        {typeList.map((item) => (
                            <option value={item.value} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                </div>


            </div>


            <div className='pl-[100px] flex flex-col w-[910px] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 mx-8 mt-5'>
                <label className='text-sm font-semibold'>Photo</label>

                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name='file'
                    types={fileTypes}
                    className='w-full'
                />

                <Image src={achievementList.image ? getFile({ payload: achievementList.image }) : ''} className='w-[200px] h-[150px] mt-5' />


            </div>

            <div className='flex justify-center gap-10 py-10'>
                <Button color='danger'>
                    <Link to='/category'>Cancel</Link>
                </Button>
                <Button color='primary' onClick={update}>
                    Update
                </Button>
            </div>
        </div>
    );
}
