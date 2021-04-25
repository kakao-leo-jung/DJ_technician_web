import React from 'react';
import UILoginContent from "./ui_loginContent";
import './css/ui_contents.css';
import UIRankingContent from "./ui_rankingContent";
import UIAboutContent from "./ui_aboutContent";

class UIContent extends React.Component {

  constructor(props) {
    super(props);

  }



  render() {
    return(
        <div
            className="contentsDiv"
            style={this.props.visibility  ? {} : {display : 'none'}}
        >
          {this.props.currentView === 'login' ? <UILoginContent/> : null}
          {this.props.currentView === 'ranking' ? <UIRankingContent/> : null}
          {this.props.currentView === 'about' ? <UIAboutContent/> : null}
        </div>
    )
  }

}

export default UIContent;