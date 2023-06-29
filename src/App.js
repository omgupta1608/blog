import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/Header';
import Content from './Components/Content';
import SinglePost from './Components/SinglePost';
import Footer from './Components/Footer';

import './App.css';
import data from './data';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: data
    }
  }

  handleWindow() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router basename="/">
        <div className="App">
          <Route path="*" render={(props) => <Header {...props} />} />
          <Route exact path="/" render={() => <Content posts={this.state.posts} />} />
          <Route exact path="/post/:id" render={(props) => <SinglePost {...props} posts={this.state.posts} handleWindow={this.handleWindow()} />} />
          <Footer/>
        </div>
      </Router>
    );
  }
}
