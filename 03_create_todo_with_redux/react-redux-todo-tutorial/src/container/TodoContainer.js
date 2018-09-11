import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as toDoActions from '../actions/todo';

function mapStateToProps(state) {
  return {
    todo: state.todo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toDoActions: bindActionCreators(toDoActions, dispatch),
  };
}

class TodoContainer extends Component {

  addTodo = () => {
    const dummydata = {
      value: 'new todo' + this.props.todo.data.length,
      doneFlag: false,
    }
    this.props.toDoActions.addTodo(dummydata);
  }
  render() {
    const { data } = this.props.todo;
    return (
      <div>
        <button onClick={this.addTodo}> addTodo </button>
        <div>
          {data.map((todo, index) =>
            <div>
              {todo.doneFlag ? <del>{todo.value}</del> : todo.value}
            </div>)
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
