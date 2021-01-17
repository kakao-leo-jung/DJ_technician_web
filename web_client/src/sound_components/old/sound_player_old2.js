import {Howl, Howler} from 'howler'
import config from 'config/connectionConfig';
import * as common from "resource/common";

class SoundPlayer {

  static LOADING = 0;
  static READY = 1;
  static PLAYING = 2;

  constructor() {
    this.bgmPlayer = null;
    this.playingStatus = SoundPlayer.LOADING;
    this.bgmList = [];
    this.bgmIndex = 0;
    this.bgmOptions = {
      autoPlay : true,
      randomPlay : true
    };
    this.controlUI = null;
    this.renderedUI = null;

  }

  setControlUI = (controlUI) => {
    this.controlUI = controlUI;
  }

  setRenderedUI = (renderedUI) => {
    this.renderedUI = renderedUI;
  }

  updateStateToControlUI = () => {
    if(this.controlUI){
      this.controlUI.current.handleUpdateSoundState({
        soundPlayer: this,
        playingStatus: this.playingStatus,
        bgmList: this.bgmList,
        bgmIndex: this.bgmIndex,
        bgmOptions: this.bgmOptions,
        bgmDuration: (this.bgmPlayer) ? this.bgmPlayer.duration() : 0,
        bgmSeek: (this.bgmPlayer) ? this.bgmPlayer.seek() : 0
      });
    }else{
      console.log('Set controlUI first!');
    }
  }

  loadList = () => {
    const request = new XMLHttpRequest();
    request.open("GET", config.bgmServerUrl + "list", true);
    request.responseType = "json";
    request.onload = () => {
      this.bgmList = request.response.bgmInfoList;
      this.playingStatus = SoundPlayer.READY;
      this.getNextIndex();
      console.log('success get list');
      console.log(this.bgmList);
    }
    this.playingStatus = SoundPlayer.LOADING;
    this.updateStateToControlUI();
    request.send();
  }

  setRandomIndex = () => {
    if(this.bgmOptions.randomPlay){
      this.bgmIndex = common.getRandomInt(0, this.bgmList.length);
    }
  }

  getNextIndex = () => {
    if(this.bgmOptions.randomPlay){
      this.setRandomIndex();
    }else if(this.bgmList.length !== 0){
      this.bgmIndex = (this.bgmIndex + 1) % this.bgmList.length;
    }
    this.updateStateToControlUI();
  }

  playBgm = (loadSound = false) => {

    let target = this.bgmList[this.bgmIndex];
    let directory = encodeURIComponent(target.directory);
    let title = encodeURIComponent(target.title);
    let source = config.bgmServerUrl + "?directory=" + directory + "&title=" + title;

    this.playingStatus = SoundPlayer.LOADING;
    this.updateStateToControlUI();
    if(!this.bgmPlayer || loadSound){
      console.log('make new Howl');
      console.log('url : ' + source);
      this.bgmPlayer = new Howl({
        src: source,
        format: ['mp3'],
        onplay: () => {
          this.playingStatus = SoundPlayer.PLAYING;
          this.updateStateToControlUI();
        },
        onload: () => {
          this.playingStatus = SoundPlayer.READY;
          this.updateStateToControlUI();
        },
        onend: () => {
          this.handleBgmEnd();
          this.updateStateToControlUI();
        },
        onpause: () => {
          this.playingStatus = SoundPlayer.READY;
          this.updateStateToControlUI();
        },
        onstop: () => {
          this.playingStatus = SoundPlayer.READY;
          this.updateStateToControlUI();
        },
        onseek: () => {
          console.log('This is onseek');
        }
      });
    }
    this.bgmPlayer.play();
  }

  pauseBgm = () => {
    if(this.bgmPlayer){
      this.bgmPlayer.pause();
    }
  }

  handleBgmEnd = () => {
    this.stopBgm();
    this.getNextIndex();
    if(this.bgmOptions.autoPlay){
      this.playBgm();
    }
  }

  stopBgm = () => {
    this.playingStatus = SoundPlayer.READY;
    this.bgmPlayer.stop();
    this.bgmPlayer.unload();
  }

  playNextBgm = () => {
    let prevState = this.playingStatus;
    this.stopBgm();
    this.getNextIndex();
    if(prevState === SoundPlayer.PLAYING){
      this.playBgm(true);
    }
  }


}

export default SoundPlayer