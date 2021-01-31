import * as Visualizer01Manager from 'game_components/manager/objects/visualizer01_manager.js';

/**
 * LoginScene의 백그라운드 매니징.
 * @param sceneManager
 */
const setLoginBackground = (sceneManager) => {

  Visualizer01Manager.setVisualizer01(sceneManager);

}

export {setLoginBackground}