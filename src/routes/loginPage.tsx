import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// @ts-ignore
import mainLogo from "../assets/light/logo.svg";
// @ts-ignore
import BackgroundImg from "../assets/background.jpg";
import RollingImages from "../components/RollingImages";

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap; // 모바일에서 여러 줄로 표시
    padding: 10px;
  }
`;

const FooterLink = styled(Link)`
  color: #999;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  &:hover {
    color: #fff;
  }
`;

const FooterAnchor = styled.a`
  color: #999;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  &:hover {
    color: #fff;
  }
`;

const FooterSpan = styled.span`
  color: #999;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  &:hover {
    color: #fff;
  }
`;

const Divider = styled.span`
  color: #666;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const PrivacyLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  color: #666;
  font-size: 0.8rem;
  text-decoration: underline;
  &:hover {
    color: #888;
  }
`;

const Main = styled.div`
  background-color: #171717;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 0.8fr 230px 1.2fr;
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 60px;
`;

let DivWrapper = styled.div`
  /* margin: auto; */
`;

let LoginWrapper = styled.div`
  z-index: 999;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 15rem;
  margin: auto;
`;

let Text = styled.div`
  font-family: "Daheang", serif;
  color: #d9d9df;
  margin: auto;
  padding: 1rem;
  line-height: 1.15;
  font-size: 1.8rem;
`;

let Buttons = styled.button`
  background: #ebebed;
  margin: auto;
  margin-top: 1rem;
  width: 10rem;
  padding: 1rem;
  border-radius: 0.8rem;
`;

interface LoginPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  refreshToken: string;
  setIntraId: React.Dispatch<React.SetStateAction<string>>;
  intraId?: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
}

const LoginPage: React.FC<LoginPageProps> = ({
  setAccessToken,
  setRefreshToken,
  accessToken,
  refreshToken,
  setIntraId,
  setUserId,
  userId,
}) => {
  const navigate = useNavigate();
  const requestSentRef = useRef<boolean>(false);
  // local용 URL
  const toGetAuthCodeUrl = import.meta.env.VITE_AUTH_CODE as string;

  useEffect(() => {
    const search = window.location?.search.split("code=")[1];
    // console.log("search:", search);
    if (search && !requestSentRef.current) {
      requestSentRef.current = true;
      getAuth(search);
    }
  }, [navigate]);

  async function getAuth(code: string) {
    try {
      const res = await axios.get("/api/login/oauth2/42", {
        params: { code: code },
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log("Server res:", res.data.data);
      // console.log("res.data:", res.data);
      // console.log("res:", res);
      const { accessToken, refreshToken, intraId, userId } = res.data.data;
      if (!accessToken || !refreshToken || !intraId || !userId) {
        throw new Error("Invalid token");
      }
      // 세션에 토큰 저장
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("intraId", intraId);
      sessionStorage.setItem("userId", userId);
      // 상태 업데이트
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIntraId(intraId);
      setUserId(userId);
      // console.log("accessToken:");
      // console.log(accessToken);
      // console.log("refreshToken:");
      // console.log(refreshToken);
      // console.log("intraId");
      // console.log(intraId);
      navigate("/main", { replace: true });
    } catch (error: any) {
      // console.error("login failed:", error);
      if (error.response) {
        // console.log("Server Error Status:", error.response.status);
        // console.log("Server Error Data:", error.response.data);
      }
    }
  }

  async function getRefresh() {
    try {
      const res = await axios.post("/api/refresh", {
        refreshToken: refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = res.data;
      // console.log("accessToken:");
      // console.log(accessToken);
      // console.log("refreshToken:");
      // console.log(refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      // console.error("Token refresh failed:", error);
      navigate("/");
    }
  }

  return (
    <Main>
      <RollingImages stylenum={8} />
      <DivWrapper>
        <LoginWrapper>
          <LogoImg src={mainLogo} />
          <Text>
            "42GS" 정거장에 온 히치하이커, <br />
            당신만의 행성을 찾아 나아가세요. <br />
            당신의 여행을 응원합니다.
          </Text>
          <Buttons>
            <a href={toGetAuthCodeUrl}>
              <span style={{ color: "black" }}>Login with </span>
              <b>42GS</b>
            </a>
          </Buttons>
        </LoginWrapper>
        <RollingImages stylenum={4} startIndex={5} />
      </DivWrapper>
      <RollingImages stylenum={0} startIndex={9} />
      <Footer>
        <FooterContent>
          <FooterLink to="/webprivacy">Privacy Policy</FooterLink>
          <Divider>|</Divider>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <Divider>|</Divider>
          <FooterAnchor href="mailto:anonymous">Contact</FooterAnchor>
          <Divider>|</Divider>
          <FooterSpan>© 2024 42SRR</FooterSpan>
        </FooterContent>
      </Footer>
    </Main>
  );
};

export default LoginPage;
