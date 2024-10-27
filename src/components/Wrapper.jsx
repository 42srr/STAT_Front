import NewSideBar from "./NewSideBar";
import Header from "./Header"; // Header 컴포넌트 import

export default function Wrapper({ children }) {
  return (
    <div className="grid grid-rows-12 grid-cols-[200px,1fr] grid-flow-row">
      <div className="row-span-12 bg-slate-100 h-screen px-4 ">
        <NewSideBar />
      </div>
      <div className="row-span-1 outline outline-orange-200">
        <Header /> {/* Header 컴포넌트 추가 */}
      </div>
      <div className="row-span-11 px-10 h-full">
        {children} {/* 주소에 따라 변경되는 콘텐츠 */}
      </div>
    </div>
  );
}