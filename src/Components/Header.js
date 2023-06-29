import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

export default ({match: {url}}) => {
  return (
    <header>
      <div className="navbar">
        <ul>
          <li>{url === '/' ? <a href='https://omgupta1608.github.io' className='btn btn-new'>Back to main website</a> : <p></p>}</li>
        </ul>
      </div>
    </header>
  )
}
