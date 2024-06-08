import { ReactElement, useState, useEffect } from "react";
import { Image, Button, Card, Input, } from "@nextui-org/react";
import { Select, SelectItem } from '@nextui-org/select'
import 'react-phone-number-input/style.css'
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import MSINav from "./msinav";
// import DateTimePicker from 'react-datetime-picker';
import { useForm } from "react-hook-form"
import Footer from "./footer";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import apiInstance from "../../util/api";

import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
const countryList = [
    {
        id: 1,
        name: 'Thailand'
    },
    {
        id: 2,
        name: 'Singapore'
    },
    {
        id: 3,
        name: 'Malaysia'
    }
    ,
    {
        id: 4,
        name: 'Vietnam'
    }
    ,
    {
        id: 5,
        name: 'Japan'
    }
    ,
    {
        id: 6,
        name: 'Taiwan'
    }
    ,
    {
        id: 7,
        name: 'China'
    }
    ,
    {
        id: 8,
        name: 'Korea'
    }
    ,
    {
        id: 9,
        name: 'USA'
    }
    ,
    {
        id: 10,
        name: 'UK'
    }
    ,
    {
        id: 11,
        name: 'Australia'
    }
    ,
    {
        id: 12,
        name: 'Canada'
    },
    {
        id: 13,
        name: 'Switzerland'
    },
    {
        id: 14,
        name: 'Natherland'
    },
    {
        id: 15,
        name: 'Poland'
    },
    {
        id: 16,
        name: 'Spain'
    },
    {
        id: 17,
        name: 'Germany'
    }
]

// import Footer from '../../frontend/home/footer';
const About = () => {
    const [value, setValue] = useState(dayjs(''));
    console.log(value, 'va')
    console.log(value.$d, 'd   ')
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because month index starts from 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const formattedDate = formatDate(value.$d);
    const [date, setDate] = useState()
    console.log(formattedDate); // Output: 2022-04-17


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
    const [counselorName, setCounselorName] = useState('')
    const [courseList, setCourseList] = useState([])
    // const [value, onChange] = useState(new Date());
    const createForm = (event) => {

        // Do something with the name and value, e.g., send it to a server
        const data = {
            name: name,
            phone: phone,
            studyDestination: studyDesti,
            desiredCourse: desiredCourse,
            date: value.$d
        }
        console.log("Data:", data);
        localStorage.setItem('data', JSON.stringify(data))

        // Reset the input fields
        // setFormData({ name: '', value: '' });
    };
    const handlePhoneInputChange = (value, country, event) => {
        // Do something with the phone input value
        setPhone(value)
        console.log("Phone input value:", value);
    };
    useEffect(() => {
        window.scroll(0, 0)
        const hee = localStorage.getItem('data')
        console.log(hee, 'dddd')

        const getCourses = async () => {
            await apiInstance
                .get(`courses`)
                .then((res) => {
                    setCourseList(res.data.data);
                    // console.log(res.data.data, 'att')
                    // setPages(res.data._metadata.page_count);
                });
        };

        getCourses();
    }, [])
    return (
        <div className=''>
            <MSINav />
            <form onSubmit={handleSubmit(createForm)} className='flex flex-col p-5 sm:pl-60 sm:pr-60 sm:pt-20 sm:pb-10  gap-10 w-full'>
                <div className='flex flex-col gap-2 sm:gap-5 '>
                    <span className='text-[20px] sm:text-[32px] font-medium sm:font-semibold text-[#0B2743]'>Student Counseling Booking </span>
                    <span className='text-[11px] sm:text-[20px] font-light sm:font-normal text-[#0B2743]'>Complete the following form and our staff will contact you.</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-10 text-[14px] font-normal'>
                    <div className='w-full flex flex-col gap-2 '>
                        <label>Full Name</label>
                        <Input type='text' size='lg' variant={variant} className='' name='name' placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label>Phone Number</label>
                        <PhoneInputWithCountry
                            name="phone"
                            control={control}
                            onChange={handlePhoneInputChange}
                            className='border-1 border-gray-300 p-3 rounded-[10px]'
                            rules={{ required: true }} />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:flex gap-10 text-[14px] font-normal'>
                    <div className='w-full flex flex-col gap-2 '>
                        <label>Study Destination</label>
                        <Select
                            size={studyDesti ? "lg" : "sm"}
                            label={studyDesti ? '' : "Select an country"}
                            className=''
                            onChange={(e) => setStudyDesti(e.target.value)}
                        >
                            {countryList.map((animal) => (
                                <SelectItem key={animal.id} value={animal.name}>
                                    {animal.name}
                                </SelectItem>
                            ))}
                        </Select>

                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label>Desired Course</label>
                        <Select
                            size="sm"
                            label="Select an course"
                            className=''
                            onChange={(e) => setDesiredCourse(e.target.value)}
                        >
                            {courseList.map((animal) => (
                                <SelectItem key={animal._id} value={animal._id}>
                                    {animal.title}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:flex gap-10 text-[14px] font-normal'>
                    <div className='w-full flex flex-col gap-2'>
                        <label>Counselor Name</label>
                        <Select
                            size="sm"
                            label="Select an counselor"
                            className=''
                            onChange={(e) => setCounselorName(e.target.value)}
                        >
                            {/* {courseList.map((animal) => ( */}
                            <SelectItem value=''>
                                Example Name
                            </SelectItem>
                            {/* ))} */}
                        </Select>
                    </div>
                    <div className='w-full flex flex-col gap-2 mt-3 '>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'MobileDateTimePicker',]} className='p-1'>

                                <DemoItem >
                                    <MobileDateTimePicker label="Appointment Date & Time" defaultValue={dayjs(value)} value={value}
                                        onChange={(newValue) => setValue(newValue)} />
                                </DemoItem>
                                {/* <DateTimePicker
                                    label="Date & Time Picker"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                /> */}
                            </DemoContainer>
                        </LocalizationProvider>

                    </div>
                </div>
                <div className='flex justify-center '>
                    <Button type="submit" className='w-[220px] bg-[#0B2743] text-[#fff]'  >Submit</Button>
                </div>

            </form>

            <Footer />
        </div>
    );
};

export default About;
