import React, {Component} from 'react';

class PhoneForm extends Component {

  /* state 선언 */
  state = {
    name : '',
    phone : ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSubmit = (event) => {
    /* 페이지 리로딩 방지 */
    event.preventDefault();
    this.props.onCreateProps(this.state);
    this.setState({
      name : '',
      phone : ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
        <div>
          {this.state.name} / {this.state.phone}
        </div>
      </form>
    );
  }

}

export default PhoneForm;