import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Nav from './components/Navbar/index'
import Dashboard from './pages/Dashboard/index.jsx'
import Instructor from './pages/Instructor/InstructorList'
import InstructorAdd from './pages/Instructor/InstructorAdd'
import InstructorUpdate from './pages/Instructor/InstructorDetail'
import SubjectSale from './pages/SubjectSale/Subject.jsx'
import AuthContainer from './util/AuthContainer.jsx'
import SubjectSaleRegsiter from './pages/SubjectSale/Add'
import Department from './pages/Department/Department'
import DepartmentRegister from './pages/Department/DepartmentRegister'
import DepartmentChart from './pages/Department/DepartmentChart'
import SubjectSaleUpdate from './pages/SubjectSale/SubjectUpdate'
import DepartmentUpdate from './pages/Department/DepartmentUpdate'
import Course from './pages/Course/Course'
import CourseAdd from './pages/Course/CourseAdd'
import CourseUpdate from './pages/Course/CourseUpdate'
import Leave from './pages/Leave/Leave'
import LeaveAdd from './pages/Leave/LeaveAdd'
import LeaveUpdate from './pages/Leave/LeaveUpdate'
import Student from './frontend/ByUser/index'
import StudentAssign from './frontend/ByUser/studentAssign'
// import ExtraPay from './pages/PayRoll/extrapay'
import CourseDetail from './pages/Course/AttendanceDetail'
import FHome from './frontend/home/body'
import InstructorHome from './frontend/ByInstructor/home'
import LearningMaterial from './frontend/pages/LearningMaterial/LMAdd'
import Assignment from './frontend/components/Assignment/AssignInput'
import Exam from './frontend/components/Exam/ExamInput'
import Subject from './pages/Subject/subject'
import SubjectAdd from './pages/Subject/subjectAdd'
import SubjectUpdate from './pages/Subject/subjectUpdate'
import SubjectDetail from './pages/Subject/subjectDetail'
import LMDetail from './frontend/pages/LearningMaterial/LMDetail'
import LearningMaterialAdmin from './components/Subject/learnigMaterialInput'
//assign update
import AssignmentUpdate from './frontend/pages/Assignment/AssignmentUpdate'
import LMUpdate from './frontend/components/LearningMaterial/LMUpdateInput'
import LMUpdateDetail from './frontend/pages/LearningMaterial/lmupdatedetail'
import Quiz from './frontend/components/Quiz/index'
import QuizCreate from './frontend/components/Quiz/quizcreate'
import './quiz.css'
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
 

          <Route element={<AuthContainer />}>
                   {/* Instructor form */}
        <Route path='/instructor' element={<InstructorHome/>}></Route>
        <Route path='/lm' element={<LearningMaterial/>}></Route>
        <Route path='/assign' element={<Assignment/>}></Route>
        <Route path='/assign/:id' element={<AssignmentUpdate/>}></Route>
        <Route path='/exam' element={<Exam/>}></Route>
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

            {/* Instructor or user create from admin */}
            <Route path='/instru' element={<Instructor />} />
            <Route path='/instru-add' element={<InstructorAdd />} />
            <Route path='/instru-update/:id' element={<InstructorUpdate />} />

            {/* Student */}
            <Route path='/student' element={<Student />} />
            <Route path='/student-assign' element={<StudentAssign />} />
            {/* <Route path='/extra-pay/:id' element={<ExtraPay />} /> */}

            {/* Subject Sale */}
            <Route path='/subject-sale' element={<SubjectSale />} />
            <Route path='/subject-sale-add' element={<SubjectSaleRegsiter />} />
            <Route path='/subject-sale/:id' element={<SubjectSaleUpdate />} />


            {/* Leave */}
            <Route path='/leave' element={<Leave />} ></Route>
            <Route path='/leave/register' element={<LeaveAdd />} ></Route>
            <Route path='/leave/update/:id' element={<LeaveUpdate />} ></Route>

            {/* Course*/}
            <Route path='/course' element={<Course />}></Route>
            <Route path='/course-add' element={<CourseAdd />}></Route>
            <Route path='/course-update/:id' element={<CourseUpdate />} ></Route>
            <Route path='/course-detail' element={<CourseDetail />} ></Route>

                {/* Subject*/}
            <Route path='/subject' element={<Subject />}></Route>
            <Route path='/subject-add' element={<SubjectAdd />}></Route>
            <Route path='/subject-update/:id' element={<SubjectUpdate />} ></Route>
            <Route path='/subject-detail/:id' element={<SubjectDetail />} ></Route>
            <Route path='/learn-mat/:id' element={<LearningMaterialAdmin/>} ></Route>

   
    {/* LmDetail */}
            <Route path='/sub-detail/:id' element={<LMDetail />} ></Route>
            <Route path='/lm-update/:id/:valid' element={<LMUpdate />} ></Route>
            <Route path='/lm-updatedetail/:id/:lmid' element={<LMUpdateDetail />} ></Route>

            {/* Quiz */}
             <Route path='/quiz' element={<Quiz />} ></Route>
             <Route path='/quiz-create/:id' element={<QuizCreate />} ></Route>
          </Route>

          {/* <AuthContainer component={<Dashboard />} path='/home'></AuthContainer> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
