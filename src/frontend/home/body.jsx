import Header from "./header";
import { Image, Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

import ELP from "./image/el.png";
// import Footer from '../../frontend/home/footer';
export default function body() {
  return (
    <div className=''>
      <Header />

      <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center mb-5 mx-8 md:block '>
        <div className='relative col-span-6 md:col-span-4 flex justify-center md:mt-5'>
          <Image
            alt='Album cover'
            className='object-cover sm:w-100 sm:h-96'
            src={ELP}
          />
        </div>

        <div className='block col-span-6 md:col-span-8'>
          <div className='flex justify-between items-start md:mt-5 '>
            <div className='flex flex-col gap-0'>
              <h2 className='font-semibold text-foreground/90 text-2xl'>
                What is E-Learning ?
              </h2>
              <p className='text-foreground/80 mt-4 text-xl'>
                I n the dynamic realm of eLearning, staying ahead of the curve
                is essential for delivering impactful and engaging training
                experiences. Enter AI tools for eLearning development, a
                revolutionary approach that is transforming how training content
                is created, personalized, and optimized. In this blog, we delve
                into the innovative AI-powered tools that are reshaping the
                landscape of eLearning, equipping trainers and instructional
                designers with the means to enhance learning outcomes like never
                befor
              </p>
              {/* <h2 className="text-large font-medium mt-2">
                    MSI
                  </h2> */}
            </div>
          </div>
          <div className='md:grid grid-cols-6 gap-2 sm:grid-cols-6'>
            <Button color='primary' variant='ghost' className='mt-5'>
              <Link href='/login'>
                <span className='lg:text-lg md:text-md sm:text-sm'>
                  Get Started ?
                </span>
              </Link>
            </Button>
            <Button
              color='primary'
              variant='light'
              className='lg:text-lg md:text-md sm:text-sm mt-5'
            >
              Learn More ...
            </Button>
          </div>
        </div>
      </div>
      {/* <div className='bg-slate-900 h-32 py-4 px-5 flex items-end'>
   <Footer/>
     </div> */}
    </div>
  );
}
