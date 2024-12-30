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
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
            <ProtectedRoute accessToken={accessToken}>
              <MainPage
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}
                accessToken={accessToken}
                refreshToken={refreshToken}
                intraId={intraId}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rank"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <RankPage
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}
                accessToken={accessToken}
                refreshToken={refreshToken}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <SetPage accessToken={accessToken} intraId={intraId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <ReservationPage accessToken={accessToken} intraId={intraId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservationDetail"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <ReservationDetail accessToken={accessToken} intraId={intraId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/info"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <InfoPage accessToken={accessToken} intraId={intraId} />
            </ProtectedRoute>
          }
        />
        <Route path="/webprivacy" element={<WebPrivacy />} />
        <Route path="/appprivacy" element={<AppPrivacy />} />
      </Routes>
    </>
  );
}

export default App;
