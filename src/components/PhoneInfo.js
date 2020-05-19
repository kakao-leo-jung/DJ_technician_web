import React, { Component } from 'react';

class PhoneInfo extends Component {

  /* Default Properties */
  static defaultProps = {
    info: {
      id : 0,
      name: '이름',
      phone: '010-0000-0000',
    }
  }

  /* States */
  state = {
    editMode: false,
    name: '',
    phone: '',
  }

  /* Constructor */
  constructor(props) {
    super(props);
    this.state.name = this.props.info.name;
    this.state.phone = this.props.info.phone;
  }

  /* Functions */
  toggleUpdate = () => {
    const { editMode } = this.state;

    /* 업데이트 적용 */
    if(editMode){
      this.props.onUpdate({
        id : this.props.info.id,
        name : this.state.name,
        phone : this.state.phone
      });
    }

    this.setState({
      editMode: !editMode
    });
  }

  handleRemove = () => {
    const { info } = this.props;
    this.props.onRemove(info);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  /* Renders */
  render() {

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editMode } = this.state;
    if (editMode) {
      /* Edit Mode */
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              placeholder="이름"
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              placeholder="전화번호"
              onChange={this.handleChange}
              name="phone"
            />
          </div>
          <div>
            <button onClick={this.toggleUpdate}>적용</button>
            <button onClick={this.handleRemove}>삭제</button>
          </div>
        </div>
      );
    } else {
      /* Basic Mode */
      return (
        <div style={style}>
          <div><b>{this.state.name}</b></div>
          <div>{this.state.phone}</div>
          <div>
            <button onClick={this.toggleUpdate}>수정</button>
            <button onClick={this.handleRemove}>삭제</button>
          </div>
        </div>
      );
    }
  }

}

export default PhoneInfo;