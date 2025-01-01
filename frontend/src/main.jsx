import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/Common/theme-provider";
import "@fontsource/outfit/400.css";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
