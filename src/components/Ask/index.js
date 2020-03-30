import React, { useState, useContext } from "react";

import { AppStateContext } from "../../reducers/app";
import { ApiContext } from "../../api";

import styles from "./styles.module.css";

/*
  TODO
  ----
  Validate Input
*/

export default props => {
  const appState = useContext(AppStateContext);
  const api = useContext(ApiContext);
  const [question, setQuestion] = useState("");

  const handleSave = () => {
    api.db.storeQuestion(question, appState.client.location);
    setQuestion("");
  };

  return (
    <div className={styles.cortex}>
      <img
        className={styles.profilewin}
        src={appState.user.photoURL}
        alt="profile"
      ></img>
      <input
        className={styles.askbox}
        type="text"
        placeholder="Ask a question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <button className={styles.askbtn} onClick={() => handleSave()}>
        Ask
      </button>
    </div>
  );
};
