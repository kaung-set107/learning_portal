import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/login";
// Home Web Page
import FHome from "./frontend/home/body";
import About from "./frontend/home/about.jsx";
import Booking from './frontend/home/booking.jsx'
import HomeCourse from "./frontend/home/home-course/home-course.jsx";
import HomeCourseDetail from "./frontend/home/home-course/course-detail.jsx";
import HomeSubjectDetail from "./frontend/home/home-course/home_subject_detail.jsx";
import Test from './frontend/home/test.jsx'
import Dashboard from "./pages/Dashboard/index.jsx";
import Instructor from "./pages/Instructor/InstructorList";
import InstructorAdd from "./pages/Instructor/InstructorAdd";
import InstructorUpdate from "./pages/Instructor/InstructorDetail";
import SubjectSale from "./pages/SubjectSale/Subject.jsx";
import AuthContainer from "./util/AuthContainer.jsx";
import SubjectSaleRegsiter from "./pages/SubjectSale/Add";
import StudentReg from "./pages/Student/studentregkist.jsx";
import SubjectSaleUpdate from "./pages/SubjectSale/SubjectUpdate";
import StudentDetail from "./pages/Student/studentdetail.jsx";
//Category
import CategoryInput from "./pages/Category/categoryInput.jsx";
import CategoryList from "./pages/Category/categoryList.jsx";
import Course from "./pages/Course/Course";
import CourseAdd from "./pages/Course/CourseAdd";
import CourseUpdate from "./pages/Course/CourseUpdate";
import Leave from "./pages/Leave/Leave";
import LeaveAdd from "./pages/Leave/LeaveAdd";
import LeaveUpdate from "./pages/Leave/LeaveUpdate";
//Student
import Student from "./frontend/ByUser/index";
import StudentAssign from "./frontend/ByUser/studentAssign";
import StudentCourseDetail from "./frontend/ByUser/CourseDetail/courseDetail.jsx";
import StudentSubjectDetail from "./frontend/ByUser/CourseDetail/SubjectDetail/subjectDetail.jsx";
import StudentNo from "./frontend/ByUser/index";
import MyCourseSubDetail from "./frontend/components/MyCourse/index.jsx";
import MyCourseSubDetailID from "./frontend/components/MyCourse/index.jsx";

import InstructorHome from "./frontend/ByInstructor/home";
import LearningMaterial from "./frontend/pages/LearningMaterial/LMAdd";
import Assignment from "./frontend/components/Assignment/AssignInput";
import Exam from "./frontend/components/Exam/ExamInput";
import Subject from "./pages/Subject/subject";
import SubjectAdd from "./pages/Subject/subjectAdd";
import SubjectUpdate from "./pages/Subject/subjectUpdate";
import SubjectDetail from "./pages/Subject/subjectDetail";
import LMDetail from "./frontend/pages/LearningMaterial/LMDetail";
import LearningMaterialAdmin from "./components/Subject/learnigMaterialInput";
import Chart from "./frontend/ByUser/PieChart.jsx";

//Batch
import Batch from './pages/Batch/batchList.jsx'
import BatchCreate from './pages/Batch/batchInput.jsx'
import BatchUpdate from './pages/Batch/batchUpdate.jsx'

//Event
import Event from './pages/Events/eventList.jsx'
import EventCreate from './pages/Events/eventInput.jsx'
import EventUpdate from './pages/Events/eventUpdate.jsx'

//Testimonial
import Testimonial from './pages/Testimonial/testimonialList.jsx'
import TestimonialCreate from './pages/Testimonial/testimonialInput.jsx'
import TestimonialUpdate from './pages/Testimonial/testimonialUpdate.jsx'

