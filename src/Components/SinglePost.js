import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import data from "../data";

export default ({
  match: {
    params: { id },
  },
}) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const [blog_id, setBlogId] = React.useState("");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search);
    const blog_id = s.get("id");
    setBlogId(blog_id);
    const post = data.reverse().filter((post) => post.id === blog_id)[0];

    setPost(post);
  });

  return (
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
  );
};
