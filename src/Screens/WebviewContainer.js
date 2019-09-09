import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, ScrollView,Animated } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import {WebView} from 'react-native-webview'
import PushNotification from 'ServiceProviders/PushNotfication'
class WebviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <WebView source={{uri:'http://staging.lawapp.sg:8000/dashboard/'}} style={{flex:1}}  />
        <PushNotification />
        </>
    );
  }
}

export default WebviewContainer
