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
  }

  componentDidMount() {
    this.initSoundPlayer(new SoundPlayer());



  }

  initSoundPlayer = (soundPlayer) => {
    soundPlayer.setControlUI(this.soundBar);
    soundPlayer.setRenderedUI(this.currentScene);
    soundPlayer.loadList();
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