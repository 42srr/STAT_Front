import React from "react";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../reservation.css";

interface ReservationPageProps {
  accessToken: string;
  intraId: string;
}

const ReservationPage: React.FC<ReservationPageProps> = ({
  accessToken,
  intraId,
}) => {
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
              </div>
            </div>
          </div>
          <div className="confirmation">
            <p>You have set a reservation date</p>
            <button
              onClick={(_this) => {
                console.log("this :", _this);
              }}
              className="continue-button"
            >
              Continue
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ReservationPage;
