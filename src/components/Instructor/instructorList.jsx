import {
  Tooltip,
  Table,
  TableHeader,
  Modal,
  ModalContent,
  Button,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  User,
} from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { EyeIcon } from "../Table/eyeicon";
import { Link } from "react-router-dom";
import { getFile } from "../../util/index";

export default function EmployeeTable() {
  const [empList, setEmpList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delID, setDelID] = useState(null);

  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return empList.slice(start, end);
  }, [page, empList]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isOpen) {
      handleDelete();
    }
  };

  const onRowsChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPages(Math.ceil(empList.length / newRowsPerPage));
    setPage(1); // Reset the current page to 1 when rows per page changes
  };
  useEffect(() => {
    const getEmployee = async () => {
      await apiInstance
        .get(`instructors`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
        .then((res) => {
          setEmpList(res.data.data);
          setPages(res.data._metadata.page_count);
          console.log(res.data.data, "emp");
        });
    };
    getEmployee();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, rowsPerPage]);

  const handleOpen = (event) => {
    onOpen();
    console.log(event.currentTarget.getAttribute("data-key"));
    setDelID(event.currentTarget.getAttribute("data-key"));
  };

  const handleClose = () => {
    onClose();
    setDelID(null);
  };

  const handleDelete = async () => {
    console.log(setDelID);
    await apiInstance.delete("instructors/" + delID).then(() => {
      setEmpList(empList.filter((item) => item._id !== delID));

      onClose();
    });
  };

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <span className='text-default-400 text-small'>
          Total {empList.length} Student
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
        className={{
          base: "max-h-[200px] ",
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
          <TableColumn key='no'>No</TableColumn>
          <TableColumn key='name'>Name</TableColumn>
          <TableColumn key='description'>Gender</TableColumn>
          <TableColumn key='workingFrom'>Phone</TableColumn>
          <TableColumn key='workingUntil'>NRC</TableColumn>
          <TableColumn key='casualLeaves'>Qualification</TableColumn>

          <TableColumn key='actions'>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Positions to display."}>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: item.image ? getFile({ payload: item.image }) : "",
                  }}
                  description={item.email}
                  name={item.name}
                >
                  {item.email}
                </User>
              </TableCell>
              <TableCell>{item.gender}</TableCell>

              <TableCell>{item?.phone}</TableCell>
              <TableCell>{item.nrc}</TableCell>
              <TableCell>{item.qualification}</TableCell>

              <TableCell>
                <div className='relative flex items-center gap-2'>
                  <Tooltip content='Details'>
                    <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content='Edit user'>
                    <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                      <Link to={"/instru-update/" + item._id}>
                        {" "}
                        <EditIcon />{" "}
                      </Link>
                    </span>
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
                Delete Position
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
                  onPress={() => handleDelete(delID)}
                  onKeyDown={handleKeyDown}
                >
                  Yes, I am sure
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
