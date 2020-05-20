import React, {Component} from 'react';
import PhoneForm from './components/PhoneForm';
import './App.css';
import PhoneInfoList from './components/PhoneInfoList';

/* React X Three Collaboration test */
import * as THREE from 'three';

class App extends Component {

  /* Load Three.js Canvas in React Component */
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );


    /* document 대신 ref 를 사용하여 react Component 로 붙인다. */
    //document.body.appendChild( renderer.domElement );
    this.mount.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

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

  handleUpdate = (data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(info => {
        if(info.id == data.id){
          /* update 하고자 할 info */
          return data;
        }else{
          /* 기존 변동없는 info */
          return info;
        }
      })
    });
  }

  render(){

    console.log('Current App State Changed!');
    this.state.information.map(info => {
      console.log('id : ' + info.id);
      console.log('name : ' + info.name);
      console.log('phone : ' + info.phone);
    });
    console.log('--------------------------------');

    return(
      <div>
        <div style={{position:'absolute'}} ref={ref => (this.mount = ref)} />
        <div style={{position:'relative', color:'white'}}>
          <PhoneForm
            onCreateProps={this.handleCreate}
          />
          <PhoneInfoList
            data={this.state.information}
            onRemoveProps={this.handleRemove}
            onUpdateProps={this.handleUpdate}
          />
    </div>
      </div>    
    );
  }

}

export default App;
/*
*/