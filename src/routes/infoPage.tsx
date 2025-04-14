import React from "react";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../main.css";
import { useDataStore } from "../store/useDataStore";
import { useEffect } from "react";
import { User } from "../store/types";

interface InfoPageProps {
  accessToken: string;
  intraId: string;
  userId: string;
}

const InfoPage: React.FC<InfoPageProps> = ({
  accessToken,
  intraId,
  userId,
}) => {
  // Zustand 스토어에서 사용자 정보 및 액션 가져오기
  const userInfo = useDataStore((state) => state.userInfo.data);
  const userInfoLoading = useDataStore((state) => state.userInfo.loading);
  const userInfoError = useDataStore((state) => state.userInfo.error);
  const fetchUserInfo = useDataStore((state) => state.fetchUserInfo);

  useEffect(() => {
    if (accessToken && userId) {
      fetchUserInfo(accessToken, userId);
    }
  }, [accessToken, userId, fetchUserInfo]);

  // 로딩 중이거나 사용자 정보가 없을 때 처리
  if (userInfoLoading) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <main className="box-border flex flex-col w-screen gap-4 py-8 pl-48 pr-56">
          <div className="flex justify-center items-center h-64">
            <p>사용자 정보를 불러오는 중입니다...</p>
          </div>
        </main>
      </div>
    );
  }

  if (userInfoError) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <main className="box-border flex flex-col w-screen gap-4 py-8 pl-48 pr-56">
          <div className="flex justify-center items-center h-64">
            <p>오류가 발생했습니다: {userInfoError}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <main className="box-border flex flex-col w-screen gap-4 py-8 pl-48 pr-56">
          <div className="flex justify-center items-center h-64">
            <p>사용자 정보를 찾을 수 없습니다.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <SideBar />
      <main className="box-border flex flex-col w-screen gap-4 py-8 pl-48 pr-56">
        {/* background color 바뀔 수 있도록 custom 추가 / props 입력 */}
        <div className="flex justify-around flex-none px-20 py-4 mt-8 mb-2 border-2 border-none shadow-md bg-slate-100 rounded-2xl">
          <div className="px-2">
            <img
              className="w-48 h-48 mx-auto rounded-full"
              src={userInfo.imgURL}
              alt="사용자 프로필"
            />
          </div>
          <div className="content-center">
            <div>이름 : {userInfo.intraId}</div>
            <div>코알리숑</div>
            <div>LV : {userInfo.level}</div>
            <div>월렛 : {userInfo.wallet}</div>
            <div>포인트 : {userInfo.collectionPoint}</div>
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
