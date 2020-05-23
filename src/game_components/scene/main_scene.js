import React, {Component} from 'react';
import * as THREE from 'three';
import config from 'game_components/options/renderer_config';
import SceneManager from 'game_components/manager/scene_manager';
import PassManager from 'game_components/manager/pass_manager';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

class MainScene extends Component {

  componentDidMount() {

    const clientWidth = this.mount.clientWidth;
    const clientHeight = this.mount.clientHeight;

    /* 1. Set Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias : true});
    renderer.setSize(clientWidth, clientHeight);
    this.renderer = renderer;

    /* 3. set SceneManager */
    const sceneManager = new SceneManager(new THREE.Scene());
    this.sceneManager = sceneManager;

    /* 3. set Camera */
    const cameraConfig = config.DefaultCamera;
    const camera = new THREE.PerspectiveCamera(
      cameraConfig.fov,
      clientWidth / clientHeight,
      cameraConfig.near,
      cameraConfig.far
    )
    camera.position.z = cameraConfig.position.z;
    this.camera = camera;

    /* 4. setComposer */
    const composer = new EffectComposer(this.renderer);
    PassManager.setNeonPass(
      composer,
      this.sceneManager.scene,
      this.camera,
      {width : clientWidth, height : clientHeight}
    );


  }

  render() {
    return (
      <div
        className="neon_sample_scene"
        ref={mount => {
          this.mount = mount
        }}
      />
    );
  }
}

export default MainScene;