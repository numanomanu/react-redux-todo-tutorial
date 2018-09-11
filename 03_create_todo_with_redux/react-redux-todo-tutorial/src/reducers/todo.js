import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  data: [{
    value: 'todo list',
    doneFlag: false
  }]
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        data: [
          ...state.data,
          action.todo
        ]
      }
    default:
      return state
  }
}
