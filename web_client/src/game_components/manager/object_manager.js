import * as BlockManager from 'game_components/manager/objects/block_manager';
import * as BackgroundManager from 'game_components/manager/background_manager.js';
import LoginConfig from 'game_components/options/login_config';

/**
 * InGame Object 세팅
 * @param sceneManager
 */
export const setInGameObjects = (sceneManager) => {

  /* Set Block Objects */
  BlockManager.setBMSBlocks(sceneManager, [
    {type:0, time:0},
    {type:1, time:1},
    {type:2, time:2},
    {type:3, time:3},
    {type:4, time:4},
    {type:5, time:5},
    {type:6, time:6}]
  );

}


/**
 * Login Object 세팅
 * @param sceneManager
 */
export const setLoginObjects = (sceneManager) => {

  /* Set LoginScene Objects */
  BackgroundManager.setLoginBackground(sceneManager, LoginConfig.Visualizer);

}
