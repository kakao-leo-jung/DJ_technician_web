import React from 'react'
import SoundProgress from "./sound_progress";
import SoundControl from "./sound_control";
import SoundTitle from "./sound_title";
import 'sound_components/css/sound_bar.css';

class SoundBar extends React.Component {

  getCurrentMusicPlayingTitle = () => {
    let player = this.props.soundPlayer;
    if(player.bgmList && player.bgmList.length > 0){
      return player.bgmList[player.bgmIndex].title;
    }else{
      return 'Loading Play list...';
    }
  }

  getCurrentBgmPlayingStatus = () => {
    return this.props.soundPlayer.bgmState;
  }

  getCurrentBgmControlFunction = () => {
    return this.props.soundPlayer.func_playBgm;
  }

  getCurrentProgress = (state) => {
    return state.bgmSeek;
  }

  getCurrentDuration = (state) => {
    return state.bgmDuration;
  }

  render(){
    return(
      <div className="soundBar">
        <SoundProgress
            // duration={this.getCurrentDuration(this.state.playerState)}
            // progress={this.getCurrentProgress(this.state.playerState)}
        />
        <div className="controlBar">
          <SoundControl
              playingStatus={this.getCurrentBgmPlayingStatus()}
              func_playBgm={this.getCurrentBgmControlFunction()}
          />
          <SoundTitle
              title={this.getCurrentMusicPlayingTitle()}
          />
        </div>
      </div>
    );
  }

}

export default SoundBar