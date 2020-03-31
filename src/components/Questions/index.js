import React, { useEffect, useContext, useState } from "react";

import Question from "./../Question";
import Answers from "./../Answers";

import { AppStateContext } from "../../reducers/app";
import { ApiContext } from "../../api";

import styles from "./styles.module.css";

export default props => {
  const appState = useContext(AppStateContext);
  const api = useContext(ApiContext);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (appState.client.location) {
      const unsubscibe = api.db.subscribeToQuestions(
        appState.client.location,
        25,
        question => {
          setQuestions(prevState => [question, ...prevState]);
        }
      );

      return () => unsubscibe();
    }
  }, [appState.client.location]);

  return (
    questions.length > 0 && (
      <div className={styles.cortex}>
        {questions.map(item => (
          <div key={item.id} className={styles.item}>
            <Question id={item.id} question={item.question} />
            <Answers id={item.id} />
          </div>
        ))}
      </div>
    )
  );
};
