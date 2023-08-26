// import React from 'react';
import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import data from "../data";

import Posts from "./Posts";

export default ({ posts }) => {
  const [blog_id, setBlogId] = React.useState("");
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    data.reverse()
    const s = new URLSearchParams(window.location.search);
    const blog_id = s.get("id");
    setBlogId(blog_id);
    const post = data.filter((post) => post.id === blog_id)[0];

    setPost(post);
  });
  return (
    <div>
      {blog_id ? (
        <div>
          {/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
            blog_id
          ) && post ? (
            <div className="single-post">
              <h1 className="header">{post.title}</h1>

              {renderHTML(post.body)}
              <ul className="post-foot"></ul>
            </div>
          ) : (
            <div>
              <h3>Invalid ID in URL</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="content-area">
          <div className="all-posts">
            <Posts posts={posts} />
            {/* <h1>WORK IN PROGRESS</h1> */}
          </div>
        </div>
      )}
    </div>
  );
};
