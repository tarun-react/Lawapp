import {
  Alert,
  AsyncStorage,
  BackHandler,
  Platform,
  Linking,
  LayoutAnimation,
  ToastAndroid
} from "react-native";
import axios from "react-native-axios";

import { NavigationActions, StackActions } from "react-navigation";
import Snackbar from "react-native-snackbar";
import { Colors } from "UIProps/Colors";

let counter = 2;
const HelperMethods = {
  showAlert: function(
    message,
    btnPositive,
    btnNegative,
    onPress_btnNegative,
    onPress_btnPositive,
    buttonNeutral,
    onPressNeutral
  ) {
    Alert.alert(
      "Alert",
      message,
      [
        buttonNeutral != undefined && {
          text: buttonNeutral,
          onPress: () => onPressNeutral()
        },

        {
          text: btnNegative,
          onPress:
            onPress_btnNegative == "" ? () => {} : () => onPress_btnNegative(),
          style: "cancel"
        },
        { text: btnPositive, onPress: () => onPress_btnPositive() }
      ],
      { cancelable: false }
    );
  },

  animateLayout: function() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },

  isPlatformAndroid: function() {
    return Platform.OS == "android";
  },

  isPlatformIos: function() {
    return Platform.OS == "ios";
  },

  makeNetworkCall_post: function(apiName, formData, callBack) {
    // let baseUrl = 'http://www.travygge.com/api/' //production
    let baseUrl = "http://35.154.158.88/api/"; //test

    axios({
      url: baseUrl + apiName,
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        callBack(response.data, false);
      })
      .catch(error => {
        callBack(`${error}`, true);
      });
  },

  makeNetworkCall_get: function(apiName, callBack) {
    // let baseUrl = 'http://www.travygge.com/api/' //production
    let baseUrl = "http://35.154.158.88/api/"; //test
    axios({
      url: baseUrl + apiName,
      method: "GET"
    })
      .then(response => {
        callBack(response.data);
      })
      .catch(error => {
        console.warn(error);
      });
  },

  logout: function(navigation) {
    AsyncStorage.setItem("loggedIn", "false").then(() => {
      UserDataHolder.username = "";
      UserDataHolder.profile = "";
      UserDataHolder.id = "";
      UserDataHolder.contact = "";
      UserDataHolder.email = "";
      UserDataHolder.unreadNotifications = 0;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "login" })]
      });
      navigation.dispatch(resetAction);
    });
  },

  navigateHome: function(
    navigation,
    id,
    fullname,
    email,
    auth_token,
    profile,
    mobile,
    gender,
    noh,
    nob,
    nor,
    penaltyStatus,
    refCode,
    credentialLogin,
    adhaar
  ) {
    UserDataHolder.credentialLogin = credentialLogin;
    UserDataHolder.id = id;
    UserDataHolder.username = fullname;
    UserDataHolder.email = email;
    UserDataHolder.authToken = auth_token;
    UserDataHolder.profile = profile;
    UserDataHolder.contact = mobile;
    UserDataHolder.nob = nob;
    UserDataHolder.noh = noh;
    UserDataHolder.nor = nor;
    UserDataHolder.penaltyStatus = penaltyStatus;
    UserDataHolder.refCode = refCode;
    UserDataHolder.adhaar = adhaar;

    AsyncStorage.setItem("id", id);
    AsyncStorage.setItem("fullname", fullname);
    AsyncStorage.setItem("gender", gender);
    AsyncStorage.setItem("mobile", mobile);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("profile", profile);
    AsyncStorage.setItem("loggedIn", "true");
    AsyncStorage.setItem("noh", noh);
    AsyncStorage.setItem("nor", nor);
    AsyncStorage.setItem("nob", nob);
    AsyncStorage.setItem("refCode", refCode);
    AsyncStorage.setItem("penaltyStatus", penaltyStatus);
    AsyncStorage.setItem("credentialLogin", credentialLogin);
    AsyncStorage.setItem("adhaar", adhaar);
    AsyncStorage.setItem(constants.constant_appLaunched, "true");
    AsyncStorage.setItem("authToken", auth_token).then(() => {
      if (UserDataHolder.username == "") {
        alert("Please set user data in UserDataHolder model to navigate home");
        return;
      } else {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "home",
              params: { loginData: UserDataHolder }
            })
          ]
        });
        navigation.dispatch(resetAction);
      }
    });
  },

  snackbar: function(message, actionFuncTitle, actionFunc, length) {
    let snackLen =
      length == "short" ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG;
    Snackbar.show({
      title: message,
      duration: snackLen,
      action: {
        title: actionFuncTitle,
        color: Colors.accent,
        onPress: () => {
          actionFunc();
        }
      }
    });
  },

  capitailizeFirst: (String.prototype = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }),

  openGMaps: function(lat, lng, label) {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  },

  formatAMPM: function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  },

  makeCall: function(mob) {
    Linking.openURL(`tel:${mob}`);
  },

  openAppinPS: function(packageName) {
    Linking.openURL("market://details?id=" + packageName + "&hl=en");
  },

  appExitPrompter: function() {
    if (counter == 2) {
      setTimeout(() => {
        counter = 2;
      }, 2000);
      ToastAndroid.show("Press again to Quit", 1000);
    }
    counter -= 1;
    if (counter == 0) BackHandler.exitApp();
  },

 
};

export default HelperMethods;
