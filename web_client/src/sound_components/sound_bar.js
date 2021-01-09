import React, {Component} from 'react';
import './css/sound_bar.css';
import './css/button.css'
import SoundPlayer from "sound_components/sound_player";
import SoundList from "sound_components/sound_list";

class SoundBar extends Component {

  /*
    STOPPED = 0
    PLAYING = 1
    LOADING = 2
   */
  playingButtonClass = [
    'triangle-right',
    'pause',
    'loading'
  ];
  PREV = true;
  NEXT = false;

  constructor(props) {
    super(props);
    this.state = {
      playingStatusUI: SoundPlayer.LOADING,
      currentBarStyle: {
        width: 0
      },
      currentMusicName: 'LOADING...'
    }
    this.setupSoundPlayer();
  }

  setupSoundPlayer() {
    this.soundManager = new SoundPlayer(this);
    this.soundManager.loadList();
  }

  componentDidMount() {
    this.beforeButton = document.getElementById('beforeButton');
    this.beforeButton.addEventListener('click', () => {
      this.toggleMusicChangeButton(this.PREV);
    });
    this.afterButton = document.getElementById('afterButton');
    this.afterButton.addEventListener('click', () => {
      this.toggleMusicChangeButton(this.NEXT);
    });
    this.playButton = document.getElementById('playButton');
    this.playButton.addEventListener('click', () => {
      this.togglePlayingButton();
    });

    setInterval(() => {
      this.handleCurrentProgress();
    }, 100);
  }

  togglePlayingButton = () => {
    if(this.state.playingStatusUI === SoundPlayer.STOPPED){
      this.soundManager.playSound();
    }else if(this.state.playingStatusUI === SoundPlayer.PLAYING){
      this.soundManager.pauseSound();
    }
  }

  handlePlayingStateChange = (changedState) => {
    this.setState({playingStatusUI: changedState});
  }

  handleSoundChange = (title) => {
    this.setState({currentMusicName: title});
  }

  toggleMusicChangeButton = (changeValue) => {
    if(this.soundManager.musicList.length <= 0) return;
    let autoPlay = (this.soundManager.musicState === SoundPlayer.STOPPED) ? false : true;
    if(this.soundManager.musicState === SoundPlayer.LOADING){
      autoPlay = this.soundManager.prevState;
    }
    if(changeValue === this.NEXT){
      this.soundManager.nextSound(autoPlay);
    }else if(changeValue === this.PREV){
      if(this.soundManager.getCurrentTime() > 5000){
        this.soundManager.nextSound(autoPlay, this.soundManager.currentMusicIndex);
      }else{
        let prevIndex = (this.soundManager.currentMusicIndex + (this.soundManager.musicList.length - 1)) % this.soundManager.musicList.length;
        this.soundManager.nextSound(autoPlay, prevIndex);
      }
    }
  }

  handleGetMusicList = () => {
    if(this.soundManager.musicList.length > 0){
      this.soundManager.nextSound(false, 0);
    }else{
      this.setState({currentMusicName: 'No Musics in playlist..'})      
    }
  }

  handleCurrentProgress = () => {
    let widthRatio = '0%';
    let totalDuration = this.soundManager.getTotalDuration();
    let currentDuration = this.soundManager.getCurrentTime() / 1000;
    if(totalDuration != 0){
      widthRatio = currentDuration / totalDuration * 100 + '%';
    }
    this.setState({currentBarStyle : {width: widthRatio}});
  }

  render() {
    return (
        <div className="bottomBar">
          <div className="progressBar">
            <div className="currentBar" style={this.state.currentBarStyle}/>
          </div>
          <div id="myBottomNav" className="bottomNav">
            <div className="line"></div>
            <div className="barButtonArea">
              <div className="arrow-left" id="beforeButton" />
            </div>
            <div className="barButtonArea">
              <div className={this.playingButtonClass[this.state.playingStatusUI]} id="playButton" />
            </div>
            <div className="barButtonArea">
              <div className="arrow-right" id="afterButton" />
            </div>
            <div className="line"></div>
            <div className="titleArea">
              <a id="currentMusic">
                {this.state.currentMusicName}
              </a>
            </div>
            <div className="line"></div>
            <SoundList />
          </div>
        </div>
    );
  }
}

export default SoundBar;