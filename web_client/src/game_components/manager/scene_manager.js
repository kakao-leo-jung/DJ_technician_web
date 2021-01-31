import * as THREE from 'three';

class SceneManager {

  constructor(scene, gridHelperOn = false) {
    this.scene = scene;
    this.scene.updateMatrixWorld();
    this.objectArray = [];

    /* GridHelper */
    if(gridHelperOn){
      const gridHelper = new THREE.GridHelper(3000, 300);
      this.scene.add(gridHelper);
    }
  }

  addObject = (object) => {
    this.scene.add(object);
    this.objectArray.push(object);
  }

  updateObject = (delta, params) => {
    this.objectArray.map(obj =>
      obj.animate(delta, params)
    )
  }

}

export default SceneManager;