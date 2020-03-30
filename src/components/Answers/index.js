import React, { useContext, useState, useEffect } from "react";

import { ApiContext } from "../../api";

import styles from "./styles.module.css";

export default props => {
  const [answers, setAnswers] = useState([]);
  const api = useContext(ApiContext);

  useEffect(() => {
    const unsub = api.db.getReplies(props.id, data => {
      setAnswers([...data]);
    });

    return () => unsub();
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
