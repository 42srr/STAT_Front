import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import UserInfo from "../components/UserInfo";
import { useDataStore } from "../store/useDataStore";
import { User, Project, ProjectDistribution } from "../store/types";

// MUI 컴포넌트
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

const dataRank = ["과제 참여 랭킹", "보유 월렛 랭킹", "평가 포인트 랭킹"];
const datasBar = ["직전 회차 시험 통과율", "유저 레벨 분포"];

const Options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: 10,
      cornerRadius: 4,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#666",
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
        drawBorder: false,
      },
      ticks: {
        color: "#666",
        font: {
          size: 12,
        },
        stepSize: 5,
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
        backgroundColor: [
          "rgba(25, 118, 210, 0.7)", // primary color
          "rgba(156, 39, 176, 0.7)", // purple
          "rgba(0, 150, 136, 0.7)", // teal
        ],
        borderColor: [
          "rgba(25, 118, 210, 1)",
          "rgba(156, 39, 176, 1)",
          "rgba(0,, 150, 136, 1)",
        ],
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: [
          "rgba(25, 118, 210, 0.9)",
          "rgba(156, 39, 176, 0.9)",
          "rgba(0, 150, 136, 0.9)",
        ],
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
        backgroundColor: [
          "rgba(25, 118, 210, 0.7)", // primary color
          "rgba(156, 39, 176, 0.7)", // purple
          "rgba(0, 150, 136, 0.7)", // teal
        ],
        borderColor: [
          "rgba(25, 118, 210, 1)",
          "rgba(156, 39, 176, 1)",
          "rgba(0, 150, 136, 1)",
        ],
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: [
          "rgba(25, 118, 210, 0.9)",
          "rgba(156, 39, 176, 0.9)",
          "rgba(0, 150, 136, 0.9)",
        ],
      },
    ],
  });

  // 레벨 분포 데이터가 변경될 때 차트 데이터 업데이트
  useEffect(() => {
    if (levelDistribution && levelDistribution.length > 0) {
      setBarLevels({
        labels: levelDistribution.map((level) => level.level),
        datasets: [
          {
            data: levelDistribution.map((level) => level.count),
            backgroundColor: [
              "rgba(25, 118, 210, 0.7)", // primary color
              "rgba(156, 39, 176, 0.7)", // purple
              "rgba(0, 150, 136, 0.7)", // teal
            ],
            borderColor: [
              "rgba(25, 118, 210, 1)",
              "rgba(156, 39, 176, 1)",
              "rgba(0, 150, 136, 1)",
            ],
            borderWidth: 1,
            borderRadius: 4,
            hoverBackgroundColor: [
              "rgba(25, 118, 210, 0.9)",
              "rgba(156, 39, 176, 0.9)",
              "rgba(0, 150, 136, 0.9)",
            ],
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
    // console.log("accessToken:", accessToken);
    // console.log("userId:", userId);
    // console.log("intraId:", intraId);
    // console.log("userInfo:", userInfo);
    // console.log("userProjects:", userProjects);
    // console.log("walletRanking:", walletRanking);
    // console.log("pointRanking:", pointRanking);
    // console.log("projectDistribution:", projectDistribution);
    // console.log("levelDistribution:", levelDistribution);
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
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: "100%",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* 유저 정보 섹션 */}
        {userInfo && (
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UserInfo
                  userInfo={userInfo}
                  userProjects={userProjects}
                  accessToken={accessToken}
                />
              </Grid>
            </Grid>
          </Container>
        )}

        {/* 랭킹 카드 섹션 */}
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="medium"
          sx={{ mt: 2, mb: 2 }}
        >
          42GS 랭킹
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {dataRank.map((data, key) => (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    fontWeight="bold"
                  >
                    {data}
                  </Typography>

                  {data === "과제 참여 랭킹" ? (
                    <TableContainer
                      component={Paper}
                      elevation={0}
                      sx={{ mt: 2 }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "primary.light" }}>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              순위
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              과제명
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              인원수
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topProjects.map((project, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  bgcolor: "action.hover",
                                },
                              }}
                            >
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">
                                {project.projectName}
                              </TableCell>
                              <TableCell align="center">
                                {project.count}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : data === "보유 월렛 랭킹" ? (
                    <TableContainer
                      component={Paper}
                      elevation={0}
                      sx={{ mt: 2 }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "primary.light" }}>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              순위
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              이름
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              보유한 월렛
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {walletRanking.map((user: User, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  bgcolor: "action.hover",
                                },
                              }}
                            >
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">
                                {user.intraId}
                              </TableCell>
                              <TableCell align="center">
                                {user.wallet}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <TableContainer
                      component={Paper}
                      elevation={0}
                      sx={{ mt: 2 }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "primary.light" }}>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              순위
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              이름
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              포인트
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pointRanking.map((user: User, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  bgcolor: "action.hover",
                                },
                              }}
                            >
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">
                                {user.intraId}
                              </TableCell>
                              <TableCell align="center">
                                {user.collectionPoint}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 차트 섹션 */}
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="medium"
          sx={{ mt: 6, mb: 2 }}
        >
          42GS 통계
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {datasBar.map((data, key) => (
            <Grid item xs={12} lg={6} key={key}>
              <Card
                elevation={3}
                sx={{
                  p: 0,
                  height: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "primary.light",
                    color: "white",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="h6" align="center" fontWeight="bold">
                    {data}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 3,
                    height: 350,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                  }}
                >
                  {data === "직전 회차 시험 통과율" ? (
                    <Bar data={BarData} options={Options} />
                  ) : (
                    <Bar data={barLevels} options={Options} />
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MainPage;
