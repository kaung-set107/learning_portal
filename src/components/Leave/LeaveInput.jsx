
import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";

export default function LeaveInputForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const variant = 'faded';
    const [employeeList, setEmployeeList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [position, setPosition] = useState(null)
    const [department, setDepartment] = useState(null)
    const [attachFile, setAttachFile] = useState(null);
    const [code, setCode] = useState(null);
    const leaveType = ['Casual', 'Medical', 'Vacation', 'Maternity:Male', 'Maternity:Female'];
    const fileTypes = ["JPG", "PNG", "GIF"];

    const handleInputChange = (fieldName, value) => {
        setData(prevValues => ({
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
    const [data, setData] = useState({
        startDate: null,
        endDate: null,
        relatedUser: null,
        relatedPosition: null,
        reason: null,
        leaveType: null,
        relatedDepartment: null
    });

    const handleEmployee = async (value) => {
        handleInputChange('relatedUser', value)
        const employee = employeeList.filter(item => item._id === value)
        handleInputChange('relatedPosition', employee[0].relatedPosition._id)
        setPosition(employee[0].relatedPosition)
        setDepartment(employee[0].relatedDepartment)
    }

    const handleRegister = async () => {
        const formData = new FormData()
        formData.append('startDate', data.startDate)
        formData.append('endDate', data.endDate)
        formData.append('relatedUser', data.relatedUser)
        formData.append('reason', data.reason)
        formData.append('leaveType', data.leaveType)
        formData.append('status', 'Unset')
        formData.append('code', code.code)
        formData.append('seq', code.seq)
        if (attachFile) {
            attachFile.forEach((item) => {
                formData.append("attach", item); // Assuming 'item' is a File object
            });
        }
        await apiInstance.post('leave', formData)

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
        const getDepartmentList = async () => {
            await apiInstance.get('departments')
                .then(res => setDepartmentList(res.data.data))
        }
        const getCode = async () => {
            await apiInstance.get('leaves/code')
                .then(res => {
                    setCode(res.data)
                })
        }
        getCode()
        getEmployeeList()
        getDepartmentList()
    }, [])

    return (
        <div className="gap-4">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="date"
                        label="Start Date"
                        placeholder="Date"
                        variant={variant}
                        validationState={errors.startDate && errors.startDate.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register("startDate", {
                            required: true,
                            onChange: (e) => handleInputChange('startDate', e.target.value)
                        })}
                    />
                    <Input
                        type="date"
                        label="End Date"
                        placeholder="Date"
                        variant={variant}
                        validationState={errors.endDate && errors.endDate.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register("endDate", {
                            required: true,
                            onChange: (e) => handleInputChange('endDate', e.target.value)
                        })}
                    />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {console.log(errors)}
                        <label className={`text-sm font-semibold ${errors.employee && errors.employee.type === 'required' ? 'text-[#f31260]' : ''}`}>
                            Employee
                        </label>
                        <select
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            {...register("employee", { required: true, onChange: (e) => handleEmployee(e.target.value) })}
                            name="employee"
                        >
                            <option hidden value=''>Choose Employee</option>
                            {employeeList.map(item => (
                                <option key={item._id} value={item._id} >{item.givenName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            type="text"
                            isDisabled
                            label="Leave No"
                            value={code?.code}
                            placeholder="LC-25823-1"
                            variant={variant}
                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                            labelPlacement="outside"
                        />
                    </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 min-h-20">
                        <label className={`text-sm font-semibold ${errors.employee && errors.employee.type === 'required' ? 'text-[#f31260]' : ''}`}>Department</label>
                        <select
                            disabled
                            onChange={(e) => handleInputChange('relatedDepartment', e.target.value)}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden>{department ? department.name : 'Not Set'}</option>
                            {departmentList.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <label className={`text-sm font-semibold ${errors.employee && errors.employee.type === 'required' ? 'text-[#f31260]' : ''}`}>Position</label>
                        <select
                            disabled
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option>{position ? position.name : 'Not Set'}</option>
                        </select>
                    </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {errors.something && errors.something.type == 'required' ? <label className="text-sm font-semibold text-[#f31260]">Type</label> : <label className="text-sm font-semibold">Type</label>}
                        <select
                            name="something"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            {...register('something', { required: true, onChange: (e) => handleInputChange('leaveType', e.target.value) })}
                        >
                            <option hidden value=''>Choose Leave Type</option>
                            {leaveType.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                        </select>
                    </div>
                    <Input
                        type="text"
                        label="Reason"
                        placeholder="Reason..."
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('reason')}
                    />

                </div>



                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="mt-3"></div>
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                </div>

                <div className="flex justify-center gap-10 py-4">
                    <Button color="danger" >
                        <Link to='/leave'>
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" color="primary">Register</Button>
                </div>
            </form>
        </div >
    )
}