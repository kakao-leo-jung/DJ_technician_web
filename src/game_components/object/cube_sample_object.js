import * as THREE from 'three';

class CubeSampleObject extends THREE.Mesh {

  constructor(){
    const geometry = new THREE.BoxGeometry(15, 8, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color("red")
        },
        color2: {
          value: new THREE.Color("purple")
        }
      },
      vertexShader: `
        varying vec2 vUv;
    
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
      
        varying vec2 vUv;
        
        void main() {
          
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
      wireframe: true
    });
    super(geometry, material);
  }

  animate = () => {
    // this.rotation.x += 0.1;
    // this.rotation.y += 0.005;
  }

}

export default CubeSampleObject;