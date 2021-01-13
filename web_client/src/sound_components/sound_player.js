import {Howl, Howler} from 'howler'
import config from 'config/connectionConfig';
import * as common from "resource/common";

class SoundPlayer {

  constructor() {
    this.bgmPlayer = null;
    this.bgmList = [];
    this.bgmIndex = 0;
    this.bgmOptions = {
      autoPlay : true,
      randomPlay : true
    };
    this.controlUI = null;
    this.renderedUI = null;

  }

  doUpdateEachFrame = () => {
    this.updateStateToControlUI();
  }

  setControlUI = (controlUI) => {
    this.controlUI = controlUI;
  }

  setRenderedUI = (renderedUI) => {
    this.renderedUI = renderedUI;
  }

  updateStateToControlUI = () => {
    if(this.controlUI){
      this.controlUI.current.handleUpdateSoundState({
        bgmList: this.bgmList,
        bgmIndex: this.bgmIndex,
        bgmOptions: this.bgmOptions
      });
    }else{
      console.log('Set controlUI first!');
    }
  }

  loadList = () => {
    const request = new XMLHttpRequest();
    request.open("GET", config.bgmServerUrl + "list", true);
    request.responseType = "json";
    request.onload = () => {
      this.bgmList = request.response.bgmInfoList;
      console.log('success get list');
      console.log(this.bgmList);
      this.setRandomIndex();
      // this.updateStateToControlUI();
    }
    request.send();
  }

  setRandomIndex = () => {
    if(this.bgmOptions.randomPlay){
      this.bgmIndex = common.getRandomInt(0, this.bgmList.length)
    }
  }

  playBackground = () => {
    if(this.bgmList.length > 0){
      const sound = new Howl({
        src : config.bgmServerUrl,
        xhr : {
          method: 'POST',
          body: this.bgmList[this.bgmIndex]
        }
      });
      sound.play();
    }else {
      console.log('No playList, LoadList first!');
    }
  }


}

export default SoundPlayer