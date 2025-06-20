import { Container, PostCard } from "../component";
import { useSelector } from "react-redux";

function AllPost() {
    const posts= useSelector((state)=> state.posts.posts);
    
  return (
    <div className="w-full min-h-[75vh] py-8">
      <Container>
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

export default AllPost;
