import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import config from 'game_components/options/renderer_config';

const setDefaultOrbitControl = (sceneManager, camera, renderer) => {

  const lookAtConfig = config.DefaultCamera.lookAt;

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target = new THREE.Vector3(lookAtConfig.x, lookAtConfig.y, lookAtConfig.z);
  orbitControls.saveState();
  orbitControls.animate = (delta) => {
    orbitControls.update()
  }

}

export {setDefaultOrbitControl}