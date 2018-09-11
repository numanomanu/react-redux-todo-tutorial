## Todo List を Redux なしで作ってみよう

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

### 入力フォームで動的に TODO を追加
まずは入力フォームを作って、todo を動的に追加できるようにします。
state に input の値を記録するための value と Todo リストを、リストとして保存するための todoList という変数を用意します。

- input の値は `onChange` をトリガーに `handleChange` 関数を呼び出して、入力が発生するたびにデータを更新
- `addList()` 関数の実行タイミングで、 input に入力されているデータを todoList に追加

```diff
constructor(props){
  super(props);
  this.state = {
-      doneFlag: false
+      value: '',
+      todoList: [],
  }
+    this.handleChange = this.handleChange.bind(this);
+    this.addList = this.addList.bind(this);
   }
-  done = () => {
-    this.setState({ doneFlag: true })
+  handleChange(e) {
+    this.setState({ value: e.target.value });
+  }
+  addList() {
+    this.setState(prevState => ({
+      todoList: [...prevState.todoList, this.state.value]
+    }));
+    this.setState({ value: "" });
   }
   render() {
     return (
       <div>
-        {this.state.doneFlag ? <del>any todo</del> : <span>any todo</span>}
-        <button onClick={()=>{ this.done() }}>Done</button>
+        <input
+          type="text"
+          value={this.state.value}
+          onChange={this.handleChange}
+        />
+        <button onClick={this.addList}>add</button>
+        <div>
+          {this.state.todoList.map(todo => <div>{todo}</div>)}
+        </div>
       </div>
     );
   }
```

最終的には、以下のようなコードになります。

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

add ボタンで入力した内容を追加しながら表示することができました。
![start4](https://user-images.githubusercontent.com/11643610/45370221-bc5aa300-b622-11e8-95a1-781e63b1ca42.gif)


### todo 個々に状態を持たせる
todo それぞれに取り消し線を入れれるようにします。そのためには、 todo を object にしてフラグをもたせます。

```js
 todoList: [ { value: '電話をかける', doneFlag: false }, ...]
```

`addList()` 関数の中身で、doneFlag も追加できるようにし、`doneTodo()` 関数で、指定された番号の todoList の doneFlag を `true` にできるようにします。

```diff
addList() {
  this.setState(prevState => ({
-      todoList: [...prevState.todoList, this.state.value]
+      todoList: [...prevState.todoList, {
+        value: this.state.value,
+        doneFlag: false,
+      }]
  }));
  this.setState({ value: "" });
}
+  doneTodo(number) {
+    const newTodoList = this.state.todoList.map((todo, index) => {
+      if(index === number){
+        todo.doneFlag = true;
+      }
+      return todo;
+    })
+    this.setState({ todoList: newTodoList })
+  }
+
```

表示側も、 doneFlag が立っている場合は打ち消し線が入るように変更します。

```diff
}
this.handleChange = this.handleChange.bind(this);
this.addList = this.addList.bind(this);
+    this.doneTodo = this.doneTodo.bind(this);
}


+  {this.state.todoList.map((todo, index) =>
+    <div onClick={()=>{this.doneTodo(index)}}>
+      {todo.doneFlag ? <del>{todo.value}</del> : todo.value}
+    </div>)
+  }
```


最終的にはこんな感じなります

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

```

![start5](https://user-images.githubusercontent.com/11643610/45372975-3aba4380-b629-11e8-8bc0-9d6912edf5dc.gif)
