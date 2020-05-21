import React, {Component} from 'react';
import * as THREE from 'three';
import CubeSampleObject from '../object/cube_sample_object';
import SceneManager from '../manager/scene_manager';

class MainScene extends Component {

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const sceneManager = new SceneManager(new THREE.Scene());

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor('#0e0e0e')
    renderer.setSize(width, height)
    camera.position.z = 10


    sceneManager.addObject(new CubeSampleObject());

    this.sceneManager = sceneManager;
    this.camera = camera
    this.renderer = renderer

    window.addEventListener('resize', this.handleResize)

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    window.removeEventListener('resize')
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  handleResize = () => {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.renderer.setSize(width, height)
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

  animate = () => {
    this.sceneManager.animateObject();

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.sceneManager.scene, this.camera)
  }

  render() {
    return (
      <div
        className = "main_scene"
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }

}

export default MainScene;

