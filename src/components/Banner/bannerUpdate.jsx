import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FileUploader } from 'react-drag-drop-files'
import Swal from "sweetalert2";
import { Select, SelectItem } from '@nextui-org/select'
import FileBase64 from 'react-file-base64';
import { getFile } from "../../util";
const fileTypes = ['JPG', 'PNG', 'GIF']
export default function Banner() {
    const location = useLocation()
    const ID = location.pathname.split('/')[2]
    const variant = 'bordered';
    const [title, setTitle] = useState("");
    const [imageList, setImageList] = useState([])
    const [bannerList, setBannerList] = useState([])
    const [oriImgList, setOriImgList] = useState([])
    const [totalImgList, setTotalImgList] = useState([])

    const totalImg = [...bannerList, ...oriImgList.map((i) => {
        return {
            lastModified: i.lastModified,
            lastModifiedDate: i.lastModifiedDate,
            name: i.name,
            size: i.size,
            type: i.type,
            webkitRelativePath: i.webkitRelativePath
        }
    })]
    const final = totalImg.map((i) => {
        return {
            lastModified: i.lastModified,
            lastModifiedDate: i.lastModifiedDate,
            name: i.name,
            size: i.size,
            type: i.type,
            webkitRelativePath: i.webkitRelativePath
        }
    })
    console.log(totalImg.map((i) => {
        return {
            lastModified: i.lastModified,
            lastModifiedDate: i.lastModifiedDate,
            name: i.name,
            size: i.size,
            type: i.type,
            webkitRelativePath: i.webkitRelativePath
        }
    }), 'tot')
    console.log([...bannerList, ...oriImgList.map((i) => {
        return {
            lastModified: i.lastModified,
            lastModifiedDate: i.lastModifiedDate,
            name: i.name,
            size: i.size,
            type: i.type,
            webkitRelativePath: i.webkitRelativePath
        }
    })], 'when image new')

    const [view, setView] = useState('')
    const [description, setDescription] = useState('')
    const handleDelete = (index) => {

        const filter = bannerList.filter((el, ind) => ind !== index)
        setBannerList(filter)
        console.log(filter, 'filter')
    }

    const handleDeleteNew = (index) => {
        // console.log(index)
        // console.log(oriImgList.map((el, ind) => ind + 1), 'ori')
        const filter = oriImgList.filter((el, ind) => ind !== index)
        const sec = imageList.filter((el, ind) => ind !== index)
        setImageList(sec)
        setOriImgList(filter)
        console.log(filter, 'img')
    }
    useEffect(() => {
        const getBanner = async () => {
            await apiInstance.get(`banners/${ID}`).then((res) => {
                console.log(res.data.data.images, "ev res");
                setBannerList(res.data.data.images);
                setTitle(res.data.data.section)
                setDescription(res.data.data.description)
                setView(res.data.data.view)
            });
        };

        getBanner();
    }, [])
    const bSize = { "width": "full", "height": "full" }
    // console.log(
    //     listData.selectedFile?.split('base64,')[1]
    // )
    const handleChange = event => {
        console.log(event, 'file')
        let array = []
        for (const item of event) {
            array.push(item)
        }
        setOriImgList(array)

        if (event && event.length > 0) {
            const urls = [];
            for (let i = 0; i < event.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    urls.push(e.target.result);
                    if (urls.length === event.length) {
                        setImageList((prevUrls) => [...prevUrls, ...urls]);
                    }
                };
                reader.readAsDataURL(event[i]);
            }
        }
    }
    const create = () => {

        const formData = new FormData();
        // formData.append("bannerSize", bSize);
        oriImgList.forEach(item => {
            formData.append('images', item) // Assuming 'item' is a File object
        })

        formData.append("view", view);
        formData.append("section", 'hello');

        apiInstance
            .put(`banners/${ID}`, formData, {
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
                <Link to='/banner-list' className=''>
                    <FontAwesomeIcon icon={faCircleChevronLeft} size='2xl' />
                </Link>
            </div>


            <div className='flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-5 mx-8 mt-5'>
                <label className='text-sm font-semibold'>Photo</label>

                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name='file'
                    types={fileTypes}
                    className='w-full'
                />

                <div className='grid grid-cols-6 gap-10 justify-center'>
                    {!imageList[0] ? bannerList.map((i, ind) => (
                        <div className='flex flex-col gap-0'>
                            <img src={getFile({ payload: i })} className='w-[150px] h-[150px] rounded-md' />
                            <div className='flex justify-center overflow-hidden'>
                                {/* <span className='text-[29px] font-extrabold text-[red] items-center justify-center w-[30px] cursor-pointer' onClick={() => handleDelete(ind)}><FontAwesomeIcon icon={faCircleXmark} /></span> */}
                            </div>
                        </div>
                    )) : imageList.map((i, ind) => (
                        <div className='flex flex-col gap-0'>
                            <img src={i} className='w-[150px] h-[150px] rounded-md' />
                            <div className='flex justify-center'>
                                <span className='text-[29px] font-extrabold text-[red] items-center justify-center w-[30px] cursor-pointer' onClick={() => handleDeleteNew(ind)}><FontAwesomeIcon icon={faCircleXmark} /></span>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

            <div className='flex justify-center gap-10 py-10 pt-20'>
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
