import React, { useContext } from "react";
import { useAppState, AppStateContext } from "./reducers/app";
import { ApiContext } from "./api";

import Header from "./components/Header";
import Questions from "./components/Questions";
import Ask from "./components/Ask";

import "./App.css";

const App = () => {
  const api = useContext(ApiContext);
  const [appState, appStateDispatcher] = useAppState(api);

  return (
    <AppStateContext.Provider value={appState}>
      <div className="cortex">
        <Header />
        <Ask />
        <main>
          <Questions />
        </main>
      </div>
    </AppStateContext.Provider>
  );
};

export default App;
