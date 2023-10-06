import {
    Tooltip, Table, TableHeader, Modal, DropdownItem, ModalContent, Dropdown, DropdownTrigger, DropdownMenu, Kbd, Button, ModalFooter, Pagination, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell, Input, RadioGroup, Radio
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import { EyeIcon } from '../Table/eyeicon';
import Swal from 'sweetalert2';
import { convertAndDisplayTZ } from "../../util/Util";

export default function LeaveTable() {
    const handleLeaveType = { Casual: 'casualLeaves', Medical: 'medicalLeaves', Vacation: 'vacationLeaves', 'Maternity:Male': 'maternityLeaveMale', 'Maternity:Female': 'maternityLeaveFemale' }
    // const leaveType = ['Casual', 'Medical', 'Vacation', 'Maternity:Male', 'Maternity:Female'];
    const [leaveList, setLeaveList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenStatus, onOpen: onOpenStatus, onClose: onCloseStatus } = useDisclosure();
    const [delID, setDelID] = useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [leave, setLeave] = useState(null);
    const [leaveTaken, setLeaveTaken] = useState(null);
    const [leaveAllowed, setLeaveAllowed] = useState(null);

    const [data, setData] = useState({
        leaveToken: null,
        leaveAllowed: null,
        remark: null,
        isPaid: null
    });

    const handleInputChange = async (fieldName, value) => {
        setData(prveData => ({ ...prveData, [fieldName]: value }))
    }
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return leaveList.slice(start, end);
    }, [page, leaveList]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isOpen) {
            handleDelete()
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPages(Math.ceil(leaveList.length / newRowsPerPage));
        setPage(1); // Reset the current page to 1 when rows per page changes
    };


    useEffect(() => {
        const getLeaves = async () => {
            await apiInstance.get(`leaves`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then(res => {
                    setLeaveList(res.data.data)
                    setPages(res.data._metadata.page_count)
                })
        }
        getLeaves()
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, rowsPerPage])

    const handleOpen = (event) => {
        onOpen();
        console.log(event.currentTarget.getAttribute('data-key'))
        setDelID(event.currentTarget.getAttribute('data-key'))
    }


    const handleOpenStatus = (item) => {
        onOpenStatus();
        setLeave(item)
        setLeaveAllowed(item.relatedUser[handleLeaveType[item.leaveType]])
        setLeaveTaken(item.relatedUser.relatedPosition[handleLeaveType[item.leaveType]] - item.relatedUser[handleLeaveType[item.leaveType]])
        console.log(leaveTaken, leaveAllowed, 'This is it')
    }

    const handleClose = () => {
        onClose();
        setDelID(null)
    }

    const handleCloseStatus = () => {
        onCloseStatus();
    }

    const handleDelete = async () => {
        console.log(setDelID)
        await apiInstance.delete('leave/' + delID)
            .then(() => {
                setLeaveList(leaveList.filter(item => item._id !== delID))
                onClose()
            })
    }

    const handleStatusEdit = async (status) => {
        let payload = {
            id: leave._id,
            employeeID: leave.relatedUser._id,
            Ltype: handleLeaveType[leave.leaveType],
            startDate: leave.startDate,
            endDate: leave.endDate,
            leaveAllowed: leaveAllowed,
            leaveTaken: leaveTaken
        };
        if (status) payload.status = status
        if (data.remark) payload.remark = data.remark
        if (data.isPaid) payload.isPaid = data.isPaid
        console.log(payload)
        await apiInstance.put('leaves/status', payload)
            .then(() => {
                setLeaveList(leaveList.map(item => item._id === leave._id ? { ...item, status: status } : item))
                onCloseStatus()
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                });
            })
    }

    return (
        <>
            <div className="flex gap-3 mb-3 flex-row-reverse">
                <Button color="primary" endContent={<PlusIcon />}>
                    <Link to='/leave/register'>Add New</Link>
                </Button>
                <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                            Working Days
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectionMode="single"

                    >
                        <DropdownItem key='M-F' value='M-F' className="capitalize">
                            Monday To Friday
                        </DropdownItem>
                        <DropdownItem key='M-S' value='M-S' className="capitalize">
                            Monday To Saturday
                        </DropdownItem>
                        <DropdownItem key='All Day' value='All Day' className="capitalize">
                            Every Day
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown> */}
            </div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-default-400 text-small">Total {leaveList.length} Leaves</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={(e) => onRowsChange(e)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
            <Table
                isHeaderSticky
                aria-label="Example table with client side sorting"
                classNames={{
                    base: "max-h-[719px] ",
                    table: "min-h-[100px]",
                }}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn key="no">No</TableColumn>
                    <TableColumn key="code">Code</TableColumn>
                    <TableColumn key="Start Date">Start Date</TableColumn>
                    <TableColumn key="End Date">End Date</TableColumn>
                    <TableColumn key="Name">Name</TableColumn>
                    <TableColumn key="Position">Position</TableColumn>
                    <TableColumn key="Department">Department</TableColumn>
                    <TableColumn key="Reason">Reason</TableColumn>
                    <TableColumn key="Leave Type">Leave Type</TableColumn>
                    <TableColumn key="Status">Status</TableColumn>
                    <TableColumn key="Edit">Edit</TableColumn>
                    <TableColumn key="Action">Action</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Leaves to display."}
                >
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.code}</TableCell>
                            <TableCell>{item.startDate ? convertAndDisplayTZ(item.startDate) : 'Not Set'}</TableCell>
                            <TableCell>{item.endDate ? convertAndDisplayTZ(item.endDate) : 'Not Set'}</TableCell>
                            <TableCell>{item.relatedUser?.givenName}</TableCell>
                            <TableCell>{item.relatedUser?.relatedPosition?.name}</TableCell>
                            <TableCell>{item.relatedUser?.relatedDepartment?.name}</TableCell>
                            <TableCell>{item.reason ? item.reason : 'Not Set'}</TableCell>
                            <TableCell>{item.leaveType}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <div className="relative flex justify-center">
                                    <Tooltip content="Edit Status">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleOpenStatus(item)}>
                                            <EyeIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Edit Leave">
                                        <Link to={`/leave/update/${item._id}`}>
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete user">
                                        <span data-key={item._id} className="text-lg text-danger cursor-pointer active:opacity-50" onClick={(e) => handleOpen(e)}>
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
                            <ModalHeader className="flex flex-col gap-1">Delete Leave</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this position?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onClick={handleClose}>
                                    No, Cancel
                                </Button>
                                <Button color="danger" onPress={() => handleDelete()} onKeyDown={handleKeyDown}>
                                    Yes, I am sure
                                    <Kbd className="bg-danger-500" keys={['enter']}>
                                    </Kbd>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal backdrop='opaque' isOpen={isOpenStatus} onClose={handleCloseStatus} size="xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Leave Approval</ModalHeader>
                    <ModalBody className="my-2">
                        <div className="flex justify-between">
                            <label><span className="font-semibold">Name</span>: {leave?.relatedUser?.givenName}</label>
                            <label><span className="font-semibold">Position</span>: {leave?.relatedUser?.relatedPosition?.name}</label>
                        </div>
                        <div className="flex justify-between">
                            <label><span className="font-semibold">Leave Type</span>: {leave?.leaveType}</label>
                            <label><span className="font-semibold">Department</span>: {leave?.relatedUser?.relatedDepartment?.name}</label>
                        </div>
                        <div className="flex justify-between">
                            <label><span className="font-semibold">From</span>: {leave ? convertAndDisplayTZ(leave.startDate) : 'Not Set'}</label>
                            <label><span className="font-semibold">To</span>: {leave? convertAndDisplayTZ(leave.endDate) : 'Not Set'}</label>
                        </div>
                        {/* <Divider></Divider> */}
                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                            <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <label className="text-sm font-semibold">Leave Taken</label>
                                <Input isDisabled value={leaveTaken} type='text' onChange={(e) => handleInputChange('leaveTaken', e.target.value)}></Input>
                            </div>
                            <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <label className="text-sm font-semibold">Leave Allowed</label>
                                <Input isDisabled value={leaveAllowed} type="number" onChange={(e) => handleInputChange('leaveAllowed', e.target.value)}></Input>
                            </div>

                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                            <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <label className="text-sm font-semibold">Remark</label>
                                <Input value={leave?.remark} onChange={(e) => handleInputChange('remark', e.target.value)}></Input>
                            </div>
                            <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <label className="text-sm font-semibold">Paid / Unpaid</label>
                                <div className="pt-2"></div>
                                <RadioGroup orientation="horizontal" onValueChange={(e) => handleInputChange('isPaid', e)} value={leave?.isPaid}>
                                    <Radio value={true}>Paid Leave</Radio>
                                    <Radio value={false}>Unpaid Leave</Radio>
                                </RadioGroup>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => handleStatusEdit('Decline')}>
                            No, Decline
                        </Button>
                        <Button className="text-white" color="success" onClick={() => handleStatusEdit('Approved')}>
                            Yes, Approve
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >

        </>
    )
}