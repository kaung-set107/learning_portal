import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tooltip,
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
import { EditIcon } from "../Table/editicon";
import { DeleteIcon } from "../Table/deleteicon";
import { PlusIcon } from "../../assets/Icons/PlusIcon";
import React from "react";
import { SearchIcon } from "../Navbar/search";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import { Link } from "react-router-dom";
import { FaUncharted } from "react-icons/fa";
import { NotificationIcon } from "../Navbar/Noti";
export default function DepartmentTable() {
  const functions = [
    "Sale&Marketing",
    "Operation",
    "Project Management",
    "HR",
    "Admin",
    "Finance",
    "IT",
    "Logistic",
    "Procurement",
  ];
  const [departmentList, setDepartmentList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delID, setDelID] = useState(null);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [departmntFunction, setDepartmentFunction] = useState("");
  const [departmentLevel, setDepartmentLevel] = useState("");

  const filterDepartmentList = async () => {
    console.log(departmntFunction, departmentLevel);
    await apiInstance
      .get("departments", {
        params: { funct: departmntFunction, level: departmentLevel },
      })
      .then((res) => {
        setDepartmentList(res.data.data);
      });
  };
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return departmentList.slice(start, end);
  }, [page, departmentList]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isOpen) {
      handleDelete();
    }
  };

  const onRowsChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPages(Math.ceil(departmentList.length / newRowsPerPage));
    setPage(1); // Reset the current page to 1 when rows per page changes
  };

  useEffect(() => {
    const getDepartments = async () => {
      await apiInstance
        .get(`instructors`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
        .then((res) => {
          setDepartmentList(res.data.data);
          setPages(res.data._metadata.page_count);
        });
    };
    getDepartments();
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
    await apiInstance.delete("department/" + delID).then(() => {
      setDepartmentList(departmentList.filter((item) => item._id !== delID));
      onClose();
    });
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        <div className='bg-red-700 p-10 flex justify-center'>
          <div className='text-white text-center'>
            <p className='text-3xl '>24</p>
            <b>Student Registered</b>
          </div>
        </div>
        <div className='bg-red-700 p-10 flex justify-center'>
          <div className='text-white text-center'>
            <p className='text-3xl '>24</p>
            <b>Approved</b>
          </div>
        </div>
        <div className='bg-red-700 p-10 flex justify-center'>
          <div className='text-white text-center'>
            <p className='text-3xl '>24</p>
            <b>Rejected</b>
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-3 justify-between py-10'>
        <div className='ml-10 grid grid-cols-3 gap-20'>
          <Button color='primary' variant='light'>
            Pending List &nbsp;
            {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
          </Button>
          <Button color='primary' variant='light'>
            Approve List &nbsp;
            {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
          </Button>
          <Button color='primary' variant='light'>
            Reject List &nbsp;
            {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
          </Button>
        </div>
        <div className='flex gap-3 mb-3'>
          <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => setDepartmentLevel(key)}
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectionMode='single'
            >
              <DropdownItem
                key='Strategic'
                value='Strategic'
                className='capitalize'
              >
                Student ID
              </DropdownItem>
              <DropdownItem
                key='Tactical'
                value='Tactical'
                className='capitalize'
              >
                Registration Date
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Input
            isClearable
            radius='lg'
            style={{ borderRadius: "2px" }}
            placeholder='Type to search...'
            onChange={filterDepartmentList}
            startContent={
              <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
            }
          />
        </div>
      </div>
      <div className='flex justify-between items-center mb-3'>
        <span className='text-default-400 text-small'>
          Total {departmentList.length} Departments
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
          <TableColumn className='bg-blue-900 text-white'>Name</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Description
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Function</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Level</TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Reporting To
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Department Manager
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>
            Assistant Manager
          </TableColumn>
          <TableColumn className='bg-blue-900 text-white'>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Departments to display."}>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.function}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>
                {item.reportingTo ? item.reportingTo.name : "Not Set"}
              </TableCell>
              <TableCell>
                {item.directManager ? item.directManager.givenName : "Not Set"}
              </TableCell>
              <TableCell>
                {item.assistantManager
                  ? item.assistantManager.givenName
                  : "Not Set"}
              </TableCell>
              <TableCell>
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
                Delete Department
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
