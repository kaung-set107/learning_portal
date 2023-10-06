import {
  Tooltip,
  Table,
  TableHeader,
  Modal,
  DropdownItem,
  ModalContent,
  RadioGroup,
  Radio,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Kbd,
  Input,
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
  Image,
  Divider,
  Chip
} from '@nextui-org/react'
import Swal from 'sweetalert2'
import React, { useState } from 'react'
import { useEffect } from 'react'
import apiInstance from '../../util/api'
import { EditIcon } from '../Table/editicon'
import { DeleteIcon } from '../Table/deleteicon'
import { ChevronDownIcon } from '../../assets/Icons/ChevronDownIcon'
import { SearchIcon } from '../Navbar/search'
import { useForm } from 'react-hook-form'
import { attendanceInputDate, convertAndDisplayTZ, convertToWeekDayNames, getDatesByMonth } from '../../util/Util'
import { PlusIcon } from '../../assets/Icons/PlusIcon'

export default function AttendanceDetailPage() {
  const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const disabled = false
  const [isSearched, setIsSearched] = useState(true)
  const [isDepSelected, setIsDepSelected] = useState(true)
  const [attendanceList, setAttendanceList] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit
  } = useDisclosure()

  const {
    isOpen: isOpenCalculate,
    onOpen: onOpenCalculate,
    onClose: onCloseCalculate
  } = useDisclosure()

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd
  } = useDisclosure()
  const [delID, setDelID] = useState(null)
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [departmentList, setDepartmentList] = React.useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [profile, setProfile] = useState({})
  const [month, setMonth] = useState('')
  const [payRoll, setPayroll] = useState({})
  const [editList, setEditList] = useState({})
  const [userList, setUserList] = useState([])
  const [department, setDepartment] = useState({})
  const [totalDays, setTotalDays] = useState('')
  const [workingDay, setWorkingDay] = useState([])
  const { form, register, handleSubmit, formState: { errors } } = useForm();
  const [img, setImg] = useState('https://placehold.co/250x250/png?text=User')
  const [filter, setFilter] = useState({
    dep: null,
    emp: null
  })

  const handleRelatedUserChange = async (e) => {
    const keyName = e.target.options[e.target.options.selectedIndex].getAttribute('data-keyName');
    const keyID = e.target.options[e.target.options.selectedIndex].getAttribute('data-key');
    console.log(keyName, keyID, 'keyName')
    setDepartment({ _id: keyID, name: keyName })

  }

  const handleCalculate = async (saveStatus) => {
    await apiInstance
      .post('attendances/calculate', {
        dep: filter.dep,
        emp: filter.emp,
        month: month,
        basicSalary: profile.relatedPosition.basicSalary,
        saveStatus: saveStatus
      })
      .then(res => {
        setPayroll(res.data.data)
      })
      .catch(error => {
        setPayroll(error.response.data.data)
        Swal.fire({
          icon: 'error',
          title: 'Calculation Failed',
          text: error.response.data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
      })
  }

  const handleEditListChange = (name, value) => {
    setEditList(prev => ({ ...prev, [name]: value }))
  }

  const handleAddAttendance = async () => {
    onCloseAdd()
    console.log('clicked', form)
  }

  const handleEditAttendance = async () => {
    console.log('here')
    let data = editList
    data.id = editList._id
    await apiInstance
      .put('attendance', data)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated'
        })

        //cann't reload and then direct input update data
        setAttendanceList(
          attendanceList.map(att => {
            if (att._id === res.data.data._id) {
              return res.data.data
            } else {
              return att
            }
          })
        )
        //end

        onClose()
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Attendance Edit Failed',
          text: error.response.data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
      })
  }

  const handleSearch = async () => {
    setIsSearched(false)
    console.log('search')
    setPayroll({
      attendedSalary: 0,
      dismissedSalary: 0,
      entitledSalary: 0,
      totalAttendance: 0,
      paid: 0,
      unpaid: 0
    })
    await apiInstance.get('user/' + filter.emp).then(res => {
      setProfile(res.data.data)
      setWorkingDay(res.data.data.relatedPosition.workingDay)
      if (res.data.data.profile.length > 0) {
        setImg(
          `http://hrmbackend.kwintechnologykw11.com:5000/static/hrm/${res.data.data.profile[0].imgUrl}`
        )
      } else {
        setImg(`https://placehold.co/250x250/png?text=User`)
      }
    })
    await apiInstance
      .get(`attendances/detail`, {
        params: {
          limit: 80,
          rowsPerPage: rowsPerPage,
          dep: filter.dep,
          emp: filter.emp,
          month: month
        }
      })
      .then(res => {
        setAttendanceList(res.data.data)
        setPages(res.data._metadata.page_count)

      })
  }

  const handleFilterInput = async (value, name) => {
    setFilter(prev => ({ ...prev, [name]: value }))

  }

  const getEmployeeList = async param => {
    await apiInstance
      .get('users/department', { params: { dep: param } })
      .then(res => {
        setEmployeeList(res.data.data)
      })
  }

  const handleDepartmentDropDown = value => {
    handleFilterInput(value, 'dep')
    setIsDepSelected(false)
    getEmployeeList(value)
  }

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return attendanceList.slice(start, end)
  }, [page, attendanceList])

  const handleKeyDown = event => {
    if (event.key === 'Enter' && isOpen) {
      handleDelete()
    }
  }

  const onRowsChange = event => {
    const newRowsPerPage = parseInt(event.target.value)
    setRowsPerPage(newRowsPerPage)
    setPages(Math.ceil(attendanceList.length / newRowsPerPage))
    setPage(1) // Reset the current page to 1 when rows per page changes
  }

  const handleCheck = async (val, id) => {
    const changed = attendanceList.map(item => {
      if (item._id === id) {
        return { ...item, type: val };
      }
      return item; // Return the original item for elements that don't match the condition.
    });
    setAttendanceList(changed)
    let isPaid;
    val === 'Attend' ? isPaid = true : isPaid = false;
    await apiInstance
      .put('attendance', { type: val, isPaid: isPaid, id: id })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated'
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    const getAttendances = async () => {
      await apiInstance
        .get(`attendances/detail`, {
          params: {
            limit: 80,
            rowsPerPage: rowsPerPage,
            dep: filter.dep,
            emp: filter.emp,
            month: month
          }
        })
        .then(res => {
          setAttendanceList(res.data.data)
          setPages(res.data._metadata.page_count)
        })
    }
    const getDepartmentList = async () => {
      await apiInstance.get('departments').then(res => {
        setDepartmentList(res.data.data)
      })
    }

    const getUsers = async () => {
      await apiInstance.get('users').then(res => {
        setUserList(res.data.data)
      })
    }
    getUsers()
    getDepartmentList()
    getAttendances()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, rowsPerPage])

  const handleOpenAdd = async () => {
    onOpenAdd()
  }
  const handleOpenCalculate = async () => {
    onOpenCalculate()
  }

  const handleOpenEdit = async event => {
    onOpenEdit()
    console.log(event.currentTarget.getAttribute('data-key2'))
    await apiInstance
      .get('attendance/' + event.currentTarget.getAttribute('data-key2'))
      .then(res => {
        if (res.data.data) {
          setEditList(res.data.data[0])
          console.log(editList)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Attendance Update Failed',
            text: 'Something Went Wrong',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          })
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Attendance Update Failed',
          text: error.response.data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
      })
  }

  const handleOpen = event => {
    onOpen()
    console.log(event.currentTarget.getAttribute('data-key'))
    setDelID(event.currentTarget.getAttribute('data-key'))
  }

  const handleClose = () => {
    onClose()
    setDelID(null)
  }

  const handleEditClose = () => {
    onCloseEdit()
  }

  const handleAddClose = () => {
    onCloseAdd()
  }

  const handleDelete = async () => {
    console.log(setDelID)
    await apiInstance.delete('attendance/' + delID).then(() => {
      setAttendanceList(attendanceList.filter(item => item._id !== delID))
      onClose()
    })
  }

  const handleTotalDays = async (month) => {
    console.log(month)
    const datePayload = getDatesByMonth(month)
    const totalDays = new Date(datePayload.$lte).getUTCDate();
    if (totalDays) setTotalDays(totalDays)
  }

  //
  return (
    <>
      <div className='flex flex-row gap-5 justify-between '>
        <div className='flex gap-4 mb-3 flex-row'>
          <Dropdown>
            <DropdownTrigger className='hidden sm:flex'>
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Department
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={value => handleDepartmentDropDown(value)}
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
          </Dropdown>
          <Dropdown>
            <DropdownTrigger
              isDisabled={isDepSelected}
              className='hidden sm:flex'
            >
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                Employee
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={value => handleFilterInput(value, 'emp')}
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectionMode='single'
            >
              {employeeList.map(item => (
                <DropdownItem
                  key={item._id}
                  value={item._id}
                  className='capitalize'
                >
                  {item.givenName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger
              isDisabled={isDepSelected}
              className='hidden sm:flex'
            >
              <Button
                endContent={<ChevronDownIcon className='text-small' />}
                variant='flat'
              >
                {month ? month : 'Month'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(value) => {
                setMonth(value)
                handleTotalDays(value)
              }}
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectionMode='single'
            >
              {months.map(item => (
                <DropdownItem key={item} value={item} className='capitalize'>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color='primary'
            isDisabled={isDepSelected}
            endContent={<SearchIcon className='w-5 h-4' />}
            onClick={() => handleSearch()}
          >
            Search
          </Button>
        </div>
        <div className='flex gap-2 mb-3 flex-row'>
          <Button
            color='primary'
            isDisabled={isSearched}
            onClick={handleOpenCalculate}
          >
            Calculate
          </Button>
          <Button endContent={<PlusIcon />} color='primary' onClick={handleOpenAdd}>
            Add
          </Button>
        </div>
      </div>
      <section>
        <div className='mb-3 p-auto flex gap-4 mt-3'>
          <div className=''>
            <Image
              className='flex-none'
              width={250}
              height={250}
              isZoomed
              src={img}
            ></Image>
          </div>
          <div className='flex-column flex-grow mt-4'>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Employee</span>
              <Input
                isDisabled={disabled}
                size='sm'
                type='text'
                label='Name'
                value={profile.givenName}
              />
            </div>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Phone</span>
              <Input
                isDisabled={disabled}
                size='sm'
                type='text'
                value={profile.phone}
                label='Phone'
              />
            </div>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Email</span>
              <Input
                isDisabled={disabled}
                size='sm'
                type='email'
                value={profile.email}
                label='Email'
              />
            </div>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Basic Salary</span>
              <Input
                isDisabled={disabled}
                size='sm'
                type='text'
                label='Basic Salary'
                value={profile?.relatedPosition?.basicSalary}
              />
            </div>
          </div>
          <div className='flex-column flex-grow mt-4'>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Paid Days</span>
              <Input
                isDisabled={disabled}
                size='lg'
                type='text'
                value={payRoll?.paid}
              />
            </div>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Entitled Salary</span>
              <Input
                isDisabled={disabled}
                size='lg'
                type='text'
                value={
                  payRoll && payRoll.entitledSalary
                    ? Math.round(payRoll?.entitledSalary)
                    : ''
                }
              />
            </div>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Total Attendances</span>
              <Input
                isDisabled={disabled}
                size='lg'
                type='text'
                value={payRoll?.totalAttendance}
              />
            </div>
            <div className='flex-row flex gap-2 mb-2'>
              <span className='m-auto w-1/2'>Unpaid Days</span>
              <Input
                isDisabled={disabled}
                size='lg'
                type='text'
                value={payRoll?.unpaid}
              />
            </div>
          </div>
        </div>
      </section>

      <Divider className='my-3'></Divider>
      <div className='flex justify-between items-center mb-3'>
        <span className='text-default-400 text-small'>
          Total {attendanceList.length} Attendances
        </span>
        <span className={`text-default-400 text-small `}>
          Total Days of {month ? month : 'The Month'} : <span className={`text-small ${totalDays <= attendanceList.length ? 'text-[#18c964]' : 'text-[#f31260]'}`}>{totalDays ? totalDays : 'Unset'}</span>
        </span>
        <label className='flex items-center text-default-400 text-small'>
          Rows per page:
          <select
            className='bg-transparent outline-none text-default-400 text-small'
            onChange={e => onRowsChange(e)}
          >
            <option value='15'>15</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
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
          <TableColumn>Date</TableColumn>
          <TableColumn>Day</TableColumn>
          <TableColumn>Clock In</TableColumn>
          <TableColumn>Clock Out</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Department</TableColumn>
          <TableColumn>Attend Type</TableColumn>
          <TableColumn>Source</TableColumn>
          <TableColumn className='text-center'>Check</TableColumn>

          <TableColumn key='action'>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No Positions to display.'}>
          {items.map((item, index) => (
            <TableRow key={item?._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item?.date ? convertAndDisplayTZ(item?.date) : 'Not Set'}
              </TableCell>
              <TableCell>
                <Chip variant="light" size='sm' color={workingDay.includes(convertToWeekDayNames(item?.date)) ? 'primary' : 'danger'}>{convertToWeekDayNames(item?.date)}</Chip>
              </TableCell>
              <TableCell>{item?.clockIn}</TableCell>
              <TableCell>{item?.clockOut}</TableCell>
              <TableCell>
                {item?.relatedUser?.givenName}
              </TableCell>
              <TableCell>
                {item?.relatedDepartment?.name}
              </TableCell>
              <TableCell>{item?.attendType}</TableCell>
              <TableCell>{item?.source}</TableCell>
              <TableCell>
                <RadioGroup
                  onValueChange={e => handleCheck(e, item._id)}
                  orientation='horizontal'
                  defaultValue={item?.type}
                >
                  <Radio value='Attend'>Attend</Radio>
                  <Radio value='Dismiss'>Dismiss</Radio>
                </RadioGroup>
              </TableCell>

              <TableCell>
                <div className='relative flex items-center gap-2'>
                  <Tooltip content='Edit Position'>
                    <span
                      data-key2={item?._id}
                      className='text-lg text-default-400 cursor-pointer active:opacity-50'
                      onClick={e => handleOpenEdit(e)}
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color='danger' content='Delete user'>
                    <span
                      data-key={item?._id}
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

      <Modal backdrop='blur' isOpen={isOpenCalculate} onClose={onCloseCalculate}>
        <ModalContent>
          {onCloseCalculate => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Save Payroll
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to save this payroll?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onClick={() => {
                  handleCalculate(false)
                  onCloseCalculate()
                }}>
                  No, Cancel
                </Button>
                <Button
                  color='success'
                  onPress={() => {
                    handleCalculate(true)
                    onCloseCalculate()
                  }}
                >
                  Yes, I am sure
                  {/* <Kbd className='bg-danger-500' keys={['enter']}></Kbd> */}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal backdrop='blur' isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {handleClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Delete Attendance
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this attendance?</p>
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

      <Modal
        backdrop='blur'
        isOpen={isOpenEdit}
        onClose={handleEditClose}
        size='2xl'
      >
        <ModalContent>
          {handleEditClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Attendance Update
              </ModalHeader>
              <ModalBody>
                <section>
                  <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                      <label className='text-sm font-semibold'>Name</label>
                      <select
                        onChange={e =>
                          handleEditListChange('relatedUser', e.target.value)
                        }
                        className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                      >
                        <option hidden value={editList.relatedUser?._id}>
                          {editList.relatedUser?.givenName}
                        </option>

                        {userList.map(option => (
                          <option key={option._id} value={option._id}>
                            {option.givenName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
                      <label className='text-sm font-semibold'>Date</label>
                      <Input
                        type='date'
                        value={editList.date ? attendanceInputDate(editList.date) : ''}
                        variant='faded'
                        onChange={e =>
                          handleEditListChange('date', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <Input
                      type='time'
                      label='ClockIn Time'
                      placeholder='Time'
                      value={editList?.clockIn}
                      variant='faded'
                      onChange={e =>
                        handleEditListChange('clockIn', e.target.value)
                      }
                      labelPlacement='outside'
                    />
                    <Input
                      type='time'
                      label='ClockOut Time'
                      placeholder='Time'
                      value={editList?.clockOut}
                      variant='faded'
                      onChange={e =>
                        handleEditListChange('clockOut', e.target.value)
                      }
                      labelPlacement='outside'
                    />
                  </div>
                  <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                      <label className='text-sm font-semibold'>Source</label>
                      <select
                        onChange={e =>
                          handleEditListChange('source', e.target.value)
                        }
                        className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                      >
                        <option hidden value={editList?.source}>
                          {editList?.source}
                        </option>

                        <option value='Excel'>Excel</option>
                        <option value='Manual'>Manual</option>
                      </select>
                    </div>

                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                      <label className='text-sm font-semibold'>
                        Department
                      </label>
                      <select
                        onChange={e =>
                          handleEditListChange(
                            'relatedDepartment',
                            e.target.value
                          )
                        }
                        className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                        disabled
                      >
                        <option hidden value={editList.relatedDepartment?._id}>
                          {editList.relatedDepartment?.name}
                        </option>
                        {departmentList.map(option => (
                          <option key={option} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                    <>
                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className='text-sm font-semibold'>Type</label>
                        <select
                          onChange={e => {
                            handleEditListChange('type', e.target.value)
                          }}
                          className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                        >
                          <option hidden value={editList?.type}>
                            {editList?.type}
                          </option>

                          <option value='Attend'>Attend</option>
                          <option value='Dismiss'>Dismiss</option>
                        </select>
                      </div>
                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                          <label className='text-sm font-semibold'>
                            AttendType
                          </label>
                          <select
                            onChange={e =>
                              handleEditListChange('attendType', e.target.value)
                            }
                            className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                          >
                            <option hidden value={editList?.attendType}>
                              {editList?.attendType}
                            </option>

                            <option value='Week Day'>Week Day</option>
                            <option value='Day Off'>Day Off</option>
                            <option value='Holiday'>Holiday</option>
                          </select>
                        </div>
                      </div>
                    </>
                    <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                      <Input
                        type='text'
                        label='Dismiss Reason'
                        placeholder='Dismiss reason ...'
                        variant='faded'
                        defaultValue={editList?.dismissReason}
                        onChange={e =>
                          handleEditListChange('dismissReason', e.target.value)
                        }
                        labelPlacement='outside'
                      />
                    </div>
                  </div>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onClick={handleEditClose}
                >
                  No, Cancel
                </Button>
                <Button color='primary' onClick={handleEditAttendance}>
                  Edit Attendance
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      <Modal
        backdrop='blur'
        isOpen={isOpenAdd}
        onClose={handleAddClose}
        size='2xl'
      >
        <ModalContent>
          {handleAddClose => (
            <>
              <form onSubmit={handleSubmit(handleAddAttendance)}>
                <ModalHeader className='flex flex-col gap-1'>
                  Attendance Registration
                </ModalHeader>
                <ModalBody>

                  <section>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className={`text-sm font-semibold ${errors.relatedUser && errors.relatedUser.type === 'required' ? 'text-[#f31260]' : ''}`}>Name</label>
                        <select
                          {...register('relatedUser', { required: true, onChange: (e) => handleRelatedUserChange(e) })}
                          className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                        >
                          <option hidden value=''>
                            Choose User
                          </option>

                          {userList.map(option => (
                            <option key={option._id} data-key={option.relatedDepartment._id} data-keyName={option.relatedDepartment.name} value={option._id}>
                              {option.givenName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
                        <label className={`text-sm font-semibold ${errors.date && errors.date.type === 'required' ? 'text-[#f31260]' : ''}`}>Date</label>
                        <Input
                          type='date'
                          {...register('date', { required: true })}
                          variant='faded'
                        // onChange={e =>
                        //   handleEditListChange('date', e.target.value)
                        // }
                        />
                      </div>
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                      <Input
                        type='time'
                        label='ClockIn Time'
                        placeholder='Time'
                        validationState={errors.clockIn && errors.clockIn.type === 'required' ? 'invalid' : 'valid'}
                        variant='faded'
                        {...register('clockIn', { required: true })}
                        // onChange={e =>
                        //   handleEditListChange('clockIn', e.target.value)
                        // }
                        labelPlacement='outside'
                      />
                      <Input
                        type='time'
                        label='ClockOut Time'
                        placeholder='Time'
                        validationState={errors.clockOut && errors.clockOut.type === 'required' ? 'invalid' : 'valid'}
                        {...register('clockOut', { required: true })}
                        variant='faded'
                        // onChange={e =>
                        //   handleEditListChange('clockOut', e.target.value)
                        // }
                        labelPlacement='outside'
                      />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className={`text-sm font-semibold ${errors.source && errors.source.type === 'required' ? 'text-[#f31260]' : ''}`}>Source</label>
                        <select
                          // onChange={e =>
                          //   handleEditListChange('source', e.target.value)
                          // }
                          {...register('source', { required: true })}
                          className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                        >
                          <option hidden value=''>
                            Choose Source
                          </option>

                          <option value='Excel'>Excel</option>
                          <option value='Manual'>Manual</option>
                        </select>
                      </div>

                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <label className={`text-sm font-semibold ${errors.relatedDepartment && errors.relatedDepartment.type === 'required' ? 'text-[#f31260]' : ''}`}>Deparment</label>
                        <select
                          // onChange={e =>
                          //   handleEditListChange(
                          //     'relatedDepartment',
                          //     e.target.value
                          //   )
                          // }
                          {...register('relatedDepartment',)}
                          className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                          disabled
                        >
                          <option hidden value=''>
                            Choose Department
                          </option>
                          <option key={department ? department._id : ''}></option>
                        </select>
                      </div>
                    </div>

                    <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3'>
                      <>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                          <label className={`text-sm font-semibold ${errors.type && errors.type.type === 'required' ? 'text-[#f31260]' : ''}`}>Type</label>
                          <select
                            // onChange={e => {
                            //   handleEditListChange('type', e.target.value)
                            // }}
                            {...register('type', { required: true })}
                            className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                          >
                            <option hidden value=''>
                              Choose Type
                            </option>

                            <option value='Attend'>Attend</option>
                            <option value='Dismiss'>Dismiss</option>
                          </select>
                        </div>
                        <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                            <label className='text-sm font-semibold'>
                              AttendType
                            </label>
                            <select
                              // onChange={e =>
                              //   handleEditListChange('attendType', e.target.value)
                              // }
                              {...register('attendType')}
                              className='bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                            >
                              <option hidden value=''>
                                Choose Attend Type
                              </option>

                              <option value='Week Day'>Week Day</option>
                              <option value='Day Off'>Day Off</option>
                              <option value='Holiday'>Holiday</option>
                            </select>
                          </div>
                        </div>
                      </>
                      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                        <Input
                          type='text'
                          label='Dismiss Reason'
                          placeholder='Dismiss reason ...'
                          variant='faded'
                          // onChange={e =>
                          //   handleEditListChange('dismissReason', e.target.value)
                          // }
                          {...register('dismissReason')}
                          labelPlacement='outside'
                        />
                      </div>
                    </div>
                  </section>


                </ModalBody>
                <ModalFooter>
                  <Button
                    color='danger'
                    variant='light'
                    onClick={handleAddClose}
                  >
                    No, Cancel
                  </Button>
                  <Button color='primary' type='submit' >
                    Edit Attendance
                  </Button>
                </ModalFooter>
              </form >
            </>
          )}
        </ModalContent>
      </Modal>


    </>
  )
}
