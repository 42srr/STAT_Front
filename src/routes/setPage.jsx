import SideBar from "../components/SideBar.jsx";

export default function SetPage() {
  return (
    <>
      <SideBar />
      <div>
        문의하기<button>문의하기</button>
      </div>
      <div>
        계정
        <div>
          <button>로그아웃</button>
          <button>회원탈퇴</button>
        </div>
      </div>
    </>
  );
}
