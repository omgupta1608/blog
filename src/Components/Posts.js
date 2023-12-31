import React from "react";

import Post from "./Post";

const items = [
  { id: 1, name: "Tech/CS", category: "Tech/CS" },
  { id: 2, name: "Travel", category: "Travel" },
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
    console.log("inside use effect: ", tagFilter)
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
              onChange={() => setTagFilter('All')}
              defaultChecked
            /> <span className="filter-chip">All</span>
          </label>
          {items.map((category) => (
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
          ))}
        </div>
      </div>
      <div>{showPost}</div>
    </React.Fragment>
  );
};
