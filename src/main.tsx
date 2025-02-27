import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ProfView from "./components/ProfView.tsx";
import StudentView from "./components/StudentView.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
Amplify.configure(outputs);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Authenticator>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/prof" element={<ProfView />} />
        <Route path="/student/:sessionId" element={<StudentView />} />
      </Routes>
    </BrowserRouter>
  </Authenticator>
);