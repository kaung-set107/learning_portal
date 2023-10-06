
import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function DepartmentInputForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const variant = 'faded';
    const [departmentList, setDepartmentList] = useState([])
    const [employeeList, setEmployeeList] = useState([])

    const handleInputChange = (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const [data, setData] = useState({
        name: null,
        description: null,
        level: null,
        function: null,
        activities: null,
        reportingTo: null,
        directManager: null,
        assistantManager: null
    });

    const handleRegister = async () => {
        await apiInstance.post('department', data)
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
            await apiInstance.get('users').then(res => setEmployeeList(res.data.data))
        }
        const getDepartmentList = async () => {
            await apiInstance.get('departments')
                .then(res => setDepartmentList(res.data.data))
        }
        getDepartmentList()
        getEmployeeList()
    }, [])

    return (
        <div className="gap-4">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                    <Input
                        type="text"
                        label="Name"
                        placeholder="Name"
                        variant={variant}
                        labelPlacement="outside"
                        validationState={errors.name && errors.name.type === 'required' ? 'invalid' : 'valid'}
                        {...register('name', { required: true, onChange: (e) => handleInputChange('name', e.target.value) })}
                    />
                    <Input
                        type="text"
                        label="Description"
                        placeholder="Description"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.level && errors.level.type === 'required' ? 'text-[#f31260]' : ''}`}>Level</label>
                        <select
                            name="level"
                            {...register('level', { required: true, onChange: (e) => handleInputChange('level', e.target.value) })}
                            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Level</option>
                            <option value='Strategic'>Strategic</option>
                            <option value='Tactical'>Tactical</option>
                            <option value='Operation'>Operation</option>

                        </select>
                    </div>
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.function && errors.function.type === 'required' ? 'text-[#f31260]' : ''}`}>Function</label>
                        <select
                            {...register('function', { required: true, onChange: (e) => handleInputChange('function', e.target.value) })}
                            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Function</option>
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
                        <label className={`text-sm font-semibold ${errors.activities && errors.activities.type === 'required' ? 'text-[#f31260]' : ''}`}>Activities</label>
                        <select
                            {...register('activities', { required: true, onChange: (e) => handleInputChange('activities', e.target.value) })}
                            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Level</option>
                            <option value='Primary'>Primary</option>
                            <option value='Secondary'>Secondary</option>

                        </select>
                    </div>
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.reportingTo && errors.reportingTo.type === 'required' ? 'text-[#f31260]' : ''}`}>Reporting To</label>
                        <select
                            {...register('reportingTo', { required: true, onChange: (e) => handleInputChange('reportingTo', e.target.value) })}
                            className="bg-gray-100 border mt-2 border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Department</option>
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
                            <option hidden>Choose Department Manager</option>
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
                            <option hidden>Choose Assistant Manager</option>
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
                    <Button color="primary" type="submit">Register</Button>
                </div>
            </form>
        </div>
    )
}