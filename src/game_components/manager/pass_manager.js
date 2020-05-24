import * as THREE from 'three';
import config from 'game_components/options/renderer_config';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const setNeonPass = (composer, scene, camera, size) => {
  composer.addPass(new RenderPass(scene, camera));
  // composer.addPass(getUnrealBloomPass(size));
}

const getUnrealBloomPass = (size) => {  
  const unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(size.width, size.height),
    config.BloomPass.vector.x,
    config.BloomPass.vector.y,
    config.BloomPass.vector.z
  );
  unrealBloomPass.exposure = config.BloomPass.params.exposure;
  unrealBloomPass.threshold = config.BloomPass.params.bloomThreshold;
  unrealBloomPass.strength = config.BloomPass.params.bloomStrength;
  unrealBloomPass.radius = config.BloomPass.params.bloomRadius;
  return unrealBloomPass;
}

export {setNeonPass}