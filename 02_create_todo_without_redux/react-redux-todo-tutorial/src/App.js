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
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  addList() {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, this.state.value]
    }));
    this.setState({ value: "" });
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
          {this.state.todoList.map(todo => <div>{todo}</div>)}
        </div>
      </div>
    );
  }
}

export default App;
