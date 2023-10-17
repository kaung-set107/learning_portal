import { Checkbox, Input } from '@nextui-org/react'
import { RadioGroup, Radio } from '@nextui-org/react'
import {
  Modal,
  Button,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react'
import { useState, useEffect } from 'react'
import apiInstance from '../../util/api.js'
import Swal from 'sweetalert2'
import { FileUploader } from 'react-drag-drop-files'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const fileTypes = ['JPG', 'PNG', 'GIF']

export default function EmployeeInput() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const variant = ['faded']
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // const emailRef = useRef()
  // const passRef = useRef()
  // const nrcRef = useRef()
  // const nameRef = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nrc, setNrc] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [passPort, setPassPort] = useState('')
  const [position, setPosition] = useState('')
  const [workExp, setWorkExp] = useState('')
  const [gender, setGender] = useState('')
  const [isSelectedCRM, setIsSelectedCRM] = useState(false);

  // const addressRef = useRef()
  // const DOBRef = useRef()
  // const ECRef = useRef()
  // const phoneRef = useRef()
  // const passportRef = useRef()
  // const EuBackRef = useRef()

  // const workExpRef = useRef()
  // const firstInRef = useRef()
  // const firstResRef = useRef()
  // const secInRef = useRef()
  // const secResRef = useRef()
  // const fatherRef = useRef()
  // const empDateRef = useRef()
  // const genderRef = useRef()
  const [cv, setCV] = useState(null)
  const [profile, setProfile] = useState(null)
  const [description, setDescription] = useState('')
  const [otherDoc, setOtherDoc] = useState([])
  const [positionID, setPositionID] = useState([])
  const [positionList, setPositionList] = useState([])

  const handleChange = e => {
    let array = []
    for (const item of e) {
      array.push(item)
    }
    setOtherDoc(array)
  }

  useEffect(() => {
    const getEmployee = async () => {
      await apiInstance
        .get(`positions`, { params: { limit: 80 } })
        .then(res => {
          setPositionList(res.data.data)
        })
    }

    getEmployee()
  }, [])

  // const handleDirectManager = id => {
  //   console.log(id, 'handled')
  //   setRelatedDepartment(id)
  //   setDirectManager(
  //     departmentList.filter(el => el._id == id)[0].directManager.givenName
  //   )
  //   setDirectManagerID(
  //     departmentList.filter(el => el._id == id)[0].directManager._id
  //   )
  // }
  const handlefile = e => {
    if (e.target.files) {
      setCV(e.target.files[0])
      console.log(e.target.files, 'file cv')
    }
  }


  const handleProfile = e => {
    if (e.target.files) {
      setProfile(e.target.files[0])
      console.log(e.target.files, 'file')
    }
  }

  const handlePosition = val => {
    console.log(positionList.filter(el => el._id === val)[0], 'bas sal')


    setPosition(val)
  }
  const create = () => {
    console.log(otherDoc, 'doc')
    console.log(name, 'name')
    const formData = new FormData()

    formData.append('givenName', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('NRC', nrc)
    formData.append('address', address)
    formData.append('phone', phone)
    formData.append('passportNo', passPort)
    formData.append('workExperience', workExp)
    formData.append('cv', cv)
    formData.append('pf', profile)
    formData.append('relatedPosition', position)
    formData.append('gender', gender)
    formData.append('isCRM', isSelectedCRM)
 

    console.log(formData, 'formData')

    apiInstance
      .post('user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function () {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
      })
      .catch(error => {
        alert(error)
      })
  }
  return (
    <div className='gap-6'>
      <form onSubmit={handleSubmit(create)}>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'
            validationState={
              errors.name && errors.name.type === 'required'
                ? 'invalid'
                : 'valid'
            }
            label='Name'
            placeholder='Name'

            variant={variant}
            labelPlacement='outside'
            {...register('name', { required: true, onChange: (e) => setName(e.target.value) })}
          />
          <Input
            type='number'
            label='Phone No'
            placeholder='Phone Number'
            variant={variant}
            onChange={(e) => setPhone(e.target.value)}
            labelPlacement='outside'
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
         <Input
            type='text'
            variant={variant}
            label='Qualification'
            placeholder='..'
            labelPlacement='outside'
            onChange={(e) => setNrc(e.target.value)}
          />
          <Input
            type='text'
            variant={variant}
            label='NRC'
            placeholder='NRC..'
            labelPlacement='outside'
            onChange={(e) => setNrc(e.target.value)}
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'
            label='User Name'
            placeholder='user name..'
            labelPlacement='outside'
            onChange={(e) => setPassPort(e.target.value)}
            variant={variant}
          />
             
          <Input
            type='text'
            onChange={(e) => setWorkExp(e.target.value)}
            label='Work Experience'
            placeholder='..'
            labelPlacement='outside'
            variant={variant}
          />

       
       
        
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='email'
            variant={variant}
            validationState={
              errors.email && errors.email.type === 'required'
                ? 'invalid'
                : 'valid'
            }
            label='Personal Email'
            placeholder='example@gmail.com'
            labelPlacement='outside'
            {...register('email', { required: true, onChange: (e) => setEmail(e.target.value) })}
          />
          <Input
            validationState={
              errors.password && errors.password.type === 'required'
                ? 'invalid'
                : 'valid'
            }
            type='password'
            label='Password'
            variant={variant}
            placeholder='Password..'
            labelPlacement='outside'
            {...register('password', { required: true, onChange: (e) => setPassword(e.target.value) })}
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='text'
              label='Address'
              placeholder='Address..'
              labelPlacement='outside'
              onChange={(e) => setAddress(e.target.value)}
              variant={variant}
            />
          </div>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='file'
              label='CV'
              variant={variant}
              onChange={handlefile}
              placeholder=' '
              labelPlacement='outside'
            />
          </div>
        </div>
   

 
     

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
  
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label
              className={`text-sm font-semibold ${errors.position && errors.position.type === 'required'
                ? 'text-[#f31260]'
                : ''
                }`}
            >
              Role
            </label>
            <select
              id='countries'
              {...register('position', { required: true })}
              onChange={e => handlePosition(e.target.value)}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option value='' hidden>
                Choose Role
              </option>
               <option value='Instructor'>
                Instructor
              </option>
               <option value='Supervisor Instructor'>
                Supervisor Instructor
              </option>
              {/* {positionList.map(option => (
                <option key={option} value={option._id}>
                  {option.name}
                </option>
              ))} */}
            </select>
          </div>
            <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label
              className={`text-sm font-semibold ${errors.gender && errors.gender.type === 'required'
                ? 'text-[#f31260]'
                : ''
                }`}
            >
              Gender
            </label>
            <select

              id='countries'
              {...register('gender', { required: true, onChange: (e) => setGender(e.target.value) })}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden value=''>
                Choose Gender
              </option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
        </div>
     
    
        <div className='grid grid-cols-2 md:flex-nowrap mb-6 md:mb-0 gap-4'>
    
          <Input
            type='file'
            onChange={handleProfile}
            label='Profile'
            placeholder=' '
            labelPlacement='outside'
            variant={variant}
          />
           <Checkbox className='mt-3' isSelected={isSelectedCRM} onValueChange={setIsSelectedCRM}>CRM Account</Checkbox>
          &nbsp;
        </div>

        <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-7'>
         
        
        <div className='flex justify-center w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
          <Button
            size='sm'
            color='danger'
            variant='shadow'
            className='rounded-xl px-4 py-0 text-left'
          >
            <Link to='/emp'>Cancel</Link>
          </Button>
          <Button
            size='sm'
            color='primary'
            variant='shadow'
            className='rounded-xl px-4 py-0 text-left'
            type='submit'
          >
            Register
          </Button>
        </div>
        </div>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Other Document
              </ModalHeader>
              <ModalBody>
                <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
                  <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name='file'
                    types={fileTypes}
                  />
                  {/* <p>
                  {otherDoc
                    ? `File name: ${otherDoc[0].name}`
                    : ""}
                </p> */}

                  <Input
                    type='text'
                    label='Description'
                    placeholder=''
                    onChange={e => setDescription(e.target.value)}
                    variant='faded'
                    className='mt-5'
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onClick={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
