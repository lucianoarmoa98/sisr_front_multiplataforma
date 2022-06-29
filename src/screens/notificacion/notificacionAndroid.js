import notifee from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

export async function onDisplayNotification(title) {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//    await messaging()
//     .getToken()
//     .then((fcmToken) => {
//       console.log('FCM Token -> ', fcmToken);
//     });
// } else console.log('Not Authorization status:', authStatus);



  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.requestPermission();


  // Display a notification
  await notifee.displayNotification({
    // title: title.title,
    body: title.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher_round', // optional, defaults to 'ic_launcher'.
      color: '#e12d31',
      // largeIcon: require('../../assets/images/logo_rojo.png'),
      // actions: [
      //     {
      //       title: '<b>Dance</b> &#128111;',
      //       pressAction: { id: 'dance' },
      //     },
      //     {
      //       title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
      //       pressAction: { id: 'cry' },
      //     },
      //   ],
    },
    // ios: {
    //   channelId,
    //   smallIcon: 'ic_launcher_round', // optional, defaults to '
    //   color: '#e12d31',
    //   // largeIcon: require('../../assets/images/logo_rojo.png'),
    //   // actions: [
    //   //     {
    //   //       title: '<b>Dance</b> &#128111;',
    //   //       pressAction: { id: 'dance' },
    //   //     },
    //   //     {
    //     //       title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
    //     //       pressAction: { id: 'cry' },
    //   //     },
    //   //   ],
    // },
  });
}