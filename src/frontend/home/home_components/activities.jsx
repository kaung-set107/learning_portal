import React from 'react'
import Act1 from '../../../assets/img/act1.png'
import Act2 from '../../../assets/img/act2.png'
import Act3 from '../../../assets/img/act3.png'
import Act4 from '../../../assets/img/act4.png'
import Act5 from '../../../assets/img/act5.png'
import Act6 from '../../../assets/img/act6.png'
import Globe from '../../../assets/img/msiglobe.png'
import { Image, Link } from '@nextui-org/react'

export default function Activities() {
    const data = [
        { id: 1, title: 'MSI Students Discussion For Better Thinking', img: Act1 },
        { id: 2, title: 'MSI Students Discussion For Better Thinking', img: Act2 },
        { id: 3, title: 'MSI Students Discussion For Better Thinking', img: Act3 },
        { id: 4, title: 'MSI Students Discussion For Better Thinking', img: Act4 },
        { id: 5, title: 'MSI Students Discussion For Better Thinking', img: Act5 },
        { id: 6, title: 'MSI Students Discussion For Better Thinking', img: Act6 },

    ]
    return (
        <div className='container'>
            <div className='lg:h-[1200px] 2xl:h-[1300px] '>
                <div className='flex flex-col gap-5 justify-center'>
                    <span className='text-[26px] lg:text-[30px] 2xl:text-[36px] font-semibold font-[Poppins] flex justify-center items-center text-[#0B2743]'>News & Activities</span>
                    <span className='text-[18px] lg:text-[20px] 2xl:text-[24px] font-medium font-[Poppins] text-[#0B2743'>Latest Post</span>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-2 md:gap-5 lg:gap-10 2xl:gap-10 sm:gap-0 items-center justify-center md:flex-row sm:py-10 2xl:py-20'>

                    {data.slice(0, 8).map((e) => (
                        <div
                            // onClick={() => handleRoute(e)}

                            className=''
                        >

                            <Image
                                // style={{ width: "500px", height: "280px" }}
                                // alt={e.image?.originalname}
                                src={e.img}
                                className='w-[200px] h-full md:w-[300px] md:h-[200px] lg:w-[300px] lg:h-[250px] 2xl:w-full sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                            />
                            <div className='flex p-5 flex-col justify-start flex-grow '>

                                <span

                                    className='2xl:w-[344px] lg:h-[56px] text-[#0B2743] text-[18px] lg:text-[20px] 2xl:text-[24px] font-medium'
                                >
                                    {e.title}
                                </span>


                            </div>
                            <div className='flex justify-between items-center p-2'>
                                <div className='flex gap-2'>
                                    <Image src={Globe} className='w-[25px] h-[35px] rounded-xl' />
                                    <span className='flex justify-center items-center pt-2'>MSI ACADEMY</span>
                                </div>
                                <div>
                                    <span className='2xl:text-[16px] font-normal'>August 20, 2022</span>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
                <div className='flex justify-center mt-20 py-3 sm:py-0 '>
                    <Link href='/testimonial-page'>
                        <button className='text-[#696A75] text-[16px] hover:text-primary font-semibold border-1 border-slate-700 p-2 rounded-lg sm:hover:-translate-y-1 sm:hover:scale:110 duration-500'>
                            View All Post
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
