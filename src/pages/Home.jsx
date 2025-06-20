import React, { useState, useEffect } from "react";
import appwriteService from "../appWrite/config";
import auth from "../appWrite/auth";
import { Container, PostCard } from "../component";
import { setPosts } from "../Store/postSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // console.log(user);

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        dispatch(setPosts(posts.documents));
      }
    });

    const loadUser = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full min-h-[75vh] flex items-center py-8 mt-4 text-center">
        <Container>
          <div className=" flex flex-wrap">
            <div className="p-2 w-full">
              <h1
                className=" text-3xl font-bold
                            "
              >
                Log in to read post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8 min-h-[75vh]">
      <Container>
        <div className="flex flex-start ml-3">
          {user ? <p>Welcome... {user.name}</p> : null}
        </div>
        <div className="flex flex-col md:flex-row w-full flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="w-full p-2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
