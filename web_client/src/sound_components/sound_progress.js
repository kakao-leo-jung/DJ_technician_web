import React from 'react'

class SoundProgress extends React.Component{

  getWidth = () => {
    let duration = this.props.duration;
    let progress = this.props.progress / 1000;
    let _width = "0%";
    if(duration !== 0){
      _width = (progress / duration * 100) + "%";
    }
    return {width: _width};
  }

  render(){
    return(
        <div className="progress">
          <div className="currentProgress" style={this.getWidth()} />
        </div>
    );
  }

}

export default SoundProgress