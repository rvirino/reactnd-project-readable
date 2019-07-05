export const POST_SET_LIST = 'POST_SET_LIST';
export const POST_UP_VOTE = 'POST_UP_VOTE';
export const POST_DOWN_VOTE = 'POST_DOWN_VOTE';
export const POST_DELETE = 'POST_DELETE';
export const POST_UPDATE = 'POST_UPDATE';
export const POST_EDIT = 'POST_EDIT';

export function postSetList(postList) {
  return {
    type: POST_SET_LIST,
    postList
  };
}

export function postUpVote(id) {
  return {
    type: POST_UP_VOTE,
    id
  };
}

export function postDownVote(id) {
  return {
    type: POST_DOWN_VOTE,
    id
  };
}

export function postDelete(id) {
  return {
    type: POST_DELETE,
    id
  };
}

export function postUpdate(post) {
  return {
    type: POST_UPDATE,
    post
  };
}

export function postEdit(id, title, body) {
  return {
    type: POST_EDIT,
    id,
    title,
    body
  };
}
