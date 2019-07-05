import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import ReadableApp from './components/ReadableApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { categoryReducer } from './reducers/categories';
import { postReducer } from './reducers/posts';
import { settingReducer } from './reducers/settings';
import { commentReducer } from './reducers/comments';

const store = createStore(
  combineReducers({
    categories: categoryReducer,
    posts: postReducer,
    settings: settingReducer,
    comments: commentReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReadableApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
