import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { ActionButtons, Button, VoteButtons, GroupButtons } from './../styles';
import ThumbsUp from 'react-icons/lib/ti/thumbs-up';
import ThumbsDown from 'react-icons/lib/ti/thumbs-down';
import Edit from 'react-icons/lib/ti/edit';
import Delete from 'react-icons/lib/ti/delete';

function RoutedButton(props) {
  const button = (<Button onClick={() => {
    if (props.onClick)
      props.onClick();
  }}>
    <Edit size={30} />
  </Button>);
  if (!props.href)
    return button;

  return (<LinkContainer to={props.href}>
    {button}
  </LinkContainer>);
}

class ContentPanel extends Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onUpVote: PropTypes.func.isRequired,
    onDownVote: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    editHref: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }

  render() {
    const { score } = this.props;

    return (<div>
      <GroupButtons>
        <VoteButtons>
          <Button positive onClick={() => {
            this.props.onUpVote();
          }}>
            <ThumbsUp size={30} />
          </Button>

          <Button disabled>
            {score}
          </Button>

          <Button negative onClick={() => {
            this.props.onDownVote();
          }}>
            <ThumbsDown size={30} />
          </Button>
        </VoteButtons>
        <ActionButtons>
          <RoutedButton
            itemId={this.props.itemId}
            name='edit'
            href={this.props.editHref}
            onClick={this.props.onEdit} />

          <Button delete onClick={() => {
            this.props.onDelete();
          }}>
            <Delete size={30} />
          </Button>

        </ActionButtons>
      </GroupButtons>
    </div>);
  }
}

export default ContentPanel;
