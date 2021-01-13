import React from 'react'
import SoundProgress from "./sound_progress";
import SoundControl from "./sound_control";
import SoundTitle from "./sound_title";
import 'sound_components/css/sound_bar.css';

class SoundBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerState: {}
    }
  }

  handleUpdateSoundState = (playerState) => {
    this.setState({
      playerState : playerState
    })
  }

  getCurrentPlayingTitle = (state) => {
    if(state.bgmList && state.bgmIndex
        && state.bgmList.length > 0){
      return state.bgmList[state.bgmIndex].title;
    }
    return 'Loading Play list...';
  }

  render(){
    return(
      <div className="soundBar">
        <SoundProgress />
        <div className="controlBar">
          <SoundControl />
          <SoundTitle title={this.getCurrentPlayingTitle(this.state.playerState)}/>
        </div>
      </div>
    );
  }

}

export default SoundBar