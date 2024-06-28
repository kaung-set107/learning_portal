import {
    Tooltip,
    Table,
    TableHeader,

    Image,
    Kbd,
    Button,

    Pagination,
    Modal,
    DropdownItem,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    useDisclosure,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    DatePicker
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import FilterBarSvg from '../../assets/img/VectorSvg.svg'
import { setDate } from "date-fns";
import countryList from "../../constant/countryList";
import { formatDate } from "../../util/Spinner";

export default function Counsellors() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [appointmentList, setAppointmentList] = React.useState([]);
    const [courseList, setCourseList] = useState([])
    const [counsellorList, setCounsellorList] = useState([])
    const [dataCount, setDataCount] = useState('')
    const [arr, setArr] = useState([])
    const [date, setDate] = useState('')
    const [counsellor, setCounsellor] = useState('')
    const [country, setCountry] = useState('')
    const [course, setCourse] = useState('')
    const [status, setStatus] = useState('')
    const DateFormat = `${date.day}-${date.month}-${date.year}`

    const handleFilter = async () => {
        // console.log(arr, 'arr')
        const data = {
            // startDate: DateFormat,
            // endDate: DateFormat,
            // counsellor: counsellor,
            // studyDestination: country,
            // desiredCourse: course,
            // status: status
        }
        if (date) {
            data.startDate = formatDate(DateFormat) // to change date format
            data.endDate = formatDate(DateFormat)
        }
        if (counsellor) {
            data.counsellor = counsellor
        }
        if (country) {
            data.studyDestination = country
        }
        if (course) {
            data.desiredCourse = course
        }
        if (status) {
            data.status = status
        }

        // console.log(data, 'res')
        await apiInstance.get('appointments', { params: data }).then((res) => {
            // console.log(res.data.data, 'filter')
            setAppointmentList(res.data.data)
        })
        // setAppointmentList(data)
        // console.log(data
        //     , 'data')

    }
    const handleClear = async () => {
        setDate('')
        setCounsellor('')
        setCountry('')
        setCourse('')
        setStatus('')
        await apiInstance.get('appointments').then((res) => {

            setAppointmentList(res.data.data)
        })
    }


    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return appointmentList.slice(start, end);
    }, [page, appointmentList]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && isOpen) {
            handleDelete();
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        // console.log(
        //   res.data.counts.registerWaitingListCount / rowsPerPage,
        //   "rrreer"
        // );
        setPages(
            dataCount % rowsPerPage === 0
                ? dataCount / rowsPerPage
                : Math.round(dataCount / rowsPerPage) + 1
        );

        setPage(1); // Reset the current page to 1 when rows per page changes
    };

    useEffect(() => {

        const getAppointment = async () => {
            await apiInstance
                .get(`appointments`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then((res) => {
                    setAppointmentList(res.data.data);
                    // console.log(res.data.data, 'att')
                    setDataCount(res.data.count);
                    setPages(
                        res.data.count % rowsPerPage === 0
                            ? res.data.count / rowsPerPage
                            : Math.floor(
                                res.data.count / rowsPerPage
                            ) + 1
                    );
                });
        };

        const getCourse = async () => {
            await apiInstance.get('courses').then((res) => {
                setCourseList(res.data.data)
            })
        }

        const getCounsellors = async () => {
            await apiInstance.get('counsellors').then((res) => {
                setCounsellorList(res.data.data)
            })
        }
        getCounsellors()
        getCourse()
        getAppointment();
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, rowsPerPage]);

    const handleOpen = (event) => {
        onOpen();
        // console.log(event, 'ev');
        setDelID(event);
    };

    const handleClose = () => {
        onClose();
        setDelID(null);
    };

    const handleDelete = async () => {

        await apiInstance.delete("appointments/" + delID).then(() => {
            setAppointmentList(appointmentList.filter((item) => item._id !== delID));
            onClose();
        });
    };

    return (
        <>

            <div className='flex flex-row gap-5 justify-between py-5 '>

                <div className='flex gap-0 mb-3 flex-row '>
                    <Button radius='none' className=' bg-white border-1 border-slate-300 h-10 p-5' style={{ borderRadius: '50px 0px 0px 50px' }} >
                        <Image src={FilterBarSvg} className='w-12 h-4' />
                    </Button>
                    {date || counsellor || country || course || status ? (
                        <Button radius='none' className='border-1 border-slate-300 h-10 p-5 bg-blue-950 text-white' onClick={() => handleFilter()}>Filter By </Button>
                    ) : (
                        <Button radius='none' className='border-1 border-slate-300 h-10 p-5 bg-white text-opacity-50'>Filter By </Button>
                    )}

                    <DatePicker
                        radius='none'
                        className="w-36 bg-white border-1 border-slate-300"
                        onChange={(e) => setDate(e)}
                    />
                    {/* Counsellor */}
                    <Select

                        radius='none'
                        // label={r.title}
                        aria-labelledby="Select"
                        placeholder='Counsellor'
                        className=' w-36 bg-white border-1 border-slate-300'
                        onChange={(e) => setCounsellor(e.target.value)}
                    >
                        {counsellorList.map((item, ind) => (
                            <SelectItem key={item._id} >
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Study Destination */}
                    <Select

                        radius='none'
                        // label={r.title}
                        aria-labelledby="Select"
                        placeholder='Country'
                        className=' w-36 bg-white border-1 border-slate-300'
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        {countryList.map((item, ind) => (
                            <SelectItem key={item.name} >
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Course */}
                    <Select

                        radius='none'
                        // label={r.title}
                        aria-labelledby="Select"
                        placeholder='Course'
                        className=' w-36 bg-white border-1 border-slate-300'
                        onChange={(e) => setCourse(e.target.value)}
                    >
                        {courseList.map((item, ind) => (
                            <SelectItem key={item._id} >
                                {item.title}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Status */}
                    <Select

                        radius='none'
                        // label={r.title}
                        aria-labelledby="Select"
                        placeholder='Status'
                        className=' w-36 bg-white border-1 border-slate-300'
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <SelectItem key={'request'} >
                            Request
                        </SelectItem>
                        <SelectItem key={'ongoing'} >
                            Ongoing
                        </SelectItem>
                        <SelectItem key={'rejected'} >
                            Rejected
                        </SelectItem>
                        <SelectItem key={'done'} >
                            Done
                        </SelectItem>

                    </Select>
                    <Button className='text-red-600 bg-white border-1 border-slate-300 h-10 p-5' style={{ borderRadius: '0px 50px 50px 0px' }} onClick={() => handleClear()} ><FontAwesomeIcon icon={faRotateRight} size='lg' />Refresh </Button>
                </div>

            </div >
            <div className='flex justify-between items-center mb-3'>
                <span className='text-default-400 text-small'>
                    Total {appointmentList.length} Appointments
                </span>
                <label className='flex items-center text-default-400 text-small'>
                    Rows per page:
                    <select
                        className='bg-transparent outline-none text-default-400 text-small'
                        onChange={(e) => onRowsChange(e)}
                    >
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                    </select>
                </label>
            </div>
            <div className='overflow-x'>
                <Table
                    isHeaderSticky
                    aria-label='Example table with client side sorting'
                    classNames={{
                        base: "max-h-[420px]",
                        table: "min-h-[200px]",
                    }}
                    bottomContent={
                        <div className='flex w-full justify-center'>
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color='primary'
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >

                    <TableHeader>
                        <TableColumn>No</TableColumn>
                        <TableColumn>Counsellor</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Time</TableColumn>
                        <TableColumn>Student Name</TableColumn>
                        <TableColumn>Study Destination</TableColumn>
                        <TableColumn>Desire Course</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Phone</TableColumn>



                        <TableColumn key='action'>Actions</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No Positions to display."} >
                        {items.map((item, index) => (
                            <TableRow key={index} >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.counsellor?.name}</TableCell>
                                <TableCell>{item.date?.split('T')[0]}</TableCell>
                                <TableCell className=' w-[300px]'>{item.startTime}{`=>`}{item.endTime}</TableCell>
                                <TableCell>{item.guest?.name}</TableCell>
                                <TableCell>{item.studyDestination}</TableCell>
                                <TableCell>{item.desiredCourse?.title}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item?.guest?.phone}</TableCell>




                                <TableCell>
                                    <div className='relative flex items-center gap-2'>

                                        {item?.status === 'request' ? (
                                            <Tooltip content='Approve or Reject'>

                                                <Link to={"/appointment-detail/" + item._id}>

                                                    <span className='text-lg text-blue-900 cursor-pointer active:opacity-50'>
                                                        <FontAwesomeIcon icon={faCalendarWeek} />
                                                    </span>
                                                </Link>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip content='Approve or Reject'>



                                                <span className='text-lg text-slate-300 cursor-pointer active:opacity-30'>
                                                    <FontAwesomeIcon icon={faCalendarWeek} />
                                                </span>

                                            </Tooltip>
                                        )

                                        }


                                        <Tooltip color='danger' content='Delete user'>
                                            <span
                                                data-key=''
                                                className='text-lg text-danger cursor-pointer active:opacity-50'
                                                onClick={() => handleOpen(item._id)}
                                            >
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>



                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Delete Course
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this position?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='default' variant='light' onClick={handleClose}>
                                    No, Cancel
                                </Button>
                                <Button
                                    color='danger'
                                    onPress={() => handleDelete()}
                                    onKeyDown={handleKeyDown}
                                >
                                    Yes, I am sure
                                    <Kbd className='bg-danger-500' keys={["enter"]}></Kbd>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
