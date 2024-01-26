
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

const Navbar = (props: Props) => {

  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mob, setMob] = useState(false);
  const router = useRouter();



  return (

    <div className='sticky top-0  bg-white z-50 shadow-lg'>
      <nav className='flex justify-between items-center mx-auto w-full lg:w-[90%]'>
        <img src="/assets/images/logo.jpeg" onClick={()=>router.push("/")} className='cursor-pointer w-[300px]' alt="" />
        <button style={{ fontSize: "30px", color: "#1D3557" }} className=" lg:hidden p-5" onClick={() => setOpen(!open)}>&#9776;</button>
        <ul className='lg:flex hidden list-none items-center justify-evenly '>
          <Link href="/">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer'>Home</li>
          </Link>
          <Link href="/about">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer'>About</li>
          </Link>
          <Link href="/courses">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer'>Courses</li>
          </Link>
          <Link href="/events">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer'>Events</li>
          </Link>
          <Link href="/contact">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer'>Contact Us</li>
          </Link>
        </ul>



      </nav>
      <div className={`${open ? '' : 'hidden'} fixed top-0 z-50 w-full lg:hidden`}>
      <nav className='flex justify-between items-center bg-white z-50 w-full'>
        <img src="/assets/images/logo.jpeg" onClick={()=>router.push("/")} className='cursor-pointer w-[300px]' alt="" />
        <button style={{ fontSize: "30px", color: "#1D3557" }} className=" lg:hidden p-5" onClick={() => setOpen(!open)}>&#9776;</button>
        </nav>
        <ul className={` bg-white  list-none w-full h-screen`}>
          <Link href="/">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer p-5 border-b-2' onClick={()=>{setTimeout(()=>setOpen(false),500)}}>Home</li>
          </Link>
          <Link href="/about">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer p-5 border-b-2' onClick={()=>{setTimeout(()=>setOpen(false),500)}}>About</li>
          </Link>
          <Link href="/courses">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer p-5 border-b-2' onClick={()=>{setTimeout(()=>setOpen(false),500)}}>Courses</li>
          </Link>
          <Link href="/events">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer p-5 border-b-2' onClick={()=>{setTimeout(()=>setOpen(false),500)}}>Events</li>
          </Link>
          <Link href="/contact">
            <li className='mx-5 text-primary hover:text-secondary font-[regular] cursor-pointer p-5 border-b-2' onClick={()=>{setTimeout(()=>setOpen(false),500)}}>Contact</li>
          </Link>
        </ul>
      </div>

    </div>

  )
}

export default Navbar;