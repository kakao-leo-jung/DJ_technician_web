import React, {Component} from 'react';
import './App.css';
import MainScene from './game_components/scene/main_scene';
import UIScene from './ui_components/ui_scene';
import NeonSampleObjectScene from './game_components/scene/neon_sample_scene';

class App extends Component {

  render(){
    return(
      <div>
        {/* Drawing Game 3D Rendering Components */}
        <div style={{top: 0, bottom: 0, left: 0, right: 0}}>
          {/*<MainScene />*/}
          <NeonSampleObjectScene />
        </div>
        {/* Drawing UI Rendering Components */}
        <div style={{position : 'relative'}}>
          <UIScene />
        </div>
      </div>    
    );
  }

}

export default App;
/*
*/