import React from "react";

const Profile = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    props.updateUser(null);
  };

  return (
    <div>
      <button className="btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
