import type { Component } from "solid-js";
import { ThemeProvider } from "solid-styled-components";

import styles from "./App.module.css";
import FileUploader from "./FileUploader/FileUploader";
import { theme } from "./styles/theme";

const App: Component = () => {
  return (
    <ThemeProvider theme={theme}>
      <div class={styles.App}>
        <header class={styles.header}>
          <h1>Pharmacist Importer</h1>
        </header>
        <FileUploader
          url="http://localhost:80"
          accept=".xls"
          description="Drag and drop your excel files here!"
          label="Select some files"
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
