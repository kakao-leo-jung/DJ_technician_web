

class SoundAnalyzer {

  static FFT_SIZE = 512;
  static TIME_CONSTANT = 0.3;   // 0 ~ 1 default : 0.8
  static MAX_DECIBELS = 0;
  static MIN_DECIBELS = -90;

  constructor(audioContext) {
    this.audioContext = audioContext;
    this.analyzer = this.audioContext.createAnalyser();
    this.bufferLength = null;
    this.frequencyArray = null;
    this.timeDomainArray = null;
  }

  /**
   * visualizer 초기 세팅
   */
  initAnalyzer = () => {
    this.analyzer.fftSize = SoundAnalyzer.FFT_SIZE;
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.analyzer.smoothingTimeConstant = SoundAnalyzer.TIME_CONSTANT;
    this.frequencyArray = new Uint8Array(this.bufferLength);
    this.timeDomainArray = new Uint8Array(this.bufferLength);
    this.analyzer.maxDecibels = SoundAnalyzer.MAX_DECIBELS;
    this.analyzer.minDecibels = SoundAnalyzer.MIN_DECIBELS;
  }

  /**
   * sound source 를 받아와 analyzer 연결
   * @param source
   */
  connectSource = (source) => {
    source.connect(this.analyzer);
    this.analyzer.connect(this.audioContext.destination);
  }


  /**
   * 현재 진행되고 있는 소스의
   * 음성 분석 데이터 리턴
   */
  getDataArray = () => {
    if(this.frequencyArray && this.timeDomainArray){
      this.analyzer.getByteFrequencyData(this.frequencyArray);
      this.analyzer.getByteTimeDomainData(this.timeDomainArray);
      return {
        frequencySoundData : this.frequencyArray,
        timeDomainSoundData : this.timeDomainArray
      };
    }
    return {};
  }

}

export default SoundAnalyzer;