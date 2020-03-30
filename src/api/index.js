import { createContext } from "react";

import firebase from "firebase";

import AuthApi from "./Auth";
import DBApi from "./DB";

const firebaseConfig = {
  apiKey: "AIzaSyAhXnWe-6x9xMcfxncIjPnKlK7RyV3zBGI",
  authDomain: "my-project-1566003437714.firebaseapp.com",
  databaseURL: "https://my-project-1566003437714.firebaseio.com",
  projectId: "my-project-1566003437714",
  storageBucket: "my-project-1566003437714.appspot.com",
  messagingSenderId: "797241106661",
  appId: "1:797241106661:web:226f492e341a6f5e03740c",
  measurementId: "G-1DV77EJ2GK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = new AuthApi(firebaseApp);
const db = new DBApi(firebaseApp);

export const ApiContext = createContext();

export default {
  auth,
  db
};
