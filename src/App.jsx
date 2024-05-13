import LoginPage from "./routes/loginPage.jsx";
import MainPage from "./routes/mainPage.jsx";
import RankPage from "./routes/rankPage.jsx";
import SetPage from "./routes/setPage.jsx";
import InfoPage from "./routes/infoPage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/set" element={<SetPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </>
  );
}

export default App;
