import {
    Tooltip,
    Table,
    TableHeader,
    Modal,
    DropdownItem,
    ModalContent,
    Image,
    Kbd,
    Button,
    ModalFooter,
    Pagination,
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
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import FilterBarSvg from '../../assets/img/VectorSvg.svg'
import { setDate } from "date-fns";
export default function Counsellors() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [courseList, setCourseList] = React.useState([]);
    const [dataCount, setDataCount] = useState('')
    const [appointmentDataList, setAppointmentDataList] = useState('')
    const [date, setDate] = useState('')
    const [arr, setArr] = useState([])
    console.log(date, 'date')
    const DateFormat = `${date.day}-${date.month}-${date.year}`
    const handleItems = (data, index) => {
        console.log(data.split('-')[1] === index && data.split('-')[0], 'e')

        setArr([...arr, {
            id: parseInt(data.split('-')[1]),
            counsellor: data.split('-')[0],


        }])

    }
    const handleFilter = () => {
        // console.log(arr)
        const data = {
            date: DateFormat,
            counsellor: arr.filter(el => el.id === 0)[arr.filter(el => el.id === 0).length - 1].counsellor,
            country: arr.filter(el => el.id === 1)[arr.filter(el => el.id === 1).length - 1].counsellor,
            course: arr.filter(el => el.id === 2)[arr.filter(el => el.id === 2).length - 1].counsellor,
            status: arr.filter(el => el.id === 3)[arr.filter(el => el.id === 3).length - 1].counsellor,

        }

        localStorage.setItem('AppointmentData', JSON.stringify(data))
        setAppointmentDataList(data)
        // console.log(data
        //     , 'data')

    }
    const MainList = [{
        title: 'Counsellor', data: [
            { name: 'Kyaw' },
            { name: 'Aye' },
            { name: 'Ba' },
        ]
    },
    {
        title: 'Country', data: [
            { name: 'USA' },
            { name: 'Thai' },
            { name: 'Korea' },
        ]
    },
    {
        title: 'Courses', data: courseList
    },
    {
        title: 'Status', data: [
            { name: 'Pending' },
            { name: 'Approved' },
            { name: 'Rejected' },
            { name: 'Scheduled' },
        ]
    }]


    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return courseList.slice(start, end);
    }, [page, courseList]);

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

        const getCourses = async () => {
            await apiInstance
                .get(`courses`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then((res) => {
                    setCourseList(res.data.data);
                    // console.log(res.data, 'att')
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

        getCourses();
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, rowsPerPage]);

    const handleOpen = (event) => {
        onOpen();
        // console.log(event.currentTarget.getAttribute("data-key"));
        setDelID(event.currentTarget.getAttribute("data-key"));
    };

    const handleClose = () => {
        onClose();
        setDelID(null);
    };

    const handleDelete = async () => {
        // console.log(setDelID);
        await apiInstance.delete("courses/" + delID).then(() => {
            setCourseList(courseList.filter((item) => item._id !== delID));
            onClose();
        });
    };

    return (
        <>

            <div className='flex flex-row gap-5 justify-between py-5 '>

                <div className='flex gap-0 mb-3 flex-row '>
                    <Button radius='none' className=' bg-white border-1 border-slate-300 h-10 p-5' style={{ borderRadius: '50px 0px 0px 50px' }}>
                        <Image src={FilterBarSvg} className='w-12 h-4' />
                    </Button>
                    <Button radius='none' className=' bg-white border-1 border-slate-300 h-10 p-5' >Filter By </Button>
                    <DatePicker
                        radius='none'
                        className="w-36 bg-white border-1 border-slate-300"
                        onChange={(e) => setDate(e)}
                    />
                    {MainList.map((r, index) => (
                        <Select
                            key={r}
                            radius='none'
                            // label={r.title}
                            aria-labelledby="Select"
                            placeholder={r.title}
                            className=' w-36 bg-white border-1 border-slate-300'
                            onChange={(e) => handleItems(e.target.value, index)}
                        >
                            {r.data.map((animal, ind) => (
                                <SelectItem key={`${animal.name || animal.title}-${index}`} >
                                    {animal.name || animal.title}
                                </SelectItem>
                            ))}
                        </Select>
                    ))}
                    <Button className='text-red-600 bg-white border-1 border-slate-300 h-10 p-5' style={{ borderRadius: '0px 50px 50px 0px' }} onClick={handleFilter}><FontAwesomeIcon icon={faRotateRight} size='lg' />Refresh </Button>
                </div>

            </div>
            <div className='flex justify-between items-center mb-3'>
                <span className='text-default-400 text-small'>
                    Total {courseList.length} Attendances
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
            <Table
                isHeaderSticky
                aria-label='Example table with client side sorting'
                classNames={{
                    base: "max-h-[719px] ",
                    table: "min-h-[100px]",
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
                    <TableColumn>Counsellor Name</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Student Name</TableColumn>
                    <TableColumn>Study Destination</TableColumn>
                    <TableColumn>Desire Course</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Phone</TableColumn>



                    <TableColumn key='action'>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Positions to display."}>
                    {/* {items.map((item, index) => ( */}
                    <TableRow key=''>
                        <TableCell>001</TableCell>
                        <TableCell>{appointmentDataList.counsellor}</TableCell>
                        <TableCell>{appointmentDataList.date}</TableCell>
                        <TableCell>9:00 - 11:00</TableCell>
                        <TableCell>Kyaw Kyaw Aung</TableCell>
                        <TableCell>{appointmentDataList.country}</TableCell>
                        <TableCell>{appointmentDataList.course}</TableCell>
                        <TableCell>{appointmentDataList.status}</TableCell>
                        <TableCell>09123456789</TableCell>




                        <TableCell>
                            <div className='relative flex items-center gap-2'>
                                {appointmentDataList.status === 'Rejected' ? (
                                    <Button color='warning' size='md'>Rebook</Button>
                                ) : (
                                    <>
                                        <Tooltip content='Edit Position'>
                                            <Link to={"/appointment-detail/" + 1}>

                                                <span className='text-lg  text-blue-900 cursor-pointer active:opacity-50'>
                                                    <EditIcon />
                                                </span>
                                            </Link>
                                        </Tooltip>
                                        <Tooltip color='danger' content='Delete user'>
                                            <span
                                                data-key=''
                                                className='text-lg text-danger cursor-pointer active:opacity-50'
                                                onClick={(e) => handleOpen(e)}
                                            >
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>

                                    </>
                                )
                                }

                            </div>
                        </TableCell>
                    </TableRow>
                    {/* ))} */}
                </TableBody>
            </Table>
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
