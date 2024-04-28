import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import theme from "./theme/theme.ts";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";
import LoaderComponent from "./components/Loader.tsx";

import { store } from "./store/store";
import { Provider } from "react-redux";
import "./styles/global.styles.scss";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LoaderComponent />}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
