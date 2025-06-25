import { Container, PostCard } from "../component";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setError, setLoading } from "../Store/postSlice";
import appWriteService from "../appWrite/config";
import { useEffect } from "react";

function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.userData);
  const userstatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    if (posts?.length === 0) {
      dispatch(setLoading(true));
      appWriteService
        .getPosts()
        .then((posts) => {
          dispatch(setPosts(posts.documents));
        })
        .catch((error) => {
          dispatch(setError(error));
        })
        .finally(() => dispatch(setLoading(false)));
    }
  }, []);

  if (!userstatus) {
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
    <div className="w-full min-h-[75vh] py-8">
      {loading ? (
        <div className="flex items-center justify-center w-full h-[50vh]">
          <div className="text-2xl font-semibold text-center">
            Loading posts...
          </div>
        </div>
      ) : (
        <Container>
          <div className="flex flex-start ml-3 mb-10 text-3xl font-bold text-white">
            {user ? <p>Welcome {user.name}</p> : null}
          </div>
          <div className="flex flex-col md:flex-row w-full flex-wrap">
            {posts?.map((post) => (
              <div key={post.$id} className="w-full p-2 md:w-1/2 lg:w-1/3">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Home;
