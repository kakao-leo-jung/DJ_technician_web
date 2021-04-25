import React, {Component} from 'react';
import './css/ui_top_bar.css';
import UIContent from "./ui_contents";

class UITopBar extends Component {

  constructor(props) {
    super(props);
  }

  togglePageView(view) {
    let nextVisibility = true;
    if(this.props.currentView === view) {
      nextVisibility = !this.props.visibility;
    }
    this.props.togglePageView(view, nextVisibility);
  }

  render() {
    return (
        <div id="myTopNav" className="topNav">
          <div><a onClick={() => this.togglePageView('login')}>Login</a></div>
          <div><a onClick={() => this.togglePageView('ranking')}>Rank</a></div>
          <div><a onClick={() => this.togglePageView('about')}>About</a></div>
        </div>
    );
  }

};

export default UITopBar;