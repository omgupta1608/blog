import React from "react";
import { Link } from "react-router-dom";

import logo from "../logo.svg";

export default ({ match: { url } }) => {
  return (
    <header className="navbar">
      <div>
        <ul>
          {/* <li><a href='https://omgupta1608.github.io' className='btn btn-new'>Back to main website</a></li>  */}
          <li>
            <Link to={"/"} className="btn btn-new">
              Home
            </Link>
          </li>
          <li>
            <a href="https://om-gupta.me" className="btn btn-new">
              Back to main website
            </a>
          </li>

          {/* <li><a  className='btn btn-new' href='#subscribe'>Subscribe</a></li> */}
          {/* <li>{ url === "/" ? <Link to={"/til"} className='btn btn-new'>TIL (Things I Learn)</Link>: <Link to={"/"} className='btn btn-new'>Home</Link>}</li> */}
          <li className="navbar-spacer-item"></li>
        </ul>
      </div>
    </header>
  );
};
