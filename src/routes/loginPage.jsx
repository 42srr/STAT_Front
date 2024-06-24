import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function loginPage() {
  let navigate = useNavigate();
  let Flexs = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  let Logo = styled.div`
    margin: auto;
  `;
  let Fields = styled.input`
    background: #d9d9d9;
    width: 10rem;
    margin: auto;
    margin-top: 1rem;
  `;
  let Buttons = styled.button`
    background: #d9d9d9;
    margin: auto;
    margin-top: 1rem;
    width: 10rem;
  `;
  return (
    <>
      <Flexs>
        <Logo>42경산로고</Logo>
        <Fields></Fields>
        <Fields></Fields>
        <Buttons
          onClick={() => {
            navigate("/main");
          }}
        >
          Login
        </Buttons>
      </Flexs>
    </>
  );
}
