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
    // renderer.setClearColor('#0e0e0e');
    renderer.setSize(width, height);

    /* Set Camera */
    const fov = 50;
    const aspect = width / height;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 8;

    /* Set SceneManager */
    const sceneManager = new SceneManager(new THREE.Scene());

    {
      const color = 0xFFFFFF;
      const intensity = 2;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      light.animate = () => {}
      sceneManager.scene.add(light);
    }

    /* Set Composer */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(sceneManager.scene, camera));
    // const bloomPass = new BloomPass(1, 25, 4, 256);
    // composer.addPass(bloomPass);
    // const filmPass = new FilmPass(
    //   0.35,   // noise intensity
    //   0.025,  // scanline intensity
    //   648,    // scanline count
    //   false,  // grayscale
    // );
    // filmPass.renderToScreen = true;
    // composer.addPass(filmPass);
    var params = {
      exposure: 0,
      bloomStrength: 0.6,
      bloomThreshold: 0,
      bloomRadius: 0
    };
    const unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth,window.innerHeight),
      1.0,
      0.2,
      0.5
    );
    unrealBloomPass.threshold = params.bloomThreshold;
    unrealBloomPass.strength = params.bloomStrength;
    unrealBloomPass.radius = params.bloomRadius;
    composer.addPass(unrealBloomPass);


    /* Set BoxObjects */
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshToonMaterial({ color });
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
    makeInstance(geometry, 0x8844aa, -2);
    makeInstance(geometry, 0xaa8844, 2);


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