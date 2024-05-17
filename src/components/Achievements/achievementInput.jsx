import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FileUploader } from 'react-drag-drop-files'
import Swal from "sweetalert2";

import FileBase64 from 'react-file-base64';
const fileTypes = ['JPG', 'PNG', 'GIF']
export default function Banner() {
    const variant = 'bordered';
    const [types, setTypes] = useState("")
    console.log(types, 'type')
    const [title, setTitle] = useState("");
    const [imageList, setImageList] = useState([])
    const typeList = [{ id: 1, title: "MSI Achievements", value: 'school' }, { id: 2, title: "Student Achievements", value: 'student' }]
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
    // console.log(Last, 'iii')
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
        formData.append("type", types);
        imageList.forEach(item => {
            formData.append('image', item) // Assuming 'item' is a File object
        })

        formData.append("title", title);


        apiInstance
            .post("achievements", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function () {
                Swal.fire({
                    icon: "success",
                    title: "Achievement Created",
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
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 '>
                    <label className='text-sm font-semibold'>Types</label>
                    <select placeholder="Choose achievement type ..." className='form-control h-[40px] border-1 border-slate-300 rounded-lg' onChange={(e) => setTypes(e.target.value)}>
                        <option hidden>Choose achievement type ...</option>
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

            </div>

            <div className='flex justify-center gap-10 py-10'>
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
