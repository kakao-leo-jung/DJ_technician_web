class SoundManager {

  constructor() {
    try{
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.isPlaying = false;
      this.context = new AudioContext();
      this.soundBuffer = null;
      this.source = null;
    }catch(err) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  loadSound = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'bgm/background1.mp3', true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, (buffer) => {
        this.soundBuffer = buffer;
      });
    }
    request.send();
  }

  toggleSound  = () => {

    if(!this.isPlaying){
      this.isPlaying = true;
      this.source = this.context.createBufferSource();
      this.source.buffer = this.soundBuffer;
      this.source.connect(this.context.destination);
      this.source.start(0);
    }else{
      this.isPlaying = false;
      this.source.disconnect(0);
    }

  }

}

export default SoundManager;