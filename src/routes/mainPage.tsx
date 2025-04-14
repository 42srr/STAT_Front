import styled from "styled-components";
import React from "react";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { useDataStore } from "../store/useDataStore";
import { User, Project, ProjectDistribution } from "../store/types";
import Box from "@mui/material/Box";

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
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f7;
`;

let Mainbox = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 260px; /* SideBar width */
  width: calc(100% - 260px);
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
    },
    y: {
      ticks: {
        color: "black",
      },
    },
  },
};

interface MainPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  refreshToken: string;
  intraId: string;
  userId: string;
}

const MainPage: React.FC<MainPageProps> = ({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  intraId,
  userId,
}) => {
  const navigate = useNavigate();
  const [goodWords, setGoodWords] = useState("");

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

  // Zustand 스토어에서 상태와 액션 가져오기
  const userInfo = useDataStore((state) => state.userInfo.data);
  const userProjects = useDataStore((state) => state.userProjects.data);
  const walletRanking = useDataStore((state) => state.walletRanking.data);
  const pointRanking = useDataStore((state) => state.pointRanking.data);
  const projectDistribution = useDataStore(
    (state) => state.projectDistribution.data
  );
  const levelDistribution = useDataStore(
    (state) => state.levelDistribution.data
  );

  // 로딩 상태
  const userInfoLoading = useDataStore((state) => state.userInfo.loading);
  const projectsLoading = useDataStore(
    (state) => state.projectDistribution.loading
  );
  const walletLoading = useDataStore((state) => state.walletRanking.loading);
  const pointLoading = useDataStore((state) => state.pointRanking.loading);

  // 액션 함수들
  const fetchUserInfo = useDataStore((state) => state.fetchUserInfo);
  const fetchUserProjects = useDataStore((state) => state.fetchUserProjects);
  const fetchWalletRanking = useDataStore((state) => state.fetchWalletRanking);
  const fetchPointRanking = useDataStore((state) => state.fetchPointRanking);
  const fetchProjectDistribution = useDataStore(
    (state) => state.fetchProjectDistribution
  );
  const fetchLevelDistribution = useDataStore(
    (state) => state.fetchLevelDistribution
  );

  // 레벨 분포 차트 데이터
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

  // 레벨 분포 데이터가 변경될 때 차트 데이터 업데이트
  useEffect(() => {
    if (levelDistribution && levelDistribution.length > 0) {
      setBarLevels({
        labels: levelDistribution.map((level) => level.level), // level 값을 labels로 사용
        datasets: [
          {
            data: levelDistribution.map((level) => level.count), // count 값을 data로 사용
            backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
            borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
          },
        ],
      });
    }
  }, [levelDistribution]);

  // 초기 데이터 로드
  useEffect(() => {
    if (accessToken && userId) {
      fetchUserInfo(accessToken, userId);
      fetchUserProjects(accessToken, userId);
      fetchWalletRanking(accessToken);
      fetchPointRanking(accessToken);
      fetchProjectDistribution(accessToken);
      fetchLevelDistribution(accessToken);
    }
    console.log("accessToken:", accessToken);
    console.log("userId:", userId);
    console.log("intraId:", intraId);
    console.log("userInfo:", userInfo);
    console.log("userProjects:", userProjects);
    console.log("walletRanking:", walletRanking);
    console.log("pointRanking:", pointRanking);
    console.log("projectDistribution:", projectDistribution);
    console.log("levelDistribution:", levelDistribution);
    if (!accessToken) navigate("/");
  }, [accessToken, intraId]);

  function logoutBtn() {
    setAccessToken("");
    setRefreshToken("");
    navigate("/");
  }

  // 프로젝트 분포 데이터 정렬 및 상위 5개 추출
  const topProjects = projectDistribution
    ? [...projectDistribution].sort((a, b) => b.count - a.count).slice(0, 5)
    : [];

  return (
    <>
      <Layout>
        <SideBar />
        <Mainbox>
          <Goodwords>{goodWords}</Goodwords>
          {userInfo && userProjects && (
            <UserInfo userInfo={userInfo} userProjects={userProjects} />
          )}
          <div className="ml-10">
            <button onClick={logoutBtn}>로그아웃버튼</button>
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
                          {topProjects.map((project, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{project.projectName}</td>
                              <td>{project.count}</td>
                            </tr>
                          ))}
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
                          {walletRanking.map((user: User, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{user.intraId}</td>
                              <td>{user.wallet}</td>
                            </tr>
                          ))}
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
                          {pointRanking.map((user: User, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{user.intraId}</td>
                              <td>{user.collectionPoint}</td>
                            </tr>
                          ))}
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
                    {data === "직전 회차 시험 통과율" ? (
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
