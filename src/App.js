import React, { useContext } from "react";
import { useAppState, AppStateContext } from "./reducers/app";
import { ApiContext } from "./api";

import Header from "./components/Header";
import Questions from "./components/Questions";
import Ask from "./components/Ask";

import "./App.scss";

const App = () => {
  const api = useContext(ApiContext);
  const [appState, appStateDispatcher] = useAppState(api);

  return (
    <AppStateContext.Provider value={appState}>
      <div id="wrapper">
        <header id="header">
          <Header />
        </header>
        <main id="main">
          <Ask />
          <Questions />
        </main>
      </div>
    </AppStateContext.Provider>
  );
};

export default App;
