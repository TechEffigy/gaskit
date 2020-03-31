import React, { useState, useContext } from "react";

import { ApiContext } from "../../api";

import styles from "./styles.module.css";

export default props => {
  const [reply, setReply] = useState("");
  const api = useContext(ApiContext);

  const clickHandler = () => {
    api.db.storeReply(props.questionId, reply);
    setReply("");
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
        className={`${styles.replybtn} --secondary`}
        value="Reply"
        onClick={() => clickHandler()}
      >
        Reply
      </button>
    </div>
  );
};
