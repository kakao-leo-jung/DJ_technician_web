import React, {Component, createRef} from 'react';
import LoginScene from "game_components/scene/login_scene";
import SoundBar from "sound_components/sound_bar";
import SoundPlayer from "sound_components/sound_player";

class MainScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScene : LoginScene
    }
    this.soundBar = createRef();
    this.currentScene = createRef();
    this.soundPlayer = new SoundPlayer();
  }

  componentDidMount() {
    this.initSoundPlayer(this.soundPlayer);
    this.startLoop();


  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop = () => {
    if(!this._frameId){
      this._frameId = window.requestAnimationFrame(this.doLoopAnimation);
    }
  }

  stopLoop = () => {
    window.cancelAnimationFrame(this._frameId);
  }

  doLoopAnimation = () => {
    this.soundPlayer.doUpdateEachFrame();
    this._frameId = window.requestAnimationFrame(this.doLoopAnimation);
  }

  initSoundPlayer = (soundPlayer) => {
    soundPlayer.setControlUI(this.soundBar);
    soundPlayer.setRenderedUI(this.currentScene);
    soundPlayer.loadList();
    soundPlayer.doUpdateEachFrame();
  }

  render() {
    return (
        <div>
          <this.state.currentScene ref={this.currentScene} />
          {/*Drawing Sound Bar Components*/}
          <div style={{position : 'relative'}}>
            <SoundBar ref={this.soundBar}/>
          </div>
        </div>
    );
  }

}

export default MainScene;