import * as THREE from 'three';

class SceneManager {

  constructor(scene) {
    this.scene = scene;
    this.scene.updateMatrixWorld();
    this.objectArray = [];

    /* GridHelper */
    const gridHelper = new THREE.GridHelper(3000, 300);
    this.scene.add(gridHelper);

  }

  addObject = (object) => {
    this.scene.add(object);
    this.objectArray.push(object);
  }

  updateObject = (delta) => {
    this.objectArray.map(obj => {
      obj.animate(delta);
    })
  }

}

export default SceneManager;