/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    WebView,
    ToastAndroid,
    FlatList,
    Image,
    AppState,
    TouchableOpacity,
    AsyncStorage

} from 'react-native';
import {Actions} from 'react-native-router-flux'
import FCM, {NotificationActionType,FCMEvent} from "react-native-fcm";


class Home extends Component<Props> {
    constructor(props)
    {
        super(props);
        this.state={
            seconds:5
        }
        //this.handleAppStateChange=this.handleAppStateChange.bind(this);
     }
    sendNotifications()
    {
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyCMalibRCQoRWNxPTBVnKHpMMPx4r1yoeM'
            },
            body: JSON.stringify({
                "to":"dHlMwH3IXBg:APA91bGKCJcEeDIOs3rPt6F1bvQrGzQyo0lZGBs0Kvz-QerBOJfUXP8TXRycG8UxYdLlVsSUAGAQxQpj2ymfBoPLI35-YRCYNh4-s9nP4h9XAJJZcJ6EhlvruPWFkMwlcIZ_LxD6rIto",
                "data": {
                    "custom_notification": {
                        "body": "test body",
                        "title": "test title",
                        "color":"#00ACD4",
                        "priority":"high",
                        "sound": "default",
                        "id": "id",
                        "show_in_foreground": true
                    }
                }
            })
        }).then((response)=>{
            console.log('response',response);
        })
            .catch((error)=>{
                console.log('error',error);
            })
    }
    // componentDidMount()
    // {
    //    AppState.addEventListener('change',this.handleAppStateChange);
    // }
    // componentWillUnmount()
    // {
    //     AppState.removeEventListener('change',this.handleAppStateChange);
    // }
    // componentWillReceiveProps(nextProps)
    // {
    //     console.log('InfoData',nextProps.cricInfo);
    // }
    // handleAppStateChange(appState)
    // {
    //     console.log('i m changed',appState);
    //     if(appState==='active')
    //     {
    //         PushNotification.localNotificationSchedule({
    //             message: "My Notification Message", // (required)
    //             date: new Date(Date.now() + (this.state.seconds * 1000)) // in 60 secs
    //         });
    //     }
    //     if(appState==='background')
    //     {
    //         PushNotification.localNotificationSchedule({
    //             message: "My Notification Message", // (required)
    //             date: new Date(Date.now() + (this.state.seconds * 1000)) // in 60 secs
    //         });
    //     }
    // }
    componentDidMount() {
        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            AsyncStorage.setItem('NotificationToken',token);
            console.log("TOKEN (getFCMToken)", token);
        });
        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        });
        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);
            if(notif.local_notification){
                return;
            }
            if(notif.opened_from_tray){
                return;
            }

            if(Platform.OS ==='ios'){
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch(notif._notificationType){
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
            this.showLocalNotification(notif);
        });

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
        });
    }
    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            title: notif.title,
            body: notif.body,
            priority: "high",
            click_action: notif.click_action,
            show_in_foreground: true,
            local: true
        });
    }

    componentWillUnmount() {
        this.notificationListner.remove();
        this.refreshTokenListener.remove();
    }

    render() {
        console.log('this.state',AppState.currentState);
        return (
              <TouchableOpacity onPress={()=>{this.sendNotifications()}} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                 <Text>React Native</Text>
              </TouchableOpacity>

        );
    }
}



export default Home;


