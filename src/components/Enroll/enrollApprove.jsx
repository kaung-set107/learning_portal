import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tooltip,
  Image,
  Table,
  TableHeader,
  Kbd,
  Modal,
  Pagination,
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
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiInstance from "../../util/api";
import { Link, useNavigate } from "react-router-dom";
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { getFile } from "../../util";

export default function ApproveList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [pendingList, setPendingList] = useState([]);

  const [dataCount, setDataCount] = useState("");
  const [delID, setDelID] = useState(null);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return pendingList.slice(start, end);
  }, [page, pendingList]);

  //   const PageCount = Math.round((pages / rowsPerPage) * page) + 1;
  //   console.log(Math.round(PageCount) + 1, "pageCo");
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
      dataCount.enrollmentCount % rowsPerPage === 0
        ? dataCount.enrollmentCount / rowsPerPage
        : Math.round(dataCount.enrollmentCount / rowsPerPage) + 1
    );

    setPage(1); // Reset the current page to 1 when rows per page changes
  };

  useEffect(() => {
    const getDepartments = async () => {
      await apiInstance.get(`overall-enrollments`).then((res) => {
        // console.log(res.data, "stu wait");
        setPendingList(res.data.data);

        setDataCount(res.data.counts);
        setPages(
          res.data.counts.enrollmentCount % rowsPerPage === 0
            ? res.data.counts.enrollmentCount / rowsPerPage
            : Math.floor(res.data.counts.enrollmentCount / rowsPerPage) + 1
        );
      });
    };
    getDepartments();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, rowsPerPage]);

  const handleRoute = (id) => {
    console.log(id, "id");
    navigate(`/enroll-approve-detail/${id}`);
  };
  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <span className='text-default-400 text-small'>
          Total {pendingList.length} Approve List
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
          <TableColumn className='bg-blue-900 text-white'>No</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Code</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Student Name
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Desired Course
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Registeration Date
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Phone Number
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Email</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Gender</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Address</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Departments to display."}>
          {items.map((item, index) => (
            <TableRow
              key={item._id}
              className='hover:bg-blue-100 hover:duration-700'
              onClick={() => handleRoute(item._id)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.code}</TableCell>
              <TableCell>{item.student?.name}</TableCell>
              <TableCell>{item.subject?.title}</TableCell>
              <TableCell>{item.date?.split("T")[0]}</TableCell>
              <TableCell>{item.student?.phone}</TableCell>
              <TableCell>{item.student?.email}</TableCell>
              <TableCell>{item.student?.gender}</TableCell>
              <TableCell>{item.student?.address}</TableCell>
              {/* <TableCell>
                <div className='relative flex items-center gap-2'>
                  <Tooltip content='Edit Department'>
                    <Link to={`/department/update/${item._id}`}>
                      <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                        <EditIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color='danger' content='Delete Department'>
                    <span
                      data-key={item._id}
                      className='text-lg text-danger cursor-pointer active:opacity-50'
                      onClick={(e) => handleOpen(e)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Delete Enroll
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
      </Modal> */}
    </>
  );
}
