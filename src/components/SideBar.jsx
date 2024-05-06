import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  let navigate = useNavigate();
  let Layout = styled.div`
    display: flex;
  `;
  let Sidebox = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    text-align: center;
    font-size: 1.2rem;
  `;
  let Mainbox = styled.div`
    display: flex;
    flex-direction: column;
  `;
  let SideBtn = styled.button`
    background: white;
    color: black;
    text-align: left;
    margin-top: 1rem;
  `;
  let Logo = styled.div`
    margin-bottom: 2rem;
  `;
  let Search = styled.div`
    border: 0.08rem solid black;
    border-radius: 0.4rem;
    width: 10rem;
    margin-bottom: 2rem;
  `;

  return (
    <Sidebox>
      <Logo>42경산 로고</Logo>
      <Search>검색창</Search>
      <SideBtn
        onClick={() => {
          navigate("/main");
        }}
      >
        Home
      </SideBtn>
      <SideBtn
        onClick={() => {
          navigate("/rank");
        }}
      >
        Ranking
      </SideBtn>
      <SideBtn>Information</SideBtn>
      <SideBtn>Setting</SideBtn>
    </Sidebox>
  );
}
