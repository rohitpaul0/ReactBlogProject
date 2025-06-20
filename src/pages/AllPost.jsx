import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../component";
import appwriteService from "../appWrite/config";

function AllPost() {
  const [posts, SetPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        SetPosts(posts.documents);
      }
    });
  }, []);
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
