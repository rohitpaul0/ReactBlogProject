import { Container, PostCard } from "../component";
import { useDispatch, useSelector } from "react-redux";
import { setPosts,setError } from "../Store/postSlice";

function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.userData);
  const userstatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

    if(!posts){
    useEffect(() => {
    appWriteService.getPosts()
    .then((res) => dispatch(setPosts(res.documents)))
    .catch((err)=> dispatch(setError(err.message)))
    .finally(()=> setLoading(false))
  }, [posts]);
}

  console.log("user", user);
  console.log("posts", posts);
  console.log(typeof posts);
  console.log("posts?.length", posts?.length);

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
    <div className="w-full py-8 min-h-[75vh]">
      <Container>
        <div className="flex flex-start ml-3 mb-3 text-lg">
          {user ? <p>Welcome... {user.name}</p> : null}
        </div>
        <div className="flex flex-col md:flex-row w-full flex-wrap">
          {posts?.map((post) => (
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
