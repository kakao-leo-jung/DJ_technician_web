import React, {Component} from 'react';
import LoginScene from "game_components/scene/login_scene";
import SoundBar from "../../sound_components/sound_bar";
import SoundPlayer from "../../sound_components/sound_player";

class MainScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScene : LoginScene
    }
    this.SoundPlayer = new SoundPlayer();
  }

  render() {
    return (
        <div>
          <this.state.currentScene />
          {/*Drawing Sound Bar Components*/}
          <div style={{position : 'relative'}}>
            <SoundBar />
          </div>
        </div>
    );
  }

}

export default MainScene;