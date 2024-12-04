import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "../assets/light/logo.svg";
import RollingImages from "../components/RollingImages";

const Main = styled.div`
  background-color: #171717;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 0.8fr 230px 1.2fr;
  background-image: url("src/assets/root-page/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

let DivWrapper = styled.div`
  /* margin: auto; */
`;

let LoginWrapper = styled.div`
  z-index: 999;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 15rem;
  margin: auto;
`;

let Text = styled.div`
  font-family: "Daheang", serif;
  color: #d9d9df;
  margin: auto;
  padding: 1rem;
  line-height: 1.15;
  font-size: 1.8rem;
`;

let Buttons = styled.button`
  background: #d9d9d9;
  margin: auto;
  margin-top: 1rem;
  width: 10rem;
  padding: 1rem;
  border-radius: 0.8rem;
`;

export default function LoginPage({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  setIntraId,
}) {
  const navigate = useNavigate();
  const requestSentRef = useRef(false);
  // local용 URL
  const toGetAuthCodeUrl = import.meta.env.VITE_AUTH_CODE;
  useEffect(() => {
    const search = window.location?.search.split("code=")[1];
    if (search && !requestSentRef.current) {
      requestSentRef.current = true;
      getAuth(search);
    }
  }, [navigate]);
  async function getAuth(code) {
    try {
      const res = await axios.get("/api/login", {
        params: { code: code },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Server res:", res.data.data);
      const { accessToken, refreshToken, intraId } = res.data.data;
      if (!accessToken || !refreshToken || !intraId) {
        throw new Error("Invalid token");
      }
      // 세션에 토큰 저장
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("intraId", intraId);

      // 상태 업데이트
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIntraId(intraId);

      console.log("accessToken:");
      console.log(accessToken);
      console.log("refreshToken:");
      console.log(refreshToken);
      console.log("intraId");
      console.log(intraId);
      navigate("/main", { replace: true });
    } catch (error) {
      console.error("login failed:", error);
      if (error.response) {
        console.log("Server Error Status:", error.response.status);
        console.log("Server Error Data:", error.response.data);
      }
    }
  }
  async function getRefresh() {
    try {
      const res = await axios.post("/api/refresh", {
        refreshToken: refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = res.data;
      console.log("accessToken:");
      console.log(accessToken);
      console.log("refreshToken:");
      console.log(refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.error("Token refresh failed:", error);
      navigate("/");
    }
  }

  return (
    <Main>
      <RollingImages stylenum={8} />
      <DivWrapper>
        <LoginWrapper>
          <LogoImg src={mainLogo} />
          <Text>
            "42GS" 정거장에 온 히치하이커, <br />
            당신만의 행성을 찾아 나아가세요. <br />
            당신의 여행을 응원합니다.
          </Text>
          <Buttons>
            <a href={toGetAuthCodeUrl}>
              <span style={{ color: "white" }}>Login with </span>
              <b>42GS</b>
            </a>
          </Buttons>
        </LoginWrapper>
        <RollingImages stylenum={4} startIndex={5} />
      </DivWrapper>
      <RollingImages stylenum={0} startIndex={9} />
    </Main>
  );
}
