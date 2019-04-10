import React, { Component, Fragment } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../src/components/MainPage/Main';
import AdminHome from './components/Admin/AdminHome';
import AdminProfile from './components/Admin/AdminProfile';
import ProfileUpdate from './components/Admin/ProfileUpdate';
import UserOptions from './components/Users/UsersOptions';
import TeachersInfoAndSettings from './components/Users/TeachersInfoAndSettings';
import TeacherDetails from './components/Users/TeacherDetails';
import TeacherUpdate from './components/Users/TeacherUpdate';
import StudentsInfoAndSettings from './components/Users/StudentsInfoAndSettings';
import StudentDetails from './components/Users/StudentDetails';
import StudentUpdate from './components/Users/StudentUpdate';
import ParentsInfoAndSettings from './components/Users/ParentsInfoAndSettings';
import ParentDetails from './components/Users/ParentDetails';
import ParentUpdate from './components/Users/ParentUpdate';
//import RegisterStudentAndParent from './components/Users/Register/RegisterStudentAndParent';
import SchoolYears from './components/SchoolYear/SchoolYears';
import SchoolClasses from './components/SchoolClass/SchoolClasses';
import CreateSchoolClass from './components/SchoolClass/CreateSchoolClass';
import SchoolClassDetails from './components/SchoolClass/SchoolClassDetails';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/Courses/CreateCourse';
import TeacherHome from './components/Teacher/TeacherHome';
import TeacherSchoolClass from './components/Teacher/TeacherSchoolClass';
import StudentHome from './components/Student/StudentHome';
import StudentCourseMarks from './components/Teacher/StudentCourseMarks';
import ParentHome from './components/Parent/ParentHome';
import ChildCourses from './components/Parent/ChildCourses';
import RegisterTeacher from './components/Users/Register/RegisterTeacher';
import LogData from './components/Admin/LogData';
import CreateSubject from './components/Courses/CreateSubject';
import Subjects from './components/Courses/Subjects';
import UpdateSubject from './components/Courses/UpdateSubject';
import RegisterAdmin from './components/Users/Register/RegisterAdmin';
import AdminsList from './components/Users/AdminsList';
import RegisterStudentWithParent from './components/Users/Register/RegisterStudentWithParent';
import RegisterStudent from './components/Users/Register/RegisterStudent';
import StudentTakesCourses from './components/Users/StudentTakesCourses';
//import AddMark from './components/Teacher/AddMark';

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Main}></Route>

              <Route exact path='/admin/home' component={AdminHome}></Route>
              <Route exact path='/admin/profile' component={AdminProfile}></Route>
              <Route exact path='/admin/profile/update' component={ProfileUpdate}></Route>

              <Route exact path='/users' component={UserOptions}></Route>
              <Route exact path='/users/admins' component={AdminsList}></Route>
              <Route exact path='/users/admins/register' component={RegisterAdmin}></Route>

              <Route exact path='/users/teachers' component={TeachersInfoAndSettings}></Route>
              <Route exact path='/users/teachers/register' component={RegisterTeacher}></Route>
              <Route exact path='/users/teachers/update/:id' component={TeacherUpdate}></Route>
              <Route exact path='/users/teachers/:id' component={TeacherDetails}></Route>

              <Route exact path='/users/students' component={StudentsInfoAndSettings}></Route>
              <Route exact path='/users/students/register' component={RegisterStudent}></Route>
              <Route exact path='/users/students/registerwithparent' component={RegisterStudentWithParent}></Route>
              <Route path='/users/students/update/:id' component={StudentUpdate}></Route>
              <Route exact path='/users/students/:id' component={StudentDetails}></Route>
              <Route exact path='/users/students/:id/courses' component={StudentTakesCourses}></Route>
            

              <Route exact path='/users/parents' component={ParentsInfoAndSettings}></Route>
              <Route path='/users/parents/update/:id' component={ParentUpdate}></Route>
              <Route path='/users/parents/:id' component={ParentDetails}></Route>

              <Route path='/schoolyears' component={SchoolYears}></Route>

              <Route exact path='/schoolclasses' component={SchoolClasses}></Route>
              <Route exact path='/schoolclasses/create' component={CreateSchoolClass}></Route>
              <Route exact path='/schoolclasses/:id' component={SchoolClassDetails}></Route>

              <Route exact path='/courses' component={Courses}></Route>
              <Route exact path='/courses/create' component={CreateCourse}></Route>
              <Route exact path='/subjects/create' component={CreateSubject}></Route>
              <Route exact path='/subjects' component={Subjects}></Route>
              <Route exact path='/subjects/update/:subjectId' component={UpdateSubject}></Route>

              <Route exact path='/teacher/home' component={TeacherHome}></Route>
              <Route exact path='/teacher/:teacherId/course/:courseId/schoolclass/:schoolClassId' component={TeacherSchoolClass}></Route>
              <Route exact path='/teacher/:teacherId/student/:studentId/course/:courseId' component={StudentCourseMarks}></Route>
              {/* <Route exact path='/teacher/:teacherId/student/:studentId/course/:courseId/addmark' component={AddMark}></Route> */}

              <Route exact path='/student/home' component={StudentHome}></Route>
              <Route exact path='/parent/home' component={ParentHome}></Route>
              <Route exact path='/parent/grades/:studentId' component={ChildCourses}></Route>

              <Route exact path = '/logs' component={LogData}></Route>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
