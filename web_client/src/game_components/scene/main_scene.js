import React, {Component, createRef} from 'react';
import LoginScene from "game_components/scene/login_scene";
import SoundBar from "sound_components/sound_bar";
import SoundPlayer from "sound_components/sound_player";
import GameScene from "./game_scene";

class MainScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScene: LoginScene,
      soundPlayer: {}
    }
    this.soundBar = createRef();
    this.currentScene = createRef();
  }

  componentDidMount() {
    let soundPlayer = new SoundPlayer(this);
    this.initSoundPlayer(soundPlayer);


  }

  componentWillUnmount() {
    // this.stopLoop();
  }

  initSoundPlayer = (soundPlayer) => {
    soundPlayer.initPlayer();
    soundPlayer.loadList();
  }

  handleUpdatePlayerState = (player) => {
    this.setState({
      soundPlayer: player
    });
  }

  render() {
    return (
        <div>
          <this.state.currentScene ref={this.currentScene} />
          {/*Drawing Sound Bar Components*/}
          <div style={{position : 'relative'}}>
            <SoundBar ref={this.soundBar} soundPlayer={this.state.soundPlayer}/>
          </div>
        </div>
    );
  }

}

export default MainScene;