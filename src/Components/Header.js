import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

export default ({match: {url}}) => {
  return (
    <header>
      <div className="navbar">
        <ul>
          <li><a href='https://omgupta1608.github.io' className='btn btn-new'>Back to main website</a></li> 
          {/* <li>{ url === "/" ? <Link to={"/til"} className='btn btn-new'>TIL (Things I Learn)</Link>: <Link to={"/"} className='btn btn-new'>Home</Link>}</li> */}
          <li></li>
        </ul>
      </div>
    </header>
  )
}
