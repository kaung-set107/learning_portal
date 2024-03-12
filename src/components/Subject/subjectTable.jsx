import {

  Tooltip,
  Table,
  TableHeader,
  Modal,

  ModalContent,
  User,
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
  TableCell
} from '@nextui-org/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import apiInstance from '../../util/api'
import { EditIcon } from '../Table/editicon'
import { EyeIcon } from '../Table/eyeicon'
import { DeleteIcon } from '../Table/deleteicon'
import { Link } from 'react-router-dom'
import { PlusIcon } from '../../assets/Icons/PlusIcon'

import { getFile } from '../../util/index';

export default function AttendanceTable() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [delID, setDelID] = useState(null)
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(15)
  const [subjectList, setSubjectList] = React.useState([])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return subjectList.slice(start, end)
  }, [page, subjectList])



  const handleKeyDown = event => {
    if (event.key === 'Enter' && isOpen) {
      handleDelete()
    }
  }

  const onRowsChange = event => {
    const newRowsPerPage = parseInt(event.target.value)
    setRowsPerPage(newRowsPerPage)
    setPages(Math.ceil(subjectList.length / newRowsPerPage))
    setPage(1) // Reset the current page to 1 when rows per page changes
  }



  useEffect(() => {
    const getSubject = async () => {
      await apiInstance
        .get(`subjects`, { params: { limit: 80, rowsPerPage: rowsPerPage } })
        .then(res => {
          setSubjectList(res.data.data)
          console.log(res.data.data, 'att')
          //   setPages(res.data._metadata.page_count)
        })
    }

    getSubject()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, rowsPerPage])

  const handleOpen = event => {
    onOpen()
    console.log(event.currentTarget.getAttribute('data-key'))
    setDelID(event.currentTarget.getAttribute('data-key'))
  }

  const handleClose = () => {
    onClose()
    setDelID(null)
  }

  const handleDelete = async () => {
    console.log(setDelID)
    await apiInstance.delete('subjects/' + delID).then(() => {
      setSubjectList(subjectList.filter(item => item._id !== delID))
      onClose()
    })
  }

  return (
    <>
      <div className='flex flex-row gap-5 justify-between'>
        <div className='flex gap-4 mb-3 flex-row'>
          {/* <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Department
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectionMode='single'
            >
              {departmentList.map(item => (
                <DropdownItem
                  key={item._id}
                  value={item._id}
                  className='capitalize'
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown> */}
          {/* <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Type
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectionMode='single'
            >
              <DropdownItem key='M-F' value='M-F' className='capitalize'>
                All
              </DropdownItem>
              <DropdownItem key='M-S' value='M-S' className='capitalize'>
                IELTs
              </DropdownItem>
              <DropdownItem
                key='All Day'
                value='All Day'
                className='capitalize'
              >
               GED
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          {/* <Button
            color='primary'
            endContent={<SearchIcon className='w-5 h-4' />}
          >
            Search
          </Button> */}
        </div>
        <div className='flex gap-2 mb-3 flex-row'>

          <Link to='/subject-add'>
            <Button endContent={<PlusIcon />} color='primary'>
              Add
            </Button>
          </Link>
        </div>
      </div>
      <div className='flex justify-between items-center mb-3'>
        <span className='text-default-400 text-small'>
          Total {subjectList.length} Subjects
        </span>
        <label className='flex items-center text-default-400 text-small'>
          Rows per page:
          <select
            className='bg-transparent outline-none text-default-400 text-small'
            onChange={e => onRowsChange(e)}
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
          base: 'max-h-[719px] ',
          table: 'min-h-[100px]'
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
              onChange={page => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>No</TableColumn>
          <TableColumn>Code</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Course</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Fee</TableColumn>
          <TableColumn>Description</TableColumn>

          <TableColumn key='action'>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No Positions to display.'}>
          {items.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item?.code}
              </TableCell>
              <TableCell>
                {item?.title}
              </TableCell>

              <TableCell>
                {item.course?.title}
              </TableCell>
              <TableCell>    <User
                avatarProps={{
                  radius: "lg",
                  src:
                    item.image ? getFile({ payload: item.image }) : '',
                }}
              />


              </TableCell>
              <TableCell>
                {item?.fee}
              </TableCell>
              <TableCell>{item?.description}</TableCell>


              <TableCell>
                <div className='relative flex items-center gap-2'>
                  <Tooltip content='Edit Position'>
                    <Link to={'/subject-detail/' + item._id}>
                      <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                        <EyeIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip content='Edit Position'>
                    <Link to={'/subject-update/' + item._id}>
                      <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                        <EditIcon />
                      </span>
                    </Link>
                  </Tooltip>
                  <Tooltip color='danger' content='Delete user'>
                    <span
                      data-key={item._id}
                      className='text-lg text-danger cursor-pointer active:opacity-50'
                      onClick={e => handleOpen(e)}
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
          {handleClose => (
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
                  <Kbd className='bg-danger-500' keys={['enter']}></Kbd>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
