import { CATEGORY_ADD, CATEGORY_SET_LIST } from '../actions/categories';

export function categoryReducer(state = [], action) {

  switch (action.type) {

    case CATEGORY_ADD:
      const { name, path } = action;
      return state.concat([{ name, path }]);

    case CATEGORY_SET_LIST:
      return action.categoryList;

    default:
      return state;
  }
}
