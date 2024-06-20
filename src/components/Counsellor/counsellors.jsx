import {
    Tooltip,
    Table,
    TableHeader,
    Modal,
    DropdownItem,
    ModalContent,
    User,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
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
    Badge,
    Chip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { Link } from "react-router-dom";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import Swal from "sweetalert2";


export default function Counsellors() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState('');
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [counsellorList, setCounsellorList] = React.useState([]);
    const [dataCount, setDataCount] = useState('')

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return counsellorList.slice(start, end);
    }, [page, counsellorList]);

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
        const getCounsellor = async () => {
            await apiInstance
                .get(`counsellors`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then((res) => {
                    setCounsellorList(res.data.data);
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

        getCounsellor();
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, rowsPerPage]);

    const handleOpen = (event) => {
        onOpen();
        console.log(event);
        setDelID(event);
    };

    const handleClose = () => {
        onClose();
        setDelID(null);
    };

    const handleDelete = async () => {
        // console.log(setDelID);
        await apiInstance.delete("counsellors/" + delID).then(() => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Counsellor Deleted!",
                showConfirmButton: false,
                timer: 2000,
            });
            setCounsellorList(counsellorList.filter((item) => item._id !== delID));
            onClose();
        });
    };

    return (
        <>
            <div className='flex flex-row gap-5 justify-between'>
                <div className='flex gap-4 mb-3 flex-row'>


                </div>
                <div className='flex gap-2 mb-3 flex-row'>
                    <Link to='/counsellor-create'>
                        <Button endContent={<PlusIcon />} color='primary'>
                            Add
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <span className='text-default-400 text-small'>
                    Total {counsellorList.length} counsellors
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
                    base: "max-h-[719px]  ",
                    table: "min-h-[100px] ",
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
                <TableHeader className=''>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Counsellor Name</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Status</TableColumn>


                    <TableColumn key='action'>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Positions to display."}>
                    {items.map((item, index) => (
                        <TableRow key='index'>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.schedule.slice(0, 2).map((sc, scInd) => (
                                <>
                                    <div key={scInd}>{sc.startTime} {`=>`}{sc.endTime}</div>

                                </>

                            ))} {item.schedule.length > 2 && (<span>{item.schedule.length - 2} more+</span>)}</TableCell>

                            <TableCell >{item.available === true ? (<Chip color="success" className='text-[#fff]'>Available</Chip>) : <Chip color="warning" className='text-[#fff]'>Unavailable</Chip>}</TableCell>


                            <TableCell>
                                <div className='relative flex items-center gap-2'>
                                    <Tooltip content='Edit Position'>
                                        <Link to={"/counsellor-update/" + item._id}>
                                            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                                <EditIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip color='danger' content='Delete user'>
                                        <span
                                            data-key=''
                                            className='text-lg text-danger cursor-pointer active:opacity-50'
                                            onClick={(e) => handleOpen(item._id)}
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
