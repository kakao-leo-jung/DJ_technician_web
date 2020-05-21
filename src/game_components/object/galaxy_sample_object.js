import * as THREE from 'three';

class GalaxySampleObjects extends THREE.ParticleSystem {

  constructor(){
    
    var particleCount = 500;
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({
      color: 0xeeeeee,
      size: 1.5,
    });
    
    for(var p = 0; p < particleCount; p++){
      let pX = Math.random() * 600 - 300;
      let pY = Math.random() * 600 - 300;
      let pZ = Math.random() * 600 - 300;
      let particle = new THREE.Vector3(pX, pY, pZ);
      particle.radius = Math.sqrt(pX * pX + pY * pY);
      particle.pX = pX;
      particle.pY = pY;
      particle.pZ = pZ;
      particle.speed = Math.random() * 15;
      particles.vertices.push(particle);
    }
    super(particles, pMaterial);
    this.particles = particles;

  }

  animate = () => {
    let time = Date.now() * 0.000050;
    var i = 0;
    this.particles.vertices.forEach(particle => {
      let speed = time * particle.speed;
      // console.log('time : ' + time + ' / ' + speed);
      particle.x = (Math.cos(speed) * particle.radius);
      particle.z = (Math.sin(speed) * particle.radius);

    });
    this.geometry.verticesNeedUpdate = true;
  }

}

export default GalaxySampleObjects;