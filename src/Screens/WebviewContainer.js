import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  Text
} from 'react-native';
import {WebView} from 'react-native-webview';
import PushNotification from 'ServiceProviders/PushNotfication';
import BackHandlerSingleton from 'ServiceProviders/BackHandlerSingleton';
import HelperMethods from 'Helpers/Methods'
import Container from 'AppLevelComponents/UI/Container'
let homePage = 'https://lawapp.sg/'
let dashboard = 'https://lawapp.sg/dashboard/'
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
      return (
        <Container>
        <WebView
        ref={webview => this.webview = webview }
          startInLoadingState
          onNavigationStateChange={(state)=>this._onNavigationStateChange(state)}
          source={{uri: `${homePage}?diviceId=${this.state.token}&divice_type=${Platform.OS}`}}
        />
        </Container>
      );
    
  }

  onBackPress = () => {
    if(currentUrl == `${homePage}?diviceId=${this.state.token}&divice_type=${Platform.OS}` || currentUrl == dashboard){
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
