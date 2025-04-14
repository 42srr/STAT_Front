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

  let datas = [
    {
      순위: 1,
      사진: "이미지",
      이름: "제갈민수",
      레벨: 10,
      횟수: 5,
      최대길이: 255,
    },
    {
      순위: 2,
      사진: "이미지",
      이름: "남궁민수",
      레벨: 10,
      횟수: 5,
      최대길이: 255,
    },
    {
      순위: 3,
      사진: "이미지",
      이름: "사공민수",
      레벨: 10,
      횟수: 5,
      최대길이: 255,
    },
    {
      순위: 4,
      사진: "이미지",
      이름: "사공민수",
      레벨: 10,
      횟수: 5,
      최대길이: 255,
    },
  ];

  let totalAvg = ["순위", "사진", "이름"];
  let levels = ["순위", "사진", "이름", "레벨"];
  let countEvals = ["순위", "사진", "이름", "횟수"];
  let lenComments = ["순위", "사진", "이름", "최대길이"];

  let renderTable = () => {
    let headers =
      switchs === 0
        ? totalAvg
        : switchs === 1
        ? levels
        : switchs === 2
        ? countEvals
        : lenComments;

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
          {pointRanking.map((user: User) => (
            <TableRow key={user.intraId}>
              <TableData>{user.intraId}</TableData>
              <TableData>{user.wallet}</TableData>
              <TableData>{user.collectionPoint}</TableData>
              <TableData>{user.level}</TableData>
            </TableRow>
          ))}
        </tbody>
        <thead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header} switchs={switchs}>
                {header}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {datas.map((data) => (
            <TableRow key={data.순위}>
              <TableData switchs={switchs}>{data.순위}</TableData>
              <TableData switchs={switchs}>{data.사진}</TableData>
              <TableData switchs={switchs}>{data.이름}</TableData>
              {switchs === 1 && (
                <TableData switchs={switchs}>{data.레벨}</TableData>
              )}
              {switchs === 2 && (
                <TableData switchs={switchs}>{data.횟수}</TableData>
              )}
              {switchs === 3 && (
                <TableData switchs={switchs}>{data.최대길이}</TableData>
              )}
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
          ml: "260px",
          width: { sm: `calc(100% - 260px)` },
          mt: "64px", // 상단바 높이만큼 margin-top 추가
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
        ml: "260px",
        width: { sm: `calc(100% - 260px)` },
        mt: "64px", // 상단바 높이만큼 margin-top 추가
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
