import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCuIKs9JwV9hTJyHRpthcaeZesm0h-Av1A",
  authDomain: "preschoolhome-dfd2f.firebaseapp.com",
  projectId: "preschoolhome-dfd2f",
  storageBucket: "preschoolhome-dfd2f.appspot.com",
  messagingSenderId: "1048681571637",
  appId: "1:1048681571637:web:814c80c8d96efd581b187c",
  measurementId: "G-0XB87NYZ32",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFirebaseToken = async () => {
  return await getToken(messaging, {
    vapidKey:
      "BIGyGypgvEnUf_IZ6F_4nORnyj759Hpr3B4qAW5-q1VCJndDdabc87cjOyn4E83PkosZeEbToaGk2Nt0qhmufGk",
  });
};

export const onMessageListener = () => {
  return new Promise(resolve => {
    onMessage(messaging, payload => {
      console.log("onMessage");
      // const data = JSON.parse(payload.data);
      console.log(payload);
      // console.log(data);
      resolve(payload);
    });
  });
};

export const onTokenRefresh = async () => {
  return await getFirebaseToken()
    .then(function (refreshedToken) {
      console.log(refreshedToken);
      console.log("Token refreshed.");
      return refreshedToken;
    })
    .catch(function (err) {
      console.log("Unable to retrieve refreshed token ", err);
    });
};
