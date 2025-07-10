import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appWrite/auth";
import { logout } from "../../Store/authSlice";




function LogOutBtn() {
  const dispatch = useDispatch();
  const logoutHandeler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
    className="inline-block px-6 py-2 duration-200 font-semibold hover:text-blue-500 rounded-full"
    onClick={logoutHandeler}>
      Logout
    </button>
  );
}

export default LogOutBtn;
