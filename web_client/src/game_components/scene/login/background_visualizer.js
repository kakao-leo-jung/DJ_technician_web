import React from 'react'

class BackgroundVisualizer extends React.Component {

  render() {
    return(
        <div>
          <this.state.currentScene
              ref={this.currentScene}
              soundVisualFrame={this.state.soundVisualFrame}
          />
        </div>
    );
  }

}

export default BackgroundVisualizer;