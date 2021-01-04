import React, {Component} from 'react';
import './css/sound_bar.css';
import SoundPlayer from "sound_components/sound_player";

class SoundBar extends Component {

  /*
    STOPPED = 0
    PLAYING = 1
    PAUSED = 2
   */
  playingButtonText = [
      'PLAY',
      'PAUSE',
      'RESUME'
  ];

  stopButtonStyle = [
    {visibility: 'hidden'},
    {visibility: 'visible'},
    {visibility: 'visible'}
  ];

  constructor(props) {
    super(props);
    this.state = {
      playingStatusUI: SoundPlayer.STOPPED,
      currentBarStyle: {
        width: 0
      }
    }
    this.autoStopped = false;
    this.soundManager = new SoundPlayer(this);
    this.soundManager.loadSound();
  }

  componentDidMount() {

    this.playButton = document.querySelector('#playButton');
    this.playButton.addEventListener('click', () => {
      this.togglePlayingButton();
    });
    this.stopButton = document.querySelector('#stopButton');
    this.stopButton.addEventListener('click', () => {
      this.toggleStoppingButton();
    });

    setInterval(() => {
      this.handleCurrentProgress();
    }, 100);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(prevState.playingStatusUI !== this.state.playingStatusUI){
      if(this.state.playingStatusUI === SoundPlayer.STOPPED){
        if(!this.autoStopped){
          this.soundManager.stopSound(prevState.playingStatusUI === SoundPlayer.PAUSED);
        }
        this.autoStopped = false;
      }else if(this.state.playingStatusUI === SoundPlayer.PLAYING){
        this.soundManager.playSound();
      }else if(this.state.playingStatusUI === SoundPlayer.PAUSED){
        this.soundManager.pauseSound();
      }
    }

  }

  togglePlayingButton = () => {
    if(this.state.playingStatusUI === SoundPlayer.STOPPED){
      this.setState({playingStatusUI : SoundPlayer.PLAYING});
    }else if(this.state.playingStatusUI === SoundPlayer.PLAYING){
      this.setState({playingStatusUI : SoundPlayer.PAUSED});
    }else if(this.state.playingStatusUI === SoundPlayer.PAUSED){
      this.setState({playingStatusUI : SoundPlayer.PLAYING});
    }
  }

  toggleStoppingButton = () => {
    this.setState({playingStatusUI : SoundPlayer.STOPPED});
  }

  handleAutoEnded = () => {
    console.log('The music Auto Ended');
    this.autoStopped = true;
    this.toggleStoppingButton();
  }

  handleCurrentProgress = () => {
    let widthRatio = '0%';
    let totalDuration = this.soundManager.getTotalDuration();
    let currentDuration = this.soundManager.getCurrentTime(this.state.playingStatusUI) / 1000;
    widthRatio = currentDuration / totalDuration * 100 + '%';
    this.setState({currentBarStyle : {width: widthRatio}});
  }

  render() {
    return (
        <div className="bottomBar">
          <div className="progressBar">
            <div className="currentBar" style={this.state.currentBarStyle}/>
          </div>
          <div id="myBottomNav" className="bottomNav">
            Sound Bar
            <div><a id="playButton" href="#">{this.playingButtonText[this.state.playingStatusUI]}</a></div>
            <div><a id="stopButton" href="#" style={this.stopButtonStyle[this.state.playingStatusUI]}>STOP</a></div>
          </div>
        </div>
    );
  }
}

export default SoundBar;