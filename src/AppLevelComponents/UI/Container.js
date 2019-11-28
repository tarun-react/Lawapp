import React, { Component } from "react";
import { SafeAreaView, ScrollView, StatusBar} from "react-native";
import HelperMethods from "Helpers/Methods";
import EStyleSheet from "react-native-extended-stylesheet";
import {Colors} from "UIProps/Colors";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import { withNavigation } from "react-navigation";
 export default class Container extends Component {

  renderForIOS() {
    let {padding,style,contentPadding,scroll} = this.props
    return (
      <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#fff',color:'#fff' }} />
      <SafeAreaView style={{backgroundColor:Colors.contentCard,flex:1 }}>
      <StatusBar translucent={true} barStyle="dark-content" />
        <ScrollView
        scrollEnabled={scroll}
          style={[styles.container]}
          contentContainerStyle={{flexGrow:1 }}
          keyboardShouldPersistTaps="always"
        >
          {this.props.children}
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }

  renderForAndroid() {
    let {padding,style,contentPadding,scroll} = this.props
    scroll = scroll ? scroll : true
    return (
      <>
      <StatusBar backgroundColor={'#fff'} barStyle="light-content" />
      <ScrollView
      scrollEnabled={scroll}
      style={[styles.container,{padding:padding || 0,...style,backgroundColor:'#fff', }]}
      contentContainerStyle={{flexGrow:1,alignItems: "center",...style,padding:padding == 0 ? 0 : 15, }}
      keyboardShouldPersistTaps="always"
      >
        {this.props.children}
      </ScrollView>
      </>
    );
  }

  render() {
    
    return (
      <>
      {<BackHandlerSingleton  onBackPress={this.props.onBackPress} />}
        {HelperMethods.isPlatformAndroid()
          ? this.renderForAndroid()
          : this.renderForIOS()}
      </>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",

  container: {
    flex: 1,
    
    backgroundColor: Colors.pageBackground
  },

  contentContainerStyle:{
    alignItems: "center",flexGrow:1, paddingBottom:10,
    
    
  }
});
