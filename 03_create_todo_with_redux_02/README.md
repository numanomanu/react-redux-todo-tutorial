## Todo List に Redux を導入しよう2

### action で todo の state を更新する
redux で state を更新するには、action を発行する必要があります。
todo を追加するための addTodo の action を定義して見ます。

```
└── actions
    ├── actionTypes.js
    └── todo.js
 ```

actionTypes.js の中身

```js
export const ADD_TODO = 'ADD_TODO';
```

todo.js の中身
```js
import * as ActionTypes from './actionTypes';

export function addTodo(todo) {
  return {
    type: ActionTypes.ADD_TODO,
    todo,
  }
}
```

redux のルールでは、 action には `type` と何らかのデータを返す函数で action を定義します。
`type` は reducer 側で state を更新する際の識別子として利用されます。todo という引数は、`{ value: '' doneFlag: false }` などの、todo の中身の情報を持つオブジェクトです。addTodo なので、todo のリストを data の配列に追加することを目的としています。

以下のように、`reducers/todo.js` で ADD_TODO という type のアクションを受け取って、状態に変更を加えています。( data:[{}] に todo の値を追加している)

reducers/todo.js
```diff
export default function reducer(state = initialState, action) {
   switch(action.type) {
+    case ActionTypes.ADD_TODO:
+      return {
+        ...state,
+        data: [
+          ...state.data,
+          action.todo
+        ]
+      }
     default:
       return state
   }
```

### action を発行して todo を追加する

TodoContainer を編集して、todo を追加できるようにします

TodoContainer.js の中身

```diff
import React, { Component } from 'react';
+import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
+import * as toDoActions from '../actions/todo';

+function mapDispatchToProps(dispatch) {
+  return {
+    toDoActions: bindActionCreators(toDoActions, dispatch),
+  };
}

class TodoContainer extends Component {
+
+  addTodo = () => {
+    const dummydata = {
+      value: 'new todo' + this.props.todo.data.length,
+      doneFlag: false,
+    }
+    this.props.toDoActions.addTodo(dummydata);
+  }
   render() {
     const { data } = this.props.todo;
     return (
       <div>
+        <button onClick={this.addTodo}> addTodo </button>
         <div>


-export default connect(mapStateToProps, {})(TodoContainer);
+export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
```

react から redux の action を発行するためには、 mapStateToProps と同じように `mapDispatchToProps` という関数を使って、action を props として受け取って使えるようにします。そのためには redux の `bindActionCreators` を呼び出します。

connect 関数の第二引数に mapDispatchToProps を入れると、props を呼び出せるようになります。

```js
import { bindActionCreators } from 'redux';
import * as toDoActions from '../actions/todo';

function mapDispatchToProps(dispatch) {
  return {
    toDoActions: bindActionCreators(toDoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
```


ボタンをクリックすると、action が発行され、 ADD_TODO の type の reducer が起動して、データが追加されます。

```js
  addTodo = () => {
    const dummydata = {
      value: 'new todo' + this.props.todo.data.length,
      doneFlag: false,
    }
    this.props.toDoActions.addTodo(dummydata);

    ...

    <button onClick={this.addTodo}> addTodo </button>
```

![start8](https://user-images.githubusercontent.com/11643610/45439904-fba5f400-b6f5-11e8-84d0-4aa99f3d8a9d.gif)


### todo を input から追加できるようにする

input を入力の一つの部品としてコンポーネントで定義する。

```
└── components
    └── AddTodo.js
```



```js
import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOnchange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit() {
    this.props.clickCallback(this.state.value);
    this.setState({value: ''});
    this.mainInput.value = "";
  }
  render() {
    return (
      <div>
        <input
          ref={(ref) => this.mainInput = ref}
          type="text"
          onChange={this.handleOnchange}
        />
        <button onClick={this.handleSubmit}>add todo</button>
      </div>
    )
  }
}

export default AddTodo;
```

ここはほとんど、02 でやった内容と同じです。違う部分は clickCallback という props が渡されていることです。

````js
this.props.clickCallback(this.state.value);
```


TodoContainer を以下のように書き換えます。

```diff
-  addTodo = () => {
-    const dummydata = {
-      value: 'new todo' + this.props.todo.data.length,
+  addTodo = (data) => {
+    const inputData = {
+      value: data,
       doneFlag: false,
     }
-    this.props.toDoActions.addTodo(dummydata);
+    this.props.toDoActions.addTodo(inputData);
   }
   render() {
     const { data } = this.props.todo;
     return (
       <div>
-        <button onClick={this.addTodo}> addTodo </button>
+        <AddTodo clickCallback={this.addTodo} />
```

決め打ちだったデータを input から取得してきたデータに変換します。
`<AddTodo clickCallback={this.addTodo} />` で clickCallback に this.addTodo を渡します。

![start9](https://user-images.githubusercontent.com/11643610/45441344-bd123880-b6f9-11e8-8a06-6376b1226528.gif)

### todo を done できるようにする
先ほどの例で、 react redux での一連の動きはできました。最後に todo を done できるようにしましょう。
方針としては、todo をクリックした時に index を取得し、その index の doneflag を reducer で true にできるように実装します。

まずは ActionTypes に action を追加します。

```js
export const DONE_TODO = 'DONE_TODO';
```

action にも doneTodo 関数を追加しましょう

actions/todo.js の中身

```js
export function doneTodo(number) {
  return {
    type: ActionTypes.DONE_TODO,
    number,
  }
}
```

reducers/todo.js の中身に追記

```js
case ActionTypes.DONE_TODO:
  state.data[action.number].doneFlag = true;
  return {
    ...state,
    data: [
      ...state.data
    ]
  }
```

TodoContainer.js に以下を追記

```js
doneTodo = (number) => {
  this.props.toDoActions.doneTodo(number);
}
```

```diff
-  {todo.doneFlag ? <del>{todo.value}</del> : todo.value}
+  {todo.doneFlag ? <del>{todo.value}</del> : <span onClick={()=>{this.doneTodo(index)}}>{todo.value}</span>}
```

クリックした todo に取り消し線をつけることができました。
![start10](https://user-images.githubusercontent.com/11643610/45441816-1dee4080-b6fb-11e8-967f-d18cb79d4350.gif)


### まとめ
- reducer で特定のアクションで更新したい state を指定する
- store にアプリケーションの状態のデータなどが入っている
- react で利用するときは provider でストアを渡す
- redux で扱う状態データは mapStateToProps で props として渡して、変数を変更しないようにする
- container で action を発行するには mapDispatchToProps でアクションも props として受け取れるようにしておく
- データの変更は常に action を通して、 reducer で行う
- 何かアクションを付け加えたいときは、つど、action reducer を定義する
