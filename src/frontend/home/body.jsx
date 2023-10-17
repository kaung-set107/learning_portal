import Header from "./home";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import ELP from "./image/elp.svg";
export default function body() {
  return (
    <div className='mx-8'>
      <Header/>
      <Card isBlurred className="flex-grow  gap-3 mt-20" shadow="sm">
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center py-5 ">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src={ELP}
                width="100%"
              />
            </div>

            <div className="block col-span-6 md:col-span-8">
              <div className="flex justify-between items-start ">
                <div className="flex flex-col gap-0">
                  <h2 className="font-semibold text-foreground/90 text-xl">
                    What is E-Learning ?
                  </h2>
                  <p className="text-foreground/80 mt-4 text-lg">
                    I n the dynamic realm of eLearning, staying ahead of the
                    curve is essential for delivering impactful and engaging
                    training experiences. Enter AI tools for eLearning
                    development, a revolutionary approach that is transforming
                    how training content is created, personalized, and
                    optimized. In this blog, we delve into the innovative
                    AI-powered tools that are reshaping the landscape of
                    eLearning, equipping trainers and instructional designers
                    with the means to enhance learning outcomes like never befor
                  </p>
                  {/* <h2 className="text-large font-medium mt-2">
                    MSI
                  </h2> */}
                </div>
              </div>
              <div className="md:grid grid-cols-6 gap-2 sm:grid-cols-4-gap-2">
                <Button color="primary" variant="ghost" className="mt-5">
                  <span className='lg:text-lg md:text-md sm:text-sm'>Get Started ?</span>
                </Button>
                <Button color="primary" variant="light" className="lg:text-lg md:text-md sm:text-sm mt-5">
                  Learn More ...
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
