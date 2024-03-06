// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCuIKs9JwV9hTJyHRpthcaeZesm0h-Av1A",
  authDomain: "preschoolhome-dfd2f.firebaseapp.com",
  projectId: "preschoolhome-dfd2f",
  storageBucket: "preschoolhome-dfd2f.appspot.com",
  messagingSenderId: "1048681571637",
  appId: "1:1048681571637:web:814c80c8d96efd581b187c",
  measurementId: "G-0XB87NYZ32",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(all =>
      all.forEach(client => {
        console.log("client", client);
        client.postMessage(payload);
      }),
    );

  console.log("onBackgroundMessage!!!");
  console.log(payload);

  const data = JSON.parse(payload.data);
  let title = "Direct Message";
  let body = data.body;
  let icon = null;

  const notificationOptions = { body, icon };

  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "http://localhost:3000";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
