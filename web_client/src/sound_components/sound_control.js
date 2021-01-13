import React from 'react'
import 'sound_components/css/button.css';

class SoundControl extends React.Component{

  render(){
    return(
        <div className="control">
          <div className="arrow-left" />
          <div className="triangle-right" />
          <div className="arrow-right" />
        </div>
    );
  }

}

export default SoundControl