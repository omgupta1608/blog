import React from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import { leveningStr } from '../helper';

export default ({post}) => {
  const { id, title, body } = post;
  return (
    <div className="post">
      <h3><Link to={`/post/${id}`}>{title}</Link></h3>
      <p>{renderHTML(leveningStr(body, 250))}</p>
      <ul>
        <li><Link to={`/post/${id}`} className="btn btn-more">Read More</Link></li>
      </ul>
    </div>
  )
}
