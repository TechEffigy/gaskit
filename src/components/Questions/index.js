import React, { useEffect, useContext, useReducer } from "react";

import Question from "./../Question";
import Answers from "./../Answers";

import UserLocation from "../../context/UserLocation";
import { FireDbContext } from "../../api/rtdb";

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
  const [questions, dispatch] = useReducer(questionReducer, []);
  const userLoc = useContext(UserLocation);
  const fireDb = useContext(FireDbContext);

  useEffect(() => {
    const unsubscibe = fireDb.subscribeToQuestions(userLoc, 25, question => {
      dispatch({ type: "ADD_QUESTION", payload: question });
    });

    return () => unsubscibe();
  }, [userLoc]);

  return (
    <div className={styles.cortex}>
      {questions.map(item => (
        <div key={item.id} className={styles.item}>
          <Question id={item.id} question={item.question} />
          <Answers id={item.id} />
        </div>
      ))}
    </div>
  );
};
