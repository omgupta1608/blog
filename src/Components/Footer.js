import axios from "axios";
import React, { useState } from "react";
import toast, { toastConfig } from "react-simple-toasts";
toastConfig({
  theme: "frosted-glass",
});

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function updateInput(e) {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
  }

  async function subscribe() {
    try {
      const resp = await axios.post(
        "https://d1ecg5oq6sy2u0.cloudfront.net/api/blog/subscribe",
        {
          name,
          email,
        }
      );
      // console.log(resp.data);
      if (!resp.data.success) {
        if (resp.data.message) {
          toast(resp.data.message);
          return;
        }
        toast("Something went wrong. Please try again later.");
        return;
      } else {
        toast("Subscribed!");
        return;
      }
    } catch (err) {
      // console.log(err);
      if (err.response) {
        if (err.response.data)
          if (err.response.data.message) {
            toast(err.response.data.message);
            return;
          }
      }
      toast("Something went wrong. Please try again later.");
      return;
    }
  }

  return (
    <footer>
      <div className="footer">
        <div id="subscribe" className="subscribe-form">
          <div style={{ padding: "10px" }}>
            {/* <label><strong>Name</strong></label> */}
            <input
              style={{ padding: "10px", width: '100%' }}
              onChange={(e) => updateInput(e)}
              placeholder="Enter your name"
              name="name"
            ></input>
          </div>

          <div style={{ padding: "10px" }}>
            {/* <label><strong>Email</strong></label> */}
            <input
              style={{ padding: "10px", width: '100%' }}
              placeholder="Enter your email"
              name="email"
              onChange={(e) => updateInput(e)}
            ></input>
          </div>

          <div style={{ padding: "10px" }}>
            <button onClick={subscribe} className="subscribe-btn btn-16">
              Subscribe!
            </button>
          </div>
        </div>

        <ul>
          <li>
            Made with 🧡 By{" "}
            <a
              href="https://omgupta1608.github.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              Om Gupta
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
