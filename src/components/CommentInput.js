import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import * as api from '../utils/api';
import { commentAdd } from '../actions/comments';

import { makeId } from '../utils/helpers';

class CommentInput extends Component {

  state = {
    body: '',
    author: ''
  };

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Input value={this.state.author} type='text' placeholder="Your name" onChange={(event) => this.setState({ author: event.target.value })} />
        </FormGroup>
        <FormGroup>
          <Input value={this.state.body} type="textarea" placeholder="Your comment" onChange={(event) => this.setState({ body: event.target.value })} />
        </FormGroup>
        <Button
          disabled={this.state.author && this.state.body ? false : true}
          onClick={() => {
            const comment = {
              id: makeId(24),
              timestamp: Date.now(),
              body: this.state.body,
              author: this.state.author,
              parentId: this.props.postId
            };
            api.commentAdd(comment)
              .then(() => {
                this.props.commentAdd({ ...comment, voteScore: 1 });
              });
            this.setState({ body: '', author: '' });
          }}
        >
          Add Comment
        </Button>
      </Form>
    );
  }
}

// Redux
function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    commentAdd: (comment) => dispatch(commentAdd(comment))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
