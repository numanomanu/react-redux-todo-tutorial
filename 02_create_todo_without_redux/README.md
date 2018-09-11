### Todo List を Redux なしで作ってみよう

先ほどの `App.js` のファイルを改良します。

```js
import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      doneFlag: false
    }
  }
  done = () => {
    this.setState({ doneFlag: true })
  }
  render() {
    return (
      <div>
        {this.state.doneFlag ? <del>any todo</del> : <span>any todo</span>}
        <button onClick={()=>{ this.done() }}>Done</button>
      </div>
    );
  }
}

export default App;

```

まずは入力フォームを作って、todo を動的に追加できるようにします。

```js
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
```


![start4](https://user-images.githubusercontent.com/11643610/45370221-bc5aa300-b622-11e8-95a1-781e63b1ca42.gif)
