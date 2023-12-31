import { Card } from '@nextui-org/react'
import Header from '../../components/Login/header'
import Login from '../../components/Login/inputlogin'
import Head from '../../frontend/home/header'

export default function LoginPage() {

  return (
    <>
     <Head/>
      <div className='flex justify-center'>
     
        <Card
          isFooterBlurred
          radius='sm'
          className='border-none mt-8  py-10 px-10 max-w-[400px] gap-4 '
        >
          <Header
            heading='Login to your account'
            paragraph="Welcome To MSI Learning Portal"

          />
          <Login />
        </Card>
      </div>
    </>
  )
}
