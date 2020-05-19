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

  handleRemove = (data) => {
    const {information} = this.state;
    this.setState({
      information : information.filter(
        infoObject => infoObject.id != data.id
      )
    });
  }

  render(){
    return(
      <div>
        <PhoneForm
          onCreateProps={this.handleCreate}
        />
        <PhoneInfoList
          data={this.state.information}
          onRemoveProps={this.handleRemove}
        />
      </div>
    );
  }

}

export default App;
