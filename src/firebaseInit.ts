import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import { openToast } from "./Redux/Slices";
import store from "./Redux/store";

const config = {
    apiKey: "AIzaSyDssPHUhA_4I2J14tiTpBnKrUHmpDPJx-Q",
    authDomain: "rewarding-f9d77.firebaseapp.com",
    projectId: "rewarding-f9d77",
    storageBucket: "rewarding-f9d77.appspot.com",
    messagingSenderId: "1007442692645",
    appId: "1:1007442692645:web:a7a3901c86f32e102d0dcc",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

// next block of code goes here
export const requestFirebaseNotificationPermission = () => {
    return new Promise((resolve, reject) => {
        Notification.requestPermission()
            .then(() => messaging.getToken())
            .then((firebaseToken) => {
                resolve(firebaseToken);
            })
            .catch((err) => {
                store.dispatch(
                    openToast({
                        message: "You need to accept notify permission to receive notifications",
                        type: "warning",
                        autoHideDuration: 5000,
                    })
                );
                reject(err);
            });
    });
};
export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });
