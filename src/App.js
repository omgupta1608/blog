import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';

import './App.css';
// import data from './data';
// import tils from './tils';

export default class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   posts: data,
    //   tils: tils
    // }
    // localStorage.setItem("posts", this.state.posts);
  }

  handleWindow() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router basename="/blog">
        <div className="App">
          <Route path="*" render={(props) => <Header {...props} />} />
          <Route exact path="/" render={() => <Content />} />
          {/* <Route exact path="/til" render={() => <TIL tils={this.state.tils} />} /> */}
          {/* <Route exact path="/post" render={(props) => <SinglePost {...props} posts={this.state.posts} handleWindow={this.handleWindow()} />} /> */}
          <Footer/>
        </div>
      </Router>
    );
  }
}
