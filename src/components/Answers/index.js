import React, { useContext, useState, useEffect } from "react";

import { FireDbContext } from "../../api/rtdb";

import styles from "./styles.module.css";

export default props => {
  const [answers, setAnswers] = useState([]);
  const fireDb = useContext(FireDbContext);

  useEffect(() => {
    fireDb.getReplies(props.id).then(data => {
      setAnswers(data);
    });
  }, []);

  return (
    <div className={styles.cortex}>
      {answers.map(item => (
        <div className={styles.answer}>
          <p key={item.id}>{item.reply}</p>
        </div>
      ))}
      <a href="#" className={styles.readmore}>
        Read more...
      </a>
    </div>
  );
};
