import connectionConfig from 'config/connectionConfig.json';
import * as common from 'resource/common.js';

class SoundPlayer {

  static STOPPED = 0;
  static PLAYING = 1;
  static LOADING = 2;

  constructor(manager) {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
      this.soundBuffer = null;
      this.source = null;
      this.initialTime = 0;
      this.currentTime = 0;
      this.musicList = [];
      this.currentMusicIndex = 0;
      this.autoPlay = true;
      this.request = new XMLHttpRequest();
      this.musicState = SoundPlayer.LOADING;
      this.prevState = SoundPlayer.LOADING;
      this.isRandom = true;

      this.connectedScene = null;
      this.manager = manager;
    } catch (err) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  loadList = () => {
    this.request.open("GET", connectionConfig.bgmServerUrl + "list", true);
    this.request.responseType = "json";
    this.request.onload = () => {
      if(this.request.response){
        this.musicList = this.request.response.bgmInfoList;
        console.log('success get list');
        console.log(this.musicList);
        this.manager.handleGetMusicList();
      }
    }
    this.request.send();
  }

  loadSound = (autoPlay) => {
    if(this.musicList.length > this.currentMusicIndex){
      if(this.manager){
        this.musicState = SoundPlayer.LOADING;
        this.manager.handlePlayingStateChange(SoundPlayer.LOADING);
      }
      this.request.open('POST', connectionConfig.bgmServerUrl, true);
      this.request.responseType = "arraybuffer";
      this.request.setRequestHeader('Content-Type', 'application/json');
      this.request.onload = () => {
        this.context.decodeAudioData(this.request.response, (buffer) => {
          console.log('SUCCESS GET music buffer');
          this.soundBuffer = buffer;
          if(autoPlay){
            this.playSound();
          }else{
            if(this.manager){
              this.musicState = SoundPlayer.STOPPED;
              this.manager.handlePlayingStateChange(this.musicState);
            }
          }
        }, (error) => {
          console.log("Error with decoding audio data" + error.error);
        });
      }
      this.request.send(JSON.stringify(this.musicList[this.currentMusicIndex]));
    }
  }

  initSound = () => {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.soundBuffer;
    this.source.loop = false;
    this.source.connect(this.context.destination);
    this.source.addEventListener('ended', () => {
      if (this.musicState === SoundPlayer.PLAYING) {
        this.currentTime = 0;
        if(this.autoPlay){
          this.nextSound(true, this.isRandom);
        }else{
          if(this.manager){
            this.musicState = SoundPlayer.STOPPED;
            this.manager.handlePlayingStateChange(this.musicState);
          }
        }
      }
    });
  }

  playSound = () => {
    this.initSound();
    this.initialTime = Date.now();
    this.source.start(0, this.currentTime / 1000);
    if(this.manager){
      this.musicState = SoundPlayer.PLAYING;
      this.manager.handlePlayingStateChange(this.musicState);
    }
  }

  pauseSound = () => {
    this.currentTime += Date.now() - this.initialTime;
    console.log('currentTime : ' + this.currentTime);
    if(typeof this.source !== 'undefined' && this.source){
      this.source = this.source.stop();
      this.source.disconnect();
    }
    if(this.manager){
      this.musicState = SoundPlayer.STOPPED;
      this.manager.handlePlayingStateChange(this.musicState);
    }
  }

  stopSound = () => {
    this.currentTime = 0;
    if(typeof this.source !== 'undefined' && this.source){
      this.source = this.source.stop();
      this.source.disconnect();
    }
  }

  nextSound = (autoPlay, isRandom, index) => {
    if(this.musicList.length > 0){
      if(this.request.readyState === XMLHttpRequest.HEADERS_RECEIVED
        || this.request.readyState === XMLHttpRequest.LOADING){
          this.request.abort();
        }
      if(this.musicState !== SoundPlayer.LOADING){
        this.prevState = this.musicState;
      }
      this.stopSound();
      if(typeof index !== 'undefined' && this.musicList.length > index && index >= 0){
        this.currentMusicIndex = index;
      }else if(isRandom) {
        this.currentMusicIndex = common.getRandomInt(0, this.musicList.length);
      }else {
        this.currentMusicIndex = (this.currentMusicIndex + 1) % this.musicList.length;
      }
      if(this.manager){
        this.manager.handleSoundChange(this.musicList[this.currentMusicIndex].title);
      }
      this.loadSound(autoPlay);
    }
  }

  getCurrentTime = () => {
    if(this.musicState === SoundPlayer.PLAYING){
      let baseTimeNow = Date.now();
      this.currentTime += baseTimeNow - this.initialTime;
      this.initialTime = baseTimeNow;
    }
    return this.currentTime;
  }

  getTotalDuration = () => {
    let duration = 0;
    if(this.soundBuffer){
      duration = this.soundBuffer.duration;
    }
    return duration;
  }

}

export default SoundPlayer;