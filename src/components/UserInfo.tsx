import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { User, Project } from "../store/types";
import { useDataStore } from "../store/useDataStore";
import { FiRefreshCw } from "react-icons/fi";

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
  position: relative;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const RefreshButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #646cff;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(100, 108, 255, 0.1);
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const FeedbackMessage = styled.div<{ success?: boolean }>`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.success ? "#4caf50" : "#f44336")};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

interface UserInfoProps {
  userInfo: User;
  userProjects: Project[];
  accessToken?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  userInfo,
  userProjects,
  accessToken,
}) => {
  const [uniqueProjects, setUniqueProjects] = useState<Project[]>([]);
  const { refreshUserInfo, userInfo: userInfoState } = useDataStore();
  const [feedback, setFeedback] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  useEffect(() => {
    if (!userProjects || userProjects.length === 0) return;

    // 중복 제거된 프로젝트 목록 생성
    const projectMap = new Map<number, Project>();
    userProjects.forEach((project) => {
      if (!projectMap.has(project.projectId)) {
        projectMap.set(project.projectId, project);
      }
    });

    setUniqueProjects(Array.from(projectMap.values()));
  }, [userProjects]);

  // 피드백 메시지 타이머
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleRefresh = async () => {
    if (accessToken && userInfo) {
      try {
        await refreshUserInfo(accessToken, userInfo.id.toString());
        setFeedback({
          message: "유저 정보가 업데이트되었습니다.",
          success: true,
        });
      } catch (error) {
        setFeedback({
          message: "업데이트 중 오류가 발생했습니다.",
          success: false,
        });
      }
    }
  };

  if (!userInfo) return null;

  return (
    <UserInfoCard>
      {feedback && (
        <FeedbackMessage success={feedback.success}>
          {feedback.message}
        </FeedbackMessage>
      )}
      <UserInfoContainer>
        <InfoSection>
          <CardTitle>
            User Information
            {userInfo.updatable && (
              <RefreshButton
                onClick={handleRefresh}
                disabled={userInfoState.loading}
                title="새로고침"
              >
                <FiRefreshCw
                  className={userInfoState.loading ? "animate-spin" : ""}
                />
              </RefreshButton>
            )}
          </CardTitle>
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
                <ProjectItem key={project.projectId || index}>
                  {project.projectName}
                </ProjectItem>
              )
          )}
        </ProjectList>
      </InfoSection>
    </UserInfoCard>
  );
};

export default UserInfo;
