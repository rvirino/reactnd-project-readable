import { SET_SORT_KEY } from '../actions/settings';

const defaultSettings = {
  sortKey: {
    posts: 'timestamp',
    comments: 'timestamp'
  }
};

export function settingReducer(state = defaultSettings, action) {
  switch (action.type) {

    case SET_SORT_KEY:
      return {
        ...state,
        sortKey: {
          ...state.sortKey,
          [action.objectType]: action.key
        }
      };

    default:
      return state;
  }
}
