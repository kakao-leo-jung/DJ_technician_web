import * as THREE from 'three';

class SceneManager {

  constructor(scene) {
    this.scene = scene;
    this.objectArray = [];
  }

  addObject = (object) => {
    this.objectArray.push(object);
  }

  animateObject = () => {
    this.objectArray.map(obj => {
      obj.animate();
    })
  }

}

export default SceneManager;