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
    Chip
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useEffect } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { SearchIcon } from "../Navbar/search";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import { getFile } from "../../util/index";

export default function BatchList() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [batchList, setBatchList] = React.useState([]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return batchList.slice(start, end);
    }, [page, batchList]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && isOpen) {
            handleDelete();
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPages(Math.ceil(batchList.length / newRowsPerPage));
        setPage(1); // Reset the current page to 1 when rows per page changes
    };

    useEffect(() => {
        const getCourses = async () => {
            await apiInstance
                .get(`batches`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then((res) => {
                    setBatchList(res.data.data);
                    // console.log(res.data.data, 'att')
                    setPages(res.data._metadata.page_count);
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

        setDelID(event.currentTarget.getAttribute("data-key"));
    };

    const handleClose = () => {
        onClose();
        setDelID(null);
    };

    const handleDelete = async () => {

        await apiInstance.delete("batches/" + delID).then(() => {
            setBatchList(batchList.filter((item) => item._id !== delID));
            onClose();
        });
    };

    return (
        <>
            <div className='flex flex-row gap-5 justify-between'>
                <div className='flex gap-4 mb-3 flex-row'>

                </div>
                <div className='flex gap-2 mb-3 flex-row'>
                    <Link to='/batch-create'>
                        <Button endContent={<PlusIcon />} color='primary'>
                            Add
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <span className='text-default-400 text-small'>
                    Total {batchList.length} Batches
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
                    base: "max-h-[520px] text-sm p-2 max-w-full overflow-auto whitespace-normal break-normal",
                    table: "min-h-[220px]",

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
                    <TableColumn>Code</TableColumn>
                    <TableColumn>From</TableColumn>
                    <TableColumn>To</TableColumn>
                    <TableColumn>Batch Name</TableColumn>
                    <TableColumn>Course</TableColumn>
                    <TableColumn>Student ALlow</TableColumn>
                    <TableColumn>Enrollment Student</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Active Batch</TableColumn>

                    <TableColumn key='action'>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Positions to display."} >
                    {items.map((item, index) => (
                        <TableRow key={item._id} >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.code}</TableCell>
                            <TableCell>{item?.fromDate?.split('T')[0]}</TableCell>
                            <TableCell>{item?.toDate?.split('T')[0]}</TableCell>
                            <TableCell>{item?.name}</TableCell>
                            <TableCell>{item?.course.title}</TableCell>
                            <TableCell>{item?.noOfStudentAllow}</TableCell>
                            <TableCell>{item?.noOfEnrolledStudent}</TableCell>

                            <TableCell className='w-52'>
                                {item?.description?.split(" ").slice(0, 10).join(" ")} ....
                            </TableCell>
                            {item?.active === true ?
                                <TableCell>
                                    <Chip
                                        endContent={<FontAwesomeIcon icon={faCheck} size='sm' />}
                                        variant="faded"
                                        color="success"
                                    >
                                        Current
                                    </Chip>
                                </TableCell> :
                                <TableCell>
                                    <Chip
                                        endContent={<FontAwesomeIcon icon={faCheck} size='sm' />}
                                        variant="faded"
                                        color="danger"
                                    >
                                        Old
                                    </Chip></TableCell>
                            }
                            <TableCell>
                                <div className='relative flex items-center gap-2'>
                                    <Tooltip content='Edit Position'>
                                        <Link to={"/batch-update/" + item._id}>
                                            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                                <EditIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip color='danger' content='Delete user'>
                                        <span
                                            data-key={item._id}
                                            className='text-lg text-danger cursor-pointer active:opacity-50'
                                            onClick={(e) => handleOpen(e)}
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
