
import { Button, Input,RadioGroup, Radio } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function PositionInputForm() {
    const variant = 'faded';

    const [departmentList, setDepartmentList] = useState([])
    const { form, register, handleSubmit, formState: { errors } } = useForm();
    const [groupSelected, setGroupSelected] = useState([]);
    const handleInputChange = (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };
    const [data, setData] = useState({
        name: null,
        description: null,
        workingFrom: null,
        workingUntil: null,
        basicSalary: null,
        relatedDepartment: null,
        casualLeaves: null,
        // workingDay: null,
        medicalLeaves: null,
        vacationLeaves: null,
        maternityLeaveMale: null,
        maternityLeaveFemale: null,
        isTravelAllowance: null,
        travelAllowance: null,
        isMealAllowance: null,
        mealAllowance: null,
        isIncentive: null,
        incentiveCondition: null,
        incentive: null,
        isBonus: null,
        bonusCondition: null,
        bonus: null
    });

    const handleRegister = async () => {
        // alert(JSON.stringify(data))
        let payload = data
        if (groupSelected) payload.workingDay = groupSelected
        await apiInstance.post('position', payload)
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
        const getDepartmentList = async () => {
            await apiInstance.get('departments')
                .then(res => setDepartmentList(res.data.data))
        }
        getDepartmentList()
    }, [])

    return (
        <div className="gap-4">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        label="Subject Name"
                        placeholder="Enter your subject"
                        variant={variant}
                        validationState={errors.name && errors.name.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('name', { required: true, onChange: (e) => handleInputChange('name', e.target.value) })}
                    />
                    <Input
                        type="text"
                        label="Description"
                        placeholder="Description"
                        variant={variant}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        labelPlacement="outside"
                    />
                </div>
  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="date"
                        label="Start Date"
                      placeholder="Date"
                        variant={variant}
                        validationState={errors.name && errors.name.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('name', { required: true, onChange: (e) => handleInputChange('name', e.target.value) })}
                    />
                    <Input
                        type="date"
                        label="End Date"
                        placeholder="Date"
                        variant={variant}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        labelPlacement="outside"
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                    <Input
                        type="text"
                        label="Student Allowed"
                        placeholder="..."
                        variant={variant}
                        validationState={errors.workingFrom && errors.workingFrom.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('workingFrom', { required: true, onChange: (e) => handleInputChange('workingFrom', e.target.value) })}
                    />
                    <Input
                        type="text"
                        label="Current Student"
                        placeholder="..."
                        validationState={errors.workingUntil && errors.workingUntil.type === 'required' ? 'invalid' : 'valid'}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('workingUntil', { required: true, onChange: (e) => handleInputChange('workingUntil', e.target.value) })}
                    />
                </div>
                 <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                   <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-8">
                    <label>Installment Allowed</label>
  <RadioGroup
      
      orientation="horizontal"
    >
      <Radio value="yes">Yes</Radio>
      <Radio value="no">No</Radio>

    </RadioGroup>
                    </div>
                    <Input
                        type="number"
                        label="Installment Times"
                        placeholder="1 or 2 ?"
                        variant={variant}
                        validationState={errors.workingFrom && errors.workingFrom.type === 'required' ? 'invalid' : 'valid'}
                        labelPlacement="outside"
                        {...register('workingFrom', { required: true, onChange: (e) => handleInputChange('workingFrom', e.target.value) })}
                    />
                 
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                   <Input
                        type="number"
                        label="Installment %"
                        placeholder="1% or 2%"
                        validationState={errors.workingUntil && errors.workingUntil.type === 'required' ? 'invalid' : 'valid'}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('workingUntil', { required: true, onChange: (e) => handleInputChange('workingUntil', e.target.value) })}
                    />
                    <Input
                        type="Number"
                        label="Price"
                        placeholder="$.."
                        validationState={errors.basicSalary && errors.basicSalary.type === 'required' ? 'invalid' : 'valid'}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('basicSalary', { required: true, onChange: (e) => handleInputChange('basicSalary', e.target.value) })}
                    />
                     
                   
                    
                   
                </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                       <Input
                        type="file"
                        label="Photo"
                        placeholder="$.."
                        validationState={errors.basicSalary && errors.basicSalary.type === 'required' ? 'invalid' : 'valid'}
                        variant={variant}
                        labelPlacement="outside"
                        {...register('basicSalary', { required: true, onChange: (e) => handleInputChange('basicSalary', e.target.value) })}
                    />
 <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
                        <label className={`text-sm font-semibold ${errors.relatedDepartment && errors.relatedDepartment.type === 'required' ? 'text-[#f31260]' : ''}`}>Instructor</label>
                        <select
                            {...register('relatedDepartment', { required: true, onChange: (e) => handleInputChange('relatedDepartment', e.target.value) })}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                            <option hidden value=''>Choose Instructor</option>
                            {departmentList.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))}
                            {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                        </select>
                    
                    </div>
                 
</div>
                <div className="flex justify-center gap-10 py-4">
                    <Button color="danger" >
                        <Link to='/position'>
                            Cancel
                        </Link>
                    </Button>
                    <Button color="primary" type="submit">Register</Button>
                </div>
            </form >
        </div >
    )
}