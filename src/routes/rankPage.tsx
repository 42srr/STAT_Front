import SideBar from "../components/SideBar";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDataStore } from "../store/useDataStore";
import { User } from "../store/types";

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Mainbox = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
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
      <Layout>
        <SideBar />
        <Mainbox>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            데이터를 불러오는 중입니다...
          </div>
        </Mainbox>
      </Layout>
    );
  }

  return (
    <Layout>
      <SideBar />
      <Mainbox>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>레벨</TableHeader>
              <TableHeader>사진</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>포인트</TableHeader>
              <TableHeader>월렛</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {pointRanking.map((user: User) => (
              <TableRow key={user.intraId}>
                <TableData>{Number(user.level).toFixed(2)}</TableData>
                <TableData>
                  <img src={user.imgURL} alt={user.intraId} />
                </TableData>
                <TableData>{user.intraId}</TableData>
                <TableData>{user.collectionPoint}</TableData>
                <TableData>{user.wallet}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Mainbox>
    </Layout>
  );
};

export default RankPage;
