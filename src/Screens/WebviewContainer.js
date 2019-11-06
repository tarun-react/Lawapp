import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
import Container from 'AppLevelComponents/UI/Container';
import {WebView} from 'react-native-webview';
import PushNotification from 'ServiceProviders/PushNotfication';
import BackHandlerSingleton from 'ServiceProviders/BackHandlerSingleton';
import HelperMethods from 'Helpers/Methods'

let homePage = 'https://api.lawapp.sg/'
let dashboard = 'https://api.lawapp.sg/dashboard/'
let currentUrl = ''
class WebviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: '',
    };
  }

  setToken(token) {
    this.setState({token});
  }

  _onNavigationStateChange  (webViewState)  {
    let {url} = webViewState
    currentUrl = url
    
  }

  renderWebView() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#000" />;
    } else {
      return (
        <WebView
        ref={webview => this.webview = webview }
          startInLoadingState
          onNavigationStateChange={(state)=>this._onNavigationStateChange(state)}
          source={{uri: `${homePage}?diviceId=${this.state.token} `}}
        />
      );
    }
  }

  onBackPress = () => {
    
    if(currentUrl == `${homePage}?diviceId=${this.state.token}` || currentUrl == dashboard){
      HelperMethods.appExitPrompter()
    } else {

      this.webview.goBack()
    }
  }

  render() {
    return (
      <>
        <PushNotification tokenSetter={token => this.setToken(token)} />
        {this.state.token ? this.renderWebView() : null }
        <BackHandlerSingleton onBackPress={this.onBackPress} />
      </>
    );
  }
}

export default WebviewContainer;
