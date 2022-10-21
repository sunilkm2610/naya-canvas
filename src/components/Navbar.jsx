import React, { useEffect, useState } from "react";
import "./navbar.scss";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUserInfo(user.user);
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="navbar-container">
      <div className="wraper">
        {userInfo !== null && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                marginRight: "20px",
                opacity: 0.7,
                textTransform: "uppercase",
              }}
            >
              {userInfo.name}
            </div>
            <div className="profile">{userInfo.name.charAt(0)}</div>
          </div>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
