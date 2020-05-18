import React, {Component} from 'react';
import PhoneForm from './components/PhoneForm';
import './App.css';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 3;
  state = {
    information : [
      {
        id : 1,
        name : '정근화',
        phone : '01048518057'
      },
      {
        id : 2,
        name : '홍소희',
        phone : '01022372752'
      }
    ]
  }

  handleCreate = (data) => {
    const {information} = this.state;
    this.setState({
      information : information.concat({
        id : this.id++,
        name : data.name,
        phone : data.phone
      })
    });
  }

  render(){
    return(
      <div>
        <PhoneForm
          OnCreateProps={this.handleCreate}
        />
        <PhoneInfoList data={this.state.information} />
      </div>
    );
  }

}

export default App;
