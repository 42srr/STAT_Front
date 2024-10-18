import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar.jsx";
import { Doughnut, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Main = styled.div`
  align-items: center;
`;

const Data = {
  labels: ["getnextline", "born2beroot", "printf"],
  datasets: [
    {
      data: [40, 20, 35],
      backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
      borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
    },
  ],
};

const BarData = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  datasets: [
    {
      data: [10, 20, 5, 30, 7, 3, 11, 12, 1, 0],
      backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
      borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
    },
  ],
};

const Options = {};

let Layout = styled.div`
  display: flex;
  justify-content: flex-start;
`;

let Mainbox = styled.div`
  flex: 3;
`;

let Now = styled.div`
  display: flex;
`;

let Goodwords = styled.div`
  width: 1032px;
  height: 187px;
  margin: 100px 0 120px 0;
  padding: 82px 667px 69px 309px;
  transform: rotate(-180deg);
  border-radius: 30px;
  background-color: #fff;
  border: solid 2px rgba(189, 191, 163, 0.3);

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

let Nowbox = styled.div`
  display: flex;
  display-direction: column;
  width: 320px;
  height: 380px;
  margin: 7px 36px 120px 0;
  padding: 36px 15px 280px 10px;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(189, 191, 163, 0.15);
`;

let NowboxTitle = styled.div`
  width: 329px;
  height: 30px;
  margin: 0 36px 7px 0;
  font-family: Inter;
  font-size: 25px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #4b4545;
`;

const dataRank = ["과제 참여 랭킹", "보유 월렛 랭킹", "평가 포인트 랭킹"];

const datasBar = ["직전 회차 시험 통과율", "유저 레벨 분포"];

export default function MainPage({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
}) {
  const [walletRank, setWalletRank] = useState([]);
  const [goodWords, setGoodWords] = useState("");
  // 명언 부분 주석 처리
  // const url = "http://118.67.134.143:8080/quotes";
  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setGoodWords(`${response.data.content} - ${response.data.name}`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // 42 프로젝트 데이터 불러오는 코드(CORS 에러 발생함)

  useEffect(() => {
    getProjects();
    getLevels();
    getRankWallet();
    getUsers();
  }, []);
  function getProjects() {
    axios
      .get("http://118.67.134.143:8080/projects/yutsong", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("Projects", res.data);
      });
  }
  function getRankWallet() {
    axios
      .get("http://118.67.134.143:8080/ranking/wallet", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("RankWallet:", res.data);
        const topFiveWalletRank = res.data.slice(0, 5);
        setWalletRank(topFiveWalletRank);
        console.log(topFiveWalletRank);
        // setWalletRank(res.data);
      });
  }
  function getLevels() {
    axios
      .get("http://118.67.134.143:8080/levels", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("Levels:", res.data);
      });
  }
  function getUsers() {
    axios
      .get("http://118.67.134.143:8080/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("Users:", res.data);
      });
  }
  return (
    <>
      <Layout>
        <SideBar />
        <Mainbox>
          <Goodwords>{goodWords}</Goodwords>
          <div>
            <Now>
              {dataRank.map(function (data) {
                return (
                  <Nowbox>
                    <NowboxTitle>
                      {data}{" "}
                      <Main>
                        {data === "과제 참여 랭킹" ? (
                          <table>
                            <thead>
                              <th>순위</th>
                              <th>과제명</th>
                              <th>인원수</th>
                            </thead>
                            <tbody>
                              <td>1</td>
                              <td>gnl</td>
                              <td>5</td>
                            </tbody>
                          </table>
                        ) : data === "보유 월렛 랭킹" ? (
                          <table>
                            <thead>
                              <th>순위</th>
                              <th>이름</th>
                              <th>보유한 월렛</th>
                            </thead>
                            <tbody>
                              {walletRank.map((rank, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{rank.intraId}</td>
                                    <td>{rank.dollar}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <table>
                            <thead>
                              <th>순위</th>
                              <th>이름</th>
                              <th>포인트</th>
                            </thead>
                            <tbody>
                              <td>1</td>
                              <td>babbi</td>
                              <td>5</td>
                            </tbody>
                          </table>
                        )}
                      </Main>
                    </NowboxTitle>
                  </Nowbox>
                );
              })}
            </Now>
          </div>
          <div>
            <Now>
              {datasBar.map(function (data) {
                return (
                  <Nowbox>
                    <NowboxTitle>
                      {data}{" "}
                      <Main>
                        {data == "직전 회차 시험 통과율" ? (
                          <Bar data={BarData} options={Options}></Bar>
                        ) : (
                          <Bar data={BarData} options={Options}></Bar>
                        )}
                      </Main>
                    </NowboxTitle>
                  </Nowbox>
                );
              })}
            </Now>
          </div>
        </Mainbox>
      </Layout>
    </>
  );
}
