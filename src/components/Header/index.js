import React from "react";

import styles from "./styles.module.css";

import logo from "../../assets/network.svg";

export default props => {
  return (
    <header>
      <div className={styles.cortex}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h1>Gaskit</h1>
      </div>
    </header>
  );
};
