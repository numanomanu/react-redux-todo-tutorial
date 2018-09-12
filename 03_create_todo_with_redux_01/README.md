## Todo List に Redux を導入しよう

### プロジェクトに Redux を導入する
redux は状態を管理するためのライブライのため react がなくても、単体で存在できるライブラリです。
react と一緒に使うときは、 [react-redux](https://github.com/reduxjs/react-redux) というライブラリを入れて、 react と redux を繋ぎます。

```
$ npm i --save redux react-redux
```

### フォルダの構成
よくある redux のファイル構成は以下のような構成になっています。
```
src
├── index.js
├── actions
├── components
├── containers
├── reducers
└── store
```

- index.js
アプリケーションのエントリポイント。
- actions
state を更新するためのアクションを定義する場所。
- components
redux から state を受け取らないコンポーネントの層。 props を受け取って描画に徹する。
- containers
redux から state を受け取る層。
- reducers
state をどのように更新するか決める層。
- store
アプリケーションの状態を保存している層。


### reducer
redux で状態を管理するときに、モデルのような層を司る reducer を定義していきます。

```
└── reducers
    ├── index.js
    └── todo.js
```

todo.js の中身
```js
const initialState = {
  data: [{
    value: 'todo list',
    doneFlag: false
  }]
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state
  }
}
```

todo という state を定義して、その中身はどのような形をしているのか initialState に定義してみます。todoの中身である value と、完了したかどうかの doneFlag の二つの要素を持つオブジェクトとして定義しました。todoList は複数のリストから作られるので data という名前で配列で持つことにします。

### reducer の結合
redux を触る場合、todo 以外にも多くの状態を持つアプリケーションを作る場合があります。
それらの状態を統合するために、 combineReducers という関数で、複数の状態を一つにまとめます。（今回は一つの todo という状態だけなので、最悪なくても良いです）

index.js の中身
```js
import { combineReducers } from 'redux';
import todo from './todo';

const rootReducer = combineReducers({
  todo,
})

export default rootReducer;
```

### store
状態を保存する層の定義をしていきます。
先ほど結合した rootReducer を呼び出して、createStore 関数で store という変数にまとめています。
基本的に store にアプリケーションの状態のデータが保存されています。 `store.getState()` などで、データを取り出すことができます。
react-redux では後述しますが、別の方法で store の状態を読み出します。

```
└── store
    └── configureStore.js
```

configureStore.js の中身
```js
import { createStore } from 'redux';
import rootReducer from '../reducers';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
  )
  return store
}

export default configureStore;
```


### Provider で react と redux をつなぐ

先ほど作った store を react で扱えるようにします。
`Provider` というコンポーネントが、よしなに store の状態を取得できるような仕組みを提供してくれます。

```
└── index.js
```

index.js の中身
```diff
import React from 'react';
+import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import TodoContainer from './container/TodoContainer';
+import configureStore from './store/configureStore';

-ReactDOM.render(<TodoContainer />, document.getElementById('root'));
+ReactDOM.render(
+  <Provider store={configureStore()}>
+    <TodoContainer />
+  </Provider>
+, document.getElementById('root'));
```

### Container で state を受け取って表示する
先ほど実装した `<Provider store={configureStore()}>` によって、配下のコンポーネントで state を呼び出せるようになりました。
`react-redux` が提供している `connect` という関数を使えば、 react のコンポーネント内で redux で管理している state を呼び出すことができます。具体的には以下のようなコードになります。

```
└── container
    └── TodoContainer.js
```

```js
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

```

`mapStateToProps` で、state の中から利用する todo という reducer で指定した値を定義すると、state を props に変換して渡してくれます。コンポーネント内でこの値を呼び出すときは `this.props.todo` という props になった状態で扱えるようになります。

```js
function mapStateToProps(state) {
    return {
        todo: state.todo,
    };
}

...

const { data } = this.props.todo;
```

基本的に、redux では state の更新は action を通して行うというルールがあるので、mapStateToProps で redux で保存されている state を props として渡しています。
そうすることで何が嬉しいかというと、もし state を不用意に変更するコードを書きまくると、どこで何が起こっているのかわからなくなりますが、そういう状況を抑えるためにも、props にして変更しない変数として扱うことができるようになります。

この状態で localhost:3000 を参照すると、以下のように reducer に保存した todo の initialState が表示されます

![start7](https://user-images.githubusercontent.com/11643610/45436329-859d8f00-b6ed-11e8-8a04-86b60db517d0.gif)
