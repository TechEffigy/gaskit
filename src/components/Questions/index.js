import React, { useEffect, useContext, useState } from "react";

import Question from "./../Question";
import Answers from "./../Answers";

import { AppStateContext } from "../../reducers/app";
import { ApiContext } from "../../api";

import styles from "./styles.module.css";

const questionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUESTION": {
      return [action.payload, ...state];
    }
    default:
      throw new Error();
  }
};

export default props => {
  const [questions, setQuestions] = useState([]);
  const appState = useContext(AppStateContext);
  const api = useContext(ApiContext);

  useEffect(() => {
    if (appState.client.location) {
      const unsubscibe = api.db.subscribeToQuestions(
        appState.client.location,
        25,
        question => {
          // dispatch({ type: "ADD_QUESTION", payload: question });
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
