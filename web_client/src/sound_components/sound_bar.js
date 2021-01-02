import React, {Component} from 'react';
import './css/sound_bar.css';
import SoundManager from "sound_components/sound_manager";

class SoundBar extends Component {

  componentDidMount() {
    this.soundManager = new SoundManager();
    this.soundManager.loadSound();

    const playButton = document.querySelector('#playButton');
    playButton.addEventListener('click', () => {
      this.soundManager.toggleSound();
    });

  }

  render() {
    return (
        <div>
          <div id="myBottomNav" className="bottomNav">
            <div><a id="playButton" href="#">SoundPlay</a></div>
          </div>
        </div>
    );
  }
}

export default SoundBar;