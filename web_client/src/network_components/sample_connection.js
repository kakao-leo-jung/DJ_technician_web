import React, {Component} from 'react';
import SocketJsClient from 'react-stomp';
import connectionConfig from 'config/connectionConfig.json';

class SampleConnection extends Component {

  sendMessage = (message, selfMsg) => {
    console.log('[sendMessage] : trying send Message, ' + selfMsg);
    try {
      const send_message = {
        name: selfMsg.name
      }
      this.clientRef.sendMessage("/app/hello", JSON.stringify(send_message));
      return true;
    } catch (e) {
      console.log('[sendMessage][ERROR] : ' + e);
      return false;
    }
  }

  onConnect = () => {
    console.log('[onConnect] : Connected with game server');
    if (this.sendMessage('dfdf', {name: 'JKH'})) {
      console.log('[onConnect] : sendMessage success');
    } else {
      console.log('[onConnect] : sendMessage failed');
    }
    ;
  }

  onDisconnect = () => {
    console.log('[onDisconnect] : disconnected with game server');
  }

  onMessageReceive = (message, topic) => {
    console.log('[onMessageReceive] : ' + JSON.stringify(message));
    console.log('[onMessageReceive] : ' + topic);
  }


  render() {
    return (
        <div>
          <SocketJsClient
              // url='http://localhost:8080/socket'
              url={connectionConfig.socketServerUrl}
              topics={['/topic/greetings']}
              onConnect={this.onConnect}
              onDisconnect={this.onDisconnect}
              onMessage={this.onMessageReceive}
              ref={(client) => {
                this.clientRef = client
              }}
          />
        </div>
    );
  }

}

export default SampleConnection;