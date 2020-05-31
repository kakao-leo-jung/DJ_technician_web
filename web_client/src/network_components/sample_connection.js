import React, {Component} from 'react';
import SocketJsClient from 'react-stomp';

class SampleConnection extends Component {

  sendMessage = (message, selfMsg) => {
    console.log('trying send Message, ' + selfMsg);
    try {
      const send_message = {
        name : selfMsg.name
      }
      this.clientRef.sendMessage("/app/hello", JSON.stringify(send_message));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  onConnect = () => {
    console.log('Connected with game server');
    if(this.sendMessage('dfdf', {name : 'JKH'})){
      console.log('sendMessage success');
    }else{
      console.log('sendMessage failed');
    };
  }

  onDisconnect = () => {
    console.log('disconnected with game server');
  }

  onMessageReceive = (message, topic) => {
    console.log(JSON.stringify(message));
    console.log(topic);
  }



  render() {
    return (
      <div>
        <SocketJsClient
          url='http://localhost:8080/djtechnician'
          topics={['/topic/greetings']}
          onConnect={this.onConnect}
          onDisconnect={this.onDisconnect}
          onMessage={this.onMessageReceive}
          ref={(client) => {this.clientRef = client}}
        />
      </div>
    );
  }

}

export default SampleConnection;