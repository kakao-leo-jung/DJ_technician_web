import React, {Component} from 'react';
import * as THREE from 'three';
import config from 'game_components/options/renderer_config';
import SceneManager from "game_components/manager/scene_manager";
import * as CameraManager from "game_components/manager/camera_manager";
import * as ObjectManager from "game_components/manager/object_manager";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import * as PassManager from "game_components/manager/pass_manager";

class LoginScene extends Component {

  componentDidMount() {

    const clientWidth = this.mount.clientWidth;
    const clientHeight = this.mount.clientHeight;

    /* 1. Set Renderer */
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(config.DefaultRenderer.clearColor);
    renderer.physicallyCorrectLights = config.DefaultRenderer.physicallyCorrectLights;
    this.renderer = renderer;

    /* 2. Set SceneManager */
    const sceneManager = new SceneManager(new THREE.Scene());
    this.sceneManager = sceneManager;

    /* 3. Set Camera */
    this.camera = CameraManager.getClosedCamera(clientWidth, clientHeight);
    CameraManager.setClosedOrbitControl(this.sceneManager, this.camera, this.renderer);

    /* 4. setLight */
    const lightConfig = config.DefaultLight;
    const light = new THREE.AmbientLight(lightConfig.color)
    sceneManager.scene.add(light);

    /* 5. setComposer */
    const composer = new EffectComposer(this.renderer);
    PassManager.setNeonPass(
        composer,
        this.sceneManager.scene,
        this.camera,
        {width: clientWidth, height: clientHeight}
    );
    this.composer = composer;

    /* 5. setObjects */
    ObjectManager.setLoginObjects(this.sceneManager);

    /* 6. set Resizable */
    window.addEventListener('resize', this.handleResize);

    /* 7. mount this as DOM React Component */
    this.mount.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.delta = this.clock.getDelta();
    this.start();

  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width/ height;
    this.camera.updateProjectionMatrix();
  }

  start = () => {
    if(!this.frameId){
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.sceneManager.updateObject(
        this.delta = this.clock.getDelta(),
        this.props.soundVisualFrame
    );
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.composer.render();
  }

  render() {
    return (
        <div
            className="login_scene"
            ref={mount => {
              this.mount = mount
            }}
        >
        </div>
    );
  }

}

export default LoginScene;