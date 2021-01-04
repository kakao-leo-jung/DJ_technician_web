import React, {Component} from 'react';
import UITopBar from './ui_top_bar'
// import UILeftBar from './ui_left_bar';

class UIScene extends Component {

  render() {
    return (
        <div>
          {/*<UILeftBar/>*/}
          <UITopBar/>
        </div>
    );
  }

}

export default UIScene;