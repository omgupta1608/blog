import React from "react";

import Post from "./Post";

const items = [
  { id: 3, name: "ML Series", category: "ML Series" },
  { id: 1, name: "Tech/CS", category: "Tech/CS" },
  { id: 2, name: "Travel", category: "Travel" },
  { id: 4, name: "Physics", category: "Physics" },
];

export default ({ posts }) => {
  const [tagFilter, setTagFilter] = React.useState("All");
  const [showPost, setShowPost] = React.useState(
    posts.map((post) => {
      if (tagFilter == "All") {
        return <Post key={post.id} post={post} />;
      } else if (post["topic"] == tagFilter)
        return <Post key={post.id} post={post} />;
    })
  );

  React.useEffect(() => {
    const newShowPost = posts.map((post) => {
      if (tagFilter == "All") {
        return <Post key={post.id} post={post} />;
      } else if (post["topic"] == tagFilter)
        return <Post key={post.id} post={post} />;
    });
    setShowPost(newShowPost);
  }, [tagFilter]);

  return (
    <React.Fragment>
      <div id="filter-bar">
        <div className="filter-chips-wrapper">
          <label>
            <input
              className="filter-radio-btn"
              type="radio"
              name="filter"
              value="all"
              onChange={() => setTagFilter("All")}
              defaultChecked
            />{" "}
            <span className="filter-chip">All</span>
          </label>
          {items.map((category) => {
            if (category["category"] === "ML Series") {
              return (
                <label key={category.id}>
                  <input
                    className="filter-radio-btn ml"
                    type="radio"
                    name="filter"
                    value={category.category}
                    onChange={() => setTagFilter(category.category)}
                  />{" "}
                  <span className="filter-chip ml">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 64 64"
                      fill="none"
                      role="presentation"
                      aria-hidden="true"
                      focusable="false"
                      class="hk fc"
                    >
                      <path
                        d="M39.64 40.83L33.87 56.7a1.99 1.99 0 0 1-3.74 0l-5.77-15.87a2.02 2.02 0 0 0-1.2-1.2L7.3 33.88a1.99 1.99 0 0 1 0-3.74l15.87-5.77a2.02 2.02 0 0 0 1.2-1.2L30.12 7.3a1.99 1.99 0 0 1 3.74 0l5.77 15.87a2.02 2.02 0 0 0 1.2 1.2l15.86 5.76a1.99 1.99 0 0 1 0 3.74l-15.87 5.77a2.02 2.02 0 0 0-1.2 1.2z"
                        fill="#FFC017"
                      ></path>
                    </svg>
                    {category.name}
                  </span>
                </label>
              );
            }
            return (
              <label key={category.id}>
                <input
                  className="filter-radio-btn"
                  type="radio"
                  name="filter"
                  value={category.category}
                  onChange={() => setTagFilter(category.category)}
                />{" "}
                <span className="filter-chip">{category.name}</span>
              </label>
            );
          })}
        </div>
      </div>
      <div>{showPost}</div>
    </React.Fragment>
  );
};
