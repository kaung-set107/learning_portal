
import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { Image } from '@nextui-org/react';

export default function LeaveInputForm() {
    const leaveType = ['Casual', 'Medical', 'Vacation', 'Maternity:Male', 'Maternity:Female'];
    // const status = ['Approved', 'Declined'];
    const [departmentList, setDepartmentList] = useState([]);
    const fileTypes = ["JPG", "PNG", "GIF"];
    const variant = 'faded';
    const [employeeList, setEmployeeList] = useState([])
    const [leaveList, setLeaveList] = useState([])
    const [position, setPosition] = useState(null)
    const [user, setUser] = useState(null)
    const [department, setDepartment] = useState(null)
    const [attachFile, setAttachFile] = useState(null);
    const [img, setImg] = useState([])
    const LeaveID = useLocation().pathname.split('/')[3]


    const handleInputChange = (fieldName, value) => {
        setLeaveList(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const handleChange = (e) => {
        let array = [];
        for (const item of e) {
            array.push(item);
        }
        setAttachFile(array);
    };


    const handleEmployee = async (value) => {

        handleInputChange('relatedUser', value)
        const employee = employeeList.filter(item => item._id === value)
        console.log(employee)
        handleInputChange('relatedPosition', employee[0].relatedPosition._id)
        setPosition(employee[0].relatedPosition)
    }




    const handleUpdate = async () => {
        const formData = new FormData()
        formData.append('id', LeaveID)
        formData.append('createdAt', leaveList.startDate)
        formData.append('endDate', leaveList.endDate)
        formData.append('relatedUser', leaveList.relatedUser)
        formData.append('relatedPosition', leaveList.relatedPosition)
        formData.append('reason', leaveList.reason)
        formData.append('leaveType', leaveList.leaveType)
        formData.append('relatedDepartment', leaveList.relatedDepartment)
        if (attachFile) {
            attachFile.forEach((item) => {
                formData.append("attach", item); // Assuming 'item' is a File object
            });
        }
        await apiInstance.put('leave', formData)

            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Registered'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const getEmployeeList = async () => {
            await apiInstance.get('users')
                .then(res => setEmployeeList(res.data.data))
        }

        const getLeaveList = async () => {
            await apiInstance.get('leave/' + LeaveID)
                .then(res => {
                    console.log(res.data.data[0])
                    setLeaveList(res.data.data[0])
                    setImg(res.data.data[0].attach)
                    setPosition(res.data.data[0].relatedUser.relatedPosition)
                    handleInputChange('relatedPosition', res.data.data[0].relatedUser.relatedPosition._id)
                    setUser(res.data.data[0].relatedUser)
                    handleInputChange('relatedUser', res.data.data[0].relatedUser._id)
                    setDepartment(res.data.data[0].relatedUser.relatedDepartment)
                    handleInputChange('relatedDepartment', res.data.data[0].relatedUser.relatedDepartment._id)
                }
                )
        }

        const getDepartmentList = async () => {
            await apiInstance.get('departments').then(res => setDepartmentList(res.data.data))
        }

        getDepartmentList()
        getLeaveList()
        getEmployeeList()

    }, [])

    return (

        <div className="gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="date"
                    label="Start Date"
                    placeholder="Date"
                    variant={variant}
                    value={leaveList.createdAt?.split('T')[0]}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="date"
                    label="End Date"
                    placeholder="Date"
                    value={leaveList.endDate?.split('T')[0]}
                    variant={variant}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Employee</label>
                    <select
                        onChange={(e) => handleEmployee(e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden value={user?._id}>{user?.givenName}</option>
                        {employeeList.map(item => (
                            <option key={item._id} value={item._id}>{item.givenName}</option>
                        ))}

                        {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                    </select>
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Position</label>
                    <select
                        disabled
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden>{position ? position.name : 'Not set'}</option>


                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="Reason"
                    placeholder="Reason..."
                    value={leaveList?.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    variant={variant}
                    labelPlacement="outside"
                />
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Type</label>
                    <select
                        onChange={(e) => handleInputChange('leaveType', e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden value={leaveList?.leaveType}>{leaveList?.leaveType}</option>
                        {leaveType.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                        {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 min-h-20">
                    <label className="text-sm font-semibold">Department</label>
                    <select
                        disabled
                        onChange={(e) => handleInputChange('relatedDepartment', e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option hidden value={department?._id}>{department?.name}</option>
                        {departmentList.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="mt-3"></div>
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                    {img.map((item) => (
                        <>
                            <Image
                                src={
                                    'http://hrmbackend.kwintechnologykw11.com:5000/static/hrm/' +
                                    item.imgUrl
                                }
                                style={{ width: '200px', height: '150px' }}
                                className='mt-4'


                            />
                        </>
                    ))}

                </div>


            </div>

            <div className="flex justify-center gap-10 py-4">
                <Button color="danger" >
                    <Link to='/leave'>
                        Cancel
                    </Link>
                </Button>
                <Button color="primary" onClick={() => handleUpdate()}>Update</Button>
            </div>
        </div >
    )
}