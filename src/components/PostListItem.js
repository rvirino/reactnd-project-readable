import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Post, TitlePost, Author, CommentCounter } from './../styles';

import PostContentPanel from './PostContentPanel';

class PostListItem extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  render() {
    const post = this.props;
    return (
      <Post>
        <TitlePost>
          <Link to={`${post.category}/${post.id}`}>
            {post.title}
          </Link>
        </TitlePost>
        <Author> by {post.author}</Author>
        <CommentCounter> ({post.commentCount} comments)</CommentCounter>
        <PostContentPanel
          postId={post.id}
          editHref={{
            pathname: `${post.category}/${post.id}`,
            state: { edit: true }
          }}
        />
      </Post>
    );
  }
}

// Redux
function mapStateToProps(state, ownProps) {
  return {
    ...state.posts[ownProps.postId]
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);
