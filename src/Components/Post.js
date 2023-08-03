import React from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import { leveningStr } from '../helper';

export default ({post}) => {
  const { id, title, body, date } = post;
  return (
    <div className="post">
      <h3><Link to={`/post/${id}`}>{title}</Link></h3>
      <h5 style={{margin: 0, fontWeight: "lighter", color: "#575757"}}>{date}</h5>
      <p>{renderHTML(leveningStr(body, 250))}...</p>
      <ul>
        <li><Link to={`/post/${id}`} className="btn btn-more">Read More</Link></li>
      </ul>
      <br></br>
      <div style={{height: "0.25px", backgroundColor: "#575757", width: "100%"}}></div>
    </div>
  )
}
