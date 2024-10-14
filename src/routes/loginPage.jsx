import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function loginPage() {
  const [authCode, setAuthCode] = useState("");
  useEffect(() => {
    const search = window.location?.search;
    const data = search.split("code=")[1];
    console.log(search);
    console.log(data);
    setAuthCode(data);
  }, []);
  function getAuth() {
    axios
      .get("http://118.67.134.143:8080/login", { code: authCode })
      .then((res) => {
        console.log(res);
      });
  }
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
        <Buttons>
          {/* <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-c8ae2f770fbf4c851ea2d700c1b7de23af5c008cd24837eac2b163f3c0e24c67&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code"> */}
          <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-598ae18e7a326adf87c4c13c715a91675c6b68458bb4082e24e297616ebd98d4&redirect_uri=http%3A%2F%2F118.67.134.143%3A80&response_type=code">
            auth test btn
          </a>
        </Buttons>
        <Buttons
          onClick={() => {
            getAuth();
          }}
        >
          test
        </Buttons>
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
