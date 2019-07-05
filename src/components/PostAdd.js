import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import { postAdd } from '../utils/api';
import { makeId } from '../utils/helpers';

class PostAdd extends Component {

  state = {
    author: '',
    title: '',
    category: 'none',
    body: ''
  };

  render() {
    const author = (
      <FormGroup>
        <Label for="author">Author</Label>
        <Input type="text" name="author" placeholder="Author" value={this.state.author} onChange={(e) => this.setState({ author: e.target.value })} />
      </FormGroup>
    );

    const title = (
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" placeholder="Title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
      </FormGroup>
    );

    const category = (
      <FormGroup>
        <Label for="category">Category</Label>
        <Input type="select" name="category" id="category" value={this.state.category} onChange={(e) => this.setState({ category: e.target.value })}>
          <option value='none' disabled="disabled">Category</option>
          {
            this.props.categories.map(category => (<option key={category.path} value={category.path}>
              {category.name}
            </option>))
          }
        </Input>
      </FormGroup>
    );

    const body = (
      <FormGroup>
        <Label for="body">Post Text</Label>
        <Input type="textarea" name="body" id="body" style={{ height: 200 }} value={this.state.body} onChange={(e) => this.setState({ body: e.target.value })} />
      </FormGroup>
    );

    const submitButton = (
      <Button disabled={this.state.author && this.state.title && this.state.body && this.state.category !== 'none'
        ? false
        : true
      } onClick={() => {
        const post = {
          id: makeId(24),
          timestamp: Date.now(),
          title: this.state.title,
          body: this.state.body,
          author: this.state.author,
          category: this.state.category
        };
        postAdd(post).then(() => this.props.history.push(`/${this.state.category}`));
      }}> Post </Button>);

    return (
      <Col>
        <Card>
          <CardBody>
            <CardTitle>Create a new post</CardTitle>
            <Form>
              {author}
              {title}
              {category}
              {body}
              {submitButton}
            </Form>
          </CardBody>
        </Card>
      </Col>);
  }
}

// Redux
function mapStateToProps(state, ownProps) {
  return { categories: state.categories };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostAdd));
