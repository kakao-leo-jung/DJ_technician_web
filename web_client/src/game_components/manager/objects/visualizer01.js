import SoundAnalyzer from "sound_components/sound_analyzer";
import Block from "game_components/object/block_object";
import ColorResource from "resource/color.js";

/**
 * Visualizer Type 01
 * ObjectModule 타입의 클래스는 항상 this.objects [] 타입의 멤버변수를 가지고 있어야 한다.
 */
class Visualizer01 {

  objects;

  constructor(config) {
    this.objects = [];
    this.#setVisualizer01(config);
  }

  /**
   * Visualizer 생성
   * @param config
   * @returns {Visualizer01}
   */
  static createVisualizer01 = (config) => {
    return new Visualizer01(config);
  }

  /**
   * Set Visualizer01
   * @param config
   */
  #setVisualizer01 = (config) => {
    let objectCount = SoundAnalyzer.FFT_SIZE / 2;
    for(let i = 0; i < objectCount; i++){
      this.objects.push(this.#makeVisualizeBlock(i, config.line, objectCount));
    }
  }

  /**
   * 음향 시각화 선
   * @param index
   * @param config
   * @param divideSize
   * @returns {Block}
   */
  #makeVisualizeBlock = (index, config, divideSize) => {
    let maxWidth = config.width;
    let whiteSpace = config.whiteSpace;
    let width = maxWidth / divideSize - whiteSpace;
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
   *
   * @param delta
   * @param visualizerParams
   */
  animate = (delta, visualizerParams) => {

    if(visualizerParams.frequencySoundData instanceof Uint8Array
      && visualizerParams.timeDomainSoundData instanceof Uint8Array) {
      this.objects.forEach((object, index) => {
        if(index < visualizerParams.frequencySoundData.length){
          object.needsUpdate = true;
          let frequencyData = visualizerParams.frequencySoundData[index];
          let timeDomainData = visualizerParams.timeDomainSoundData[index];
          let mainColorSetIndex = parseInt(timeDomainData / 43);
          let subColorSetIndex = parseInt(timeDomainData % 4);
          object.material.color.setStyle(ColorResource.NeonHexaColorSet[mainColorSetIndex][subColorSetIndex]);
          this.#updateHeight(object, frequencyData * 2);
        }
      })
    }
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

  #updateHeight = (mesh, height) => {
    this.#updateSize(mesh, mesh.geometry.parameters.width, height, mesh.geometry.parameters.depth);
  }

}

export default Visualizer01;