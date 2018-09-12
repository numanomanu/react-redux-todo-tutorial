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
