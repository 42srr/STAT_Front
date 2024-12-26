const UserInfo = ({ userInfo, userProjects }) => {
  return (
    <div>
      <div>
        UserInfo
        <div>{userInfo.data.intraId}</div>
        <div>{userInfo.data.wallet}</div>
        <div>{userInfo.data.collectionPoint}</div>
        <div>{userInfo.data.level}</div>
      </div>

      <div>
        UserProjects
        <div>{userProjects.data.projectName}</div>
        <div>{userProjects.data.status}</div>
      </div>
    </div>
  );
};

export default UserInfo;
