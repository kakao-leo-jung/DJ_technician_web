import React from 'react';


class UILoginContent extends React.Component{

  NAVER_OAUTH_URI = 'https://nid.naver.com/oauth2.0/authorize';
  NAVER_CLIENT_ID = 'T2JKT2ILXjYiMN4NBAUY';
  KAKAO_OAUTH_URI = 'https://kauth.kakao.com/oauth/authorize';
  KAKAO_CLIENT_ID = 'ea2b5ca25f1bf62d66c6430fddc183e0';

  REDIRECT_URI = 'http://localhost:3000/user/oauth/callback'

  componentDidMount() {



  }

  callNaverOauthLogin = () => {
    const state = this.setStateCookie();
    window.location.href = this.NAVER_OAUTH_URI
                            + '?response_type=code'
                            + '&client_id=' + this.NAVER_CLIENT_ID
                            + '&redirect_uri=' + this.REDIRECT_URI
                            + '&state=' + state;
  }

  callKakaoOauthLogin = () => {
    const state = this.setStateCookie();
    window.location.href = this.KAKAO_OAUTH_URI
                            + '?response_type=code'
                            + '&client_id=' + this.KAKAO_CLIENT_ID
                            + '&redirect_uri=' + this.REDIRECT_URI
                            + '&state=' + state;
  }

  setStateCookie = () => {
    const randomString = Math.random().toString(36).substr(2, 21);
    const date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
    document.cookie = 'STATE=' + randomString + ';expires=' + date.toUTCString() + ';path=/';
    return randomString;
  }

  getStateCookie = () => {
    const value = document.cookie.match('(^|;) ?STATE=([^;]*)(;|$)');
    return value? value[2] : null;
  }

  render() {
    return (
        <div>
          <h1>로그인 화면 입니다.</h1>
          <a onClick={this.callNaverOauthLogin}><img height='40' src='/naverlogin.PNG'/></a>
          <a onClick={this.callKakaoOauthLogin}><img height='40' src='/kakaologin.png'/></a>
        </div>
    );
  }

}

export default UILoginContent;