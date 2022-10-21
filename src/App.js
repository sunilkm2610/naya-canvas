import Auth from "./Auth/Auth";
import Canvas from "./Canvas/Canvas";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const user = window.localStorage.getItem("user");
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />

          {user ? (
            <Route path="/canvas" element={<Canvas />} />
          ) : (
            <Route path="/canvas" element={<Navigate to="/" replace />} />
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
