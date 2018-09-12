# react-redux-todo-tutorial

### 目的
[今から始める React Redux TODO アプリハンズオン](https://supporterzcolab.com/event/523/) の資料です。
React の大まかな概要から Redux で SPA を実際に作成するまでを体験してみましょう。

### 目次
- [00: はじめに](https://github.com/TsuyoshiNumano/react-redux-todo-tutorial/tree/master/00_intro)
- [01: React を始める (create-react-app を使った方法)](https://github.com/TsuyoshiNumano/react-redux-todo-tutorial/tree/master/01_create_react_app)
- [02: Todo List を Redux なしで作ってみよう](https://github.com/TsuyoshiNumano/react-redux-todo-tutorial/tree/master/02_create_todo_without_redux)
- [03-01: Todo List に Redux を導入しよう](https://github.com/TsuyoshiNumano/react-redux-todo-tutorial/tree/master/03_create_todo_with_redux_01)
- [03-02: Todo List に Redux を導入しよう2](https://github.com/TsuyoshiNumano/react-redux-todo-tutorial/tree/master/03_create_todo_with_redux_02)


### React の概要
React は facebook が開発した `ui` ライブラリ

特徴
- 旧来の DOM 操作による状態管理を props や state で抽象化
- UI パーツをコンポーネントごとに管理するのが得意
- learn once write everywhere
![68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32363039352f37313833306239642d333536352d393436342d316539312d3430306539306665633734382e676966](https://user-images.githubusercontent.com/11643610/45444075-74f71400-b701-11e8-8a93-4e2e5b85d3a6.gif)

#### 知られざる React 誕生の歴史
- 元々は XHP という facebook が開発していた PHP のエクステンション
- 主に Cross Site Scripting を防ぐための仕組み
- React.js は XHP をブラウザ側で処理できるように js にしたもの
- (XHP はサーバー側とのラウンドトリップが多く発生する問題があったため)

個人的な考察ですが、仮想DOMの出発点が XSS 防止にあったと考えると、開発者がユーザーの DOM へのアクセスを防ぐために、Javasciript で DOM を作ればいいじゃないかという発想は、面白いと思う。
https://thenewstack.io/javascripts-history-and-how-it-led-to-reactjs/

### Redux の概要
SPAなどの複雑化する React のステート（状態）管理を、ルール（哲学）に従って書かせることで、フロントエンドの動きを追いやすくするためのライブラリ （個人的解釈です）
もともとは Flux と言う、データの流れを一方向に制限することで、流れを追いやすくするという、オブザーバーパターンの亜種から、さらに転じた考え方。
Redux と言う名前は 「Reducer」 + 「Flux」 で 「Redux」だそうです。array.reduce と同じような役割を Reducer が担います。詳しく知りたい方は作者の発表をご覧ください [Dan Abramov - Live React: Hot Reloading with Time Travel at react-europe 2015](https://www.youtube.com/watch?v=xsSnOQynTHs) (Redux で作ったスライドで発表してるところがクールです。sublime text を使っていて途中でアクシデントが起こるところがネタ的に面白いです。)

全体的なアーキテクチャとフローは以下の図で表せます。[引用元:
[Redux. From twitter hype to production](http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/27)
![68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966 1](https://user-images.githubusercontent.com/11643610/45444364-3dd53280-b702-11e8-8047-10de5eedc38a.gif)


1. View でユーザーがクリックするなどの動作でイベントを発行
2. Actions でイベントをアクションとし受け渡す
3. Actions の結果を Reducer で 元の State と合成する
4. state を View に返して、View を更新する
(2.1 受け取ったアクションに応じて Middleware で API コールなど非同期のリクエストを送る)
(2.2 API のレスポンスを Middleware で受け取る)
(2.3 受け取ったレスポンスで3.を行う)

Middleware が噛まない場合もありますが、基本的には View -> Actions -> Dispatcher -> Reducer -> View でデータを更新すると言う単一の流れです。
