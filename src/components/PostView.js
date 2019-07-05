import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Form, Input } from 'reactstrap';

import { Header, BoxPost, Author } from './../styles';

import * as api from '../utils/api';
import { postUpdate, postEdit } from '../actions/posts';

import PostContentPanel from './PostContentPanel';
import CommentList from './CommentList';
import WrongRoute from './WrongRoute';
import Loading from './Loading';

class PostView extends Component {
  state = {
    editing: false,
    fetchError: false,
    title: '',
    author: ''
  }

  componentDidMount() {
    const edit = this.props.location.state && this.props.location.state.edit
      ? true
      : false;

    api.postGet(this.props.match.params.postId).then(data => {
      this.props.postUpdate(data);
      this.setState({ editing: edit });
    }).catch(() => this.setState({ fetchError: true }));

    this.setState({ title: this.props.title, body: this.props.body });
  }

  componentWillReceiveProps(nextProps) {
    const thisPostId = this.props.match.params.postId;
    const nextPostId = nextProps.match.params.postId;
    if (thisPostId !== nextPostId)
      api.postGet(nextPostId).then(data => this.props.postUpdate(data)).catch(() => this.setState({ fetchError: true }));

    this.setState({ title: nextProps.title, body: nextProps.body });
  }

  render() {
    if (!('id' in this.props)) {
      if (this.state.fetchError)
        return (<WrongRoute />);
      else
        return (<Loading />);
    }

    var header = null;
    var body = null;

    if (this.state.editing) {
      header = (<div>Edit Post</div>);

      body = (<Form>
        <Input type="text" name="title" id="Title" onChange={(event) => {
          this.setState({ title: event.target.value });
        }} value={this.state.title} />
        <Input type="textarea" name="body" id="body" style={{
          height: 200
        }} onChange={(event) => this.setState({ body: event.target.value })} value={this.state.body} />
        <Button disabled={this.state.body && this.state.title
          ? false
          : true} onClick={() => {
            const title = this.state.title;
            const body = this.state.body;
            const id = this.props.id;
            api.postEdit(id, title, body).then(() => {
              this.props.postEdit(id, title, body);
              this.setState({ editing: false });
            });
          }}>
          Save
        </Button>
      </Form>);
    } else {
      const category = this.props.match.params.category;
      header = (
        <Header>
          <h2>{this.props.title} <Author> - by {this.props.author}</Author></h2>
          <PostContentPanel postId={this.props.id} onEdit={() => this.setState({ editing: true })} afterDelete={() => this.props.history.push(`/${category}`)} />
        </Header>);
      body = this.props.body;
    }

    return (<BoxPost>
      {header}
      {body}
      <CommentList postId={this.props.id} />
    </BoxPost>);
  }
}

// Redux
function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.postId;
  if (postId in state.posts)
    return {
      ...state.posts[postId]
    };
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    postUpdate: (data) => dispatch(postUpdate(data)),
    postEdit: (id, title, body) => dispatch(postEdit(id, title, body))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
