
import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
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
    TouchableOpacity

} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FCM, {NotificationActionType,FCMEvent} from "react-native-fcm";
import SideBar from './sideMenuHome'
import { Drawer } from 'native-base';



class PushNotifications extends Component<Props> {
    constructor(props)
    {
        super(props);
        this.state={
            goBack:false
        }
        //this.showLocalNotification=this.showLocalNotification.bind(this);
    }
    componentDidMount() {
        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
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

            // if(Platform.OS ==='ios'){
            //     //optional
            //     //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //     //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //     //notif._notificationType is available for iOS platfrom
            //     switch(notif._notificationType){
            //         case NotificationType.Remote:
            //             notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            //             break;
            //         case NotificationType.NotificationResponse:
            //             notif.finish();
            //             break;
            //         case NotificationType.WillPresent:
            //             notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
            //             break;
            //     }
            // }
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

    // componentDidMount()
    // {
    //     PushNotification.configure({
    //         onNotification: function(notification) {
    //             console.log('NOTIFICATION:', notification);
    //         }
    //     });
    // }

    render() {
        return null;
    }
}
export default PushNotifications;


