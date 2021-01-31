import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import config from 'game_components/options/renderer_config';

export const getClosedCamera = (width, height) => {
  const cameraConfig = config.ClosedCamera;
  const camera = new THREE.PerspectiveCamera(
      cameraConfig.fov,
      width / height,
      cameraConfig.near,
      cameraConfig.far
  );
  camera.position.set(cameraConfig.position.x, cameraConfig.position.y, cameraConfig.position.z);
  camera.lookAt(new THREE.Vector3(cameraConfig.lookAt.x, cameraConfig.lookAt.y, cameraConfig.lookAt.z));
  return camera;
}

export const setDefaultOrbitControl = (sceneManager, camera, renderer) => {
  setOrbitControl(sceneManager, camera, renderer, config.DefaultCamera.lookAt)
}

export const setClosedOrbitControl = (sceneManager, camera, renderer) => {
  setOrbitControl(sceneManager, camera, renderer, config.ClosedCamera.lookAt)
}

const setOrbitControl = (sceneManager, camera, renderer, lookAtConfig) => {
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target = new THREE.Vector3(lookAtConfig.x, lookAtConfig.y, lookAtConfig.z);
  orbitControls.saveState();
  orbitControls.animate = (delta) => {
    orbitControls.update()
  }
}
