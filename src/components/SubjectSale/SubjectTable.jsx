import {
    Tooltip, Table, TableHeader, Modal, User, ModalContent, Kbd, Button, ModalFooter, Pagination, ModalHeader, ModalBody, useDisclosure, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import {getFile} from '../../util/index.js'
export default function PositionTable() {
    const [subjectSaleList, setSubjectSaleList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [delID, setDelID] = useState(null);

    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return subjectSaleList.slice(start, end);
    }, [page, subjectSaleList]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && isOpen) {
            handleDelete()
        }
    };

    const onRowsChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPages(Math.ceil(subjectSaleList.length / newRowsPerPage));
        setPage(1); // Reset the current page to 1 when rows per page changes
    };


    useEffect(() => {
        const getSubSale = async () => {
            await apiInstance.get(`subject-sales`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
                .then(res => {
                    console.log(res.data.data,'res')
                    setSubjectSaleList(res.data.data)
                    setPages(res.data?._metadata?.page_count)
                })
        }
        getSubSale()
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

    const handleClose = () => {
        onClose();
        setDelID(null)
    }

    const handleDelete = async () => {
        console.log(setDelID)
        await apiInstance.delete(`subject-sales/${delID}`)
            .then(() => {
                setSubjectSaleList(subjectSaleList.filter(item => item._id !== delID))
                onClose()
            })
    }

    return (
        <>
            <div className="flex gap-3 mb-3 justify-end">
              
                    <Link to='/subject-sale-add'>  <Button color="primary" endContent={<PlusIcon />}>Add</Button></Link>
                
              
            </div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-default-400 text-small">Total {subjectSaleList.length} Subject Sales</span>
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
            
                className=''
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
                    <TableColumn key="name">Subject Name</TableColumn>
                    <TableColumn key="description">Instructor</TableColumn>
                    <TableColumn key="workingDay" className="text-center">Start Date</TableColumn>
                    <TableColumn key="workingFrom">End Date</TableColumn>
                    <TableColumn key="workingUntil">Duration</TableColumn>
                    <TableColumn key="casualLeaves">Student Allowed</TableColumn>
                    <TableColumn key="medicalLeaves">Current Student</TableColumn>
                    <TableColumn key="medicalLeaves">Price </TableColumn>
                    <TableColumn key="vacationLeaves">Installment Times</TableColumn>
                    <TableColumn key="basicSalary">Image</TableColumn>
                    <TableColumn key="basicSalary">Description</TableColumn>
                    <TableColumn key="actions">Actions</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"No Positions to display."}
                >
                    {items.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item?.subject?.title}</TableCell>
                            <TableCell>{item?.instructor?.name}</TableCell>
                            <TableCell>
                              {item?.fromDate?.split('T')[0]}
                            </TableCell>
                            <TableCell>{item?.toDate?.split('T')[0]}</TableCell>
                            <TableCell>{item?.duration}</TableCell>
                            <TableCell>{item?.noOfStudentAllow}</TableCell>
                            <TableCell>{item?.noOfEnrolledStudent}</TableCell>
                            <TableCell>{item?.fee}</TableCell>
                            <TableCell>{item?.installmentTime}</TableCell>
                              <TableCell>    <User
                  avatarProps={{
                    radius: "lg",
                    src:
                      item.image ? getFile({payload:item.image}) : '',
                  }}
               />
         
          
             </TableCell>
                            <TableCell>{item.description}</TableCell>
                        
                            <TableCell>
                                <div className="relative flex items-center gap-2">

                                    <Tooltip content="Edit Subject">
                                        <Link to={`/subject-sale/${item._id}`}>
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
                            <ModalHeader className="flex flex-col gap-1">Delete Position</ModalHeader>
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
        </>
    )
}