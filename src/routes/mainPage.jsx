import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar.jsx";
import { Doughnut, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
// import { CardBox } from "../components/CardBox.jsx";

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

const CardOne = styled.div`
  display: flex;
  display-direction: column;
  width: 320px;
  height: 380px;
  margin: 12px;
  padding: 12px;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(189, 191, 163, 0.15);
`;
const CardTwo = styled.div`
  display: flex;
  display-direction: column;
  width: 340px;
  height: 380px;
  margin: 7px 36px 120px 0;
  padding: 36px 15px 280px 10px;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(189, 191, 163, 0.15);
`;

const CardContents = styled.div`
  align-items: center;
  text-align: center;
  width: 100%;
`;

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

const Options = {};

export default function MainPage({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  intraId,
}) {
  const navigate = useNavigate();
  // 직전회차 시험 데이터 그래프에 사용하는 더미 데이터
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
  const [barLevels, setBarLevels] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
      },
    ],
  });
  const [walletRank, setWalletRank] = useState([]);
  const [goodWords, setGoodWords] = useState("");
  const [evalPointRank, setEvalPointRank] = useState([]);
  const [cntProjects, setCntProjects] = useState([]);

  useEffect(() => {
    getProjects();
    getLevels();
    getRankWallet();
    getUsers();
    getUserProjects();
    if (!accessToken) navigate("/");
  }, []);
  function logoutBtn() {
    setAccessToken("");
    setRefreshToken("");
    navigate("/");
  }
  function getProjects() {
    axios
      .get("http://118.67.134.143:8080/projects", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("Projects", res.data);
        const sortedCntProjects = res.data.sort((a, b) => b.count - a.count);
        const topFive = sortedCntProjects.slice(0, 5);
        setCntProjects(topFive);
        console.log("SortedProjects:", topFive);
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
      });
  }
  function getLevels() {
    axios
      .get("http://118.67.134.143:8080/levels", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("Levels:", res.data);
        setBarLevels({
          labels: Object.keys(res.data),
          datasets: [
            {
              data: Object.values(res.data),
              backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
              borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
            },
          ],
        });
      });
  }
  function getUsers() {
    axios
      .get("http://118.67.134.143:8080/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("Users:", res.data);
        const sortedUsers = res.data.sort(
          (a, b) => b.collectionPoint - a.collectionPoint
        );
        const topFive = sortedUsers.slice(0, 5);
        console.log("point:", topFive);
        setEvalPointRank(topFive);
      });
  }
  function getUserProjects() {
    axios
      .get("http://118.67.134.143:8080/projects/" + intraId, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("UserProjects:", res.data);
      });
  }
  return (
    <>
      <Layout>
        <SideBar />
        <Mainbox>
          <Goodwords>{goodWords}</Goodwords>
          <button
            onClick={() => {
              logoutBtn();
            }}
          >
            로그아웃버튼
          </button>
          <div>인트라아이디 : {intraId}</div>
          <div>
            {/* <CardBox title={"과제참여랭킹"} contents={cntProjects} /> */}
            <Now>
              {dataRank.map(function (data, key) {
                return (
                  <CardOne key={key}>
                    <NowboxTitle>
                      {data}{" "}
                      <CardContents>
                        {data === "과제 참여 랭킹" ? (
                          <table>
                            <thead>
                              <tr>
                                <th scope="col">순위</th>
                                <th scope="col">과제명</th>
                                <th scope="col">인원수</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cntProjects.map((rank, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{rank.projectName}</td>
                                    <td>{rank.count}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : data === "보유 월렛 랭킹" ? (
                          <table>
                            <thead>
                              <tr>
                                <th>순위</th>
                                <th>이름</th>
                                <th>보유한 월렛</th>
                              </tr>
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
                              <tr>
                                <th>순위</th>
                                <th>이름</th>
                                <th>포인트</th>
                              </tr>
                            </thead>
                            <tbody>
                              {evalPointRank.map((rank, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{rank.intraId}</td>
                                    <td>{rank.collectionPoint}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </CardContents>
                    </NowboxTitle>
                  </CardOne>
                );
              })}
            </Now>
          </div>
          <div>
            <Now>
              {datasBar.map(function (data, key) {
                return (
                  <CardTwo key={key}>
                    <NowboxTitle>
                      {data}{" "}
                      <CardContents>
                        {data == "직전 회차 시험 통과율" ? (
                          <Bar data={BarData} options={Options}></Bar>
                        ) : (
                          <Bar data={barLevels} options={Options}></Bar>
                        )}
                      </CardContents>
                    </NowboxTitle>
                  </CardTwo>
                );
              })}
            </Now>
          </div>
        </Mainbox>
      </Layout>
    </>
  );
}
