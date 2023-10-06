
import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function DepartmentUpdateInput() {
    const variant = 'faded';
    const id = useLocation().pathname.split('/')[3]
    const [department, setDepartment] = useState(null)
    const [departmentList, setDepartmentList] = useState([])
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        const getEmployeeList = async () => {
            await apiInstance.get('users').then(res => setEmployeeList(res.data.data))
        }
        const getDepartmentList = async () => {
            
            await apiInstance.get('departments')
                .then(res => {
                    console.log(res.data)
                    setDepartmentList(res.data.data)
                })
        }

        const getDepartmentByID = async () => {
            console.log(id)
            await apiInstance.get(`department/${id}`)
                .then(res => {
                    console.log(res.data.data[0])
                    setDepartment(res.data.data[0])
                })
        }
        getDepartmentByID()
        getDepartmentList()
        getEmployeeList()
    }, [])

    const handleInputChange = (fieldName, value) => {
        setDepartment(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const handleUpdate = async () => {
        let data = department
        data.id = id
        await apiInstance.put('department', data)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Edited'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                <Input
                    type="text"
                    label="Name"
                    value={department ? department.name : ''}
                    placeholder="Name"
                    variant={variant}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    label="Description"
                    value={department ? department.description : ''}
                    placeholder="Description"
                    variant={variant}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Level</label>
                    <select

                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={department ? department.level : ''} hidden>{department ? department.level : 'Not Set'}</option>
                        <option value='Strategic'>Strategic</option>
                        <option value='Tactical'>Tactical</option>
                        <option value='Operation'>Operation</option>

                    </select>
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Function</label>
                    <select
                        onChange={(e) => handleInputChange('function', e.target.value)}
                        className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={department ? department.function : ''} hidden>{department ? department.function : 'Not Set'}</option>
                        <option value='Sale&Marketing'>Sales & Marketing</option>
                        <option value='Operation'>Operation</option>
                        <option value='Project Management'>Project Management</option>
                        <option value='HR'>HR</option>
                        <option value='Admin'>Admin</option>
                        <option value='Finance'>Finance</option>
                        <option value='IT'>IT</option>
                        <option value='Logistic'>Logistic</option>
                        <option value='Procurement'>Procurement</option>

                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Activities</label>
                    <select
                        onChange={(e) => handleInputChange('activities', e.target.value)}
                        className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={department ? department.activities : ''} hidden>{department ? department.activities : 'Not Set'}</option>
                        <option value='Primary'>Primary</option>
                        <option value='Secondary'>Secondary</option>

                    </select>
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Reporting To</label>
                    <select
                        onChange={(e) => handleInputChange('reportingTo', e.target.value)}
                        className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={department && department.reportingTo ? department.reportingTo._id : ''} hidden>{department && department.reportingTo ? department.reportingTo.name : 'Not Set'} </option>
                        {departmentList.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Direct Manager</label>
                    <select
                        onChange={(e) => handleInputChange('directManager', e.target.value)}
                        className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={department && department.directManager ? department.directManager._id : ''} hidden>{department && department.directManager ? department.directManager.givenName : ''}</option>
                        {employeeList.map(item => (
                            <option key={item._id} value={item._id}>{item.givenName}</option>
                        ))}

                    </select>
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Assistant Manager</label>
                    <select
                        onChange={(e) => handleInputChange('assistantManager', e.target.value)}
                        className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={department && department.assistantManager ? department.assistantManager._id : ''} hidden>{department && department.assistantManager ? department.assistantManager.givenName : ''}</option>
                        {employeeList.map(item => (
                            <option key={item._id} value={item._id}>{item.givenName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-center gap-10 py-4">
                <Button color="danger">
                    <Link to='/department'>
                        Cancel
                    </Link>
                </Button>
                <Button color="primary" onClick={() => handleUpdate()}>Update</Button>
            </div>
        </div>
    )
}