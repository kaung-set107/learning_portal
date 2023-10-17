import Sidebar from '../../components/Sidebar'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button
} from '@nextui-org/react'
import { PlusIcon } from '../../assets/Icons/PlusIcon'
import Table from '../../components/Instructor/employeeList'
import { Link } from 'react-router-dom'

import { useEffect } from 'react'
import apiInstance from '../../util/api'

export default function Instructor () {
  useEffect(() => {
    const getEmployeeLists = async () => {
      await apiInstance.get('users').then(response => {
        console.log(response.data.data, 'here')
      })
    }
    getEmployeeLists()
  }, [])

  useEffect(() => {
    const getEmployeeLists = async () => {
      await apiInstance.get('users').then(response => {
        console.log(response.data.data, 'here')
      })
    }
    getEmployeeLists()
  }, [])

  return (
    <div className=''>
      <div className='flex'>
        <div className='sidebar sticky-top'>
          <Sidebar />
        </div>
        <div className='flex-grow '>
          <div className='sticky-top'>
            <Card className='rounded-sm shadow-md py-3 min-h-[890px]'>
              <CardHeader className='justify-between'>
                <div></div>
                <div className='font-semibold text-2xl'>Instructor List</div>
                <Link to='/instru-add' className=''>
                  <Button
                    endContent={<PlusIcon />}
                    color='primary'
                    className='text-sm'
                    
                  >
                    Add
                  </Button>
                </Link>
              </CardHeader>
              <CardBody className=''>
                <Table />
              </CardBody>
              <Divider></Divider>
              <CardFooter>
                Copyright © 2023-2024{' '}
                <b className='text-cyan-600'>K-win Technology</b> .All rights
                reserved.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
