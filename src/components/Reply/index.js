import React, { useState, useContext } from "react";

import { FireDbContext } from "../../api/rtdb";

import styles from "./styles.module.css";

export default props => {
  const [reply, setReply] = useState("");
  const fireDb = useContext(FireDbContext);

  const clickHandler = () => {
    fireDb.storeReply(props.questionId, reply);
  };

  return (
    <div className={styles.cortex}>
      <input
        className={styles.replybox}
        type="text"
        placeholder="Type an Answer"
        value={reply}
        onChange={e => setReply(e.target.value)}
      />
      <button
        className={styles.replybtn}
        value="Reply"
        onClick={() => clickHandler()}
      >
        Reply
      </button>
    </div>
  );
};
