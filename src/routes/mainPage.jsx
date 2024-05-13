import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

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

let Goodwords = styled.div`
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  background: #fd9214;
  text-align: center;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
let Layout = styled.div`
  display: flex;
`;
let Sidebox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  text-align: center;
  font-size: 1.2rem;
`;
let Mainbox = styled.div`
  display: flex;
  flex-direction: column;
`;
let SideBtn = styled.button`
  background: white;
  color: black;
  text-align: left;
  margin-top: 1rem;
`;
let Logo = styled.div`
  margin-bottom: 2rem;
`;
let Search = styled.div`
  border: 0.08rem solid black;
  border-radius: 0.4rem;
  width: 10rem;
  margin-bottom: 2rem;
`;
let Now = styled.div`
  display: flex;
`;
let Nowbox = styled.div`
  border-radius: 0.4rem;
  border: 0.08rem solid black;
  width: 12rem;
  height: 15rem;
  margin-right: 1rem;
  display: flex;
  display-direction: column;
`;
let NowboxTitle = styled.div`
  text-align: center;
  border-bottom: 0.08rem solid black;
  height: 2rem;
  width: 100%;
`;

const datas = [
  "현재사람들이참여하는과제",
  "여행중인유저레벨분포",
  "평가포인트랭킹",
];

const innerCircles = ["직전 회차 시험 통과율"];

const records = ["보유 월렛 랭킹"];

export default function MainPage() {
  const url = "http://118.67.134.143:8080/quotes";
  let [goodWords, setGoodWords] = useState("");
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setGoodWords(`${response.data.content} - ${response.data.name}`);
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
            42경산 현황
            <Now>
              {datas.map(function (data) {
                return (
                  <Nowbox>
                    <NowboxTitle>
                      {data}{" "}
                      <Main>
                        {data === "현재사람들이참여하는과제" ? (
                          <Doughnut data={Data} options={Options}></Doughnut>
                        ) : data === "여행중인유저레벨분포" ? (
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