//assign update
import AssignmentUpdate from "./frontend/pages/Assignment/AssignmentUpdate";
import LMUpdate from "./frontend/components/LearningMaterial/LMUpdateInput";
import LMUpdateDetail from "./frontend/pages/LearningMaterial/lmupdatedetail";
import Quiz from "./frontend/components/Quiz/index";
import QuizCreate from "./frontend/components/Quiz/quizcreate";
import "./quiz.css";
import QuizPage from "./frontend/ByUser/Quiz/quizpage.jsx";
import QuizResult from "./frontend/ByUser/Quiz/result.jsx";
import ExamUpdate from "./frontend/components/Exam/ExamUpdate.jsx";
import ApproveDetail from "./pages/Student/approvedetail.jsx";
import RejectDetail from "./pages/Student/rejectdetail.jsx";
//Enrollment
import Enrollment from "./pages/Enroll/enrolllist.jsx";
import EnrollDetail from "./pages/Enroll/enrollDetail.jsx";
import EnrollApproveDetail from "./pages/Enroll/enrollApproveDetail.jsx";
import EnrollRejectDetail from "./pages/Enroll/enrollRejectDetail.jsx";
import Nav from "./frontend/home/header.jsx";
import InstructorLayout from "./frontend/components/layouting/InstructorLayout.jsx";
import Subjects from "./frontend/features/subjects/pages/Subjects.jsx";
import SubjectBrief from "./frontend/features/subjects/pages/SubjectBrief.jsx";
import AssignmentResults from "./frontend/features/assignment-results/pages/AssignmentResults.jsx";
export default function RouteFile() {
  console.log(localStorage.getItem("user"), "local use");
  return (
    <div>
      <Router>
        {/* <div>
          <Nav />
          <ul>
            <li>
              <Link to='/' />
            </li>
          </ul>
        </div> */}
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<FHome />}></Route>
          <Route path='/test' element={<Test />}></Route>

          <Route path='/about' element={<About />}></Route>
          <Route path='/booking' element={<Booking />}></Route>
          <Route path='/home-course' element={<HomeCourse />}></Route>
          <Route
            path='/home-course-detail'
            element={<HomeCourseDetail />}
          ></Route>
          <Route
            path='/home-sub-detail'
            element={<HomeSubjectDetail />}
          ></Route>

          <Route element={<AuthContainer />}>
            {/* Admin Panel */}
            {/* Start Student Register and Detail */}
            <Route path='/home' element={<Dashboard />}></Route>
            <Route path='/register-list' element={<StudentReg />}></Route>
            <Route
              path='/student-detail/:id'
              element={<StudentDetail />}
            ></Route>
            <Route
              path='/approve-detail/:id'
              element={<ApproveDetail />}
            ></Route>
            <Route path='/reject-detail/:id' element={<RejectDetail />}></Route>
            <Route
              path='/mycourse-sub-detail'
              element={<MyCourseSubDetail />}
            ></Route>
            <Route
              path='/mycourse-sub-detail'
              element={<MyCourseSubDetailID />}
            ></Route>
            {/*End Student Register and Detail */}

            {/*Start Student Enroll */}
            <Route path='/enroll-list' element={<Enrollment />}></Route>
            <Route path='/enroll-detail/:id' element={<EnrollDetail />}></Route>
            <Route
              path='/enroll-approve-detail/:id'
              element={<EnrollApproveDetail />}
            ></Route>
            <Route
              path='/enroll-reject-detail/:id'
              element={<EnrollRejectDetail />}
            ></Route>
            {/*End Student Enroll */}

            {/* Category */}
            <Route path='/category' element={<CategoryList />}></Route>
            <Route path='/category-input' element={<CategoryInput />}></Route>
            {/* Course*/}
            <Route path='/course' element={<Course />}></Route>
            <Route path='/course-add' element={<CourseAdd />}></Route>
            <Route path='/course-update/:id' element={<CourseUpdate />}></Route>

            {/* Batch */}
            <Route path='/batch' element={<Batch />}></Route>
            <Route path='/batch-create' element={<BatchCreate />}></Route>
            <Route path='/batch-update/:id' element={<BatchUpdate />}></Route>


            {/* Subject*/}
            <Route path='/subject' element={<Subject />}></Route>
            <Route path='/subject-add' element={<SubjectAdd />}></Route>
            <Route
              path='/subject-update/:id'
              element={<SubjectUpdate />}
            ></Route>
            <Route
              path='/subject-detail/:id'
              element={<SubjectDetail />}
            ></Route>
            <Route
              path='/learn-mat/:id'
              element={<LearningMaterialAdmin />}
            ></Route>

            {/* End Admin Panel */}

            {/* Instructor form */}
            <Route path="/by-instructor" element={<InstructorLayout />}>
              <Route index element={<InstructorHome />} />
              <Route path='subjects'>
                <Route index element={<Subjects />} />
                <Route path=":id/brief" element={<SubjectBrief />} />
              </Route>
              <Route path='assignment-results'>
                <Route index element={<AssignmentResults />} />
              </Route>
              {/* <Route path='/instructor' element={<InstructorHome />}></Route> */}
              {/* <Route path='/assign' element={<Assignment />}></Route> */}
              {/* <Route path='/lm' element={<LearningMaterial />}></Route> */}
              {/* <Route path='/assign/:id' element={<AssignmentUpdate />}></Route> */}
            </Route>


            {/* Quiz Instructor */}
            {/* <Route path='/quiz' element={<Quiz />}></Route> */}
            <Route path='/quiz-create/:id' element={<QuizCreate />}></Route>

            {/* Instructor or user create from admin */}
            <Route path='/instru' element={<Instructor />} />
            <Route path='/instru-add' element={<InstructorAdd />} />
            <Route path='/instru-update/:id' element={<InstructorUpdate />} />

            {/* Event */}
            <Route path='/event' element={<Event />} />
            <Route path='/event-create' element={<EventCreate />} />
            <Route path='/event-update/:id' element={<EventUpdate />} />

            {/* Testimonial */}
            <Route path='/testimonial' element={<Testimonial />} />
            <Route path='/testimonial-create' element={<TestimonialCreate />} />
            <Route path='/testimonial-update/:id' element={<TestimonialUpdate />} />

            {/* Student */}
            <Route path='/student' element={<Student />} />
            <Route path='/student/:id' element={<StudentNo />} />

            <Route path='/student-assign' element={<StudentAssign />} />
            <Route path='/course-detail' element={<StudentCourseDetail />} />
            <Route path='/sub-detail' element={<StudentSubjectDetail />} />

            {/* Subject Sale */}
            <Route path='/subject-sale' element={<SubjectSale />} />
            <Route path='/subject-sale-add' element={<SubjectSaleRegsiter />} />
            <Route path='/subject-sale/:id' element={<SubjectSaleUpdate />} />

            {/* LmDetail */}
            <Route path='/sub-detail/:id' element={<LMDetail />}></Route>
            <Route path='/lm-update/:id/:valid' element={<LMUpdate />}></Route>
            <Route
              path='/lm-updatedetail/:id/:lmid'
              element={<LMUpdateDetail />}
            ></Route>


            {/* Quiz Student */}
            <Route path='/quiz-page/:id' element={<QuizPage />}></Route>
            <Route path='/quiz-result' element={<QuizResult />}></Route>
          </Route>

          {/* Exam */}
          <Route path='/exam' element={<Exam />}></Route>
          <Route path='/exam-update/:id' element={<ExamUpdate />}></Route>
          {/* <AuthContainer component={<Dashboard />} path='/home'></AuthContainer> */}
          <Route path='/chart' element={<Chart />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
