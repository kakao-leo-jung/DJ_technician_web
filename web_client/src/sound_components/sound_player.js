class SoundPlayer {

  static STOPPED = 0;
  static PLAYING = 1;
  static PAUSED = 2;

  constructor(manager) {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
      this.soundBuffer = null;
      this.source = null;
      this.initialTime = 0;
      this.currentTime = 0;
      this.manager = manager;
    } catch (err) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  /* FIXME: 초기 SoundBar init 시 2번 로드 되는거 찾아야 함. */
  loadSound = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'bgm/background1.mp3', true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, (buffer) => {
        this.soundBuffer = buffer;
      }, (error) => {
        console.log("Error with decoding audio data" + error.error);
      });
    }
    request.send();
  }

  initSound = () => {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.soundBuffer;
    this.source.loop = false;
    this.source.connect(this.context.destination);
    this.source.addEventListener('ended', () => {
      if (this.manager.state.playingStatusUI === SoundPlayer.PLAYING) {
        this.currentTime = 0;
        this.manager.handleAutoEnded();
      }
    });
  }

  playSound = () => {
    this.initSound();
    this.initialTime = Date.now();
    this.source.start(0, this.currentTime / 1000);
  }

  stopSound = (isPauseToStopped) => {
    this.currentTime = 0;
    if(!isPauseToStopped){
      this.source.stop();
    }
  }

  pauseSound = () => {
    this.currentTime += Date.now() - this.initialTime;
    console.log('currentTime : ' + this.currentTime);
    this.source.stop();
  }

  getCurrentTime = (playingStatus) => {
    if(playingStatus === SoundPlayer.PLAYING){
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