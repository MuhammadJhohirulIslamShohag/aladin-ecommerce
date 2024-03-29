import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ReduxProvider from "./redux/ReduxProvider.tsx";
import { ThemeProvider } from "@material-tailwind/react";

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <ReduxProvider>
                <App />
            </ReduxProvider>
        </ThemeProvider>
    </React.StrictMode>
);
