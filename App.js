// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// const CleverTap = require('clevertap-react-native');

// export default function App() {
//   // event without properties
// CleverTap.recordEvent('Product Viewed')
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const CleverTap = require('clevertap-react-native');

export default function App() {
    useEffect(async () => {
        const requestUserPermission = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        };
        if (enabled) {
            console.log('Authorization status:', authStatus);
            const token = await messaging().getToken();
            console.log('Your FCM Token is:', token);
            // Send this token to CleverTap
            CleverTap.setPushToken(token);
        }
        requestUserPermission();

        // Record CleverTap event
        CleverTap.recordEvent('Product Viewed');
        CleverTap.createNotificationChannel("012210", "Clever Tap React Native Testing", "CT React Native Testing", 5, true) // The notification channel importance can have any value from 1 to 5. A higher value means a more interruptive notification.
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
