import React, { useState } from "react";
import LoginPage from "./routes/loginPage";
import MainPage from "./routes/mainPage";
import RankPage from "./routes/rankPage";
import SetPage from "./routes/setPage";
import InfoPage from "./routes/infoPage";
import ReservationPage from "./routes/reservationPage";
import ReservationDetail from "./routes/reservationDetail";
import { Routes, Route } from "react-router-dom";
import WebPrivacy from "./routes/webprivacy";
import AppPrivacy from "./routes/app.privacy";
import ProtectedRoute from "./components/ProtectedRoute";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [intraId, setIntraId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
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
              setUserId={setUserId}
              userId={userId}
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
                userId={userId}
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
                userId={userId}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <SetPage
                accessToken={accessToken}
                intraId={intraId}
                userId={userId}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <ReservationPage
                accessToken={accessToken}
                intraId={intraId}
                userId={userId}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservationDetail"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <ReservationDetail
                accessToken={accessToken}
                intraId={intraId}
                userId={userId}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/info"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <InfoPage
                accessToken={accessToken}
                intraId={intraId}
                userId={userId}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/webprivacy" element={<WebPrivacy />} />
        <Route path="/appprivacy" element={<AppPrivacy />} />
      </Routes>
    </>
  );
};

export default App;
