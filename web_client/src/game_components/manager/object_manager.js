import * as BlockManager from 'game_components/manager/objects/block_manager';

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

export const setLoginObjects = (sceneManager) => {

  /* TODO: set Login Objects */


}
