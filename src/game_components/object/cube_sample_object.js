import * as THREE from 'three';

class CubeSampleObject extends THREE.Mesh {

  constructor(){
    
    const geometry = new THREE.BoxGeometry(30, 6, 4)
    const material = new THREE.ShaderMaterial({

    });

    // const composer = new EffectComposer(renderer);

    super(geometry, material);
  }


  animate = () => {
    // this.rotation.x += 0.1;
    // this.rotation.y += 0.005;
  }

}

export default CubeSampleObject;