import React from 'react';

class SignUpField extends React.Component {
  render() {
    return (
      <div>
        <input
          type={this.props.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.changeHandler}
        />
        {this.props.error ? <p>*{this.props.error}</p> : null}
      </div>
    )
  }
}

export default SignUpField;