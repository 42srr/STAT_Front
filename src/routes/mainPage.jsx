import styled from "styled-components"; // js 코드 안에서 일반 css 구성 요소의 스타일 지정 가능
import axios from "axios"; // http요청을 만들 때 사용됨, api와 통신할 때 사용됨
import { useEffect, useState } from "react"; // react의 {컴포넌트가 }

import SideBar from "../components/SideBar.jsx";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

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

// div요소를 기본으로하는 스타일링된 컴포넌트, flexbox 레이아웃 사용하도록 설정
let Layout = styled.div`
  display: flex;
  justify-content: flex-start;
`;

// mainbox : 세로방향 배치
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
  margin-top; 1rem;
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

const datas = ["과제 참여 분포", "유저 레벨 분포", "평가 포인트 랭킹"];

const innerCircles = ["과제 참여 분포"];

const records = ["보유 월렛 랭킹"];

export default function MainPage() {
  let [goodWords, setGoodWords] = useState("");
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
  const url2 = "http://118.67.134.143:8080/project";
  useEffect(() => {
    axios
      .get(url2)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Layout>
        <SideBar />
        <Mainbox>
          <Goodwords>{goodWords}</Goodwords>
          <div>
            <Now>
              {datas.map(function (data) {
                return (
                  <Nowbox>
                    <NowboxTitle>
                      {data}{" "}
                      <Main>
                        {data === "과제 참여 분포" ? (
                          <table>
                            <thead>
                              <th>순위</th>
                              <th>과제명</th>
                              <th>인원수</th>
                            </thead>
                            <tbody>
                              <td>1</td>
                              <td>babbi</td>
                              <td>5</td>
                            </tbody>
                          </table>
                        ) : data === "유저 레벨 분포" ? (
                          <Bar data={BarData} options={Options}></Bar>
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
            현재 이너서클 멤버 관련 통계
            <Now>
              {innerCircles.map(function (data) {
                return (
                  <Nowbox>
                    <NowboxTitle>
                      {data}
                      <Main>
                        <Bar data={BarData} options={Options}></Bar>
                      </Main>
                    </NowboxTitle>
                  </Nowbox>
                );
              })}
            </Now>
          </div>
          <div>
            역대 기록
            <Now>
              {records.map(function (data) {
                return (
                  <Nowbox>
                    <NowboxTitle>
                      {data}
                      <div>
                        <table>
                          <thead>
                            <th>순위</th>
                            <th>이름</th>
                            <th>월렛</th>
                          </thead>
                          <tbody>
                            <td>1</td>
                            <td>babbi</td>
                            <td>5</td>
                          </tbody>
                        </table>
                      </div>
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
