import styled from "styled-components";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Doughnut, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { useDataStore } from "../store/useDataStore";

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
  flex-direction: column;
  width: 20rem;
  height: 20rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  object-fit: contain;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  // background-color: rgba(189, 191, 163, 0.15);
  // background-color: #000055;
  border: solid 1px rgba(189, 191, 163, 0.3);
  background-color: white;
  color: black;
`;

const CardTitle = styled.div`
  align-items: center;
  text-align: center;

  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardTwo = styled.div`
  display: flex;
  flex-direction: column;
  width: 42rem;
  height: 25rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  object-fit: contain;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  // background-color: rgba(189, 191, 163, 0.15);
  // background-color: #000055;
  border: solid 1px rgba(189, 191, 163, 0.3);
  // color: white;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 0.5rem;
    text-align: center;
    border: 1px solid white;
  }
`;

let Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  // background-color: #030313;
`;

let Mainbox = styled.div`
  flex: 3;
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  width: fit-content;
`;

const GraphRow = styled.div`
  display: flex;
  flex-direction: column;
`;

let Goodwords = styled.div`
  width: 20rem;
  height: 10rem;
  margin: 1.2rem;
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

const dataRank = ["과제 참여 랭킹", "보유 월렛 랭킹", "평가 포인트 랭킹"];

const datasBar = ["직전 회차 시험 통과율", "유저 레벨 분포"];

const Options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "black",
      },
      // grid: {
      //   color: "white",
      // },
    },
    y: {
      ticks: {
        color: "black",
      },
      // grid: {
      //   color: "white",
      // },
    },
  },
};

interface MainPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  refreshToken: string;
  intraId: string;
}

const MainPage: React.FC<MainPageProps> = ({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  intraId,
}) => {
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
  const [userInfo, setUserInfo] = useState({
    id: 0,
    intraId: "",
    level: 0,
    wallet: 0,
    collectionPoint: 0,
    imgURL: "",
    updatable: false,
  });
  const [userProjects, setUserProjects] = useState([]);

  const allLevels = useDataStore((state) => state.allLevels.data);
  const fetchAllLevels = useDataStore((state) => state.allLevels.fetchData);

  useEffect(() => {
    if (accessToken) {
      fetchAllLevels(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (allLevels && allLevels.length > 0) {
      setBarLevels({
        labels: allLevels.map((level) => level.level), // level 값을 labels로 사용
        datasets: [
          {
            data: allLevels.map((level) => level.count), // count 값을 data로 사용
            backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
            borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
          },
        ],
      });
    }
  }, [allLevels]);

  useEffect(() => {
    getProjects();
    // getLevels();
    getRankWallet();
    getUsers();
    getUserProjects();
    getUserInfo();
    if (!accessToken) navigate("/");
  }, []);

  function logoutBtn() {
    setAccessToken("");
    setRefreshToken("");
    navigate("/");
  }

  function getProjects() {
    axios
      .get("/api/projects/distribution", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        const projects = res.data.data.distribution;
        // 데이터를 배열로 변환
        const projectArray = [];
        for (const projectName in projects) {
          const count = parseInt(projects[projectName]);
          projectArray.push({ projectName, count });
        }
        const sortedCntProjects = projectArray.sort(
          (a, b) => b.count - a.count
        );
        const topFive = sortedCntProjects.slice(0, 5);
        setCntProjects(topFive);
      });
  }

  function getRankWallet() {
    axios
      .get("/api/users/ranking?type=wallet&size=5", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setWalletRank(res.data.data);
      });
  }

  // function getLevels: React.FC<any> () {
  //   axios
  //     .get("/api/levels", {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     .then((res) => {
  //       // console.log("Levels:", res.data.data);
  //       setBarLevels({
  //         labels: Object.keys(res.data.data.levelResponseList),
  //         datasets: [
  //           {
  //             data: Object.values(res.data.data.levelResponseList),
  //             backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
  //             borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
  //           },
  //         ],
  //       });
  //     });
  // }

  function getUsers() {
    axios
      .get("/api/users/ranking?type=correction-point&size=5", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setEvalPointRank(res.data.data);
      });
  }

  function getUserProjects() {
    axios
      .get(`/api/users/${intraId}/projects`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setUserProjects(res.data.data);
      });
  }

  function getUserInfo() {
    axios
      .get(`/api/users/${intraId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setUserInfo(res.data.data);
      });
  }

  return (
    <>
      <Layout>
        <SideBar />
        <Mainbox>
          <Goodwords>{goodWords}</Goodwords>
          <UserInfo userInfo={userInfo} userProjects={userProjects} />
          <div className="ml-10">
            <button
              onClick={() => {
                logoutBtn();
              }}
            >
              로그아웃버튼
            </button>
            <div>인트라아이디 : {intraId}</div>
          </div>
          <CardRow>
            {dataRank.map(function (data, key) {
              return (
                <CardOne key={key}>
                  <CardTitle>{data}</CardTitle>
                  <CardContents>
                    {data === "과제 참여 랭킹" ? (
                      <StyledTable>
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
                      </StyledTable>
                    ) : data === "보유 월렛 랭킹" ? (
                      <StyledTable>
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
                                <td>{rank.wallet}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </StyledTable>
                    ) : (
                      <StyledTable>
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
                      </StyledTable>
                    )}
                  </CardContents>
                </CardOne>
              );
            })}
          </CardRow>

          <GraphRow>
            {datasBar.map(function (data, key) {
              return (
                <CardTwo key={key}>
                  <CardTitle>{data}</CardTitle>
                  <CardContents>
                    {data == "직전 회차 시험 통과율" ? (
                      <Bar data={BarData} options={Options}></Bar>
                    ) : (
                      <Bar data={barLevels} options={Options}></Bar>
                    )}
                  </CardContents>
                </CardTwo>
              );
            })}
          </GraphRow>
        </Mainbox>
      </Layout>
    </>
  );
};

export default MainPage;
