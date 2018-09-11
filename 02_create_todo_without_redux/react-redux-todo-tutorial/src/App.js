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
