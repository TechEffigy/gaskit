import React, { useContext } from "react";

import { AppStateContext } from "../../reducers/app";
import { ApiContext } from "../../api";

import styles from "./styles.module.css";

import logo from "../../assets/network.svg";

export default props => {
  const appState = useContext(AppStateContext);
  const appApi = useContext(ApiContext);

  const ifNotAuth = (
    <button
      className={styles.authbutton}
      onClick={() => appApi.auth.signinGoogle()}
    >
      Google Sign-in
    </button>
  );
  const ifAuth = (
    <button className={styles.authbutton} onClick={() => appApi.auth.signOut()}>
      Logout
    </button>
  );

  return (
    <header>
      <div className={styles.cortex}>
        <div className={styles.logocortex}>
          <img className={styles.logo} src={logo} alt="logo" />
          <h1 className={styles.logotext}>Gaskit</h1>
        </div>
        <div className={styles.authcortex}>
          {appState.user.isAuthed ? ifAuth : ifNotAuth}
        </div>
      </div>
    </header>
  );
};
