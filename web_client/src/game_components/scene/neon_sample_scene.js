import React, {Component} from 'react';
import * as THREE from 'three';
import SceneManager from '../manager/scene_manager';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';

class NeonSampleScene extends Component {

  componentDidMount() {

    /* Set Full Size */
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    /* Set renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
		renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setSize(width, height);

    /* Set Camera */
    const fov = 50;
    const aspect = width / height;  // the canvas default
    const near = 0.1;
    const far = 2000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 15;

    /* Set SceneManager */
    const sceneManager = new SceneManager(new THREE.Scene());

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.PointLight(color, intensity);
      camera.add(light);
      sceneManager.scene.add(camera);
    }

    /* Set Composer */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(sceneManager.scene, camera));
    var params = {
      exposure: 2,
      bloomStrength: 2,
      bloomThreshold: 0,
      bloomRadius: 0
    };
    const unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth,window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    unrealBloomPass.threshold = params.bloomThreshold;
    unrealBloomPass.strength = params.bloomStrength;
    unrealBloomPass.radius = params.bloomRadius;
    composer.addPass(unrealBloomPass);


    /* Set BoxObjects */
    const boxWidth = 2;
    const boxHeight = 0.8;
    const boxDepth = 0.5;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      cube.animate = () => {
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.003;
      }
      cube.position.x = x;
      sceneManager.addObject(cube);
      return cube;
    }
    makeInstance(geometry, 0x44aa88, 0);
    makeInstance(geometry, 0x8844aa, -5);
    makeInstance(geometry, 0xaa8844, 5);


    window.addEventListener('resize', this.handleResize)
    this.sceneManager = sceneManager;
    this.camera = camera;
    this.composer = composer;
    this.renderer = renderer;
    this.then = 0;
    this.mount.appendChild(this.composer.renderer.domElement);
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
        className = "neon_sample_scene"
        ref={mount => {
          this.mount = mount
        }}
      />
    );
  }

}

export default NeonSampleScene;