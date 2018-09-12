import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        todo: state.todo,
    };
}

class TodoContainer extends Component {
  render() {
    const { data } = this.props.todo;
    return (
      <div>
        {data.map((todo, index) =>
          <div>
            {todo.doneFlag ? <del>{todo.value}</del> : todo.value}
          </div>)
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(TodoContainer);
