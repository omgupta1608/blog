import React from 'react';
import renderHTML from 'react-render-html';

export default ({match: {params: {id}}, history, posts}) => {
  let post = posts.filter(post => post.id === id);
  post = post[0];
  
  return (
    <div className="single-post">
      <h1 className="header">{post.title}</h1>
      {renderHTML(post.body)}
      <ul className="post-foot">
      </ul>
    </div>
  )
}
