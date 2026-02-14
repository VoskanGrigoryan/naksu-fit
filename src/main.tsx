import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      forceColorScheme="light"
      defaultColorScheme="light"
      theme={{
        components: {
          Input: {
            styles: {
              input: {
                paddingTop: 4,
              },
            },
          },
          Table: {
            styles: {
              th: {
                paddingBottom: 4,
              },
              td: {
                paddingBottom: 4,
              },
            },
          },
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
