import Line from "game_components/object/line_object";
import LoginConfig from 'game_components/options/login_config';
import * as THREE from 'three'

/**
 * Set Visualizer01
 * @param sceneManager
 */
const setVisualizer01 = (sceneManager) => {

  sceneManager.addObject(makeVisualizeLine());

}


/**
 * 음향 시각화 선
 * @returns {Line}
 */
const makeVisualizeLine = () => {
  const visualizerConfig = LoginConfig.Visualizer;
  const lineConfig = visualizerConfig.line;
  const visualizeLine = new Line(
      /* color */ lineConfig.color,
      /* position */ [
        new THREE.Vector3(lineConfig.position[0].x, lineConfig.position[0].y, lineConfig.position[0].z),
        new THREE.Vector3(lineConfig.position[1].x, lineConfig.position[1].y, lineConfig.position[1].z)
//        new THREE.Vector3(lineConfig.position[2].x, lineConfig.position[2].y, lineConfig.position[2].z)
      ]
  );
  return visualizeLine;
}

export {setVisualizer01}