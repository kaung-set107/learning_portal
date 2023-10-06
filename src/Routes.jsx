import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'
import Dashboard from './pages/Dashboard/index.jsx'
import Employee from './pages/Employee/employeeList'
import EmployeeAdd from './pages/Employee/employeeAdd'
import EmployeeUpdate from './pages/Employee/employeeDetail'
import Position from './pages/Position/Position.jsx'
import AuthContainer from './util/AuthContainer.jsx'
import PositionRegsiter from './pages/Position/Add'
import Department from './pages/Department/Department'
import DepartmentRegister from './pages/Department/DepartmentRegister'
import DepartmentChart from './pages/Department/DepartmentChart'
import PositionUpdate from './pages/Position/PositionUpdate'
import DepartmentUpdate from './pages/Department/DepartmentUpdate'
import Attendance from './pages/Attendance/Attendance'
import AttendanceAdd from './pages/Attendance/AttendanceAdd'
import AttendanceUpdate from './pages/Attendance/AttendanceUpdate'
import Leave from './pages/Leave/Leave'
import LeaveAdd from './pages/Leave/LeaveAdd'
import LeaveUpdate from './pages/Leave/LeaveUpdate'
import PayRoll from './pages/PayRoll/payroll'
import Payslip from './pages/PayRoll/payslip'
import ExtraPay from './pages/PayRoll/extrapay'
import AttendanceDetail from './pages/Attendance/AttendanceDetail'

export default function RouteFile() {
 
  return (
    <div >
      <BrowserRouter>
        <div className='flex-grow' >
          <Nav/>
        </div>
        <Routes >
          <Route path='/' element={<Login />}></Route>

          <Route element={<AuthContainer />}>
            <Route path='/home' element={<Dashboard />} />

            {/* Department */}
            <Route path='/department' element={<Department />}></Route>
            <Route
              path='/department/register'
              element={<DepartmentRegister />}
            ></Route>
            <Route
              path='/department/chart'
              element={<DepartmentChart />}
            ></Route>
            <Route
              path='/department/update/:id'
              element={<DepartmentUpdate />}
            ></Route>

            {/* Employee */}
            <Route path='/emp' element={<Employee />} />
            <Route path='/emp-add' element={<EmployeeAdd />} />
            <Route path='/emp-update/:id' element={<EmployeeUpdate />} />

            {/* Pay Roll */}
            <Route path='/payroll' element={<PayRoll />} />
            <Route path='/payslip/:id' element={<Payslip />} />
            <Route path='/extra-pay/:id' element={<ExtraPay />} />

            {/* Position */}
            <Route path='/position' element={<Position />} />
            <Route path='/position/register' element={<PositionRegsiter />} />
            <Route path='/position/update/:id' element={<PositionUpdate />} />


            {/* Leave */}
            <Route path='/leave' element={<Leave />} ></Route>
            <Route path='/leave/register' element={<LeaveAdd />} ></Route>
            <Route path='/leave/update/:id' element={<LeaveUpdate />} ></Route>

            {/* Attendance */}
            <Route path='/attendance' element={<Attendance />}></Route>
            <Route path='/att-add' element={<AttendanceAdd />}></Route>
            <Route path='/att-update/:id' element={<AttendanceUpdate />} ></Route>
            <Route path='/att-detail' element={<AttendanceDetail />} ></Route>
          </Route>

          {/* <AuthContainer component={<Dashboard />} path='/home'></AuthContainer> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
