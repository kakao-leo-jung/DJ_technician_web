

class SoundAnalyzer {

  FFT_SIZE = 2048;

  constructor(audioContext) {
    this.audioContext = audioContext;
    this.analyzer = this.audioContext.createAnalyser();
    this.bufferLength = null;
    this.dataArray = null;
  }

  /**
   * visualizer 초기 세팅
   */
  initAnalyzer = () => {
    this.analyzer.fftSize = this.FFT_SIZE;
    this.bufferLength = this.analyzer.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
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
    if(this.dataArray){
      this.analyzer.getByteFrequencyData(this.dataArray);
      return this.dataArray;
    }
    return {};
  }

}

export default SoundAnalyzer;