/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{
NSURL *jsCodeLocation;
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  [FIRApp configure];
  [RNFirebaseNotifications configure];  //Add This Line

  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"LawApp"
                                            initialProperties:nil];
   
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  [RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  
  // if ([UNUserNotificationCenter class] != nil) {
  //   // iOS 10 or later
  //   // For iOS 10 display notification (sent via APNS)
  //   [UNUserNotificationCenter currentNotificationCenter].delegate = self;
  //   UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
  //       UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
  //   [[UNUserNotificationCenter currentNotificationCenter]
  //       requestAuthorizationWithOptions:authOptions
  //       completionHandler:^(BOOL granted, NSError * _Nullable error) {
  //         // ...
  //       }];
  // } else {
  //   // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
  //   UIUserNotificationType allNotificationTypes =
  //   (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
  //   UIUserNotificationSettings *settings =
  //   [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
  //   [application registerUserNotificationSettings:settings];
  // }

  [application registerForRemoteNotifications];
  
  return YES;
}
- (void)userNotificationCenter:(UNUserNotificationCenter* )center willPresentNotification:(UNNotification* )notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    
    //For notification Banner - when app in foreground

    completionHandler(UNNotificationPresentationOptionAlert);

    // Print Notification info
    NSLog(@"Userinfo %@",notification.request.content.userInfo);
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [FIRMessaging messaging].APNSToken = deviceToken;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif

}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}


@end
