import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Card, Input, Button, Textarea, Checkbox } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FileUploader } from 'react-drag-drop-files'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import Swal from "sweetalert2";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const fileTypes = ['JPG', 'PNG', 'GIF']


export default function Banner() {
    const currentDate = new Date(Date.now()).toLocaleDateString('en-US');
    const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

    const items = [
        {
            id: 1,
            group: 1,
            title: 'item 1',
            color: 'rgb(158, 14, 206)',
            selectedBgColor: 'rgba(225, 166, 244, 1)',
            bgColor: 'rgba(225, 166, 244, 0.6)',
            start_time: moment(),
            end_time: moment().add(1, 'hour')
        },
        {
            id: 2,
            group: 2,
            title: 'item 2',
            start_time: moment().add(-0.5, 'hour'),
            end_time: moment().add(0.5, 'hour')
        },
        {
            id: 3,
            group: 1,
            title: 'item 3',
            start_time: moment().add(2, 'hour'),
            end_time: moment().add(3, 'hour')
        }
    ]
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
        imageList.forEach(item => {
            formData.append('images', item) // Assuming 'item' is a File object
        })

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

            <div className='flex flex-col mx-8 w-[900px] flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                Rendered by react!
                <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment().add(-12, 'hour')}
                    defaultTimeEnd={moment().add(12, 'hour')}
                    style={{ backgroundColor: moment().add(4, 'hour') < currentDate ? 'red' : 'limegreen' }}
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
        </div >
    );
}
