import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TryPage from "./TryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TryPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
