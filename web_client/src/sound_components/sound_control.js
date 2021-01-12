import React from 'react'
import 'sound_components/css/button.css';

class SoundControl extends React.Component{

  render(){
    return(
        <div className="control">
          <div>버튼1</div>
          <div>버튼2</div>
          <div>버튼3</div>
        </div>
    );
  }

}

export default SoundControl