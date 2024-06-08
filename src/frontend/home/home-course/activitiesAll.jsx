import React, { useState, useEffect } from 'react'
import Act1 from '../../../assets/img/act1.png'
import Act2 from '../../../assets/img/act2.png'
import Act3 from '../../../assets/img/act3.png'
import Act4 from '../../../assets/img/act4.png'
import Act5 from '../../../assets/img/act5.png'
import Act6 from '../../../assets/img/act6.png'
import Globe from '../../../assets/img/msiglobe.png'
import { Image } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import apiInstance from '../../../util/api'
import { getFile } from '../../../util'
import MSINav from "../msinav";
import Footer from "../footer";
export default function Activities() {
    const data = [
        { id: 1, title: 'MSI Students Discussion For Better Thinking', img: Act1 },
        { id: 2, title: 'MSI Students Discussion For Better Thinking', img: Act2 },
        { id: 3, title: 'MSI Students Discussion For Better Thinking', img: Act3 },
        { id: 4, title: 'MSI Students Discussion For Better Thinking', img: Act4 },
        { id: 5, title: 'MSI Students Discussion For Better Thinking', img: Act5 },
        { id: 6, title: 'MSI Students Discussion For Better Thinking', img: Act6 },

    ]
    const [newsList, setNewsList] = useState([])
    useEffect(() => {
        window.scroll(0, 0)
        const getNews = async () => {
            await apiInstance
                .get(`news-and-activities`)
                .then((res) => {
                    setNewsList(res.data.data);
                    console.log(res.data.data, 'att')

                });
        };

        getNews();
    }, [])
    return (
        <>
            <MSINav />

            <div className='container py-10'>

                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-5 justify-center'>
                        <span className='text-[26px] lg:text-[30px] 2xl:text-[36px] font-semibold font-[Poppins] flex justify-center items-center text-[#0B2743]'>News & Activities</span>
                        <span className='text-[18px] hidden sm:flex lg:text-[20px] 2xl:text-[24px] font-medium font-[Poppins] text-[#0B2743'>Latest Post</span>
                    </div>
                    <div className='sm:grid flex flex-col gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5 lg:gap-5 2xl:gap-10  items-center justify-center md:flex-row sm:py-10 2xl:py-20'>

                        {newsList.map((e) => (
                            <Link to={'/activities-detail/' + e._id}
                                // onClick={() => handleRoute(e)}

                                className=''
                            >

                                <Image
                                    // style={{ width: "500px", height: "280px" }}
                                    // alt={e.image?.originalname}
                                    src={e.images ? getFile({ payload: e.images?.bannerImage[0] }) : ''}
                                    className='w-[350px] h-full md:w-[300px] md:h-[200px] lg:w-[320px] lg:h-[250px] 2xl:w-full sm:hover:-translate-y-2 sm:hover:scale-105 duration-500'
                                />
                                <div className='flex p-5 flex-col justify-start flex-grow '>

                                    <Link to={'/activities-detail/' + e._id}

                                        className='2xl:w-[344px] md:w-[200px] lg:h-[56px] md:h-[60px] w-[300px] text-[#0B2743] text-[18px] lg:text-[18px] 2xl:text-[24px] font-medium'
                                    >
                                        {e.title.substring(0, 40)}...
                                    </Link>


                                </div>
                                <div className='flex flex-col justify-start items-start sm:flex md:flex-col lg:flex-col xl:flex-row 2xl:flex-row  sm:justify-between md:justify-start md:items-start lg:justify-start xl:justify-start sm:items-start xl:items-center xl:gap-2 lg:items-start p-2'>
                                    <div className='flex gap-2 justify-start items-start '>
                                        <Image src={Globe} className='w-[25px] h-[35px] rounded-xl' />
                                        <span className=' pt-1'>MSI ACADEMY</span>
                                    </div>
                                    <div className='pl-8 sm:pl-7 md:pl-8 lg:pl-7 xl:pl-0 2xl:pl-0'>
                                        {/* <span className='lg:text-[15px] 2xl:text-[16px] font-normal'>August 20, 2022</span> */}
                                    </div>
                                </div>

                            </Link>
                        ))}

                    </div>

                </div>
            </div>
            <div className=''>
                <Footer />
            </div>

        </>

    )
}
