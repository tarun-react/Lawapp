import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Colors } from "UIProps/Colors";
import firebase from "react-native-firebase";
import { withNavigation } from "react-navigation";

 class PushNotification extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      this.props.navigation.navigate('home')
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
  });
}

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body,click_action } = notification;
        const localNotificationSound = new firebase.notifications.Notification({
          sound: "default",
          show_in_foreground: true,
        })

          // .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId("fcm_default_channel") // e.g. the id you chose above
          .android.setSmallIcon('ic_notification') // create this icon in Android Studio
          .android.setColor(Colors.accent)
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications().displayNotification(localNotificationSound);
      });

    const channel = new firebase.notifications.Android.Channel(
      "fcm_default_channel",
      "University",
      firebase.notifications.Android.Importance.High
    ).setDescription("None");
    firebase.notifications().android.createChannel(channel);
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    this.props.tokenSetter(fcmToken)
    console.log(fcmToken);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {}
  }

  render() {
    return null;
  }
}

export default withNavigation(PushNotification)