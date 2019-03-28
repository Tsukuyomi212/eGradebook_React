import React, { Component, Fragment } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../src/components/MainPage/Main';

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Main}></Route>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
