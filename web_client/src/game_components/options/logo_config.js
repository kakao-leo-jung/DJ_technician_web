import {NeonHexaColorSet, NeonColorGroup} from "resource/color";
import * as THREE from 'three';

/**
 * Logo 타입 별 config 값
 * @type {{}}
 */
export default {

  Logo01: {
    text: 'logo01',
    fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json',
    fontName: 'helvetiker',
    fontWeight: 'regular',
    size: 250,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5,
    color: NeonHexaColorSet[NeonColorGroup.PURPLE][0],
    transparent: true,
    opacity: 1.0,
    side: THREE.DoubleSide,
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  }

}