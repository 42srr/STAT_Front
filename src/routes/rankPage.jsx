import SideBar from "../components/SideBar.jsx";
import { useState } from "react";
import styled from "styled-components";

export default function RankPage() {
  let [switchs, setSwitchs] = useState(0);

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
  let TopBtn = styled.button`
    padding: 1rem;
  `;

  const switcher = () => {
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
      <div>
        <TopBtn
          onClick={() => {
            setSwitchs(0);
          }}
        >
          종합평균
        </TopBtn>
        <TopBtn
          onClick={() => {
            setSwitchs(1);
          }}
        >
          Level
        </TopBtn>
        <TopBtn
          onClick={() => {
            setSwitchs(2);
          }}
        >
          평가횟수
        </TopBtn>
        <TopBtn
          onClick={() => {
            setSwitchs(3);
          }}
        >
          코멘트길이
        </TopBtn>
      </div>
      <div>{switcher()}</div>
    </Layout>
  );
}
