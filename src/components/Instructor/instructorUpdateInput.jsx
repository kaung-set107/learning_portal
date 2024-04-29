import { Input } from '@nextui-org/react'
import {

  Button,
  Textarea
} from '@nextui-org/react'
import { useState, useEffect } from 'react'
import apiInstance from '../../util/api.js'
import Swal from 'sweetalert2'

import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom';
import { AnchorIcon } from '../../assets/Icons/AnchorIcon'
import { Link } from '@nextui-org/react'
import { getFile } from '../../util/index';
export default function EmployeeInput() {
  const variant = ['faded']
  const {
    register,
    handleSubmit,

  } = useForm()

  const Id = useLocation().pathname.split('/')[2]

  const [profileAnchor, setProfileAnchor] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nrc, setNrc] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [intro, setIntro] = useState('')
  const [quali, setQuali] = useState('')
  // const [role,setRole]=useState('')
  const [workExp, setWorkExp] = useState('')
  const [gender, setGender] = useState('')


  const [profile, setProfile] = useState(null)

  const handleProfile = e => {
    if (e.target.files) {
      setProfile(e.target.files[0])
      console.log(e.target.files, 'file')
    }
  }

  const create = () => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('email', email)
    formData.append('nrc', nrc)
    formData.append('address', address)
    formData.append('phone', phone)
    formData.append('experience', workExp)
    formData.append('image', profile)
    formData.append('gender', gender)
    // formData.append('role',role)
    formData.append('introduction', intro)
    formData.append('qualification', quali)
    console.log(formData)
    apiInstance
      .put('instructors/' + Id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function () {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successful',
          text: 'Nice!',
          showConfirmButton: false,
          timer: 2000
        })
      })
      .catch(error => {
        alert(error)
      })
  }

  useEffect(() => {
    const getInstructor = async () => {
      await apiInstance.get(`instructors/${Id}`,).then((res) => {

        setPhone(res.data.data.phone)
        setName(res.data.data.name)
        setNrc(res.data.data.nrc)
        setQuali(res.data.data.qualification)
        setEmail(res.data.data.email)
        setIntro(res.data.data.introduction)
        setGender(res.data.data.gender)
        // setRole(res.data.data.role)
        setAddress(res.data.data.address)
        setWorkExp(res.data.data.experience)

        setProfileAnchor(
          res.data.data.image
            ? getFile({ payload: res.data.data.image })
            : ''
        )

        console.log(res.data.data, "emp");
      });
    };
    getInstructor();
  }, [])
  return (
    <div className='gap-6'>
      <form onSubmit={handleSubmit(create)}>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='text'

            label='Name'
            placeholder='Name'
            value={name}
            variant={variant}
            labelPlacement='outside'
            {...register('name', { required: true, onChange: (e) => setName(e.target.value) })}
          />
          <Input
            type='text'
            label='Phone No'
            placeholder='Phone Number'
            variant={variant}
            value={phone}
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
            value={quali}
            labelPlacement='outside'
            onChange={(e) => setQuali(e.target.value)}
          />
          <Input
            type='text'
            variant={variant}
            label='NRC'
            value={nrc}
            placeholder='NRC..'
            labelPlacement='outside'
            onChange={(e) => setNrc(e.target.value)}
          />
        </div>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <Input
            type='email'
            variant={variant}
            // validationState={
            //   errors.email && errors.email.type === 'required'
            //     ? 'invalid'
            //     : 'valid'
            // }
            label='Personal Email'
            placeholder='example@gmail.com'
            labelPlacement='outside'
            value={email}
            {...register('email', { required: true, onChange: (e) => setEmail(e.target.value) })}
          />
          <Input
            type='text'
            onChange={(e) => setWorkExp(e.target.value)}
            label='Work Experience'
            placeholder='..'
            value={workExp}
            labelPlacement='outside'
            variant={variant}
          />
        </div>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='text'
              label='Address'
              placeholder='Address..'
              labelPlacement='outside'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant={variant}
            />
          </div>
          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='file'
              onChange={handleProfile}
              label='Profile'
              placeholder=' '
              labelPlacement='outside'
              variant={variant}
              endContent={
                profileAnchor ? (
                  <Link
                    isExternal
                    showAnchorIcon
                    href={profileAnchor}
                    anchorIcon={<AnchorIcon />}
                  ></Link>
                ) : (
                  ''
                )
              }
            />
          </div>
        </div>





        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-1'>

          {/* <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
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
              {...register('role', { required: true })}
              onChange={e => setRole(e.target.value)}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option  hidden>
                {role}
              </option>
               <option value='Instructor'>
                Instructor
              </option>
               <option value='Supervisor Instructor'>
                Supervisor Instructor
              </option>
        
            </select>
          </div> */}
          <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <label
            // className={`text-sm font-semibold ${errors.gender && errors.gender.type === 'required'
            //   ? 'text-[#f31260]'
            //   : ''
            //   }`}
            >
              Gender
            </label>
            <select

              id='countries'
              {...register('gender', { required: true, onChange: (e) => setGender(e.target.value) })}
              className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl m-0 px-0 py-2 focus:ring-gray-500 focus:border-gray-500 block w-full p-3 dark:bg-default-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option hidden value={gender}>
                {gender}
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <Textarea
            label="Introduction"
            labelPlacement="outside"
            placeholder="Enter your info"
            value={intro}
            onChange={e => setIntro(e.target.value)}

          />
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
              Update
            </Button>
          </div>
        </div>
      </form>

    </div>
  )
}
