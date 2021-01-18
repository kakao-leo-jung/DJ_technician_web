import React from 'react'
import 'sound_components/css/button.css';
import SoundPlayer from "./old/sound_player_old2";

class SoundControl extends React.Component{

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props.playingStatus !== nextProps.playingStatus){
      return true;
    }
    return false;
  }

  componentDidMount() {
    let playingButton = document.getElementById('playingButton');
    playingButton.addEventListener('click', (event) => {
      switch(this.props.playingStatus){
        case SoundPlayer.LOADING:
          break;
        case SoundPlayer.READY:
          this.props.func.playBgm();
          break;
        case SoundPlayer.PLAYING:
          this.props.func.pauseBgm();
          break;
        default:
          break;
      }
    });
    let nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', (event) => {
      this.props.playNextBgm();
    });

  }

  getPlayingButtonClass = () => {
    let playingStatus = this.props.playingStatus;
    switch(playingStatus){
      case SoundPlayer.LOADING:
        return "loading";
      case SoundPlayer.READY:
        return "triangle-right";
      case SoundPlayer.PLAYING:
        return "pause";
      default:
        return "loading";
    }
  }

  render(){
    return(
        <div className="control">
          <div className="arrow-left" />
          <div className={this.getPlayingButtonClass()} id="playingButton" />
          <div className="arrow-right" id="nextButton" />
        </div>
    );
  }

}

export default SoundControl