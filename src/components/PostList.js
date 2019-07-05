import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Cards, Card, TitleCategory } from './../styles';
import sortBy from 'sort-by';

import { categoryExists } from '../utils/helpers';
import { postGetList } from '../utils/api';
import { postSetList } from '../actions/posts';

import PostListItem from './PostListItem';
import SortSettings from './SortSettings';
import WrongRoute from './WrongRoute';

class PostList extends Component {

  componentDidMount() {
    postGetList(this.props.match.params.category).then(data => this.props.postSetList(data));
  }

  componentWillReceiveProps(nextProps) {
    const thisCategory = this.props.match.params.category;
    const nextCategory = nextProps.match.params.category;
    if (thisCategory !== nextCategory)
      postGetList(nextCategory).then(data => this.props.postSetList(data));
  }

  render() {

    const { params } = this.props.match;
    var ok = true;

    if (params.category && this.props.categories.length && categoryExists(params.category, this.props.categories) === false)
      ok = false;

    if (!ok)
      return (<WrongRoute />);

    const title = params.hasOwnProperty('category')
      ? params.category
      : 'All Posts:';

    var list = (this.props.posts.length) ?
      (<Cards>
        {this.props.posts.map(post => (<PostListItem key={post.id} postId={post.id} />))}
      </Cards>) :
      (<Card className='list-no-posts'>No posts in this category.</Card>)

    return (
      <Col>
        <TitleCategory>{title}</TitleCategory>
        <SortSettings type='posts' />
        {list}
      </Col>
    );
  }
}

// Redux
function mapStateToProps(state) {
  return {
    ...state,
    posts: Object.keys(state.posts).map((key) => {
      return state.posts[key];
    }).sort(sortBy(`-${state.settings.sortKey.posts}`))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postSetList: (data) => dispatch(postSetList(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
