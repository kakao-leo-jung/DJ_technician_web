import * as THREE from 'three';

class Block extends THREE.Mesh {

  constructor(size, color, position) {

    const material = new THREE.MeshPhongMaterial({color});
    const geometry =new THREE.BoxGeometry(size.width, size.height, size.depth);
    super(geometry, material);
    this.setPosition(position);

  }

  setPosition = (pos) => {
    this.position.x = pos.x;
    this.position.y = pos.y;
    this.position.z = pos.z;
  }

  /* delta 는 이전 frame과 현재 frame 사이의 시간 차이 */
  animate = (delta) => {
    const temp_speed = 0;
    this.rotation.x += temp_speed * delta;
    this.rotation.y += temp_speed * delta;
  }
}

export default Block;
