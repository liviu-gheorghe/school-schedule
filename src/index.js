import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SchedulePage from './schedule_page/SchedulePage';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import HomePage from './home_page/HomePage';
import { 
  faCheckSquare,
  faCoffee,
  faCommentDots,
  faEllipsisH,
  faEllipsisV,
  faClock,
  faVideo
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faCommentDots,
  faEllipsisH,
  faEllipsisV,
  faClock,
  faVideo
  );

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path = "/schedule">
        <SchedulePage />
      </Route>
      <Route><p>Not found</p></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
