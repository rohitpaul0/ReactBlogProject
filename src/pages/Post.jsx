import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appWrite/config";
import { Container, Button } from "../component";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../Store/postSlice";

export default function Post() {
  // const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  // get post from redux if avilable
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.$id === slug)
  );
  
  // If not found in Redux, fetch from Appwrite
  const [loading, setLoading] = useState(!post);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!post && slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          dispatch(addPost(post));
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else if (!slug) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [slug, navigate, dispatch, post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading || !post) return null;

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full md:w-[88%] mx-auto flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={appwriteService.getFilePriview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
