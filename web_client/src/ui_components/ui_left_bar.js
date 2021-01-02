import React, {Component} from 'react';
import './css/ui_left_bar.css';

class UILeftBar extends Component {

  render() {
    return (
        <div id="mySidenav" className="sidenav">
          <div><a href="#">SideMenu1</a></div>
          <div><a href="#">SideMenu2</a></div>
          <div><a href="#">SideMenu3</a></div>
          <div><a href="#">SideMenu4</a></div>
        </div>
    );
  }

}

export default UILeftBar;