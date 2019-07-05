export const SET_SORT_KEY = 'SET_SORT_KEY';

export function setSortKey(key, objectType) {
  return {
    type: SET_SORT_KEY,
    key,
    objectType
  };
}
