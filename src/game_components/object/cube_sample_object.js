import * as THREE from 'three';

class CubeSampleObject extends THREE.Mesh {

  constructor(){
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    super(geometry, material);
  }

  animate = () => {
    this.rotation.x += 0.05;
    this.rotation.y += 0.05;
  }

}

export default CubeSampleObject;