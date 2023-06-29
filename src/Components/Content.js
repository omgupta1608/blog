import React from 'react';

import Posts from './Posts';

export default ({posts}) => {
  return (
    <div className="content-area">
      <div className="all-posts">
        <Posts posts={posts} />
      </div>
    </div>
  )
}
