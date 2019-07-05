const api = "http://localhost:3001";
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

const responseHandler = (response) => {
  if (!response.ok)
    throw Error(response.error);
  return response.json();
};

export const categoryGetList = () =>
  fetch(`${api}/categories`, { headers })
    .then(responseHandler)
    .then(data => data.categories);

export const postGetList = (category) => {
  var url = `${api}/posts`;
  if (category)
    url = `${api}/${category}/posts`;

  return fetch(url, { headers })
    .then(responseHandler);
};

export const postGet = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(responseHandler)
    .then(data => {
      if (Object.keys(data).length === 0)
        throw Error('Got an empty object');
      return data;
    });

export const postEdit = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })
    .then(responseHandler);

export const postVote = (id, up = true) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: up ? 'upVote' : 'downVote' })
  })
    .then(responseHandler);

export const postDelete = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
    .then(responseHandler);

export const commentGetList = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(responseHandler);

export const commentEdit = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  })
    .then(responseHandler);

export const commentVote = (id, up = true) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: up ? 'upVote' : 'downVote' })
  })
    .then(responseHandler);

export const commentDelete = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
    .then(responseHandler);

export const commentAdd = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(responseHandler);

export const postAdd = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(responseHandler);
