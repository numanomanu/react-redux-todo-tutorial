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

![start2](https://user-images.githubusercontent.com/11643610/45367094-66cec800-b61b-11e8-9381-53e3415df6a2.gif)

### Tips

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) を使って、React をデバッグしよう。
google chrome のこのエクステンションを使うと、React のデバッグがしやすくなります。

![image](https://user-images.githubusercontent.com/11643610/45367301-e2c91000-b61b-11e8-91bb-a0d6d7b08878.png)


React Developper Tools を有効にすれば、chrome の開発者画面のタブに「React」という項目が現れます。
このタブの中では渡って来ているデータなどを確認したり state などを手元で変更できます。


![start3](https://user-images.githubusercontent.com/11643610/45367353-055b2900-b61c-11e8-8a6a-27a2eabc3171.gif)
