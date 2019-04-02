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
import RegisterStudentAndParent from './components/Users/Register/RegisterStudentAndParent';
import SchoolGradeOptions from './components/SchoolGrades/SchoolGradeOptions';
import SchoolYears from './components/SchoolYear/SchoolYears';
import SchoolClasses from './components/SchoolGrades/SchoolClasses';

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

              <Route exact path='/users/teachers' component={TeachersInfoAndSettings}></Route>
              <Route path='/users/teachers/update/:id' component={TeacherUpdate}></Route>
              <Route path='/users/teachers/:id' component={TeacherDetails}></Route>

              <Route exact path='/users/students' component={StudentsInfoAndSettings}></Route>
              <Route path='/users/students/register' component={RegisterStudentAndParent}></Route>
              <Route path='/users/students/update/:id' component={StudentUpdate}></Route>
              <Route path='/users/students/:id' component={StudentDetails}></Route>

              <Route exact path='/users/parents' component={ParentsInfoAndSettings}></Route>
              <Route path='/users/parents/update/:id' component={ParentUpdate}></Route>
              <Route path='/users/parents/:id' component={ParentDetails}></Route>

              <Route exact path='/admin/schoolgrades' component={SchoolGradeOptions}></Route>
              <Route path='/schoolyears' component={SchoolYears}></Route>
              <Route path='/schoolclasses' component={SchoolClasses}></Route>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
