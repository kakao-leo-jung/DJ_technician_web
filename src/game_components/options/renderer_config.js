/*

  Main Scene 에서 사용하는 Rendering 옵션 config file.

*/

module.exports = {

  DefaultRenderer : {
    clearColor : 0x1f1f1f
  },

  DefaultCamera : {
    fov : 50,
    near : 0.1,
    far : 5000,
    position : {
      x : 0,
      y : 0,
      z : 2000
    }
  },

  DefaultLight : {
    color : 0xFFFFFF,
    intensity : 3,
    position : {
      x : 0,
      y : 2000,
      z : 2000
    }
  },

  BloomPass : {
    params : {
      exposure: 0,
      bloomStrength: 0.6,
      bloomThreshold: 0,
      bloomRadius: 0
    },
    vector : {
      x : 1.0,
      y : 0.2,
      z : 0.5
    }
  }

}