import SoundAnalyzer from "sound_components/sound_analyzer";
import Block from "game_components/object/block_object";
import ColorResource from "resource/color.js";
import * as VisualizerUtils from "game_components/utils/visualizer_utils";
import VisualizerConfig from 'game_components/options/visualizer_config';


/**
 * Visualizer Type 01
 * ObjectModule 타입의 클래스는 항상 this.objects [] 타입의 멤버변수를 가지고 있어야 한다.
 */
class Visualizer01 {

  objects;
  config;

  constructor(config) {
    this.objects = [];
    this.config = config;
    this.#setVisualizer01(this.config);
  }


  /**
   * Visualizer 생성 팩토리
   * @param config
   * @returns {Visualizer01}
   */
  static createVisualizer01 = (config = VisualizerConfig.Visualizer01[0]) => {
    return new Visualizer01(config);
  }


  /**
   * Set Visualizer01
   * @param config
   */
  #setVisualizer01 = () => {
    let objectCount = SoundAnalyzer.FFT_SIZE / 2;
    for(let i = 0; i < objectCount; i++){
      this.objects.push(this.#makeVisualizeBlock(i, objectCount));
    }
  }


  /**
   * 음향 시각화 선
   * @param index
   * @param config
   * @param divideSize
   * @returns {Block}
   */
  #makeVisualizeBlock = (index, divideSize) => {
    let config = this.config.line;
    let width = config.width;
    let whiteSpace = config.whiteSpace;
    let maxWidth = (width + whiteSpace) * divideSize;
    let height = config.height;
    let depth = config.depth;
    let color = config.baseColor;
    let baseX = - maxWidth / 2;
    let posX = config.posX + baseX + (index * (width + whiteSpace));
    let posY = config.posY;
    let posZ = config.posZ;
    return new Block(
        /* size */ {width: width, height: height, depth: depth},
        /* color */ color,
        /* position */ {x: posX, y: posY, z: posZ}
    );
  }


  /**
   * 매 Frame 당 애니메이션 계산
   * @param delta
   * @param visualizerParams
   */
  animate = (delta, visualizerParams) => {
    if(this.#checkIsVisualizerDataAvailable(visualizerParams)) {
      let averageFrequency = VisualizerUtils.getFrequencyAverage(visualizerParams.frequencySoundData);
      this.objects.forEach((meshObject, index) => {
        if(this.#checkIndexAvailable(index, visualizerParams)){
          meshObject.needsUpdate = true;
          let frequencyData = visualizerParams.frequencySoundData[index];
          let timeDomainData = visualizerParams.timeDomainSoundData[index];
          this.#updateColor(meshObject, timeDomainData);
          this.#updateHeight(meshObject, frequencyData, averageFrequency);
        }
      })
    }
  }


  /**
   * VisualizerParam 데이터 유효성 검사.
   * @param visualizerParams
   * @returns {boolean}
   */
  #checkIsVisualizerDataAvailable = (visualizerParams) => {
    return (visualizerParams.frequencySoundData instanceof Uint8Array
    && visualizerParams.timeDomainSoundData instanceof  Uint8Array);
  }


  /**
   * 현재 Object 의 인덱스 값이 전체 analyzer 를 통한 데이터 배열의 사이즈 값보다 작은지 검사.
   * @param index
   * @param visualizerParams
   * @returns {boolean}
   */
  #checkIndexAvailable = (index, visualizerParams) => {
    return (index < visualizerParams.frequencySoundData.length);
  }


  /**
   * 현재 Mesh 의 색상을 timeDomainData 기반으로 업데이트
   * @param mesh
   * @param timeDomainData
   */
  #updateColor = (mesh, timeDomainData) => {
    let neonColorGroupIndex = this.config.line.colorTone;
    let subColorSetIndex = parseInt(timeDomainData % neonColorGroupIndex);
    mesh.material.color.setStyle(
        ColorResource.NeonHexaColorSet[neonColorGroupIndex][subColorSetIndex]
    );
  }


  /**
   * 해당 Mesh 의 사이즈 변경
   * @param mesh
   * @param x
   * @param y
   * @param z
   */
  #updateSize = (mesh, x, y, z) => {
    let scaleX = x / mesh.geometry.parameters.width;
    let scaleY = y / mesh.geometry.parameters.height;
    let scaleZ = z / mesh.geometry.parameters.depth;
    mesh.scale.set(scaleX, scaleY, scaleZ);
  }


  /**
   * 해당 Mesh 를 Amplify 된 높이로 업데이트
   * @param mesh
   * @param frequencyData
   * @param averageFrequency
   */
  #updateHeight = (mesh, frequencyData, averageFrequency) => {
    let targetHeight = this.#amplifyFrequencyHeight(frequencyData, averageFrequency);
    this.#updateSize(mesh, mesh.geometry.parameters.width,  targetHeight, mesh.geometry.parameters.depth);
    mesh.setPosition(mesh.position.x,  - (targetHeight + averageFrequency) / 2, mesh.position.z);
  }


  /**
   * frequencyData 값의 특징을 잡아 변조한다.
   * @param frequencyData
   * @param averageFrequency
   * @returns {number}
   */
  #amplifyFrequencyHeight = (frequencyData, averageFrequency) => {
    let amplifiedHeight = 0;
    if(frequencyData > averageFrequency){
      amplifiedHeight = frequencyData - averageFrequency;
    }
    return amplifiedHeight + 10;
  }

}

export default Visualizer01;