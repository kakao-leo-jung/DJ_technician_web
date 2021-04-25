import React, {Component} from 'react';
import UITopBar from './ui_top_bar'
import UIContent from "./ui_contents";
// import UILeftBar from './ui_left_bar';

class UIScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibility : false,
      currentView : 'default'
    };
  }

  togglePageView = (view, visibility) => {
    this.setState({
      currentView : view,
      visibility : visibility
    });
  }

  render() {
    return (
        <div>
          {/*<UILeftBar/>*/}
          {<UITopBar
              togglePageView = {this.togglePageView}
              currentView = {this.state.currentView}
              visibility = {this.state.visibility}
          />}
          <UIContent
              currentView = {this.state.currentView}
              visibility = {this.state.visibility}
          />
        </div>
    );
  }

}

export default UIScene;