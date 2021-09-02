import type { Component } from "solid-js";

import styles from "./App.module.css";
import FileUploader from "./FileUploader";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>Pharmacist Importer</header>
      <FileUploader url="http://localhost:80" accept=".xls" description="Upload multiple files by dragging and dropping or using the button" label="Select some files"/>
    </div>
  );
};

export default App;
