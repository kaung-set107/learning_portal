import React from "react";
import { Tabs, Tab, Input, Button, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFireFlameCurved, faStar, faCheck, faImage
} from "@fortawesome/free-solid-svg-icons";
export default function App() {
  return (
    <div className="flex justify-center items-center w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFireFlameCurved} size='xl' />
              <span>Pending</span>
            </div>
          }
        >
          <div className='flex flex-col gap-5 w-[1560px] h-[204px] pt-8 pl-10 pb-8 pr-10'>
            <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 '>
              <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
              <div className='flex flex-col gap-2 justify-start'>
                <span className='text-[32px] text-[#fff] font-semibold'>Introduction to IELTS</span>
                <div className='text-[16px] text-[#fff] font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                <div className='flex'>
                  <span className='text-[16px] text-[#fff] font-semibold'>Reference link :</span><a className='text-[16px] text-[#4b4eff] font-semibold' href='www.msi.com/basicielts'>www.msi.com/basicielts</a>
                </div>
                <div className='flex'>
                  <span className='text-[16px] text-[#fff] font-semibold'>PDF File link :</span><a className='text-[16px] text-[#4b4eff] font-semibold' href='www.msi.com/basicielts'>www.msi.com/basicielts</a>
                </div>

              </div>

              <div className='flex flex-col gap-4  justify-center'>
                <Input type='file' className='w-96' endContent={
                  < FontAwesomeIcon icon={faImage} size='xl' />
                } />
                <div className='flex justify-start gap-2'>
                  <Button>Cancel</Button>
                  <Button color='primary'>Upload</Button>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faStar} size='xl' />
              <span>Completed  </span>
            </div>
          }
        >
          <div className='flex flex-col gap-5 w-[1560px] h-[204px] pt-8 pl-10 pb-8 pr-10'>
            <div className='grid grid-cols-3 bg-[#215887]   p-12  border-4 border-l-red-500 '>
              <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
              <div className='flex flex-col gap-2 justify-start'>
                <span className='text-[32px] text-[#fff] font-semibold'>Introduction to IELTS</span>
                <div className='text-[16px] text-[#fff] font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                <div className='flex'>
                  <span className='text-[16px] text-[#fff] font-semibold'>Reference link :</span><a className='text-[16px] text-[#4b4eff] font-semibold' href='www.msi.com/basicielts'>www.msi.com/basicielts</a>
                </div>
                <div className='flex'>
                  <span className='text-[16px] text-[#fff] font-semibold'>PDF File link :</span><a className='text-[16px] text-[#4b4eff] font-semibold' href='www.msi.com/basicielts'>www.msi.com/basicielts</a>
                </div>

              </div>


            </div>
          </div>
        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheck} size='xl' />
              <span>Checked</span>
            </div>
          }
        >
          <div className='flex flex-col gap-5 w-[1560px]  h-[204px] pt-8 pl-10 pb-8 pr-10'>
            <div className='grid grid-cols-3 bg-[#215887] p-12  border-4 border-l-red-500 '>
              <div className='flex justify-center text-[24px] text-[#fff] font-semibold items-center'>Assignment</div>
              <div className='flex flex-col gap-2 justify-start'>
                <span className='text-[32px] text-[#fff] font-semibold'>Introduction to IELTS</span>
                <div className='text-[16px] text-[#fff] font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                <div className='flex'>
                  <span className='text-[16px] text-[#fff] font-semibold'>Reference link :</span><a className='text-[16px] text-[#4b4eff] font-semibold' href='www.msi.com/basicielts'>www.msi.com/basicielts</a>
                </div>
                <div className='flex'>
                  <span className='text-[16px] text-[#fff] font-semibold'>PDF File link :</span><a className='text-[16px] text-[#4b4eff] font-semibold' href='www.msi.com/basicielts'>www.msi.com/basicielts</a>
                </div>

              </div>

              <div className='flex flex-col gap-10 p-2 justify-start  bg-[#fff] w-[480px] h-[174px]  rounded-[4px]'>
                <div className='flex gap-2'>
                  <Image
                    radius="sm"
                    alt=''
                    className="object-cover w-[40px] h-[40px]"
                    src=''
                  />
                  <div>IELTs</div>
                </div>
                <div className='bg-[red] w-[240px] h-[74px] rounded-t-[32px] rounded-r-[32px] rounded-b-[32px] rounded-l-[0px]'>Hello</div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
