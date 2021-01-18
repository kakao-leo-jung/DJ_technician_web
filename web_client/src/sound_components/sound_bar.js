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
    return {
      playBgm: this.props.soundPlayer.func_playBgm,
      pauseBgm: this.props.soundPlayer.func_pauseBgm
    };
  }

  getCurrentProgress = () => {
    return this.props.soundPlayerFrame.seek;
  }

  getCurrentDuration = () => {
    if(this.props.soundPlayer.soundInfo){
      return this.props.soundPlayer.soundInfo.duration;
    }
    return 0;
  }

  render(){
    return(
      <div className="soundBar">
        <SoundProgress
            duration={this.getCurrentDuration()}
            progress={this.getCurrentProgress()}
        />
        <div className="controlBar">
          <SoundControl
              playingStatus={this.getCurrentBgmPlayingStatus()}
              func={this.getCurrentBgmControlFunction()}
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