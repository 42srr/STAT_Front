import LoginPage from "./routes/loginPage.jsx";
import MainPage from "./routes/mainPage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
