import Visualizer01 from 'game_components/manager/objects/visualizer01';

/**
 * LoginScene의 백그라운드 매니징.
 * @param sceneManager
 * @param config
 */
const setLoginBackground = (sceneManager, config) => {

  let visualizer = Visualizer01.createVisualizer01(config);
  sceneManager.addObjectModule(visualizer);

}

export {setLoginBackground}