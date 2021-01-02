import React, {Component} from 'react';
import * as THREE from 'three';
import CubeSampleObject from '../object/cube_sample_object';
import SceneManager from '../manager/scene_manager';
import GalaxySampleObject from '../object/galaxy_sample_object';

class MainScene extends Component {

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const sceneManager = new SceneManager(new THREE.Scene());

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000)
    camera.angle = 0;
    camera.radius = 200;
    camera.add(new THREE.PointLight(0xffffff, 1));
    camera.animate = () => {
      var speed = Date.now() * 0.00050;
      camera.position.x = Math.cos(speed) * camera.radius;
      camera.position.z = Math.sin(speed) * camera.radius;
      // camera.position.z = camera.radius;
      camera.lookAt(0, 0, 0);
    }
    sceneManager.addObject(camera);


    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor('#0e0e0e')
    renderer.setSize(width, height)


    /* Add Objects on SceneManager - 곧 분리해야함, 렌더링 테스트용 */
    sceneManager.addObject(new CubeSampleObject());
    const anotherCube = new CubeSampleObject();
    anotherCube.position.x = 50;
    sceneManager.addObject(anotherCube);
    sceneManager.addObject(new GalaxySampleObject());
    const ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.animate = () => {
    }
    sceneManager.addObject(ambientLight);

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
            className="main_scene"
            ref={mount => {
              this.mount = mount
            }}
        />
    )
  }

}

export default MainScene;

