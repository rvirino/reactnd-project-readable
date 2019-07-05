import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comments, BoxPost } from './../styles';
import sortBy from 'sort-by';

import { commentGetList } from '../utils/api';
import { commentSetList } from '../actions/comments';

import SortSettings from './SortSettings';
import CommentListItem from './CommentListItem';
import CommentInput from './CommentInput';

class CommentList extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentDidMount() {
    commentGetList(this.props.postId)
      .then(data => this.props.commentSetList(data));;
  }

  render() {
    return (
      <BoxPost>
        <h2>Comments ({this.props.comments.length}):</h2>
        <Comments>
          <SortSettings type='comments' />
          {this.props.comments.length
            ? this.props.comments.map(comment => (
              <div key={comment.id}>
                <CommentListItem
                  key={comment.id}
                  commentId={comment.id}
                />
              </div>
            ))
            : (
              <div>
                No comments
              </div>
            )
          }
          <CommentInput postId={this.props.postId} />

        </Comments>
      </BoxPost>
    );
  }
}

// Redux
function mapStateToProps(state) {
  return {
    ...state,
    comments: Object.keys(state.comments).map((key) => {
      return state.comments[key];
    }).sort(sortBy(`-${state.settings.sortKey.comments}`))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentSetList: (data) => dispatch(commentSetList(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
