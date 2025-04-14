import React from "react";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../main.css";
import { useDataStore } from "../store/useDataStore";
import { useState, useEffect } from "react";

interface InfoPageProps {
  accessToken: string;
  intraId: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ accessToken, intraId }) => {
  const userInfo = useDataStore((state) => state.userInfo.data);
  const fetchUserInfo = useDataStore((state) => state.userInfo.fetchData);

  useEffect(() => {
    if (accessToken) {
      fetchUserInfo(accessToken, intraId);
    }
  }, [accessToken]);
  // api

  // 반응형
  // tailwind로 확인
  return (
    <div className="flex flex-row">
      <SideBar />
      <main className="box-border flex flex-col w-screen gap-4 py-8 pl-48 pr-56">
        {/* background color 바뀔 수 있도록 custom 추가 / props 입력 */}
        <div className="flex justify-around flex-none px-20 py-4 mt-8 mb-2 border-2 border-none shadow-md bg-slate-100 rounded-2xl">
          <div className="px-2">
            {/* 이미지가 없을 때 (가 있나요..?) */}

            <img
              className="w-48 h-48 mx-auto rounded-full"
              src={userInfo.image}
              alt="설명 텍스트"
            />
            {/* 이미지가 있을때 
            // <img className="w-32 h-32 mx-auto rounded-full" src="https://dummyimage.com/300" alt="설명 텍스트" />
            */}
          </div>
          <div className="content-center">
            <div>이름 : {userInfo.intraId}</div>
            <div>코알리숑</div>
            <div>LV : {userInfo.level}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-4 justify-content">
          <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
            <div className="px-4 py-2 font-semibold">보너스 프리즈</div>
            <div className="px-4 py-2">1125일</div>
            <button className="px-4 py-2 font-bold text-white rounded-full bg-slate-500 hover:bg-violet-500">
              사용하기
            </button>
          </div>
          <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
            <div className="px-4 py-2 font-semibold">Sample1</div>
            <div className="px-4 py-2">sample1</div>
            <button className="px-4 py-2 font-bold text-white rounded-full bg-slate-500 hover:bg-violet-500">
              Use
            </button>
          </div>
          <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
            <div className="px-4 py-2 font-semibold">Sample2</div>
            <div className="px-4 py-2">sample2</div>
            <button className="px-4 py-2 font-bold text-white rounded-full bg-slate-500 hover:bg-violet-500">
              Use
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfoPage;
