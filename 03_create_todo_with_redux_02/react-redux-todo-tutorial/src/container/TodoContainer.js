import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddTodo from '../components/AddTodo';

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

  addTodo = (data) => {
    const inputData = {
      value: data,
      doneFlag: false,
    }
    this.props.toDoActions.addTodo(inputData);
  }

  doneTodo = (number) => {
    this.props.toDoActions.doneTodo(number);
  }

  render() {
    const { data } = this.props.todo;
    return (
      <div>
        <AddTodo clickCallback={this.addTodo} />
        <div>
          {data.map((todo, index) =>
            <div>
              {todo.doneFlag ? <del>{todo.value}</del> : <span onClick={()=>{this.doneTodo(index)}}>{todo.value}</span>}
            </div>)
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
