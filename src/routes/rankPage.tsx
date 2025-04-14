import SideBar from "../components/SideBar";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDataStore } from "../store/useDataStore";

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
}

const RankPage: React.FC<RankPageProps> = ({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
}) => {
  let [switchs, setSwitchs] = useState(0);
  let [activeBtn, setActiveBtn] = useState(0);

  const allProjects = useDataStore((state) => state.allProjects.data);
  const fetchAllProjects = useDataStore((state) => state.allProjects.fetchData);
  const allUsers = useDataStore((state) => state.allUsers.data);
  const fetchAllUsers = useDataStore((state) => state.allUsers.fetchData);
  const allWallet = useDataStore((state) => state.allWallet.data);
  const fetchAllWallet = useDataStore((state) => state.allWallet.fetchData);
  const allLevels = useDataStore((state) => state.allLevels.data);
  const fetchAllLevels = useDataStore((state) => state.allLevels.fetchData);

  useEffect(() => {
    if (accessToken) {
      fetchAllProjects(accessToken);
      fetchAllUsers(accessToken);
      fetchAllWallet(accessToken);
      fetchAllLevels(accessToken);
    }
  }, [accessToken]);

  let btnClick = (idx: number) => {
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
          {allUsers.map((user) => (
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
            {allUsers.map((user) => (
              <TableRow key={user.intraId}>
                <TableData>{Number(user.level).toFixed(2)}</TableData>
                <TableData>
                  <img src={user.image} />
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
