import connectionConfig from "../config/connectionConfig.json";
import * as common from "../resource/common";

class SoundPlayer {

  static LOADING = 0;
  static READY = 1;
  static PLAYING = 2;

  constructor(manager) {
    this.bgmList = [];
    this.bgmIndex = 0;
    this.bgmState = SoundPlayer.LOADING;
    this.soundInfo = {
      initTime: 0,
      seek: 0
    }
    this.bgmOptions = {
      autoPlay: true,
      randomPlay: true
    };
    this.manager = manager;
    this.audioContext = null;
    this.buffer = null;
    this.source = null;
  }

  updatePlayerState = () => {
    this.manager.handleUpdatePlayerState({
      bgmList: this.bgmList,
      bgmIndex: this.bgmIndex,
      bgmState: this.bgmState,
      soundInfo: {
        initTime: this.soundInfo.initTime,
        seek: this.soundInfo.seek,
        duration: this.soundInfo.duration
      },
      bgmOptions: {
        autoPlay: this.bgmOptions.autoPlay,
        randomPlay: this.bgmOptions.randomPlay
      },
      func_playBgm: this.playBgm
    });
  }

  initPlayer = () => {
    if(!this.audioContext){
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  getNextIndex = () => {
    if(this.bgmOptions.randomPlay){
      this.bgmIndex = common.getRandomInt(0, this.bgmList.length);
    }else if(this.bgmList.length > 0) {
      this.bgmIndex = (this.bgmIndex + 1) % this.bgmList.length;
    }
    this.updatePlayerState();
  }

  loadList = async () => {
    let url = connectionConfig.bgmServerUrl + 'list';
    let response = await fetch(url);
    if(response.ok && response.status === 200){
      let jsonResp = await response.json();
      this.bgmList = jsonResp.bgmInfoList;
      this.getNextIndex();
      this.setPlayingStatus(SoundPlayer.READY);
    }else{
      // 리스트 로드 실패
    }
  }

  setPlayingStatus = (status) => {
    this.bgmState = status;
    this.updatePlayerState();
  }

  isAudioAvailable = () => {
    // TODO: Audio 재생가능한 상태인지 판별 구현해야 함.
    return true;
  }

  loadSound = async () => {
    if(!this.isAudioAvailable()) return;
    this.setPlayingStatus(SoundPlayer.LOADING);
    let target = this.bgmList[this.bgmIndex];
    let directory = encodeURIComponent(target.directory);
    let title = encodeURIComponent(target.title);
    let url = connectionConfig.bgmServerUrl + "?directory=" + directory + "&title=" + title;
    let response = await fetch(url);
    if(response.ok && response.status === 200){
      let returnBuffer = await response.arrayBuffer();
      this.buffer = await this.audioContext.decodeAudioData(returnBuffer);
      console.log(this.buffer.duration);
      this.setPlayingStatus(SoundPlayer.READY);
      return true;
    }else{
      // 사운드 로드 실패 처리
      console.log('failed to load sound');
      this.setPlayingStatus(SoundPlayer.READY);
      return false;
    }
  }

  initSound = () => {
    if(this.buffer) {
      this.source = this.audioContext.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.loop = false;
      this.source.connect(this.audioContext.destination);
      this.source.addEventListener('ended', () => {
        // 음악이 자동 종료되었을 때 후처리
      });
    }
  }

  playBgm = async () => {
    let loadResult = await this.loadSound();
    if(loadResult && this.buffer){
      this.playSource();
    }
  }

  playSource = () => {
    this.initSound();
    this.soundInfo.initTime = Date.now();
    if(this.source) {
      this.source.start(0, this.soundInfo.seek / 1000);
      this.setPlayingStatus(SoundPlayer.PLAYING);
    }
  }

  pauseBgm = () => {

  }

  playNextBgm = () => {

  }

}

export default SoundPlayer;