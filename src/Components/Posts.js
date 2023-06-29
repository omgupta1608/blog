import React from 'react';

import Post from './Post';

export default ({posts}) => {
  const showPost = posts.map(post => <Post key={post.id} post={post} />);

  return <div>{showPost}</div>
}
