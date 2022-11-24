importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js");

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

messaging.setBackgroundMessageHandler(function (payload) {
    // console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "/firebase-logo.png",
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
    // console.log(event);
    return event;
});
