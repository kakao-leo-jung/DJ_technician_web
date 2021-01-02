import React, {Component} from 'react';
import * as THREE from 'three';
import config from 'game_components/options/renderer_config';
import SceneManager from 'game_components/manager/scene_manager';
import * as PassManager from 'game_components/manager/pass_manager';
import * as ObjectManager from 'game_components/manager/object_manager';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import * as CameraManager from 'game_components/manager/camera_manager';

class MainScene extends Component {

  componentDidMount() {

    const clientWidth = this.mount.clientWidth;
    const clientHeight = this.mount.clientHeight;

    /* 1. Set Renderer */
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(config.DefaultRenderer.clearColor);
    this.renderer = renderer;

    /* 2. set SceneManager */
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
    camera.position.set(cameraConfig.position.x, cameraConfig.position.y, cameraConfig.position.z);
    camera.lookAt(new THREE.Vector3(cameraConfig.lookAt.x, cameraConfig.lookAt.y, cameraConfig.lookAt.z));
    this.camera = camera;

    /* 3-1 set camera OrbitControls */
    CameraManager.setDefaultOrbitControl(this.sceneManager, this.camera, this.renderer);

    /* 4. setLight */
    const lightConfig = config.DefaultLight;
    const light = new THREE.PointLight(lightConfig.color, lightConfig.intensity);
    light.position.set(lightConfig.position.x, lightConfig.position.y, lightConfig.position.z);
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

    /* 6. setObjects */
    ObjectManager.setInGameObjects(this.sceneManager);

    /* 7. set Resizable */
    window.addEventListener('resize', this.handleResize)

    /* 8. mount this as DOM React Component */
    this.mount.appendChild(this.composer.renderer.domElement);
    this.clock = new THREE.Clock();
    this.delta = this.clock.getDelta();
    this.start();

  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop()
    this.mount.removeChild(this.composer.renderer.domElement);
  }

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.sceneManager.updateObject(this.delta = this.clock.getDelta());
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.composer.render();
  }

  render() {
    return (
        <div
            className="main_scene"
            ref={mount => {
              this.mount = mount
            }}
        />
    );
  }
}

export default MainScene;