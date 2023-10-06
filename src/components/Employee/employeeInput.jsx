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
  const [dob, setDob] = useState('')
  const [ec, setEc] = useState('')
  const [phone, setPhone] = useState('')
  const [passPort, setPassPort] = useState('')
  const [euBack, setEuBack] = useState('')
  const [position, setPosition] = useState('')
  const [workExp, setWorkExp] = useState('')
  const [firstIn, setFirstIn] = useState('')
  const [firstRes, setFirstRes] = useState('')
  const [secIn, setSecIn] = useState('')
  const [secRes, setSecRes] = useState('')
  const [father, setFather] = useState('')
  const [empDate, setEmpDate] = useState('')
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
  const [euCer, setEuCer] = useState(null)
  const [cv, setCV] = useState(null)
  const [marriedFile, setMarriedFile] = useState([])
  const [recLetter, setRecLetter] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isMarried, setIsMarried] = useState(false)
  const [directManager, setDirectManager] = useState('')
  const [directManagerID, setDirectManagerID] = useState('')
  const [description, setDescription] = useState('')
  const [otherDoc, setOtherDoc] = useState([])
  const [positionID, setPositionID] = useState([])
  const [positionList, setPositionList] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [showMarried, setShowMarried] = useState(false)
  const [relatedDepartment, setRelatedDepartment] = useState('')

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
    const getDeparttment = async () => {
      await apiInstance
        .get(`departments`, { params: { limit: 80 } })
        .then(res => {
          setDepartmentList(res.data.data)
          console.log(res.data.data, 'dep')
        })
    }
    getDeparttment()
    getEmployee()
  }, [])

  const handleDirectManager = id => {
    console.log(id, 'handled')
    setRelatedDepartment(id)
    setDirectManager(
      departmentList.filter(el => el._id == id)[0].directManager.givenName
    )
    setDirectManagerID(
      departmentList.filter(el => el._id == id)[0].directManager._id
    )
  }
  const handlefile = e => {
    if (e.target.files) {
      setCV(e.target.files[0])
      console.log(e.target.files, 'file cv')
    }
  }

  const handleMarriedFile = e => {
    if (e.target.files) {
      setMarriedFile(e.target.files[0])
    }
  }

  const handleCer = e => {
    if (e.target.files) {
      setEuCer(e.target.files[0])
      console.log(e.target.files, 'file')
    }
  }

  const handleRecLetter = e => {
    if (e.target.files) {
      setRecLetter(e.target.files[0])
      console.log(e.target.files, 'file')
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

    setPositionID(positionList.filter(el => el._id === val)[0])

    setPosition(val)
  }
  const create = () => {
    console.log(otherDoc, 'doc')
    console.log(name, 'name')
    const formData = new FormData()
    console.log(marriedFile, 'marriedFile')
    formData.append('givenName', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('NRC', nrc)
    formData.append('address', address)
    formData.append('DOB', dob)
    formData.append('emergencyContact', ec)
    formData.append('phone', phone)
    formData.append('passportNo', passPort)
    formData.append('educationBackground', euBack)
    formData.append('edu', euCer)
    formData.append('workExperience', workExp)
    formData.append('cv', cv)
    formData.append('pf', profile)
    formData.append('relatedPosition', position)
    formData.append('basicSalary', positionID.basicSalary)
    formData.append('recLet', recLetter)
    formData.append('firstInterviewDate', firstIn)
    formData.append('firstInterviewResult', firstRes)
    formData.append('secondInterviewDate', secIn)
    formData.append('secondInterviewResult', secRes)
    formData.append('fatherName', father)
    formData.append('gender', gender)
    formData.append('employedDate', empDate)
    if (marriedFile.length > 0) formData.append('married', marriedFile)
    formData.append('isMarried', isMarried)
    formData.append('description', description)
    formData.append('directManager', directManagerID)
    formData.append('relatedDepartment', relatedDepartment)
    formData.append('casualLeaves', positionID?.casualLeaves)
    formData.append('medicalLeaves', positionID?.medicalLeaves)
    formData.append('vacationLeaves', positionID?.vacationLeaves)
    formData.append('maternityLeaveMale', positionID?.maternityLeaveMale)
    formData.append('maternityLeaveFemale', positionID?.maternityLeaveFemale)
    formData.append('isCRM', isSelectedCRM)
    otherDoc.forEach(item => {
      formData.append('other', item) // Assuming 'item' is a File object
    })

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
            type='date'
            label='Age/DOB'
            onChange={(e) => setDob(e.target.value)}
            placeholder='you@example.com'
            labelPlacement='outside'
            variant={variant}
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
            label='Passport No'
            placeholder='Passport Number..'
            labelPlacement='outside'
            onChange={(e) => setPassPort(e.target.value)}
            variant={variant}
          />
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
          <Input
            type='text'
            variant={variant}
            onChange={(e) => setEuBack(e.target.value)}
            label='Education Background'
            placeholder=' '
            labelPlacement='outside'
          />
          <Input
            type='file'
            label='Education Certificate'
            variant={variant}
            onChange={handleCer}
            placeholder=' '
            labelPlacement='outside'
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='date'
            onChange={(e) => setFirstIn(e.target.value)}
            label='First Interview Date'
            placeholder='you@example.com'
            labelPlacement='outside'
            variant={variant}
          />
          <Input
            type='text'
            label='First Interview Result'
            onChange={(e) => setFirstRes(e.target.value)}
            placeholder='...'
            labelPlacement='outside'
            variant={variant}
          />
        </div>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4'>
            <Input
              type='date'
              label='Second Interview Date'
              onChange={(e) => setSecIn(e.target.value)}
              placeholder=' '
              labelPlacement='outside'
              variant={variant}
            />
          </div>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
            <Input
              type='text'
              onChange={(e) => setSecRes(e.target.value)}
              label='Second Interview Result'
              variant={variant}
              placeholder='...'
              labelPlacement='outside'
            />
          </div>
        </div>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label
              className={`text-sm font-semibold ${errors.department && errors.department.type === 'required'
                ? 'text-[#f31260]'
                : ''
                }`}
            >
              Department
            </label>
            {console.log(errors)}
            <select
              id='countries'
              {...register('department', { onChange: (e) => handleDirectManager(e.target.value), required: true })}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option value='' hidden>
                Choose Department
              </option>

              {departmentList.map(option => (
                <option key={option} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label className='text-sm font-semibold'>Direct Manager</label>
            <select
              id='countries'
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden value={directManagerID}>
                {directManager}
              </option>
            </select>
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'
            variant={variant}
            label='Father Name'
            placeholder=' '
            onChange={(e) => setFather(e.target.value)}
            labelPlacement='outside'
          />
          <Input
            type='date'
            label='Employed Date'
            placeholder=' '
            onChange={(e) => setEmpDate(e.target.value)}
            labelPlacement='outside'
            variant={variant}
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='tel'
            variant={variant}
            label='Emergecy Contact'
            onChange={(e) => setEc(e.target.value)}
            placeholder=' '
            labelPlacement='outside'
          />
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label
              className={`text-sm font-semibold ${errors.position && errors.position.type === 'required'
                ? 'text-[#f31260]'
                : ''
                }`}
            >
              Position
            </label>
            <select
              id='countries'
              {...register('position', { required: true })}
              onChange={e => handlePosition(e.target.value)}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option value='' hidden>
                Choose Position
              </option>
              {positionList.map(option => (
                <option key={option} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'
            onChange={(e) => setWorkExp(e.target.value)}
            label='Work Experience'
            placeholder=' '
            labelPlacement='outside'
            variant={variant}
          />

          <Input
            type='number'
            label='Basic Salary'
            value={positionID?.basicSalary}
            placeholder=' '
            labelPlacement='outside'
            variant={variant}
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
            <label className='text-sm font-semibold'>Leave Entitled</label>
            <div className='flex flex-row text-sm mt-1 gap-2'>
              <div>
                <label>Casual</label>
                <Input
                  isDisabled={true}
                  value={positionID?.casualLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Medical</label>
                <Input
                  isDisabled={true}
                  value={positionID?.medicalLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>Vacation</label>
                <Input
                  isDisabled={true}
                  value={positionID?.vacationLeaves}
                  className='py-1'
                />
              </div>
              <div>
                <label>
                  <abbr
                    title='Maternity Male'
                    style={{ textDecoration: 'none', border: 'none' }}
                  >
                    Male
                  </abbr>
                </label>
                <Input
                  isDisabled={true}
                  value={positionID?.maternityLeaveMale}
                  className='py-1'
                />
              </div>
              <div>
                <label>
                  <abbr
                    title='Maternity Female'
                    style={{ textDecoration: 'none', border: 'none' }}
                  >
                    Female
                  </abbr>
                </label>
                <Input
                  isDisabled={true}
                  value={positionID?.maternityLeaveFemale}
                  className='py-1'
                />
              </div>
            </div>
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
              <div className='w-1/3'>
                <label className='text-sm font-semibold'>Meal Allowance</label>
                <RadioGroup
                  orientation='horizontal'
                  className='mt-8'
                  value={positionID ? positionID.isMealAllowance : ''}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
              <Input
                className='mt-11'
                type='number'
                value={positionID ? positionID.mealAllowance : 'Not Set'}
                placeholder='Meal Allowance'
                variant={variant}
                labelPlacement='outside'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
              <div className='w-1/3'>
                <label className='text-sm font-semibold'>Married</label>
                <RadioGroup
                  orientation='horizontal'
                  className='mt-3'
                  onValueChange={e => setIsMarried(e)}
                >
                  <Radio
                    value={true}
                    onClick={() => setShowMarried(!showMarried)}
                  >
                    Yes
                  </Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
              {showMarried && (
                <Input
                  className='mt-7'
                  type='file'
                  onChange={handleMarriedFile}
                  placeholder='Married Date'
                  variant={variant}
                  labelPlacement='outside'
                />
              )}
            </div>
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
              <div className='w-1/3'>
                <label className='text-sm font-semibold'>
                  Travel Allowance
                </label>
                <RadioGroup
                  orientation='horizontal'
                  className='mt-3'
                  value={positionID ? positionID.isTravelAllowance : ''}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
              <Input
                className='mt-7'
                type='number'
                value={positionID ? positionID.travelAllowance : 'Not Set'}
                placeholder='Travel Allowance'
                variant={variant}
                labelPlacement='outside'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
              <div className='w-1/3'>
                <label className='text-sm font-semibold'>Yearly Bonus</label>
                <RadioGroup
                  orientation='horizontal'
                  className='mt-3'
                  value={positionID ? positionID.isBonus : ''}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
              <Input
                className='mt-7'
                type='number'
                value={positionID ? positionID.bonus : 'Not Set'}
                placeholder='Bonus'
                variant={variant}
                labelPlacement='outside'
              />
            </div>
          </div>
          <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-3'>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
              <div className='w-1/3'>
                <label className='text-sm font-semibold'>Incentive</label>
                <RadioGroup
                  orientation='horizontal'
                  className='mt-3'
                  value={positionID ? positionID.isIncentive : ''}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
              </div>
              <Input
                className='mt-7'
                type='number'
                value={positionID ? positionID.incentive : 'Not Set'}
                placeholder='Incentive'
                variant={variant}
                labelPlacement='outside'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input
            type='file'
            onChange={handleRecLetter}
            label='Recommendation Letter'
            placeholder=' '
            labelPlacement='outside'
            variant={variant}
          />
          <Input
            type='file'
            onChange={handleProfile}
            label='Profile'
            placeholder=' '
            labelPlacement='outside'
            variant={variant}
          />
        </div>

        <div className='block w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4 mt-7'>
          <Checkbox className='' isSelected={isSelectedCRM} onValueChange={setIsSelectedCRM}>CRM Account</Checkbox>
          &nbsp;
          &nbsp;
          <Button
            isIconOnly
            size='sm'
            color='primary'
            variant='shadow'
            className='rounded-xl px-4 py-0 text-left'
            onPress={onOpen}
          >
            +
          </Button>
          &nbsp;
          <label className='text-sm font-semibold'>Other Document</label>
        </div>

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
