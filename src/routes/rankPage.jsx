import SideBar from "../components/SideBar.jsx";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDataStore } from "../store/useDataStore.js";

/*


export default function RankPage() {
  let [switchs, setSwitchs] = useState(0);

  let [activeBtn, setActiveBtn] = useState(0);

  let btnClick = (idx) => {
    setSwitchs(idx);
    setActiveBtn(idx);
  }

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
  ];
  let totalAvg = ["순위", "사진", "이름"];
  let levels = ["순위", "사진", "이름", "레벨"];
  let countEvals = ["순위", "사진", "이름", "횟수"];
  let lenComments = ["순위", "사진", "이름", "최대길이"];


  let Sidebox = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    text-align: center;
    font-size: 1.2rem;
  `;
  let Mainbox = styled.div`
    flex: 3;
  `;
  let TopBtn = styled.button`
    padding: 1rem;
  `;

  let switcher = () => {
    if (switchs === 0) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                {totalAvg.map((data) => {
                  return <th>{data}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => {
                return (
                  <tr>
                    <td>{data.순위}</td>
                    <td>{data.사진}</td>
                    <td>{data.이름}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (switchs === 1) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                {levels.map((data) => {
                  return <th>{data}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => {
                return (
                  <tr>
                    <td>{data.순위}</td>
                    <td>{data.사진}</td>
                    <td>{data.이름}</td>
                    <td>{data.레벨}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (switchs === 2) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                {countEvals.map((data) => {
                  return <th>{data}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => {
                return (
                  <tr>
                    <td>{data.순위}</td>
                    <td>{data.사진}</td>
                    <td>{data.이름}</td>
                    <td>{data.횟수}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <table>
            <thead>
              <tr>
                {lenComments.map((data) => {
                  return <th>{data}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {datas.map((data) => {
                return (
                  <tr>
                    <td>{data.순위}</td>
                    <td>{data.사진}</td>
                    <td>{data.이름}</td>
                    <td>{data.최대길이}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  };
  return (
    <Layout>
      <SideBar />
      <Mainbox>
      <div>
      <Line />
        <TopBtn
          onClick={() => {
            setSwitchs(0);
            setActiveBtn(0);
          }}
        >
          <RankTitle>
            <BoxContainer>
              <Label>
              종합평균
              </Label>
            </BoxContainer>
          </RankTitle>

        </TopBtn>
        <TopBtn
          onClick={() => {
            setSwitchs(1);
            setActiveBtn(1);
          }}
        >
          <RankTitle>
          <BoxContainer>
            <Label>
            Level
            </Label>
          </BoxContainer>
          </RankTitle>
        </TopBtn>
        <TopBtn
          onClick={() => {
            setSwitchs(2);
            setActiveBtn(2);
          }}
        >
          <RankTitle>
            <BoxContainer>
              <Label>
              평가 횟수
              </Label>
            </BoxContainer>
          </RankTitle>
        </TopBtn>
        <TopBtn
          onClick={() => {
            setSwitchs(3);
            setActiveBtn(3);
          }}
        >
          <RankTitle>
            <BoxContainer>
              <Label>
              코멘트 길이
              </Label>
            </BoxContainer>
          </RankTitle>
        </TopBtn>
      </div>
      <div>{switcher()}</div>
      </Mainbox>
    </Layout>
  );
}
*/

// styled-components
let Layout = styled.div`
  display: flex;
`;

let Mainbox = styled.div`
  flex: 3;
  padding: 20px;
  margin-right: 50px;
`;

let TopBar = styled.div`
  display: flex;
  justify-content: space-around;
`;

let Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

let TableHeader = styled.th`
  font-size: 18px;
  font-weight: bold;
  background-color: #f4f4f4;
  padding: 10px 20px;
  border-left: none;
  border-right: none;

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:nth-child(1) {
    width: ${({ switchs }) =>
      switchs === 1 || switchs === 2 || switchs === 3 ? "10%" : "10%"};
  } // 순위
  &:nth-child(2) {
    width: ${({ switchs }) =>
      switchs === 1 || switchs === 2 || switchs === 3 ? "20%" : "20%"};
  } // 사진
  &:nth-child(3) {
    width: ${({ switchs }) =>
      switchs === 1 || switchs === 2 || switchs === 3 ? "35%" : "70%"};
  } // 이름
  &:nth-child(4) {
    width: 35%;
  }
`;

let TableData = styled.td`
  font-size: 16px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border-left: none;
  border-right: none;

  &:nth-child(1) {
    width: ${({ switchs }) =>
      switchs === 1 || switchs === 2 || switchs === 3 ? "10%" : "10%"};
  } // 순위
  &:nth-child(2) {
    width: ${({ switchs }) =>
      switchs === 1 || switchs === 2 || switchs === 3 ? "20%" : "20%"};
  } // 사진
  &:nth-child(3) {
    width: ${({ switchs }) =>
      switchs === 1 || switchs === 2 || switchs === 3 ? "35%" : "70%"};
  } // 이름
  &:nth-child(4) {
    width: 35%;
  }
`;

let TableRow = styled.tr`
  &:nth-chlild(even) {
    background-color: #f9f9f9;
  }
`;

let RankTitle = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 10px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${({ isActive }) =>
      isActive ? "#8f9078" : "transparent"};
    border-radius: 10px 10px 0 0;
    transition: background-color 0.3s ease;
  }

  color: ${({ isActive }) => (isActive ? "white" : "black")};
`;

let Label = styled.span`
  font-size: 20px;
  color: ${({ isActive }) => (isActive ? "#8f9078" : "#4b4545")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;

let BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

let Line = styled.div`
  width: 100%;
  height: 1.1px;
  background-color: #bdbfa3;
  margin-bottom: 30px;
`;

// RankPage 컴포넌트
export default function RankPage({ accessToken, intraId }) {
  let [switchs, setSwitchs] = useState(0); // 데이터 변경을 위한 상태
  let [activeBtn, setActiveBtn] = useState(0); // 활성화된 버튼 상태

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

  let btnClick = (idx) => {
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
        {/* <TopBar>
          <RankTitle isActive={activeBtn === 0} onClick={() => btnClick(0)}>
            <BoxContainer>
              <Label isActive={activeBtn === 0}>종합 평균</Label>
            </BoxContainer>
          </RankTitle>
          <RankTitle isActive={activeBtn === 1} onClick={() => btnClick(1)}>
            <BoxContainer>
              <Label isActive={activeBtn === 1}>Level</Label>
            </BoxContainer>
          </RankTitle>
          <RankTitle isActive={activeBtn === 2} onClick={() => btnClick(2)}>
            <BoxContainer>
              <Label isActive={activeBtn === 2}>평가 횟수</Label>
            </BoxContainer>
          </RankTitle>
          <RankTitle isActive={activeBtn === 3} onClick={() => btnClick(3)}>
            <BoxContainer>
              <Label isActive={activeBtn === 3}>코멘트 길이</Label>
            </BoxContainer>
          </RankTitle>
        </TopBar>
        <Line />
        {renderTable()} */}
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
}
