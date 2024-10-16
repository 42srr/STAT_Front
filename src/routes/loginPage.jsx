import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

let Flexs = styled.div`
  display: flex;
  flex-direction: column;
`;

let Logo = styled.div`
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
`;

export default function loginPage({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
}) {
  const navigate = useNavigate();
  // const [accessToken, setAccesToken] = useState("");
  // const [refreshToken, setRefreshToken] = useState("");
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
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
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
        console.log("accessToken:");
        console.log(res.data.accessToken);
        console.log("refreshToken:");
        console.log(res.data.refreshToken);
        setAccesToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
      });
  }
  function getProjects() {
    axios
      .get("http://118.67.134.143:8080/projects/yutsong", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  function getRankWallet() {
    axios
      .get("http://118.67.134.143:8080/ranking/wallet", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  function getLevels() {
    axios
      .get("http://118.67.134.143:8080/levels", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  function getUsers() {
    axios
      .get("http://118.67.134.143:8080/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <>
      <Flexs>
        <Logo>42경산로고</Logo>
        <Buttons>
          <a href={toGetAuthCodeUrl}>auth test btn</a>
        </Buttons>
        <Buttons
          onClick={() => {
            getRankWallet();
          }}
        >
          Rank/Wallet
        </Buttons>
        <Buttons
          onClick={() => {
            getProjects();
          }}
        >
          Projects
        </Buttons>

        <Buttons
          onClick={() => {
            getLevels();
          }}
        >
          Levels
        </Buttons>
        <Buttons
          onClick={() => {
            getUsers();
          }}
        >
          Users
        </Buttons>
        <Buttons
          onClick={() => {
            getRefresh();
          }}
        >
          Refresh
        </Buttons>
        <Buttons
          onClick={() => {
            navigate("/main");
          }}
        >
          Login
        </Buttons>
      </Flexs>
    </>
  );
}
