import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDataStore } from "../store/useDataStore";
import { User } from "../store/types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Button3 = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    background: #1976d2;
    color: white;
    border-color: #1976d2;
  }

  &:hover {
    background: #e0e0e0;
    &.active {
      background: #1565c0;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th<{ switchs?: number }>`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
  color: ${(props) => (props.switchs !== undefined ? "#666" : "#000")};
`;

const TableData = styled.td<{ switchs?: number }>`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  color: ${(props) => (props.switchs !== undefined ? "#666" : "#000")};

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

interface RankPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  refreshToken: string;
  userId: string;
}

const RankPage: React.FC<RankPageProps> = ({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  userId,
}) => {
  const [switchs, setSwitchs] = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);

  // Zustand 스토어에서 데이터 및 액션 가져오기
  const walletRanking = useDataStore((state) => state.walletRanking.data);
  const pointRanking = useDataStore((state) => state.pointRanking.data);
  const projectDistribution = useDataStore(
    (state) => state.projectDistribution.data
  );
  const levelDistribution = useDataStore(
    (state) => state.levelDistribution.data
  );

  // 로딩 상태
  const walletLoading = useDataStore((state) => state.walletRanking.loading);
  const pointLoading = useDataStore((state) => state.pointRanking.loading);

  // 액션 함수들
  const fetchWalletRanking = useDataStore((state) => state.fetchWalletRanking);
  const fetchPointRanking = useDataStore((state) => state.fetchPointRanking);
  const fetchProjectDistribution = useDataStore(
    (state) => state.fetchProjectDistribution
  );
  const fetchLevelDistribution = useDataStore(
    (state) => state.fetchLevelDistribution
  );

  useEffect(() => {
    if (accessToken) {
      fetchWalletRanking(accessToken);
      fetchPointRanking(accessToken);
      fetchProjectDistribution(accessToken);
      fetchLevelDistribution(accessToken);
    }
  }, [accessToken]);

  const btnClick = (idx: number) => {
    setSwitchs(idx);
    setActiveBtn(idx);
  };

  // 헤더 정의
  let totalAvg = ["순위", "인트라ID", "월렛"];
  let levels = ["순위", "인트라ID", "레벨"];
  let countEvals = ["순위", "인트라ID", "평가횟수"];
  let lenComments = ["순위", "인트라ID", "회고록 길이"];

  let renderTable = () => {
    let headers =
      switchs === 0
        ? totalAvg
        : switchs === 1
        ? levels
        : switchs === 2
        ? countEvals
        : lenComments;

    // 표시할 데이터를 switchs 값에 따라 선택
    let rankingData =
      switchs === 0
        ? walletRanking
        : switchs === 1
        ? [...walletRanking].sort((a, b) => Number(b.level) - Number(a.level))
        : switchs === 2
        ? pointRanking
        : pointRanking; // 회고록 길이 데이터가 없으므로 pointRanking으로 대체

    // 데이터가 비어있는 경우 처리
    if (!rankingData || rankingData.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          데이터가 없습니다.
        </div>
      );
    }

    return (
      <Table>
        <thead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header}>{header}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {rankingData.map((user: User, index) => (
            <TableRow key={user.intraId}>
              <TableData>{index + 1}</TableData>
              <TableData>{user.intraId}</TableData>
              {switchs === 0 && <TableData>{user.wallet}</TableData>}
              {switchs === 1 && (
                <TableData>{Number(user.level).toFixed(2)}</TableData>
              )}
              {switchs === 2 && <TableData>{user.collectionPoint}</TableData>}
              {switchs === 3 && <TableData>-</TableData>}
            </TableRow>
          ))}
        </tbody>
      </Table>
    );
  };

  // 로딩 상태 처리
  if (walletLoading || pointLoading) {
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
          <div style={{ textAlign: "center", padding: "2rem" }}>
            데이터를 불러오는 중입니다...
          </div>
        </Container>
      </Box>
    );
  }

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
        <div className="group">
          <Button3
            className={activeBtn === 0 ? "active" : ""}
            onClick={() => btnClick(0)}
          >
            월렛 랭킹
          </Button3>
          <Button3
            className={activeBtn === 1 ? "active" : ""}
            onClick={() => btnClick(1)}
          >
            레벨 랭킹
          </Button3>
          <Button3
            className={activeBtn === 2 ? "active" : ""}
            onClick={() => btnClick(2)}
          >
            평가횟수
          </Button3>
          <Button3
            className={activeBtn === 3 ? "active" : ""}
            onClick={() => btnClick(3)}
          >
            최대 회고록 길이
          </Button3>
        </div>
        {renderTable()}
      </Container>
    </Box>
  );
};

export default RankPage;
