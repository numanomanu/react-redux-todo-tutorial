import * as ActionTypes from './actionTypes';

export function addTodo(todo) {
  return {
    type: ActionTypes.ADD_TODO,
    todo,
  }
}
