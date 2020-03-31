import React from "react";

import Reply from "../Reply";

import styles from "./styles.module.css";

export default props => {
  return (
    <div className={styles.cortex}>
      <div className={styles.question_header}>
        <h4 className={styles.question_heading}>Q: {props.question}</h4>
      </div>
      <Reply questionId={props.id} />
    </div>
  );
};
