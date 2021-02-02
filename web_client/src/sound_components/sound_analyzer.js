

class SoundAnalyzer {

  static FFT_SIZE = 256;

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
    this.frequencyArray = new Uint8Array(this.bufferLength);
    this.timeDomainArray = new Uint8Array(this.bufferLength);
    this.analyzer.minDecibels = -90;
    this.analyzer.maxDecibels = 0;
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