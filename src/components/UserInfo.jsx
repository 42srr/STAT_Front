import styled from "styled-components";
import { useEffect, useState } from "react";

const UserInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 42rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px rgba(189, 191, 163, 0.3);
  background-color: white;
  color: black;
`;

const CardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const Label = styled.span`
  font-weight: 500;
  min-width: 100px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProjectItem = styled.div`
  padding: 0.5rem;
  background-color: rgba(189, 191, 163, 0.1);
  border-radius: 0.4rem;
`;

const UserInfo = ({ userInfo, userProjects }) => {
  const [uniqueProjects, setUniqueProjects] = useState([]);

  useEffect(() => {
    const filtered = [
      ...new Set(userProjects.map((project) => project.projectName)),
    ].map((name) =>
      userProjects.find((project) => project.projectName === name)
    );

    setUniqueProjects(filtered);
  }, [userProjects]); // userProjects가 변경될 때마다 실행
  return (
    <UserInfoCard>
      <InfoSection>
        <CardTitle>User Information</CardTitle>
        <InfoItem>
          <Label>Intra ID:</Label>
          <span>{userInfo.intraId}</span>
        </InfoItem>
        <InfoItem>
          <Label>Wallet:</Label>
          <span>{userInfo.wallet}</span>
        </InfoItem>
        <InfoItem>
          <Label>Points:</Label>
          <span>{userInfo.collectionPoint}</span>
        </InfoItem>
        <InfoItem>
          <Label>Level:</Label>
          <span>{userInfo.level}</span>
        </InfoItem>
      </InfoSection>

      <InfoSection>
        <CardTitle>Current Projects</CardTitle>
        <ProjectList>
          {uniqueProjects.map(
            (project, index) =>
              project.status === "in_progress" && (
                <ProjectItem key={index}>{project.projectName}</ProjectItem>
              )
          )}
        </ProjectList>
      </InfoSection>
    </UserInfoCard>
  );
};

export default UserInfo;
