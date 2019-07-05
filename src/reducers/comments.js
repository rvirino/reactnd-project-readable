import {
  COMMENT_SET_LIST, COMMENT_UP_VOTE, COMMENT_DOWN_VOTE, COMMENT_DELETE,
  COMMENT_EDIT, COMMENT_ADD
} from '../actions/comments';

export function commentReducer(state = {}, action) {
  switch (action.type) {

    case COMMENT_SET_LIST:
      return action.commentList.reduce((state, comment) => {
        state[comment.id] = comment;
        return state;
      }, {});

    case COMMENT_UP_VOTE:
      var newStateVUp = { ...state };
      newStateVUp[action.id].voteScore++;
      return newStateVUp;

    case COMMENT_DOWN_VOTE:
      var newStateVDown = { ...state };
      newStateVDown[action.id].voteScore--;
      return newStateVDown;

    case COMMENT_DELETE:
      var newStateDelete = { ...state };
      delete newStateDelete[action.id];
      return newStateDelete;

    case COMMENT_EDIT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          timestamp: action.timestamp,
          body: action.body
        }
      };

    case COMMENT_ADD:
      return {
        ...state,
        [action.comment.id]: action.comment
      };

    default:
      return state;
  }
}
