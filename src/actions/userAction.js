import axios from "axios";
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    if (!validateEmail(user.email)) {
      window.alert("Please provide a valid email");
    } else {
      const res = await axios.post(
        `http://localhost:4000/api/user/signup`,
        user
      );
      dispatch({ type: "USER_REGISTER_SUCCESS" });

      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/canvas";
    }
  } catch (error) {
    dispatch({ type: "USER_REGISTER_ERROR", payload: error });
    if (error.response.status === 400) {
      window.alert(error.response.data.message);
    }
  }
};

export const loginUser = (user, type) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const res = await axios.post(`http://localhost:4000/api/user/login`, user);
    dispatch({ type: "USER_LOGIN_SUCCESS" });
    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.href = "/canvas";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_ERROR", payload: error });
    if (error.response.status === 401 || error.response.status === 404) {
      window.alert(error.response.data.message);
    }
  }
};
