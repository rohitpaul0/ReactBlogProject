import { useEffect } from "react";
import { Container, PostCard } from "../component";
import { useDispatch, useSelector } from "react-redux";
import appWriteService from "../appWrite/config";
import { setPosts, setError, setLoading } from "../Store/postSlice";

function AllPost() {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();

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
          <div className="flex flex-col md:flex-row w-full flex-wrap">
            {posts?.map((post) => (
              <div key={post.$id} className="w-full p-2 md:w-1/3 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default AllPost;
