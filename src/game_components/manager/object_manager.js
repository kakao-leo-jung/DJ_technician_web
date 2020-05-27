import * as THREE from 'three';
import InGameConfig from 'game_components/options/ingame_config';
import BlockObject from 'game_components/object/block_object';

const setInGameObjects = (sceneManager) => {
  setBMSBlocks(sceneManager, new Array(
    /* Temp Blocks */
    {type:0, time:0},
    {type:1, time:0},
    {type:2, time:0},
    {type:3, time:0},
    {type:4, time:0},
    {type:5, time:0},
    {type:6, time:0},
    )
  );
}

const setBMSBlocks = (sceneManager, noteList) => {

  noteList.forEach(note => {
    sceneManager.addObject(makeGameBlock(note.type, note.time));
  });

}

const makeGameBlock = (type, time) => {
  const blockObject = new BlockObject(
    /* size */ InGameConfig.Block[type].size,
    /* color */ InGameConfig.Block[type].color,
    /* position */ {x : InGameConfig.Block[type].posX, y : time * 100, z : 0}
    );
  return blockObject;
}

export {setInGameObjects}