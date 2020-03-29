import React, { useState, useContext } from "react";

import UserLocation from "../../context/UserLocation";
import { FireDbContext } from "../../api/rtdb";

import styles from "./styles.module.css";
/*
  TODO
  ----
  Validate Input
*/

export default props => {
  const [question, setQuestion] = useState("");
  const userLoc = useContext(UserLocation);
  const fireDb = useContext(FireDbContext);

  const handleSave = () => {
    fireDb.storeQuestion(question, userLoc);
  };

  return (
    <div className={styles.cortex}>
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
