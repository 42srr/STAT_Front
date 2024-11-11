import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Title = styled.div`
  font-size: 2rem;
`;

let Flexs = styled.div`
  display: flex;
  flex-direction: column;
`;

let Logo = styled.div`
  text-align: center;
  margin: auto;
`;
let Fields = styled.input`
  background: #d9d9d9;
  width: 10rem;
  margin: auto;
  margin-top: 1rem;
`;
let Buttons = styled.button`
  background: #d9d9d9;
  margin: auto;
  margin-top: 1rem;
  width: 10rem;
  padding: 1rem;
  border-radius: 0.8rem;
`;
const LoginBox = styled.div`
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-weight: bold;
`;

export default function LoginPage({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  setIntraId,
}) {
  const navigate = useNavigate();
  // local용 URL
  const toGetAuthCodeUrl =
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-598ae18e7a326adf87c4c13c715a91675c6b68458bb4082e24e297616ebd98d4&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code";
  useEffect(() => {
    const search = window.location?.search.split("code=")[1];
    if (search) {
      getAuth(search);
    }
  }, [navigate]);
  async function getAuth(code) {
    try {
      const res = await axios.get("http://118.67.134.143:8080/login", {
        params: { code: code },
      });
      const { accessToken, refreshToken, intraId } = res.data;
      // 세션에 토큰 저장
      sessionStorage.setItem("accessToken", accessToken);
      console.log("accessToken:");
      console.log(accessToken);
      console.log("refreshToken:");
      console.log(refreshToken);
      console.log("intraId");
      console.log(intraId);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIntraId(intraId);
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
      const res = await axios.post("http://118.67.134.143:8080/refresh", {
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
    <>
      <Flexs>
        <LoginBox>
          <Title>42경산로고</Title>
          <Buttons>
            <a href={toGetAuthCodeUrl}>
              <span style={{ color: "white" }}>Login with </span>
              42GS
            </a>
          </Buttons>
        </LoginBox>
      </Flexs>
    </>
  );
}
