import firebase from "firebase";

export default class {
  constructor(firebaseApp) {
    this.auth = firebaseApp.auth();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.user = { userId: 0, displayName: "", photoURL: "" };
  }

  subscribeToAuthState(cbFunc) {
    return this.auth.onAuthStateChanged(user => {
      cbFunc(user);
    });
  }

  signinGoogle() {
    this.auth.signInWithPopup(this.googleProvider).then(res => {});
  }

  signOut() {
    this.auth.signOut();
  }
}
