import React, { Component, Fragment } from "react";

import { View, StatusBar, Animated,Easing } from "react-native";
import { Colors } from "UIProps/Colors";
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
  
  import {createStackNavigator} from 'react-navigation-stack'

import WebviewContainer from 'Screens/WebviewContainer'

let transitionSpeed = 650;
let tabIconSize = 18;


const home = createStackNavigator({
  WebviewContainer: {
    screen: WebviewContainer,
    navigationOptions: {
      header: null
    }
  }
});

const TopLevelNavigator = createSwitchNavigator(
  {
    home,
  },
 
);
const AppContainer = createAppContainer(TopLevelNavigator);

export default class AppRoot extends Component {
  render() {
    return (
        <View style={styles.container}>
          <AppContainer />
        </View>
    );
  }
}

const styles = {

  container: {
    flex: 1
  }
}
