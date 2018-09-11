import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      todoList: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.addList = this.addList.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  addList() {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, {
        value: this.state.value,
        doneFlag: false,
      }]
    }));
    this.setState({ value: "" });
  }
  doneTodo(number) {
    const newTodoList = this.state.todoList.map((todo, index) => {
      if(index === number){
        todo.doneFlag = true;
      }
      return todo;
    })
    this.setState({ todoList: newTodoList })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.addList}>add</button>
        <div>
          {this.state.todoList.map((todo, index) =>
            <div onClick={()=>{this.doneTodo(index)}}>
              {todo.doneFlag ? <del>{todo.value}</del> : todo.value}
            </div>)
          }
        </div>
      </div>
    );
  }
}

export default App;
