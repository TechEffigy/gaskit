import React, { useContext, useState, useEffect } from "react";

import { FireDbContext } from "../../api/rtdb";

import styles from "./styles.module.css";

export default props => {
  const [answers, setAnswers] = useState([]);
  const fireDb = useContext(FireDbContext);

  useEffect(() => {
    const unsub = fireDb.getReplies(props.id, data => {
      setAnswers(data, ...answers);
    });
    console.log(unsub);
  }, []);

  return (
    <div className={styles.cortex}>
      {answers.length > 0 &&
        answers.map(item => (
          <div key={item.id} className={styles.answer}>
            <p>{item.reply}</p>
          </div>
        ))}
      <a href="#" className={styles.readmore}>
        Read more...
      </a>
    </div>
  );
};
