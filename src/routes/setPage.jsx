import SideBar from "../components/SideBar.jsx";
import "../main.css";
import { useNavigate } from "react-router-dom";

// import SideBar from "../components/SideBar.jsx";

// export default function SetPage() {
//   return (
//     <>
//       <SideBar />
//       <div>
//         문의하기<button>문의하기</button>
//       </div>
//       <div>
//         계정
//         <div>
//           <button>로그아웃</button>
//           <button>회원탈퇴</button>
//         </div>
//       </div>
//     </>
//   );
// }
export default function SetPage() {
  // api
  // 반응형
  // tailwind로 확인
  return (
    <div className="flex flex-row">
      <SideBar />
      <main className="box-border flex flex-col w-screen gap-4 pl-48 pr-56 py-52">
        <div className="flex flex-col gap-3 py-4 justify-content">
          <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
            <div className="px-4 py-2 font-semibold">문의하기</div>
            <button
              onClick={() => {
                window.open("https://forms.gle/wpnkJwC8CRqUU4ePA", "_blank");
              }}
              className="px-4 py-2 font-bold text-white rounded-full bg-slate-500 hover:bg-violet-500"
            >
              문의하기
            </button>
          </div>
          <div className="flex flex-row justify-between py-3 border-2 border-slate-200 px-7 rounded-2xl hover:shadow-sm">
            <div className="px-4 py-2 font-semibold">계정</div>
            <div>
              <button className="px-4 py-2 font-bold text-white rounded-full bg-slate-500 hover:bg-violet-500">
                로그아웃
              </button>
            </div>
          </div>
          <div className="mx-auto py-3">
            <button className="px-4 py-2 text-gray-300 rounded-full hover:outline outline-slate-200">
              회원탈퇴
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
