
import { Button, Input, Radio, RadioGroup, CheckboxGroup } from "@nextui-org/react";
import apiInstance from "../../util/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "../Checkbox/CustomCheckbox";

export default function PositionUpdateInputForm() {
    const variant = 'faded';
    const id = useLocation().pathname.split('/')[3]
    const [positionList, setPositionList] = useState(null)
    const [departmentList, setDepartmentList] = useState([])
    const [groupSelected, setGroupSelected] = useState([]);
    useEffect(() => {
        const getPositionByID = async () => {
            console.log(id)
            await apiInstance.get(`position/${id}`)
                .then(res => {
                    console.log(res.data.data[0])
                    setPositionList(res.data.data[0])
                    setGroupSelected(res.data.data[0].workingDay)
                })
        }
        const getDepartmentList = async () => {
            await apiInstance.get('departments')
                .then(res => setDepartmentList(res.data.data))
        }
        getDepartmentList()
        getPositionByID()
    }, [])


    const handleInputChange = (fieldName, value) => {
        setPositionList(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const handleUpdate = async () => {
        console.log(positionList)
        let data = positionList
        data.id = id
        if (groupSelected) data.workingDay = groupSelected
        console.log(data)
        await apiInstance.put(`position`, data)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Updated'
                })
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Unknown Error'
                })
            })
    }

    return (
        <div className="gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="Name"
                    value={positionList ? positionList.name : ''}
                    placeholder="Name"
                    variant={variant}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    value={positionList ? positionList.description : ''}
                    label="Description"
                    placeholder="Description"
                    variant={variant}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    value={positionList ? positionList.workingFrom : ''}
                    type="text"
                    label="Working From"
                    placeholder="9:00AM"
                    variant={variant}
                    onChange={(e) => handleInputChange('workingFrom', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    label="Working Until"
                    value={positionList ? positionList.workingUntil : ''}
                    placeholder="5:00PM"
                    onChange={(e) => handleInputChange('workingUntil', e.target.value)}
                    variant={variant}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="Number"
                    label="Basic Salary"
                    placeholder="$.."
                    value={positionList ? positionList.basicSalary : ''}
                    onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                    variant={variant}
                    labelPlacement="outside"
                />
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <label className="text-sm font-semibold">Department</label>
                    <select

                        onChange={(e) => handleInputChange('relatedDepartment', e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                        <option value={positionList && positionList.relatedDepartment ? positionList.relatedDepartment._id : ''} hidden >{positionList && positionList.relatedDepartment ? positionList.relatedDepartment.name : 'Not Set'}</option>
                        {departmentList.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                        {/* <option value="Male">Department 1</option>
                <option value="Female">Department 2</option> */}

                    </select>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="Number"
                    label="Casual Leaves"
                    value={positionList ? positionList.casualLeaves : ''}
                    placeholder="$.."
                    variant={variant}
                    onChange={(e) => handleInputChange('casualLeaves', e.target.value)}
                    labelPlacement="outside"
                />
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <CheckboxGroup
                        className="gap-1"
                        label="Select Working Days"
                        orientation="horizontal"
                        value={groupSelected}
                        onChange={setGroupSelected}

                    >
                        {console.log(groupSelected, 'groupSelected')}
                        <CustomCheckbox value="Sat">Sat</CustomCheckbox>
                        <CustomCheckbox value="Sun">Sun</CustomCheckbox>
                        <CustomCheckbox value="Mon">Mon</CustomCheckbox>
                        <CustomCheckbox value="Tue">Tue</CustomCheckbox>
                        <CustomCheckbox value="Wed">Wed</CustomCheckbox>
                        <CustomCheckbox value="Thu">Thu</CustomCheckbox>
                        <CustomCheckbox value="Fri">Fri</CustomCheckbox>
                    </CheckboxGroup>
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    onChange={(e) => handleInputChange('medicalLeaves', e.target.value)}
                    type="Number"
                    label="Medical Leave"
                    value={positionList ? positionList.medicalLeaves : ''}
                    placeholder="Days"
                    variant={variant}
                    labelPlacement="outside"
                />
                <Input
                    type="Number"
                    label="Vacation Leave"
                    placeholder="Days"
                    value={positionList ? positionList.vacationLeaves : ''}
                    variant={variant}
                    onChange={(e) => handleInputChange('vacationLeaves', e.target.value)}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="Number"
                    label="Maternity Leave: Male"
                    placeholder="Days"
                    value={positionList ? positionList.maternityLeaveMale : ''}
                    variant={variant}
                    onChange={(e) => handleInputChange('maternityLeaveMale', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="Number"
                    label="Maternity Leave: Male: Female"
                    placeholder="Days"
                    variant={variant}
                    value={positionList ? positionList.maternityLeaveFemale : ''}
                    onChange={(e) => handleInputChange('maternityLeaveFemale', e.target.value)}
                    labelPlacement="outside"
                />
            </div>



            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Incentive</label>
                        <RadioGroup orientation="horizontal" className="mt-2" value={positionList ? positionList.isIncentive : ''} onValueChange={(e) => handleInputChange('isIncentive', e)}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false} >No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="text"
                        label="Incentive Condition"
                        value={positionList ? positionList.incentiveCondition : ''}
                        onChange={(e) => handleInputChange('incentiveCondition', e.target.value)}
                        placeholder="Incentive Condition"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>
                <Input
                    type="Number"
                    onChange={(e) => handleInputChange('incentive', e.target.value)}
                    value={positionList ? positionList.incentive : ''}
                    label="Incentive Value"
                    placeholder="$.."
                    variant={variant}
                    labelPlacement="outside"
                />

            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Bonus</label>
                        <RadioGroup orientation="horizontal" className="mt-2" value={positionList ? positionList.isBonus : ''} onValueChange={(e) => handleInputChange('isBonus', e)}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="text"
                        onChange={(e) => handleInputChange('bonusCondition', e.target.value)}
                        label="Bonus Condition"
                        value={positionList ? positionList.bonusCondition : ''}
                        placeholder="Bonus Condition"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>
                <Input
                    type="Number"
                    onChange={(e) => handleInputChange('bonus', e.target.value)}
                    value={positionList ? positionList.bonus : ''}
                    label="Bonus Value"
                    placeholder="$.."
                    variant={variant}
                    labelPlacement="outside"
                />

            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Travel Allowance</label>
                        <RadioGroup orientation="horizontal" className="mt-2" value={positionList ? positionList.isTravelAllowance : ''} onValueChange={(e) => handleInputChange('isTravelAllowance', e)}>
                            <Radio value={true} >Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="Number"
                        label="Travel Allowance"
                        value={positionList ? positionList.travelAllowance : ''}
                        placeholder="Travel Allowance"
                        onChange={(e) => handleInputChange('travelAllowance', e.target.value)}
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <div className="w-1/3">
                        <label className="text-sm font-semibold">Meal Allowance</label>
                        <RadioGroup orientation="horizontal" className="mt-2" value={positionList ? positionList.isMealAllowance : ''} onValueChange={(e) => handleInputChange('isMealAllowance', e)} >
                            <Radio value={true} >Yes</Radio>
                            <Radio value={false} >No</Radio>
                        </RadioGroup>
                    </div>
                    <Input
                        type="Number"
                        onChange={(e) => handleInputChange('mealAllowance', e.target.value)}
                        label="Meal Allowance"
                        value={positionList ? positionList.mealAllowance : ''}
                        placeholder="Meal Allowance"
                        variant={variant}
                        labelPlacement="outside"
                    />
                </div>

            </div>

            <div className="flex justify-center gap-10 py-4">
                <Button color="danger" >
                    <Link to='/position'>
                        Cancel
                    </Link>
                </Button>
                <Button color="primary" onClick={() => handleUpdate()}>Update</Button>
            </div>
        </div>
    )
}