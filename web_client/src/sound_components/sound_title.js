import React from 'react'

class SoundTitle extends React.Component{

  render(){
    return(
        <div className="title">
          <div>{this.props.title}</div>
        </div>
    );
  }

}

export default SoundTitle