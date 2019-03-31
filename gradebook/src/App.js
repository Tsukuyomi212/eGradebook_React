import React, { Component, Fragment } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../src/components/MainPage/Main';
import AdminHome from './components/Admin/AdminHome';

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Main}></Route>
              <Route exact path='/admin/home' component={AdminHome}></Route>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
