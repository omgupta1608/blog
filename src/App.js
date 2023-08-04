import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/Header';
import Content from './Components/Content';
import SinglePost from './Components/SinglePost';
import Footer from './Components/Footer';
import TIL from './Components/TIL';

import './App.css';
import data from './data';
import tils from './tils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: data,
      tils: tils
    }
  }

  handleWindow() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router basename="/blog">
        <div className="App">
          <Route path="*" render={(props) => <Header {...props} />} />
          <Route exact path="/" render={() => <Content posts={this.state.posts} />} />
          <Route exact path="/til" render={() => <TIL tils={this.state.tils} />} />
          <Route exact path="/post/:id" render={(props) => <SinglePost {...props} posts={this.state.posts} handleWindow={this.handleWindow()} />} />
          <Footer/>
        </div>
      </Router>
    );
  }
}
