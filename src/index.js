import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { 
  faCheckSquare,
  faCoffee,
  faCommentDots,
  faEllipsisH,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons'

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faCommentDots,
  faEllipsisH,
  faEllipsisV
  );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
