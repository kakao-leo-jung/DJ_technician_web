import * as THREE from 'three';

class SceneManager {

  constructor(scene) {
    this.scene = scene;
    this.objectArray = [];
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