import * as THREE from 'three';

class Line extends THREE.Line {

  /**
   * Line 기본 오브젝트
   * @param color
   * @param position [Vector3, Vector3, Vector3]
   */
  constructor(color, position) {
    const material = new THREE.LineBasicMaterial({color});
    const geometry = new THREE.BufferGeometry().setFromPoints(position);
    super(geometry, material);
  }

  /**
   * Animate Line object
   * @param delta 이전 Frame 과 현재 Frame 사이의 시간 차이
   */
  animate = (delta, visualizerParams) => {

  }

}

export default Line;