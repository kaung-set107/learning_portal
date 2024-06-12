import { Image } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import MSINav from '../home/msinav'
import Footer from "./footer";
import apiInstance from '../../util/api';
import { getFile } from '../../util';
import Globe from '../../assets/img/msiglobe.png'
export default function Newsdetail() {
    const location = useLocation()
    const ID = location.pathname.split('/')[2]
    const [newsList, setNewsList] = useState([])
    useEffect(() => {
        window.scroll(0, 0)
        const getNews = async () => {
            await apiInstance
                .get(`news-and-activities/${ID}`)
                .then((res) => {
                    setNewsList(res.data.data);
                    console.log(res.data.data, 'att')

                });
        };

        getNews();
        window.scroll(0, 0)
    }, [])
    return (
        <div>
            <MSINav />
            <div className='flex flex-col w-full lg:mx-[125px] xl:mx-[135px] 2xl:mx-[155px] pt-[40px] container '>
                <div className='flex justify-start'>
                    <span className='text-[25px] sm:text-[36px] font-semibold font-[Work Sans]'>{newsList?.title}</span>
                </div>
                <div className='flex justify-start w-[200px] items-center gap-10 p-2'>
                    <div className='flex gap-2 '>
                        <Image src={Globe} className='w-[25px] h-[35px] rounded-xl' />
                        <span className='flex justify-center items-center pt-2'>MSI ACADEMY</span>
                    </div>
                    <div>
                        {/* <span className='2xl:text-[16px] font-normal'>August 20, 2022</span> */}
                    </div>
                </div>
                <div className='flex flex-col gap-32 '>
                    <div className='flex flex-col gap-10 justify-start items-start lg:w-[1024px] 2xl:w-[1200px]'>
                        <Image src={newsList?.images ? getFile({ payload: newsList?.images?.section1[0] }) : ''} className='w-full sm:w-full md:w-[400px] md:h-[200px] lg:w-[1024px] 2xl:w-[1280px] sm:h-[536px]' />
                        <div>
                            <p className='text-[16px] sm:text-[20px] w-[300px] h-auto sm:w-[620px] md:w-[650px] lg:w-[1000px] xl:w-[1024px] 2xl:w-[1200px] 2xl:leading-[50px] 2xl:text-[25px] font-normal'>{newsList?.descriptionList?.description1}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 justify-start items-start lg:w-[1024px] 2xl:w-[1200px]'>
                        <Image src={newsList?.images ? getFile({ payload: newsList?.images?.section2[0] }) : ''} className='w-full sm:w-full md:w-[400px] h-[200px] lg:w-[1024px] sm:h-[536px] 2xl:w-[1280px]' />
                        <div>
                            <p className='text-[16px] sm:text-[20px]  w-[300px] h-auto sm:w-[620px] md:w-[650px] lg:w-[1000px] xl:w-[1024px] 2xl:w-[1200px] 2xl:leading-[50px] 2xl:text-[25px]  font-normal'>{newsList?.descriptionList?.description2}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 justify-start items-start lg:w-[1024px] 2xl:w-[1200px]'>
                        <Image src={newsList?.images ? getFile({ payload: newsList?.images?.section3[0] }) : ''} className=' w-full sm:w-full md:w-[400px] h-[200px] lg:w-[1024px] 2xl:w-[1280px] sm:h-[536px]' />
                        <div>
                            <p className='text-[16px] sm:text-[20px] w-[300px] h-auto sm:w-[620px] md:w-[650px] lg:w-[1000px] xl:w-[1024px] 2xl:w-[1200px] 2xl:leading-[50px] 2xl:text-[25px] font-normal'>{newsList?.descriptionList?.description3}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='lg:pt-[100px] xl:pt-[110px] 2xl:pt-[120px]'>
                <Footer />
            </div>
        </div>
    )
}
