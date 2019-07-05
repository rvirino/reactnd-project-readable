import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, CommentPanel, CommentAuthor } from './../styles';

import * as api from '../utils/api';
import {
  commentEdit, commentUpVote, commentDownVote, commentDelete
} from '../actions/comments';

import ContentPanel from './ContentPanel';

class CommentListItem extends Component {

  state = {
    editing: false,
    body: ''
  };


  static propTypes = {
    commentId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.setState({
      body: this.props.body
    });
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      body: nextProps.body
    });
  }


  render() {
    if (!this.state.editing) {
      return (
        <CommentPanel>
          <div>
            {this.props.body} - <CommentAuthor>by {this.props.author}</CommentAuthor>
          </div>
          <ContentPanel
            itemId={this.props.id}
            score={this.props.voteScore}
            onUpVote={() => {
              api.commentVote(this.props.id, true)
                .then(() => this.props.commentUpVote(this.props.id));
            }}
            onDownVote={() => {
              api.commentVote(this.props.id, false)
                .then(() => this.props.commentDownVote(this.props.id));
            }}
            onDelete={() => {
              api.commentDelete(this.props.id)
                .then(() => this.props.commentDelete(this.props.id));
            }}
            onEdit={() => this.setState({ editing: true })}
          />
        </CommentPanel>
      );
    }

    else {
      return (
        <Form className="inline-flex">
          <textarea value={this.state.body} cols="20" rows="2" onChange={(event) => this.setState({ body: event.target.value })} />
          <Button className="positive"
            disabled={this.state.body ? false : true}
            onClick={() => {
              const now = Date.now();
              const body = this.state.body;
              api.commentEdit(this.props.id, now, body)
                .then(() => {
                  this.setState({ editing: false });
                  this.props.commentEdit(this.props.id, now, body);
                });
            }}>
            Save
          </Button>
        </Form>
      );
    }
  }
}

// Redux
function mapStateToProps(state, ownProps) {
  return {
    ...state.comments[ownProps.commentId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentEdit: (id, timestamp, body) => {
      dispatch(commentEdit(id, timestamp, body));
    },
    commentUpVote: (id) => dispatch(commentUpVote(id)),
    commentDownVote: (id) => dispatch(commentDownVote(id)),
    commentDelete: (id) => dispatch(commentDelete(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
