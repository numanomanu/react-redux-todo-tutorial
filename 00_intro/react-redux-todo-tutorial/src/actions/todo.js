import * as ActionTypes from './actionTypes';

export function addTodo(todo) {
  return {
    type: ActionTypes.ADD_TODO,
    todo,
  }
}

export function doneTodo(number) {
  return {
    type: ActionTypes.DONE_TODO,
    number,
  }
}
