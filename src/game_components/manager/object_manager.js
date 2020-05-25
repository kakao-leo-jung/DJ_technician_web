import * as THREE from 'three';
import InGameConfig from 'game_components/options/ingame_config';

const setInGameObjects = (sceneManager) => {
  setBlocks(sceneManager);
}

const setBlocks = (sceneManager) => {
  const config = InGameConfig.Block;
  const geometry = new THREE.BoxGeometry(config.width, config.height, config.depth);
  
  makeBlock(sceneManager, geometry, 0x44aa88, {x : 0, y : 0, z : 0});
  makeBlock(sceneManager, geometry, 0x8844aa, {x : -300, y : 0, z : 0});
  makeBlock(sceneManager, geometry, 0xaa8844, {x : 300, y : 0, z : 0});

}

const makeBlock = (sceneManager, geometry, color, position) => {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.animate = (delta) => {
    const speed = 0.03;
    cube.rotation.x += speed * delta;
    cube.rotation.y += speed * delta;
  }
  cube.position.x = position.x;
  cube.position.y = position.y;
  cube.position.z = position.z;
  sceneManager.addObject(cube);
  return cube;
}

export {setInGameObjects}