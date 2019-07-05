import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';
import { setSortKey } from '../actions/settings';

class SortSettings extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired
  }

  render() {
    const { sortKey, type } = this.props;

    return (<div className='list-sort'>
      <ButtonGroup>
        <Button outline color="secondary" active={sortKey === 'timestamp'
          ? true
          : false} onClick={() => {
            this.props.setSortKey('timestamp', type);
          }}>
          Sort by date
          </Button>
        <Button outline color="secondary" active={sortKey === 'voteScore'
          ? true
          : false} onClick={() => {
            this.props.setSortKey('voteScore', type);
          }}>
          Sort by score
          </Button>
      </ButtonGroup>
    </div>);
  }
}

// Redux
function mapStateToProps(state, ownProps) {
  return {
    sortKey: state.settings.sortKey[ownProps.type]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSortKey: (key, objectType) => dispatch(setSortKey(key, objectType))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSettings);
