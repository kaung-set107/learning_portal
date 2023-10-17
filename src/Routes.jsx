import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'
import Dashboard from './pages/Dashboard/index.jsx'
import Employee from './pages/Instructor/employeeList'
import EmployeeAdd from './pages/Instructor/employeeAdd'
import EmployeeUpdate from './pages/Instructor/employeeDetail'
import Position from './pages/Subject/Position.jsx'
import AuthContainer from './util/AuthContainer.jsx'
import PositionRegsiter from './pages/Subject/Add'
import Department from './pages/Department/Department'
import DepartmentRegister from './pages/Department/DepartmentRegister'
import DepartmentChart from './pages/Department/DepartmentChart'
import PositionUpdate from './pages/Subject/PositionUpdate'
import DepartmentUpdate from './pages/Department/DepartmentUpdate'
import Attendance from './pages/Course/Attendance'
import AttendanceAdd from './pages/Course/AttendanceAdd'
import AttendanceUpdate from './pages/Course/AttendanceUpdate'
import Leave from './pages/Leave/Leave'
import LeaveAdd from './pages/Leave/LeaveAdd'
import LeaveUpdate from './pages/Leave/LeaveUpdate'
import PayRoll from './pages/PayRoll/payroll'
import Payslip from './pages/PayRoll/payslip'
import ExtraPay from './pages/PayRoll/extrapay'
import AttendanceDetail from './pages/Course/AttendanceDetail'
import FHome from './frontend/home/body'
import InstructorHome from './frontend/ByInstructor/home'
import LearningMaterial from './frontend/pages/LearningMaterial/LMAdd'
import Assignment from './frontend/components/Assignment/AssignInput'
import Exam from './frontend/components/Exam/ExamInput'
export default function RouteFile() {
 
  return (
    <div >
      <BrowserRouter>
<Routes>
    <Route path='/' element={<FHome/>}></Route>
</Routes>
        <div className='flex-grow' >
          <Nav/>
        </div>
        <Routes >
          <Route path='/login' element={<Login />}></Route>
          {/* Instructor form */}
        <Route path='/instructor' element={<InstructorHome/>}></Route>
        <Route path='/lm' element={<LearningMaterial/>}></Route>
        <Route path='/assign' element={<Assignment/>}></Route>
        <Route path='/exam' element={<Exam/>}></Route>

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
