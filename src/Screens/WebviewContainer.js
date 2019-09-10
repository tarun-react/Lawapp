import React, { Component } from "react";
import { Text, View, ActivityIndicator, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import {WebView} from 'react-native-webview'
import PushNotification from 'ServiceProviders/PushNotfication'
class WebviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
    };
  }

 
  render() {
    return (
      <>
      {this.state.isLoading ? 
      <ActivityIndicator size='large' color='#000' />
      :
        <WebView startInLoadingState  source={{uri:'http://staging.lawapp.sg:8000/dashboard/'}}   />
      }
        <PushNotification />
        </>
    );
  }
}

export default WebviewContainer
