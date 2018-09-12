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
    case ActionTypes.DONE_TODO:
      state.data[action.number].doneFlag = true;
      return {
        ...state,
        data: [
          ...state.data
        ]
      }
    default:
      return state
  }
}
