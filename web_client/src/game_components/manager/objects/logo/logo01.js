import LogoConfig from 'game_components/options/logo_config';
import * as THREE from 'three';

/**
 * Logo Type 01
 */
class Logo01 {

  objects;
  config;

  constructor(config, font) {
    this.objects = [];
    this.config = config;
    this.#setLogo01(config, font);
  }

  static createLogo01 = async (config) => {
    const loader = new THREE.FontLoader();
    const font = await loader.loadAsync(config.fontUrl);
    return new Logo01(config, font);
  }


  #setLogo01 = (config, font) => {
    const textObject = new THREE.Mesh(
        this.#setGeometryLogo01(config, font),
        this.#setMaterialLogo01(config)
    );
    textObject.position.set(config.position.x, config.position.y, config.position.z);
    this.objects.push(textObject);
  }

  #setGeometryLogo01 = (config, font) => {
    const shapes = font.generateShapes(config.text,config.size);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    return geometry;
  }

  #setMaterialLogo01 = (config) => {
    return new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: config.transparent,
      opacity: config.opacity,
      side: config.side
    });
  }


/*
  const color = 0x006699;

  const matDark = new THREE.LineBasicMaterial( {
    color: color,
    side: THREE.DoubleSide
  } );

  const matLite = new THREE.MeshBasicMaterial( {
    color: color,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide
  } );

  const message = "   Three.js\nSimple text.";

  const shapes = font.generateShapes( message, 100 );

  const geometry = new THREE.ShapeGeometry( shapes );

  geometry.computeBoundingBox();

  const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

  geometry.translate( xMid, 0, 0 );

  // make shape ( N.B. edge view not visible )

  const text = new THREE.Mesh( geometry, matLite );
  text.position.z = - 150;
  scene.add( text );

  // make line shape ( N.B. edge view remains visible )

  const holeShapes = [];

  for ( let i = 0; i < shapes.length; i ++ ) {

  const shape = shapes[ i ];

  if ( shape.holes && shape.holes.length > 0 ) {

  for ( let j = 0; j < shape.holes.length; j ++ ) {

  const hole = shape.holes[ j ];
  holeShapes.push( hole );

}

}

}

shapes.push.apply( shapes, holeShapes );

const lineText = new THREE.Object3D();

for ( let i = 0; i < shapes.length; i ++ ) {

  const shape = shapes[ i ];

  const points = shape.getPoints();
  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  geometry.translate( xMid, 0, 0 );

  const lineMesh = new THREE.Line( geometry, matDark );
  lineText.add( lineMesh );

}

*/

  animate = (delta) => {

  }


}

export default Logo01;