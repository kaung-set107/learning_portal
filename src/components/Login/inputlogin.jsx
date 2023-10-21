import { loginFields } from '../../constant/formfield'
import FormAction from '../../components/Login/formAction'
import { Input } from '@nextui-org/react'
import { EyeFilledIcon } from './eyefilledicon'
import { EyeSlashFilledIcon } from './eyeslashicon'
import React, { useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiInstance from '../../util/api.js'
import { MailFilledIcon } from './mailicon'
import Swal from 'sweetalert2'
import SideBar from '../Sidebar/index'
const fields = loginFields
let fieldsState = {}
fields.forEach(field => (fieldsState[field.id] = ''))

export default function Login() {
  const [arr,setArr]=useState([])

  const navigate = useNavigate()
  const usernameRef = useRef()
  const passRef = useRef()
  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      username: usernameRef.current.value,
      password: passRef.current.value
    }
    apiInstance
      .post('auth/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
        
        console.log(res.data.data,'res')
        if(res.data.data.roles[0].includes('instructor')){
          
navigate('/instructor')

        }else if(res.data.data.roles[0].includes('student')){
          setArr(res.data.data)
navigate('/student')
        }else if(res.data.data.roles[0].includes('admin')){
          
navigate('/home')
return setArr(res.data.data)
        }
        
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.response.data.message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
      })
  }

  //Handle Login API Integration here
  console.log(arr,'dat')
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <>
    <form className='' onSubmit={handleSubmit}>
      <div className='block w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <Input
          variant={'underlined'}
          type='text'
     placeholder="username"
          ref={usernameRef}
          endContent={
            <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
          }
        />
        <Input
          variant={'underlined'}
          ref={passRef}
          type={isVisible ? 'text' : 'password'}
placeholder="Password"
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
        />
      </div>

      <div className='mt-3'>
        <FormAction handleSubmit={() => handleSubmit()} text='Login' />
      </div>
    </form>
    <div className='hidden'>
    {  console.log(arr,'dat')}
<SideBar arr={[arr]} />
    </div>

</>
  )
}
