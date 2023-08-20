import React, { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import data from '../data';

export default ({match: {params: {id}}, history, posts}) => {
  const [post, setPost] = useState({
    title: "",
    body: ""
  });
  useEffect(() => {
    setPost(data.reverse().filter(post => post.id === id)[0])
  });
  
  return (
    <div className="single-post">
      <h1 className="header">{post.title}</h1>
      
      {renderHTML(post.body)}
      <ul className="post-foot">
      </ul>
    </div>
  )
}
