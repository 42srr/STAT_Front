import styled from "styled-components"; // css in js, react컴포넌트에 스타일을 직접 작성할 수 있게 해줌
import { useNavigate } from "react-router-dom"; // 다름페이지로 이동할 때 사용

export default function loginPage() {
  let navigate = useNavigate();
  let Flexs = styled.div`
    display: flex;
    flex-direction: column;
  `; // 로그인 페이지
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
