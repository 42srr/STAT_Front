import LoginPage from "./routes/loginPage.jsx";
import MainPage from "./routes/mainPage.jsx";
import RankPage from "./routes/rankPage.jsx";
import SetPage from "./routes/setPage.jsx";
import InfoPage from "./routes/infoPage.jsx";
import ReservationPage from "./routes/reservationPage.jsx";
import ReservationDetail from "./routes/reservationDetail.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Wrapper from "./components/Wrapper.jsx";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [intraId, setIntraId] = useState("");

  const location = useLocation(); // 현재 경로 가져오기
  const isMainPage = location.pathname === "/main"; // 현재 경로가 MainPage인지 확인

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
        {/* Wrapper를 사용하지 않을 때는 조건부 렌더링 */}
        {isMainPage ? (
          <>
            <Route path="/rank" element={<RankPage />} />
            <Route path="/set" element={<SetPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/reservationDetail" element={<ReservationDetail />} />
            <Route path="/info" element={<InfoPage />} />
          </>
        ) : (
          <>
            <Route path="/rank" element={<Wrapper><RankPage /></Wrapper>} />
            <Route path="/set" element={<Wrapper><SetPage /></Wrapper>} />
            <Route path="/reservation" element={<Wrapper><ReservationPage /></Wrapper>} />
            <Route path="/reservationDetail" element={<Wrapper><ReservationDetail /></Wrapper>} />
            <Route path="/info" element={<Wrapper><InfoPage /></Wrapper>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
