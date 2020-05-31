import React, {Component} from 'react';
import './App.css';
import SampleConnection from 'network_components/sample_connection';
import MainScene from 'game_components/scene/main_scene';
import UIScene from 'ui_components/ui_scene';

class App extends Component {

  render(){
    return(
      <div>
        {/* Network Connection Components */}
        <div>
          <SampleConnection />
        </div>
        {/* Drawing Game 3D Rendering Components */}
        <div style={{top: 0, bottom: 0, left: 0, right: 0}}>
          <MainScene />
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