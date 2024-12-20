import LoginPage from "./routes/loginPage.jsx";
import MainPage from "./routes/mainPage.jsx";
import RankPage from "./routes/rankPage.jsx";
import SetPage from "./routes/setPage.jsx";
import InfoPage from "./routes/infoPage.jsx";
import ReservationPage from "./routes/reservationPage.jsx";
import ReservationDetail from "./routes/reservationDetail.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import WebPrivacy from "./routes/webprivacy.jsx";
import AppPrivacy from "./routes/app.privacy.jsx";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [intraId, setIntraId] = useState("");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              accessToken={accessToken}
              refreshToken={refreshToken}
              setIntraId={setIntraId}
              intraId={intraId}
            />
          }
        />
        <Route
          path="/main"
          element={
            <MainPage
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              accessToken={accessToken}
              refreshToken={refreshToken}
              intraId={intraId}
            />
          }
        />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/set" element={<SetPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/reservationDetail" element={<ReservationDetail />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/webprivacy" element={<WebPrivacy />} />
        <Route path="/appprivacy" element={<AppPrivacy />} />
      </Routes>
    </>
  );
}

export default App;
