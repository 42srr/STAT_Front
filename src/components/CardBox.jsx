import styled from "styled-components";

const CardOne = styled.div`
  margin: 1rem;
  text-align: center;
  //   background: green;
  width: 340px;
  height: 420px;
  padding: 0.8rem;
  border-radius: 0.8rem;
  border: solid 0.8px grey;
`;
const Title = styled.div`
  margin: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
`;
const Contents = styled.div`
  margin: 1rem;
`;

const Table = styled.table`
  text-algin: center;
  width: 100%;
`;

export const CardBox = ({ title }) => {
  return (
    <CardOne>
      <Title>{title}</Title>
      <Contents>
        <Table>
          <thead>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">과제명</th>
              <th scope="col">인원수</th>
            </tr>
          </thead>
          {/* <tbody>
            {contents.map((rank, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rank.projectName}</td>
                  <td>{rank.count}</td>
                </tr>
              );
            })}
          </tbody> */}
        </Table>
      </Contents>
    </CardOne>
  );
};
