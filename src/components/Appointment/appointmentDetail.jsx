import { ReactElement, useState, useEffect } from "react";
import {
    Image, Button, Card, Input, Textarea, Modal,
    DropdownItem,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@nextui-org/react";


// import DateTimePicker from 'react-datetime-picker';
import { useForm } from "react-hook-form"

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import apiInstance from "../../util/api";

import dayjs from 'dayjs';

import { useLocation } from "react-router";
import Swal from "sweetalert2";

// import Footer from '../../frontend/home/footer';
const About = () => {
    const location = useLocation()
    const ID = location.pathname.split('/')[2]
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = useState(dayjs(''));
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because month index starts from 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const formattedDate = formatDate(value.$d);
    const [date, setDate] = useState()
    // console.log(formattedDate); // Output: 2022-04-17


    const {
        // Either pass a `control` property to the component
        // or wrap it in a `<FormProvider/>`.
        control,
        handleSubmit
    } = useForm()
    const variant = "bordered"
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [studyDesti, setStudyDesti] = useState('')
    const [desiredCourse, setDesiredCourse] = useState('')
    const [approveStartTime, setApproveStartTime] = useState('')
    const [approveEndTime, setApproveEndTime] = useState('')
    const [approveDate, setApproveDate] = useState('')
    const [appointmentData, setAppointmentData] = useState([])
    // const [value, onChange] = useState(new Date());
    const Approve = () => {

        const data = {
            date: approveDate ? approveDate : appointmentData?.date,
            startTime: approveStartTime ? approveStartTime : appointmentData?.startTime,
            endTime: approveEndTime ? approveEndTime : appointmentData?.endTime,

        }
        apiInstance.put(`appointments/${ID}/confirm`, data).then((res) => {
            Swal.fire({
                icon: "success",
                title: "Approved Successful",
                text: "",
                showConfirmButton: false,
                timer: 2000,
            });
            onClose();
        }).catch((err) => {
            console.log(err)
        })

    };
    const handlePhoneInputChange = (value, country, event) => {
        // Do something with the phone input value
        setPhone(value)
        // console.log("Phone input value:", value);
    };
    useEffect(() => {

        const getCourses = async () => {
            await apiInstance
                .get(`appointments/${ID}`)
                .then((res) => {
                    setAppointmentData(res.data.data);
                    console.log(res.data.data, 'att')
                    // setPages(res.data._metadata.page_count);
                });
        };

        getCourses();
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen])

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && isOpen) {
            Approve();
        }
    };
    const handleOpen = (event) => {
        onOpen();

    };

    const handleClose = () => {
        onClose();

    };


    return (
        <div className=''>

            <div className='flex flex-col p-5 sm:pl-[20px] sm:pr-[20px]  sm:pt-20 sm:pb-10  gap-10 w-full'>
                <div className='flex flex-col gap-2 sm:gap-5 '>
                    <span className='text-[20px] sm:text-[32px] font-medium sm:font-semibold text-[#0B2743]'>Student Counseling Booking Detail</span>
                    <span className='text-[11px] sm:text-[20px] font-light sm:font-normal text-[#0B2743]'>Complete the following form and our staff will contact you.</span>
                </div>
                <div className='flex flex-col  gap-6 text-[14px] font-normal'>
                    <div className='w-full flex flex-col gap-2 '>
                        <label>Full Name</label>
                        <Input type='text' size='lg' variant={variant} className='' name='name' isDisabled value={appointmentData?.guest?.name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='w-full flex flex-col gap-2 '>
                        <label>Email</label>
                        <Input type='email' size='lg' variant={variant} className='' name='email' isDisabled value={appointmentData?.guest?.email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label>Phone Number</label>
                        <Input
                            name="phone"
                            isDisabled value={appointmentData?.guest?.phone}
                            size='lg' variant={variant}
                            onChange={handlePhoneInputChange}
                            className=''
                        />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:flex gap-10 text-[14px] font-normal'>
                    <div className='w-full flex flex-col gap-2 '>
                        <label>Study Destination</label>
                        <Input isDisabled value={appointmentData?.studyDestination} />

                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label>Desired Course</label>
                        <Input isDisabled value={appointmentData?.desiredCourse?.title} />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:flex gap-10 text-[14px] font-normal'>
                    <div className='w-full flex flex-col gap-2'>
                        <label>Counselor Name</label>
                        <Input isDisabled value={appointmentData?.counsellor?.name} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>

                        <label>Time</label>
                        <Input isDisabled value={`${appointmentData?.startTime} ${'=>'} ${appointmentData?.endTime}`} />

                    </div>

                </div>
                <div className='flex flex-col sm:flex-row sm:flex gap-10 text-[14px] font-normal'>
                    <Textarea isDisabled value={appointmentData?.description} className='border-1 border-slate-300 rounded-lg' />
                </div>
                <div className='flex justify-between'>
                    <div className='flex justify-start gap-4 '>
                        <Button type="submit" className='w-[200px] bg-[#0B2743] text-[#fff]' onClick={(e) => handleOpen(e)}>Approve</Button>
                        <Button type="submit" className='w-[200px] bg-red-700 text-[#fff]'  >Rejecte</Button>
                    </div>
                    <div className='flex justify-start gap-4 '>

                        <Button type="submit" className='w-[200px] bg-yellow-600 text-[#fff]' >Rebook</Button>
                    </div>
                </div>


            </div>
            <Modal backdrop="opaque" isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Approve Appointment
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <label>Date</label>
                                    <Input type='date' defaultValue={appointmentData?.date?.split('T')[0]} onChange={(e) => setApproveDate(e.target.value)} />
                                </div>
                                <div>
                                    <label>Start Time</label>
                                    <Input type='time' onChange={(e) => setApproveStartTime(e.target.value)} />
                                </div>
                                <div>
                                    <label>End Time</label>
                                    <Input type='time' onChange={(e) => setApproveEndTime(e.target.value)} />
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color='default' variant='light' onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color='danger'
                                    onPress={() => Approve()}
                                    onKeyDown={handleKeyDown}
                                >
                                    Yes

                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
};

export default About;
