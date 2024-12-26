const UserInfo = ({ userInfo, userProjects }) => {
  return (
    <div>
      <div>
        UserInfo
        <div>{userInfo.intraId}</div>
        <div>{userInfo.wallet}</div>
        <div>{userInfo.collectionPoint}</div>
        <div>{userInfo.level}</div>
      </div>

      <div>
        UserProjects
        {userProjects.map((project) => {
          return (
            project.status === "in_progress" && <div>{project.projectName}</div>
          );
        })}
      </div>
    </div>
  );
};

export default UserInfo;
