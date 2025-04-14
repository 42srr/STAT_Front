import styled from "styled-components";
import React from "react";
import { useEffect, useState } from "react";

const UserInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 42rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px rgba(189, 191, 163, 0.3);
  background-color: white;
  color: black;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const UserImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(189, 191, 163, 0.3);
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
  flex: 1;
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

interface UserInfoProps {
  userInfo: {
    id: number;
    intraId: string;
    level: number;
    wallet: number;
    collectionPoint: number;
    imgURL: string;
    updatable: boolean;
  };
  userProjects: Array<{
    projectId: number;
    projectName: string;
    finalMark: number;
    status: string;
  }>;
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo, userProjects }) => {
  const [uniqueProjects, setUniqueProjects] = useState<Array<any>>([]);

  useEffect(() => {
    const filtered = [
      ...new Set(userProjects.map((project) => project.projectName)),
    ].map((name) =>
      userProjects.find((project) => project.projectName === name)
    );

    setUniqueProjects(filtered);
  }, [userProjects]);

  return (
    <UserInfoCard>
      <UserInfoContainer>
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
        <UserImage src={userInfo.imgURL} alt="user" />
      </UserInfoContainer>
      <InfoSection>
        <CardTitle>Current Projects</CardTitle>
        <ProjectList>
          {uniqueProjects.map(
            (project, index) =>
              project.status === "IN_PROGRESS" && (
                <ProjectItem key={index}>{project.projectName}</ProjectItem>
              )
          )}
        </ProjectList>
      </InfoSection>
    </UserInfoCard>
  );
};

export default UserInfo;
