const UserInfo = ({ userInfo, userProjects }) => {
  return (
    <div>
      <div>
        UserInfo
        <div>인트라아이디 : {userInfo.intraId}</div>
        <div>월렛 : {userInfo.wallet}</div>
        <div>평가포인트 : {userInfo.collectionPoint}</div>
        <div>레벨 : {userInfo.level}</div>
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
