import React, { Component } from 'react';
import Select from 'react-select'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { categorySetList } from '../actions/categories';
import { categoryGetList } from '../utils/api';

class ReadableNav extends Component {

  state = {
    selectedOption: null,
  };

  componentDidMount() {
    categoryGetList().then((categories) => {
      this.props.categorySetList(categories);
    });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    window.location.href = '/' + selectedOption.value;
  };

  render() {
    const { selectedOption } = this.state;

    let options = this.props.categories.map(({ name, path }) => ({ value: path, label: name }));
    options = [{ value: '', label: 'All categories' }, ...options];

    return (
      <div className="main-bar">
        <div className="title">
          <Link to="/">
            Readable
          </Link>
        </div>
        <Link to="/add-post">
          Add Post
        </Link>

        <Select
          defaultValue={options[0]}
          onChange={this.handleChange}
          value={selectedOption}
          options={options}
        />
      </div>
    );
  }
}

// Redux
function mapStateToProps(state) {
  return { categories: state.categories };
}

function mapDispatchToProps(dispatch) {
  return {
    categorySetList: (data) => dispatch(categorySetList(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableNav));
