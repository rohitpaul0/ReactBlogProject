import React, {useState, useEffect} from "react";
import appwriteService from "../appWrite/config";
import { Container, PostCard } from "../component";

function Home() {
  const [posts, SetPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        SetPosts(posts.documents);
      }
    });
  }, []);

  if (posts === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className=" flex flex-wrap">
            <div className="p-2 w-full">
              <h1
                className=" text-2xl font-bold
                            hover:text-gray-500"
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
    <div className="w-full py-8">
         <Container>
           <div className="flex flex-col md:flex-row w-full flex-wrap">
             {posts.map((post) => (
               <div key={post.$id} className="w-full p-2 md:w-1/3 lg:w-1/4">
                 <PostCard {...post}/>
               </div>
             ))}
           </div>
         </Container>
    </div>
  )

  return <div></div>;
  
}

export default Home;
