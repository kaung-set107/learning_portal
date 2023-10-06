
import { Button, Input } from "@nextui-org/react";
import apiInstance from "../../util/api";
import {  useEffect,useState } from "react";

import Swal from "sweetalert2";
// import { FileUploader } from "react-drag-drop-files";
import { useLocation } from 'react-router-dom';


export default function LeaveInputForm(props) {
     const PayID=useLocation().pathname.split('/')[2]
     console.log(PayID,'id')
    const variant = 'faded';
    const [employeeList,setEmployeeList]=useState([])
    // const fileTypes = ["JPG", "PNG", "GIF"];
    // const [attachFile, setAttachFile] = useState(null);

    const handleInputChange = (fieldName, value) => {
        setData(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const [data, setData] = useState({
        startDate: null,
        endDate: null,
        relatedUser: null,
        relatedPosition: null,
        reason: null,
        leaveType: null,
        status: null
    });

    // const handleEmployee = async (value) => {
    //     handleInputChange('relatedUser', value)
    //     const employee = employeeList.filter(item => item._id === value)
    //     handleInputChange('relatedPosition', employee[0].relatedPosition._id)
    //     setPosition(employee[0].relatedPosition)
    // }

    const handleRegister = async () => {
        const formData = new FormData()
        formData.append('startDate', data.startDate)
        formData.append('endDate', data.endDate)
        formData.append('relatedUser', data.relatedUser)
        formData.append('relatedPosition', data.relatedPosition)
        formData.append('reason', data.reason)
        formData.append('leaveType', data.leaveType)
        formData.append('status', data.status)
        // if (attachFile) {
        //     attachFile.forEach((item) => {
        //         formData.append("attach", item); // Assuming 'item' is a File object
        //     });
        // }
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
                .then((res) => {setEmployeeList(res.data.data)
                console.log(res.data.data[0],'data')}
    )}
        getEmployeeList()

    }, [])
const handleClose=()=>{
props.onClose(!props.isOpen)
}
    return (
        <div className="gap-4 h-[550px] overflow-y-auto">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="ID"
                    placeholder="Enter ID"
                    variant={variant}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    labelPlacement="outside"
                />
                <Input
                    type="text"
                    label="Name"
                    placeholder="Enter name"
                    variant={variant}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    labelPlacement="outside"
                />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
             
                   <Input
                    type="text"
                    label="Month"
                    placeholder="Enter salary"
                    variant={variant}
                    
                    onChange={(e) => handleInputChange('month', e.target.value)}
                    labelPlacement="outside"
                />

                 
                </div>
                <div className="block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                     <Input
                    type="text"
                    label="Base Salary"
                    placeholder="Enter salary"
                    variant={variant}
                    onChange={(e) => handleInputChange('base', e.target.value)}
                    labelPlacement="outside"
                />
                    
                </div>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1">
                <Input
                    type="text"
                    label="Entitled Salary"
                    placeholder="..."
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    variant={variant}
                    labelPlacement="outside"
                />
               
            </div>

             <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-5'>Meals Allowance</label>
              <div>
                <label>Per Day</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Total Days</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.medicalLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Total Amount</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
            
            </div>
          </div>
      
        </div>

         <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-5'>Travel Allowance</label>
              <div>
                <label>Per Day</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Total Days</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.medicalLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Total Amount</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
            
            </div>
          </div>
      
        </div>
  <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-5'>Over Time</label>
              <div className='ml-8'>
                <label>Per Day</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Total Days</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.medicalLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Total Amount</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
            
            </div>
          </div>
      
        </div>
         <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-8'>Incentive</label>
              <div className='ml-5'>
                <label>Reason</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
           
              <div>
                <label>Total Amount</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
            
            </div>
          </div>
      
        </div>

         <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-8'>Bonus</label>
              <div className='ml-10'>
                <label>Reason</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
           
              <div>
                <label>Total Amount</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
            
            </div>
          </div>
      
      
        </div>

           
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-8'>Income Tax</label>
              <div className='ml-2'>
                <label>Percent %</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
           
              <div>
                <label>Total Amount</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
            
            </div>
          </div>
      
      
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
           
            <div className='flex flex-row text-sm mt-1 gap-2'>
             <label className='text-sm font-semibold mt-5'>Total</label>
              <div className='ml-12'>
                <label>Sub Total</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Net Salary</label>
                <Input
                //   isDisabled={true}
                //   value={positionID?.medicalLeaves}
                  className='py-1'
                />
              </div>
             
            
            </div>
          </div>
      
        </div>
            <div className="flex justify-center gap-10 py-4">
                <Button color="danger" onClick={handleClose}>
       
                        Cancel
                  
                </Button>
                <Button color="primary" onClick={() => handleRegister()}>Register</Button>
            </div>
        </div >
    )
}