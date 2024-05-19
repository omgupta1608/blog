// import React from 'react';
import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import data from "../data";
import { ReactCusdis } from "react-cusdis";
import Posts from "./Posts";

export default () => {
  const [blog_id, setBlogId] = React.useState("");
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [p] = useState(data.slice().reverse());

  useEffect(() => {
    // data.reverse()
    const s = new URLSearchParams(window.location.search);
    const blog_id = s.get("id");
    setBlogId(blog_id);
    const post = p.filter((post) => post.id === blog_id)[0];

    setPost(post);
    var title = "Om's Blog";
    if (post) title = post["title"] + " | " + title;

    document.title = title;
  });
  return (
    <React.Fragment>
      {blog_id ? (
        <main>
          {/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
            blog_id
          ) && post ? (
            <div className="single-post">
              <h1 className="header">{post.title}</h1>

              {renderHTML(post.body)}
              <ul className="post-foot"></ul>
              <div>
                <h4 style={{margin: "30px 0;"}}>Feel free to add a comment (subject to approval)</h4>
                <ReactCusdis
                  attrs={{
                    host: "https://cusdis.com",
                    appId: "963b5312-5446-43db-8b16-1793ce93b98d",
                    pageId: blog_id,
                    pageTitle: post.title,
                    pageUrl: window.location.href,
                    theme: "light"
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              <h3>Invalid ID in URL</h3>
            </div>
          )}
        </main>
      ) : (
        <main className="content-area">
          <div className="all-posts">
            <Posts posts={p} />
            {/* <h1>WORK IN PROGRESS</h1> */}
          </div>
        </main>
      )}
    </React.Fragment>
  );
};
