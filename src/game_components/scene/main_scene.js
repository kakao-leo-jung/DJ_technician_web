import React, {Component} from 'react';
import * as THREE from 'three';
import config from 'game_components/options/renderer_config';
import SceneManager from 'game_components/manager/scene_manager';
import * as PassManager from 'game_components/manager/pass_manager';
import * as ObjectManager from 'game_components/manager/object_manager';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

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
    {
      const color = 0xFFFFFF;
      const intensity = 5;
      const light = new THREE.PointLight(color, intensity);
      camera.add(light);
      sceneManager.scene.add(camera);
    }
    this.camera = camera;

    /* 4. setComposer */
    const composer = new EffectComposer(this.renderer);
    PassManager.setNeonPass(
      composer,
      this.sceneManager.scene,
      this.camera,
      {width : clientWidth, height : clientHeight}
    );
    this.composer = composer;

    /* 5. setObjects */
    ObjectManager.setInGameObjects(this.sceneManager);

    /* 6. set Resizable */
    window.addEventListener('resize', this.handleResize)

    /* 7. mount this as DOM React Component */
    this.mount.appendChild(this.composer.renderer.domElement);
    this.then = 0;
    this.start();

  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop()
    this.mount.removeChild(this.composer.renderer.domElement);
  }

  handleResize = () => {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.composer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = (now) => {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - this.then;
    this.then = now;
    this.sceneManager.animateObject();
    this.renderScene(deltaTime);
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = (deltaTime) => {
    // this.renderer.render(this.sceneManager.scene, this.camera)
    this.composer.render(deltaTime);
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