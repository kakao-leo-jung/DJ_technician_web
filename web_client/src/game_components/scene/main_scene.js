import React, {Component, createRef} from 'react';
import LoginScene from "game_components/scene/login/login_scene";
import SoundBar from "sound_components/sound_bar";
import SoundPlayer from "sound_components/sound_player";

class MainScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScene: LoginScene,
      soundPlayer: {},
      soundPlayerFrame: {},
      soundVisualFrame: []
    }
    this.soundBar = createRef();
    this.currentScene = createRef();
    this.soundPlayer = new SoundPlayer(this);
  }

  componentDidMount() {
    this.initSoundPlayer(this.soundPlayer);
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop = () => {
    this.loopId = window.requestAnimationFrame(() => this.doUpdateLoop());
  }

  stopLoop = () => {
    window.cancelAnimationFrame(this.loopId);
  }

  doUpdateLoop = () => {
    this.handleUpdatePlayerStatePerFrame(this.soundPlayer.getUpdatePlayerStatePerFrame())
    this.startLoop();
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

  handleUpdatePlayerStatePerFrame = (player) => {
    this.setState({
      soundPlayerFrame: player.soundBarState,
      soundVisualFrame: player.visualData
    });

  }

  render() {
    return (
        <div>
          <this.state.currentScene
              ref={this.currentScene}
              soundVisualFrame={this.state.soundVisualFrame}
          />
          {/*Drawing Sound Bar Components*/}
          <div style={{position : 'relative'}}>
            <SoundBar
                ref={this.soundBar}
                soundPlayer={this.state.soundPlayer}
                soundPlayerFrame={this.state.soundPlayerFrame}
            />
          </div>
        </div>
    );
  }

}

export default MainScene;