import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
`;

export default function loginPage({
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
  }, []);
  async function getAuth(code) {
    axios
      .get("http://118.67.134.143:8080/login", { params: { code: code } })
      .then((res) => {
        console.log("accessToken:");
        console.log(res.data.accessToken);
        console.log("refreshToken:");
        console.log(res.data.refreshToken);
        console.log("intraId");
        console.log(res.data.intraId);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setIntraId(res.data.intraId);
      })
      .then(() => {
        navigate("/main");
      });
  }
  async function getRefresh() {
    axios
      .post("http://118.67.134.143:8080/refresh", {
        refreshToken: refreshToken,
      })
      .then((res) => {
        console.log(res.data);
        console.log("accessToken:");
        console.log(res.data.accessToken);
        console.log("refreshToken:");
        console.log(res.data.refreshToken);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
      });
  }

  return (
    <>
      <Flexs>
        <LoginBox>
          <Logo>42경산로고</Logo>
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
