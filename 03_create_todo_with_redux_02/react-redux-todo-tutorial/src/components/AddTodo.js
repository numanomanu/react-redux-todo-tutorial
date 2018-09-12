import React, { Component } from 'react';

class Input extends Component {
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

export default Input;
