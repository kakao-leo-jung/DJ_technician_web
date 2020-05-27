import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const setDefaultOrbitControl = (sceneManager, camera, renderer) => {

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.animate = (delta) => {
    orbitControls.update()
  }
  sceneManager.addObject(orbitControls);

}

export {setDefaultOrbitControl}