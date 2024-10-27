import SideBar from "../components/SideBar.jsx";
import "../main.css";

export default function SetPage() {
  // api
  // 반응형
  // tailwind로 확인
  return (
    <main className="box-border flex flex-col gap-4 h-full mt-52">
      <div className="flex flex-col gap-3 py-4">
        <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
          <div className="px-4 py-2 font-bold">문의하기</div>
          <button className="px-4 py-2 font-semibold text-white rounded-full bg-slate-500 hover:bg-violet-500">문의하기</button>
        </div>
        <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
          <div className="px-4 py-2 font-bold">계정</div>
          <div>
            <button className="px-4 py-2 font-semibold text-white rounded-full bg-slate-500 hover:bg-violet-500">로그아웃</button>
          </div>
        </div>
        <div className="mx-auto py-3">
          <button className="px-4 py-2 font-semibold text-gray-300 rounded-full hover:outline outline-slate-200">회원탈퇴</button>
        </div>
      </div>
    </main>
  );
}
