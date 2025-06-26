import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../component";
import appwriteService from "../appWrite/config";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const existingPost = posts.find((p) => p.$id === slug);

    if (existingPost) {
      setPost(existingPost);
    } else if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, posts, navigate]);

  return (
    <div className="min-h-[75vh]">
      {post ? (
        <div className="py-8 ">
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      ) : null}
      ;
    </div>
  );
}

export default EditPost;
