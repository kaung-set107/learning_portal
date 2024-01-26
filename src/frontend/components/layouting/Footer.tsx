import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type } from 'os'

type Props = {
    color?: string
}

const Footer = ({ color }: Props) => {
    const router = useRouter();
    return (
        <div className='text-white' style={{ background: `${color ? color : '#BC1F40'}` }}>
            <div className='w-full md:w-[80%] mx-auto py-10'>
                <div className='flex flex-wrap items-center justify-between p-5'>
                    <div className='w-[300px]'>
                        <h1 className="text-[30px] text-white pb-5 font-[semibold]">
                            Contact Us
                        </h1>
                        <p className='pb-3'><i className="fa-sharp fa-solid fa-location-dot"></i> - Room 303,Third Floor Khattar Street Grand Residence Khattar Sanchaung Township</p>
                        <p className='pb-3'><i className="fa-solid fa-phone"></i> - +959-5103915, +959422557884</p>
                        <p className='pb-3'><i className="fa-solid fa-envelope"></i> - msiacademy2018@gmail.com</p>
                        {/* <h1 className='font-[regular] text-2xl my-5'>About MSI Academy</h1>
                        <p className='font-[light]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesqe sit amet sapien.</p> */}
                        {/* <img src="/assets/images/logo.jpeg" onClick={()=>router.push("/")} className='cursor-pointer w-[300px] p-5' alt="" /> */}
                    </div>
                    <div>
                        <ul className='flex list-none items-center justify-evenly py-5 '>
                            <Link href="/">

                                <li className='mr-5 text-white font-[regular] cursor-pointer'>Home</li>
                            </Link>
                            <Link href="/about">
                                <li className='mr-5 text-white font-[regular] cursor-pointer'>About</li>
                            </Link>
                            <Link href="/courses">
                                <li className='mr-5 text-white font-[regular] cursor-pointer'>Courses</li>
                            </Link>
                            <Link href="/events">
                                <li className='mr-5 text-white font-[regular] cursor-pointer'>Events</li>
                            </Link>
                            <Link href="/contact">
                                <li className=' text-white font-[regular] cursor-pointer'>Contact Us</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center flex-wrap justify-between p-5 border-t-[0.5px] border-white">
                    <h1>Powered by NEOMOCA.</h1>
                    <h1 className='my-5'>© 2022 Myanmar Search International Academy. All right reserved.</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer
