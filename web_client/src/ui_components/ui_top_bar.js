import React, {Component} from 'react';
import './css/ui_top_bar.css';

class UITopBar extends Component {

  render() {
    return (
        <div id="myTopNav" className="topNav">
          <div><a href="#">Login</a></div>
          <div><a href="#">Ranking</a></div>
          <div><a href="#">About</a></div>
        </div>
    );
  }

}

export default UITopBar;