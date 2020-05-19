import React, {Component} from 'react';

class PhoneInfo extends Component {

  static defaultProps = {
    info : {
      name : '이름',
      phone : '010-0000-0000',
      id : 0
    }
  }

  state = {
    editMode : false,
    info : {
      name : '',
      phone : '',
      id : 0
    }
  }

  getStateInfo = () => {
    this.setState({
      info : this.props.info
    });
  }

  initUpdate = () => {
    const {editMode} = this.state;
    this.setState({
      editMode : !editMode
    });
  }

  handleRemove = () => {
    const {info, onRemove} = this.props;
    onRemove(info);
  }

  render() {

    const style = {
      border : '1px solid black',
      padding : '8px',
      margin : '8px'
    };

    this.getStateInfo;
    
    const {
      name, phone, id
    } = this.state.info;

    const {editMode} = this.state;
    if(editMode){
      return(
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              placeholder="이름"
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              placeholder="전화번호"
            />
          </div>
          <div>
            <button>적용</button>
            <button>삭제</button>
          </div>
        </div>
      );
    }else{
      return(
        <div style={style}>
          <div><b>{name}</b></div>
          <div>{phone}</div>
          <div>
            <button onClick={this.initUpdate}>수정</button>
            <button onClick={this.handleRemove}>삭제</button>
          </div>
        </div>
      );
    }
  }

}

export default PhoneInfo;