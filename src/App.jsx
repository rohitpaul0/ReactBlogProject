import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./Store/authSlice";
import authService from "./appWrite/auth";
import { Footer, Header } from "./component";
import { Outlet } from "react-router-dom";
import { setPosts, setError } from "./Store/postSlice";
import appWriteService from "./appWrite/config";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    appWriteService
      .getPosts()
      .then((posts) => {
        dispatch(setPosts(posts.documents));
      })
      .catch((error) => {
        dispatch(setError(error));
      })
      
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[color:var(--primary-color)]">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
