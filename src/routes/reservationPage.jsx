import SideBar from "../components/SideBar.jsx";
import '../reservation.css';

export default function ReservationPage() {
  return (
    <>
     <div className="container">
     <SideBar />
      <main className="main-content">
        <h1>Select Date</h1>
        <div className="tabs">
          <button className="tab active">스터디룸</button>
          <button className="tab">유니버스룸</button>
        </div>
        <div className="calendar">
          <div className="calendar-header">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>
          <div className="calendar-body">
            <div className="month">
              <span>July, 2024</span>
            </div>
            <div className="calendar-description">
              월별 달력: 일반 캘린더 처럼 표시
              일주일 타임라인 제외하고 나머지 날짜들은 선택할 수 없게 옅은 색으로 비활성화 표시
            </div>
          </div>
        </div>
        <div className="confirmation">
          <p>You have set a reservation date</p>
          <button  
            onClick={(_this) => {
              console.log("this :",  _this);
            }}
            className="continue-button">
            Continue
          </button>
        </div>
      </main>
    </div>
    </>
  );
}
