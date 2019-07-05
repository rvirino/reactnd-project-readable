import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import ReadableNav from './ReadableNav';
import WrongRoute from './WrongRoute';
import PostList from './PostList';
import PostView from './PostView';
import PostAdd from './PostAdd';

class ReadableApp extends Component {
  render() {
    return (<div>
      <ReadableNav />
      <Container>
        <Switch>
          <Route exact path='/' component={PostList} />
          <Route exact path='/add-post' component={PostAdd} />
          <Route path='/:category/:postId' component={PostView} />
          <Route path='/:category' component={PostList} />
          <Route component={WrongRoute} />
        </Switch>
      </Container>
    </div>);
  }
}

export default ReadableApp;
