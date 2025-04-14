import React from "react";
import SideBar from "../components/SideBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../reservation.css";

interface ReservationDetailProps {
  accessToken: string;
  intraId: string;
  userId: string;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({
  accessToken,
  intraId,
  userId,
}) => {
  return (
    <>
      <div className="container">
        <SideBar />
        <main className="main-content">
          <h1>Select Time</h1>
          <div className="time-selection-container">
            <div className="time-line">
              <span>12:00 am</span>
            </div>
            <div className="reservation-details">
              <div className="members">
                <h2>Members</h2>
                <input type="range" className="members-count" />
                <div className="members-count">11</div>
              </div>
              <div className="time">
                <h2>Time</h2>
                <p>13 : 30pm - 15 : 30pm</p>
              </div>
              <div className="reservation-status">
                <h2>Reservation status</h2>
                <div className="reservation-status-elements">
                  <p>Your name </p>
                  <p>User Kim</p>
                </div>
                <div className="reservation-status-elements">
                  <p>Date </p>
                  <p> 2024. 07. 10</p>
                </div>
                <div className="reservation-status-elements">
                  <p>Time</p>
                  <p>13 : 30pm - 15 : 30pm</p>
                </div>
                <div className="reservation-status-elements">
                  <p>Place </p>
                  <p>스터디룸</p>
                </div>
                <div className="reservation-status-elements">
                  <p>Members </p>
                  <p>11</p>
                </div>
              </div>
              <div className="buttons">
                <button className="cancel-button">Cancel</button>
                <button className="done-button">Done</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ReservationDetail;
