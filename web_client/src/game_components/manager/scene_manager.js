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

  /**
   * Scene 에 오브젝트를 추가하고
   * 따로 관리 리스트에 추가한다.
   * @param object
   */
  addObject = (object) => {
    this.scene.add(object);
    this.objectArray.push(object);
  }

  /**
   * 오브젝트 모음을 받아 개별 오브젝트를 Scene 에 추가한다.
   * 단, objectModule 은 반드시 array 타입의 objects 변수와 animate 함수가 작성되어 있어야 한다.
   * @param objectModule
   */
  addObjectModule = (objectModule) => {
    if(Array.isArray(objectModule.objects)
        && typeof objectModule.animate === 'function') {
      objectModule.objects.forEach(object => {
        console.log(object);
        this.scene.add(object);
      });
      this.objectArray.push(objectModule);
    }
  }

  /**
   * objectArray 에 속한 Object, ObjectModule 의 상태값을
   * 개별적으로 update 한다.
   * @param delta
   * @param params
   */
  updateObject = (delta, params) => {
    this.objectArray.map(obj =>
      obj.animate(delta, params)
    )
  }

}

export default SceneManager;