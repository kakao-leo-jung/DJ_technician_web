import React from 'react'

class SoundTitle extends React.Component{

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props.title !== nextProps.title){
      return true;
    }
    return false;
  }

  render(){
    return(
        <div className="titleBg">
          <div className="title">{this.props.title}</div>
        </div>
    );
  }

}

export default SoundTitle