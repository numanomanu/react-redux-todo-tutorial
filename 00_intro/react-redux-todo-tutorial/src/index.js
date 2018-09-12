import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import TodoContainer from './container/TodoContainer';
import configureStore from './store/configureStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <TodoContainer />
  </Provider>
, document.getElementById('root'));
