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

import React, { useState, useEffect } from "react";
import { SearchIcon } from "../Navbar/search";
import { ChevronDownIcon } from "../../assets/Icons/ChevronDownIcon";
import PendingList from "./pendingList";
import apiInstance from "../../util/api";
export default function PendingTable() {
  const [waitListCount, setWaitListCount] = useState("");
  const [rejectCount, setRejectCount] = useState("");
  const [studentCounts, setStudentCounts] = useState("");
  console.log(waitListCount, "prop coun");
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  useEffect(() => {
    const getDepartments = async () => {
      await apiInstance
        .get(`overall-students`, {
          params: { status: "waiting" },
        })
        .then((res) => {
          setWaitListCount(res.data.counts.registerWaitingListCount);
          setRejectCount(res.data.counts.registerRejectListCount);
          setStudentCounts(res.data.counts.studentCount);
          console.log(res.data.counts, "reg");
        });
    };
    getDepartments();
  }, []);
  return (
    <>
      <div className='bg-red-700 grid grid-cols-3 rounded-md'>
        <div className='p-10 flex justify-center'>
          <div className='text-white text-center'>
            <p style={{ fontSize: "46px" }}>{waitListCount}</p>
            <b>Student Registered</b>
          </div>
        </div>
        <div className=' p-10 flex justify-center'>
          <div className='text-white text-center'>
            <p style={{ fontSize: "46px" }}>{studentCounts}</p>
            <b>Student Approved</b>
          </div>
        </div>
        <div className=' p-10 flex justify-center'>
          <div className='text-white text-center'>
            <p style={{ fontSize: "46px" }}>{rejectCount}</p>
            <b>Students Rejected</b>
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-3 justify-between py-10 text-base leading-6'>
        <div className='flex justify-center grid grid-cols-3 gap-10'>
          <div
            className={
              activeTab === 1
                ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-60 text-center font-semibold duration-500"
                : "w-60 text-center font-semibold py-3"
            }
            onClick={() => handleTabClick(1)}
          >
            Pending List &nbsp;
            {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
          </div>
          <div
            className={
              activeTab === 2
                ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-60 text-center font-semibold duration-500"
                : "w-60 text-center font-semibold py-3"
            }
            onClick={() => handleTabClick(2)}
          >
            Approved List &nbsp;
            {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
          </div>
          <div
            className={
              activeTab === 3
                ? "border-b-4 text-blue-800 bg-blue-100 py-3 border-indigo-500/75 w-60 text-center font-semibold duration-500"
                : "w-60 text-center font-semibold py-3"
            }
            onClick={() => handleTabClick(3)}
          >
            Rejected List &nbsp;
            {/* <Badge content='9+' shape='circle' color='danger'>
              <NotificationIcon size={24} />
            </Badge> */}
          </div>
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
            startContent={
              <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
            }
          />
        </div>
      </div>
      <div> {activeTab === 1 && <PendingList />}</div>
    </>
  );
}
