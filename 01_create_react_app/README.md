### React を始める

導入には [create-react-app](https://github.com/facebook/create-react-app#creating-an-app) を使います。
react の環境をすぐに用意してくれるライブラリで、面倒な build の設定などをしてくれた状態で、すぐにアプリを開発することができます。


```
$ npx create-react-app react-redux-todo-tutorial
```

実行が完了したら、以下のコマンドを打ちます

```
$ cd react-redux-todo-tutorial
$ npm start
```

すると、ブラウザが起動して Welcome to React の文言が見えます。
![image](https://user-images.githubusercontent.com/11643610/45304309-c8772f80-b552-11e8-8c75-9ea4939fd4ea.png)


### ライブリロードを試す
`src/App.js` を開いて、Welcome to React の文言を変更します。

![start1](https://user-images.githubusercontent.com/11643610/45305001-5d2e5d00-b554-11e8-9ae6-bbec4f435254.gif)

変更した文言は、すぐさまブラウザにも反映されます。


### ウォーミングアップ
App.js を以下のように書き換えます

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
