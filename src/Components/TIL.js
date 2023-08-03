import React from 'react';

import Posts from './Posts';

export default ({tils}) => {
  return (
    <div className="content-area">
      <div className="all-posts">
        <Posts posts={tils} />
        {/* <h1>WORK IN PROGRESS</h1> */}
      </div>
    </div>
  )
}
