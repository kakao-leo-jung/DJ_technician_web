import * as THREE from 'three';

class Block extends THREE.Mesh {
O
  constructor(size, color, position) {

    const material = new THREE.MeshPhongMaterial({color});
    const geometry =new THREE.BoxGeometry(size.width, size.height, size.depth);
    super(geometry, material);
    this.position.set(position.x, position.y, position.z);
  }

  /**
   * Set Position
   * @param x
   * @param y
   * @param z
   */
  setPosition = (x, y, z) => {
    this.position.set(x, y, z);
  }


  /**
   * Animate Line object
   * @param delta 이전 Frame 과 현재 Frame 사이의 시간 차이
   */
  animate = (delta) => {
    /*
    const temp_speed = 0;
    // this.position.set(this.position.x, this.position.y + temp_speed * delta, this.position.z);
    this.rotation.x += temp_speed * delta;
    this.rotation.y += temp_speed * delta;
     */
  }
}

export default Block;
