/*

  Main Scene 에서 사용하는 Rendering 옵션 config file.

*/

module.exports = {

  DefaultRenderer : {
    clearColor : 0x000000,
    physicallyCorrectLights : false
  },

  DefaultCamera : {
    fov : 50,
    near : 0.1,
    far : 10000,
    position : {
      x : 0,
      y : 1000,
      z : 4000
    },
    lookAt : {
      x : 0,
      y : 1000,
      z : 0
    }
  },

  ClosedCamera : {
    fov : 50,
    near : 0.1,
    far : 10000,
    position : {
      x : 0,
      y : 0,
      z : 4500
    },
    lookAt : {
      x : 0,
      y : 0,
      z : 0
    }
  },

  DefaultLight : {
    color : 0xFFFFFF,
    intensity : 10,
    position : {
      x : 0,
      y : 0,
      z : 0
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